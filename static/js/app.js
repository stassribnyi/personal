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

export function Application() {
  initLozad();
  initDates();

  const scroller = new SweetScroll(SWEET_SCROLL_CONFIG_DEFAULT);
  const glide = new Glide(".glide", GLIDE_CONFIG_DEFAULT).mount();

  const projects = initProjectItems();
  const contactForm = initContactForm();
  const allLinks = initAllLinks(scroller);
  const navChevron = initNavChevron(scroller);
  const sectionNavigation = initSectionNavigation(allLinks.navLinks);

  const reloadOnOrientationChange = () => window.location.reload();

  window.addEventListener("orientationchange", reloadOnOrientationChange);

  registerSW()
    .then(() => console.info('The service worker successfully registered'))
    .catch(() => console.warn('Unable to register service worker'));

  return {
    destroy: () => {
      glide.destroy();

      allLinks.destroy();
      projects.destroy();
      navChevron.destroy();
      contactForm.destroy();
      sectionNavigation.destroy();

      window.removeEventListener("orientationchange", reloadOnOrientationChange);
    }
  };
}

/**
 * App components
 */

function initLozad() {
  const img = document.querySelectorAll(".lozad");
  img.forEach(img => img.classList.remove("lozad-hidden"));

  const observer = lozad(img);

  observer.observe();
}

function initDates() {
  const age = document.getElementById("js--age");
  const career = document.getElementById("js--career-start");

  const ageYears = getDiffInYears(new Date(BIRTH_DATE), new Date());
  const careerYears = getDiffInYears(new Date(CAREER_START), new Date());

  age.innerText = Math.abs(Math.floor(ageYears));
  career.innerText = Math.abs(Math.round(careerYears));
}

function initNavChevron(scroller) {
  const navChevron = document.querySelector(".nav__chevron");
  const chevronClickToScroll = event => navChevronClickHandler(event, scroller);

  navChevron.addEventListener("click", chevronClickToScroll);

  return {
    destroy: () => {
      navChevron.removeEventListener("click", chevronClickToScroll);
    }
  }
}

function initContactForm() {
  const contactForm = document.getElementById("contacts-form");

  contactForm.addEventListener("submit", handleContactFormSubmission);

  return {
    destroy: () => {
      contactForm.removeEventListener("submit", handleContactFormSubmission);
    }
  }
}

function initProjectItems() {
  const projects = Array.from(
    document.querySelectorAll(".js--projects__item")
  );

  const touchstartStub = () => {};

  projects.forEach(item =>
    item.addEventListener("touchstart", touchstartStub, { passive: true })
  );

  return {
    destroy: () => {
      projects.forEach(item =>
        item.removeEventListener("touchstart", touchstartStub)
      );
    }
  }
}

function initAllLinks(scroller) {
  const btnLinks = Array.from(document.querySelectorAll(".js--btn-link"));
  const navLinks = Array.from(document.querySelectorAll(".js--nav-link"));

  const allLinks = [...navLinks, ...btnLinks];

  const linkClickToScroll = event => navLinkClickHandler(event, scroller);

  allLinks.forEach(link =>
    link.addEventListener("click", linkClickToScroll)
  );

  return {
    btnLinks,
    navLinks,
    destroy: () => {
      allLinks.forEach(link =>
        link.removeEventListener("click", linkClickToScroll)
      );
    }
  }
}

function initSectionWaypoints(onSectionReached) {
  const sections = Array.from(document.querySelectorAll(".js--section"));

  const onSectionReachedInternal = typeof onSectionReached === 'function'
    ? onSectionReached
    : () => {};

  const sectionWaypoints = sections.map(section => {
    return {
      topInView: new Waypoint({
        element: section,
        handler: direction => onSectionReachedInternal(section, direction)
      }),
      bottomInView: new Waypoint({
        element: section,
        handler: direction => onSectionReachedInternal(section, direction, true),
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
  }
}

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
        !bottomInView && direction === Direction.DOWN
        || bottomInView && direction === Direction.UP
      ) {
        selectLinksBySection(`#${section.id}`, navLinks);
      }
    }
  );

  return {
    destroy: () => {
      sectionWaypoints.destroy();
    }
  }
}

/**
 * Event handlers
 */

function handleContactFormSubmission(event) {
  const { target: form } = event;

  openEmailClient(EMAIL_ADDRESS, {
    subject: form.subject,
    name: form.name,
    body: form.body
  });

  event.preventDefault();
}

function navChevronClickHandler(event, scroller) {
  const { classList } = event.currentTarget;

  const anchor = classList.contains("ion-chevron-down")
    ? "#about"
    : classList.contains("ion-chevron-up")
      ? "#"
      : null;

  scrollToAnchor(anchor, scroller);

  event.preventDefault();
}

function navLinkClickHandler(event, scroller) {
  const currentElement = event.currentTarget;

  if (!canNavigateInsidePage(currentElement)) {
    return;
  }

  scrollToAnchor(currentElement.hash, scroller, false);

  event.preventDefault();
}

function toggleNav(direction) {
  const nav = document.querySelector(".nav");
  const navChevron = document.querySelector(".nav__chevron");

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
