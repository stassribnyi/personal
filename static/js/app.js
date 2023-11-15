import {
  setHash,
  replaceClass,
  scrollToAnchor,
  getDiffInYears,
  openEmailClient,
  canNavigateInsidePage
} from "./utilities.js";

import {
  lozad,
  Glide,
  scrollama,
  SweetScroll,
  MoveDirection,
  StepDirection,
  GLIDE_CONFIG_DEFAULT,
  SWEET_SCROLL_CONFIG_DEFAULT
} from "./libs.js";

import { registerSW } from "./registerServiceWorker.js";

const BIRTH_DATE = "1995-01-09";
const CAREER_START = "2015-08-01";
const EMAIL_ADDRESS = "stas.sribnyi@gmail.com";

const APP_ROUTES = Object.freeze({
  ABOUT: "about",
  SKILLS: "skills",
  CAREER: "career",
  PROJECTS: "projects",
  CONTACTS: "contacts",
  CV: "cv"
});

/**
 * initializes, subscribes and performs all necessary actions to make user experience better
 * @returns {{unsubscribe: unsubscribe}} callback to destroy the app
 * @constructor
 */
export function Application() {
  initLozad();
  initDates();

  const scroller = new SweetScroll(SWEET_SCROLL_CONFIG_DEFAULT);
  const glide = new Glide(".glide", GLIDE_CONFIG_DEFAULT).mount();

  const projects = initProjectItems();
  const contactForm = initContactForm();
  const allLinks = initAllLinks(scroller);
  const navChevron = initNavChevron(scroller);
  const nativeSubscription = initNativeEvents();

  const sectionNavigation = initNavHighlightTrigger(allLinks.navLinks);

  if (!!location.hash) {
    scrollToAnchor(
      location.hash,
      scroller,
      getScrollOffset(location.hash),
      false
    );
  }

  registerSW()
    .then(() => console.info("The service worker successfully registered"))
    .catch(() => console.warn("Unable to register service worker"));

  return {
    destroy: () => {
      allLinks.unsubscribe();
      projects.unsubscribe();
      navChevron.unsubscribe();
      contactForm.unsubscribe();
      nativeSubscription.unsubscribe();

      glide.destroy();
      sectionNavigation.destroy();
    }
  };
}

/**
 * initialize lazy loading of images and removes classes used for no js implementation
 */
function initLozad() {
  const img = document.querySelectorAll(".lozad");
  img.forEach(img => img.classList.remove("lozad-hidden"));

  const observer = lozad(img);

  observer.observe();
}

/**
 * initializes dates to avoid hard codded values
 */
function initDates() {
  const age = document.getElementById("js--age");
  const career = document.getElementById("js--career-start");

  const ageYears = getDiffInYears(new Date(BIRTH_DATE), new Date());
  const careerYears = getDiffInYears(new Date(CAREER_START), new Date());

  age.innerText = Math.abs(Math.floor(ageYears));
  career.innerText = Math.abs(Math.round(careerYears));
}

/**
 * subscribe for click event of chevron icon to make smooth scroll
 * and update browser hash depending on chevron direction
 * @param scroller to provide smooth navigation
 * @returns {{unsubscribe(): void}} object containing callback to unsubscribe
 */
function initNavChevron(scroller) {
  const chevron = document.getElementById("js--nav__chevron");

  const chevronClickToScroll = event => {
    const { classList } = event.currentTarget;

    const chevronDown = classList.contains("ion-chevron-down");
    const chevronUp = classList.contains("ion-chevron-up");

    if (!chevronDown && !chevronUp) {
      return;
    }

    const anchor = chevronDown ? APP_ROUTES.ABOUT : "";

    scrollToAnchor(`#${anchor}`, scroller);

    event.preventDefault();
  };

  chevron.addEventListener("click", chevronClickToScroll);

  return {
    unsubscribe: () => {
      chevron.removeEventListener("click", chevronClickToScroll);
    }
  };
}

/**
 * subscribes for form submit event to send form data to mail client directly
 * @returns {{unsubscribe(): void}} callback to unsubscribe from event
 */
function initContactForm() {
  const contactForm = document.getElementById("js--contacts-form");

  const handleContactFormSubmission = event => {
    const { target: form } = event;

    openEmailClient(EMAIL_ADDRESS, {
      subject: form.subject,
      name: form.name,
      body: form.body
    });

    event.preventDefault();
  };

  contactForm.addEventListener("submit", handleContactFormSubmission);

  return {
    unsubscribe: () => {
      contactForm.removeEventListener("submit", handleContactFormSubmission);
    }
  };
}

/**
 * subscribe for touchstart event to simulate focus on touch devices
 * @returns {{unsubscribe(): void}} callback to unsubscribe from events
 */
function initProjectItems() {
  const projects = Array.from(document.querySelectorAll(".js--projects__item"));

  const touchstartStub = () => { };

  /**
   * make project clickable as a temporary measure before UI overhaul 
   * @param {MouseEvent} e 
   */
  const handleProjectClick = (e) => {
    e.preventDefault();

    const link = e.currentTarget.querySelector('.projects__item-link');
    if (link) {
      link.dispatchEvent(new MouseEvent('click', {
        'view': window,
        'bubbles': false,
        'cancelable': true
      }));
    }
  };

  projects.forEach(item => {
    item.addEventListener("touchstart", touchstartStub, { passive: true });
    item.addEventListener("click", handleProjectClick);
  });

  return {
    unsubscribe: () => {
      projects.forEach(item => {
        item.removeEventListener("touchstart", touchstartStub);
        item.removeEventListener("click", handleProjectClick);
      });
    }
  };
}

/**
 * subscribes for click events of all links to perform smooth navigation
 * @param scroller to be used for smooth navigation
 * @returns {{unsubscribe(): void, btnLinks: *, navLinks: *}} object containing:
 * callback to unsubscribe from click events
 * button links
 * navigation links
 */
function initAllLinks(scroller) {
  const btnLinks = Array.from(document.querySelectorAll(".js--btn-link"));
  const navLinks = Array.from(document.querySelectorAll(".js--nav-link"));

  const allLinks = [...navLinks, ...btnLinks];

  const linkClickToScroll = event => {
    const currentElement = event.currentTarget;

    if (!canNavigateInsidePage(currentElement)) {
      return;
    }

    const { hash } = currentElement;

    scrollToAnchor(hash, scroller, getScrollOffset(hash), false);

    event.preventDefault();
  };

  allLinks.forEach(link => link.addEventListener("click", linkClickToScroll));

  return {
    btnLinks,
    navLinks,
    unsubscribe: () => {
      allLinks.forEach(link =>
        link.removeEventListener("click", linkClickToScroll)
      );
    }
  };
}

/**
 * initializes trigger on section enter/leave to select current navigation link
 * and show/hide navigation depending on section
 * @param navLinks to select/deselect if section is/is not in viewport
 * @returns {{destroy(): void}} object with destroy callback to destroy trigger
 */
function initNavHighlightTrigger(navLinks) {
  const sections = Array.from(document.querySelectorAll(".js--section"));

  return initEnterLeaveTrigger(sections, (section, direction, step) => {
    if (section.id === "about") {
      if (
        (direction === MoveDirection.UP && step === StepDirection.EXIT) ||
        (direction === MoveDirection.DOWN && step === StepDirection.ENTER)
      ) {
        toggleNav(direction);
      }

      if (direction === MoveDirection.UP && step === StepDirection.EXIT) {
        selectLinksBySection(`#`, navLinks);

        return;
      }
    }

    if (step !== StepDirection.ENTER) {
      return;
    }

    selectLinksBySection(`#${section.id}`, navLinks);
  });
}

/**
 * initialize trigger on element enter/leave viewport
 * @param elements elements to trigger callback once in viewport
 * @param onSectionReached callback to be called once element is in viewport
 * @returns {{destroy: destroy}} object with destroy callback to destroy trigger
 */
function initEnterLeaveTrigger(elements, onSectionReached) {
  const scrollTrigger = scrollama();

  const onSectionReachedInternal =
    typeof onSectionReached === "function" ? onSectionReached : () => { };

  scrollTrigger
    .setup({ step: elements, offset: 0.15 })
    .onStepEnter(({ element, direction }) => {
      onSectionReachedInternal(element, direction, StepDirection.ENTER);
    })
    .onStepExit(({ element, direction }) => {
      onSectionReachedInternal(element, direction, StepDirection.EXIT);
    });

  window.addEventListener("resize", scrollTrigger.resize);

  return {
    destroy: () => {
      window.removeEventListener("resize", scrollTrigger.resize);

      scrollTrigger.destroy();
    }
  };
}

/**
 * subscribe to native events
 * @returns {{unsubscribe(): void}} object with unsubscribe callback
 */
function initNativeEvents() {
  const reloadOnOrientationChange = () => location.reload();

  window.addEventListener("orientationchange", reloadOnOrientationChange);

  return {
    unsubscribe() {
      window.removeEventListener(
        "orientationchange",
        reloadOnOrientationChange
      );
    }
  };
}

/**
 * toggles top navigation depending on scroll direction,
 * also change direction of chevron icon
 * @param direction of scroll
 */
function toggleNav(direction) {
  const nav = document.getElementById("js--nav");
  const navChevron = document.getElementById("js--nav__chevron");

  const navTopClass = "nav--top";
  const chevronUpClass = "ion-chevron-up";
  const chevronDownClass = "ion-chevron-down";

  switch (direction) {
    case MoveDirection.DOWN:
      nav.classList.add(navTopClass);
      replaceClass(navChevron, chevronDownClass, chevronUpClass);
      break;
    case MoveDirection.UP:
      nav.classList.remove(navTopClass);
      replaceClass(navChevron, chevronUpClass, chevronDownClass);
      break;
    default:
      break;
  }
}

/**
 * selects anchor links by the specified section id and
 * updates current browser hash address
 * @param sectionLinkHash specified section id
 * @param navLinks all links to remove previously selected and select new ones
 */
function selectLinksBySection(sectionLinkHash, navLinks) {
  const sectionLinks = navLinks.filter(link => link.hash === sectionLinkHash);

  if (sectionLinkHash !== "#" && !sectionLinks.length) {
    return;
  }

  const selectedLinks = navLinks.filter(link => link.hash === location.hash);
  const selectedLinkClass = "nav__link--selected";

  selectedLinks.forEach(item => item.classList.remove(selectedLinkClass));
  sectionLinks.forEach(item => item.classList.add(selectedLinkClass));

  setHash(sectionLinkHash);
}

/**
 * gets scroll offset by hash
 * @param hash
 * @returns {number} offset value
 */
function getScrollOffset(hash) {
  return hash === `#${APP_ROUTES.CV}` ? -80 : 0;
}
