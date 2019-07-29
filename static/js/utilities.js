export function replaceClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

export function getDiffInYears(first, second) {
  const firstDate = new Date(first).getTime();
  const secondDate = new Date(second).getTime();

  const diffMs = (secondDate - firstDate) / (1000 * 60 * 60 * 24);

  return diffMs / 365.25;
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

export function scrollToAnchor(
  anchor,
  scroller,
  offset = 0,
  setAnchorAsHash = true
) {
  const anchorElement =
    anchor !== "#" ? document.querySelector(anchor) : document.body;

  if (!anchorElement) {
    return;
  }

  scroller.toElement(anchorElement, { offset });

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
