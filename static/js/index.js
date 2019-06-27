import {
  setHash,
  replaceClass,
  scrollToAnchor,
  openEmailClient,
  canNavigateInsidePage
} from "./utilities.js";

import { registerSW } from "./registerServiceWorker.js";

const glideConfig = {
  autoplay: 15000,
  type: "carousel",
  dragThreshold: 60,
  hoverpause: false,
  swipeThreshold: 60,
  animationDuration: 1000,
  animationTimingFunc: "cubic-bezier(0.6, 0, 0.14, 1)"
};

const Glide = window.Glide;
const SweetScroll = window.SweetScroll;

let app = null;

document.addEventListener("DOMContentLoaded", () => (app = new Application()));

window.onunload = () => app && app.destroy();

function Application() {
  const img = document.querySelectorAll(".lozad");
  img.forEach(img => img.classList.remove("lozad-hidden"));

  const observer = lozad(img);

  observer.observe();

  const nav = document.querySelector(".nav");
  const navChevron = document.querySelector(".nav__chevron");
  const contactForm = document.getElementById("contacts-form");

  const projectItems = Array.from(
    document.querySelectorAll(".js--projects__item")
  );
  const btnLinks = Array.from(document.querySelectorAll(".js--btn-link"));
  const navLinks = Array.from(document.querySelectorAll(".js--nav-link"));
  const sections = Array.from(document.querySelectorAll(".js--section"));

  const scroller = new SweetScroll({ offset: 1 });
  const glide = new Glide(".glide", glideConfig).mount();

  const sectionWaypoints = sections.map(section => {
    return {
      topInView: new Waypoint({
        element: section,
        handler: direction => {
          if (section.id === "about") {
            toggleNav(nav, direction);
          }

          if (direction !== "down") {
            return;
          }

          selectLinksBySection(`#${section.id}`, navLinks);
        }
      }),
      bottomInView: new Waypoint({
        element: section,
        handler: direction => {
          if (direction !== "up") {
            return;
          }

          selectLinksBySection(`#${section.id}`, navLinks);
        },
        offset: "bottom-in-view"
      })
    };
  });

  const touchstartStub = () => {};
  const linkClickToScroll = event => navLinkClickHandler(event, scroller);
  const chevronClickToScroll = event => navChevronClickHandler(event, scroller);

  navChevron.addEventListener("click", chevronClickToScroll);
  contactForm.addEventListener("submit", handleContactFormSubmission);

  [...navLinks, ...btnLinks].forEach(link =>
    link.addEventListener("click", linkClickToScroll)
  );

  projectItems.forEach(item =>
    item.addEventListener("touchstart", touchstartStub, { passive: true })
  );

  registerSW();

  return {
    destroy: () => {
      projectItems.forEach(item =>
        item.removeEventListener("touchstart", touchstartStub)
      );

      navChevron.removeEventListener("click", chevronClickToScroll);
      contactForm.removeEventListener("submit", handleContactFormSubmission);

      [...navLinks, ...btnLinks].forEach(link =>
        link.removeEventListener("click", linkClickToScroll)
      );

      sectionWaypoints.forEach(sectionWaypoint => {
        sectionWaypoint.topInView.destroy();
        sectionWaypoint.bottomInView.destroy();
      });

      glide.destroy();
    }
  };
}

function handleContactFormSubmission(event) {
  const { target: form } = event;

  openEmailClient("stas.sribnyi@gmail.com", {
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

function toggleNav(nav, direction) {
  const navChevron = nav.querySelector(".nav__chevron");

  switch (direction) {
    case "down":
      nav.classList.add("nav--top");
      replaceClass(navChevron, "ion-chevron-down", "ion-chevron-up");
      break;
    case "up":
      nav.classList.remove("nav--top");
      replaceClass(navChevron, "ion-chevron-up", "ion-chevron-down");
      break;
    default:
      break;
  }
}

function selectLinksBySection(sectionLinkHash, navLinks) {
  const sectionLinks = navLinks.filter(link => link.hash === sectionLinkHash);

  if (!sectionLinks.length) {
    return;
  }

  const selectedLinks = navLinks.filter(link => link.hash === location.hash);

  if (selectedLinks.length) {
    selectedLinks.forEach(item => item.classList.remove("nav__link--selected"));
  }

  sectionLinks.forEach(item => item.classList.add("nav__link--selected"));

  setHash(sectionLinkHash);
}
