export const lozad = window.lozad;
export const Glide = window.Glide;
export const Waypoint = window.Waypoint;
export const SweetScroll = window.SweetScroll;

export const GLIDE_CONFIG_DEFAULT = {
  autoplay: 15000,
  type: "carousel",
  dragThreshold: 60,
  hoverpause: false,
  swipeThreshold: 60,
  animationDuration: 1000,
  animationTimingFunc: "cubic-bezier(0.6, 0, 0.14, 1)"
};

export const SWEET_SCROLL_CONFIG_DEFAULT ={
  offset: 1,
  duration: 3500,
  easing: "easeOutQuint"
};

export const Direction = Object.freeze({
  UP: "up",
  DOWN: "down"
});
