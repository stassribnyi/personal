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
  Waypoint,
  Direction,
  SweetScroll,
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

  const sectionNavigation = initSectionNavigation(allLinks.navLinks);

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
 * initializes dates to avoid hard codded dates
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

  const touchstartStub = () => {};

  projects.forEach(item =>
    item.addEventListener("touchstart", touchstartStub, { passive: true })
  );

  return {
    unsubscribe: () => {
      projects.forEach(item =>
        item.removeEventListener("touchstart", touchstartStub)
      );
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
 * initializes callbacks which will be called when a section is in the viewport for performing side effects
 * @param navLinks to select/deselect if section is/is not in viewport
 * @returns {{destroy(): void}} object with destroy callback to destroy all waypoints
 */
function initSectionNavigation(navLinks) {
  const sectionWaypoints = initSectionWaypoints(
    (section, direction, bottomInView = false) => {
      if (section.id === "about" && !bottomInView) {
        toggleNav(direction);

        if (direction === Direction.UP) {
          selectLinksBySection(`#`, navLinks);

          return;
        }
      }

      if (
        (!bottomInView && direction === Direction.DOWN) ||
        (bottomInView && direction === Direction.UP)
      ) {
        selectLinksBySection(`#${section.id}`, navLinks);
      }
    }
  );

  return {
    destroy: () => {
      sectionWaypoints.destroy();
    }
  };
}

/**
 * initializes waypoint listeners to each section item
 * @param onSectionReached callback to be called once section is in viewport
 * @returns {{destroy: destroy}} object with destroy callback to destroy all waypoints
 */
function initSectionWaypoints(onSectionReached) {
  const sections = Array.from(document.querySelectorAll(".js--section"));

  const onSectionReachedInternal =
    typeof onSectionReached === "function" ? onSectionReached : () => {};

  const sectionWaypoints = sections.map(section => {
    return {
      topInView: new Waypoint({
        element: section,
        handler: direction => onSectionReachedInternal(section, direction),
        offset: "7%"
      }),
      bottomInView: new Waypoint({
        element: section,
        handler: direction =>
          onSectionReachedInternal(section, direction, true),
        offset: "bottom-in-view"
      })
    };
  });

  return {
    destroy: () => {
      sectionWaypoints.forEach(sectionWaypoint => {
        sectionWaypoint.topInView.destroy();
        sectionWaypoint.bottomInView.destroy();
      });
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
    case Direction.DOWN:
      nav.classList.add(navTopClass);
      replaceClass(navChevron, chevronDownClass, chevronUpClass);
      break;
    case Direction.UP:
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
