import "waypoints/lib/noframework.waypoints.min.js";

import SweetScroll from "sweet-scroll";
import Glide, {
  Controls,
  Swipe,
  Autoplay
} from "@glidejs/glide/dist/glide.modular.esm";

document.addEventListener("DOMContentLoaded", () => initialize(), false);

function replaceClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

function scrollToAnchor(event, sweetScroll) {
  const currentElement = event.currentTarget;
  const replaceRegexp = /^\//;

  const samePathname =
    location.pathname.replace(replaceRegexp, "") ===
    currentElement.pathname.replace(replaceRegexp, "");

  if (!samePathname || location.hostname !== currentElement.hostname) {
    return;
  }

  const target = document.querySelector(currentElement.hash);

  if (!target) {
    return;
  }

  event.preventDefault();

  sweetScroll.toElement(target);

  setHash(currentElement.hash);
}

function setHash(hash) {
  history.pushState(null, null, hash);
}

function initialize() {
  const aboutSection = document.getElementById("about");
  const navigation = document.querySelector(".navigation");
  const navigationShowMoreIcon = document.querySelector(
    ".navigation__show-more"
  );
  const contactForm = document.getElementById("contacts-form");

  const { fontSize } = window.getComputedStyle(document.body);

  const headerOffset = fontSize === 20 ? 56 : 50;

  contactForm.addEventListener("submit", event => {
    const { target: form } = event;

    const formValues = {
      subject: form.subject,
      name: form.name,
      body: form.body
    };

    const mailParams = Object.keys(formValues)
      .map(param => `${param}=${formValues[param].value}`)
      .join("&");

    window.location.replace(`mailto:stas.sribnyi@gmail.com?${mailParams}`);

    event.preventDefault();
  });

  const glide = new Glide(".glide", {
    type: "carousel",
    autoplay: 15000,
    hoverpause: false,
    animationDuration: 1000,
    animationTimingFunc: "cubic-bezier(0.6, 0, 0.14, 1)",
    swipeThreshold: 60,
    dragThreshold: 60
  }).mount({
    Controls,
    Swipe,
    Autoplay
  });

  const aboutWaypoint = new Waypoint({
    element: aboutSection,
    handler: direction => {
      switch (direction) {
        case "down":
          navigation.classList.add("navigation--fixed");
          replaceClass(
            navigationShowMoreIcon,
            "ion-chevron-down",
            "ion-chevron-up"
          );
          break;
        case "up":
          navigation.classList.remove("navigation--fixed");
          replaceClass(
            navigationShowMoreIcon,
            "ion-chevron-up",
            "ion-chevron-down"
          );
          break;
        default:
          break;
      }
    },
    offset: headerOffset + 1
  });

  const scroller = new SweetScroll({
    // offset: -headerOffset + 1
  });

  const allLinks = document.querySelectorAll(
    'a[href*="#"]:not([href="#"]):not([href="#0"])'
  );

  const allSections = document.querySelectorAll(".section");

  allSections.forEach(
    section =>
      new Waypoint({
        element: section,
        handler: direction => {
          allLinks.forEach(link => {
            if (link.hash.replace("#", "") === section.id) {
              link.classList.add("navigation__link--selected");

              return;
            }

            link.classList.remove("navigation__link--selected");
          });
        },
        offset: headerOffset + 1
      })
  );

  allLinks.forEach(link =>
    link.addEventListener("click", event => scrollToAnchor(event, scroller))
  );

  navigationShowMoreIcon.addEventListener("click", () => {
    if (navigationShowMoreIcon.classList.contains("ion-chevron-up")) {
      scroller.toTop(0);
      setHash("#");

      return;
    }

    if (navigationShowMoreIcon.classList.contains("ion-chevron-down")) {
      scroller.toElement(aboutSection);
    }
  });
}
