import "waypoints/lib/noframework.waypoints.min.js";

import SweetScroll from "sweet-scroll";

document.addEventListener("DOMContentLoaded", () => initialize(), false);

function replaceClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

function scrollToAnchor(event, sweetScroll) {
  const currentElement = event.target;
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

  const headerOffset = 56;

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
    offset: -headerOffset
  });

  document
    .querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"])')
    .forEach(element =>
      element.addEventListener("click", event => {
        scrollToAnchor(event, scroller);
      })
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
