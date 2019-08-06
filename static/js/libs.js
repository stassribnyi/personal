export const lozad = window.lozad;
export const Glide = window.Glide;
export const scrollama = window.scrollama;
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

export const SWEET_SCROLL_CONFIG_DEFAULT = {
  offset: 1,
  easing: "easeInOutSine"
};

export const MoveDirection = Object.freeze({
  UP: "up",
  DOWN: "down"
});

export const StepDirection = Object.freeze({
  ENTER: Symbol("enter"),
  EXIT: Symbol("exit")
});
