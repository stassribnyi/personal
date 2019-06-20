export function replaceClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

export function setHash(hash) {
  history.pushState(null, null, hash);
}

export function canNavigateInsidePage(element) {
  const replaceRegexp = /^\//;

  const samePathname =
    location.pathname.replace(replaceRegexp, "") ===
    element.pathname.replace(replaceRegexp, "");

  const sameHostname = location.hostname === element.hostname;

  return samePathname & sameHostname;
}

export function scrollToAnchor(anchor, scroller, setAnchorAsHash = true) {
  const anchorElement =
    anchor !== "#" ? document.querySelector(anchor) : document.body;

  if (!anchorElement) {
    return;
  }

  scroller.toElement(anchorElement);

  if (setAnchorAsHash) {
    setHash(anchor);
  }
}

export function openEmailClient(mailto, formValues) {
  const mailParams = Object.keys(formValues)
    .map(param => `${param}=${formValues[param].value}`)
    .join("&");

  window.location.replace(`mailto:${mailto}?${mailParams}`);
}
