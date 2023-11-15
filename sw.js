const CACHE_NAME = "personal-cache-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(addToCache(CACHE_NAME, getFilesToCache()));
});

self.addEventListener("activate", event => {
  event.waitUntil(deleteCacheExcept(CACHE_NAME));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  if (url.origin !== self.location.origin || request.method !== "GET") {
    event.respondWith(fetch(request));

    return;
  }

  event.respondWith(networkAndCache(request));
});

/**
 * executes fetch first and falls back to cache in case of error
 * @param {*} request fetch request
 */
async function networkAndCache(request) {
  try {
    const response = await fetch(request);

    caches.open(CACHE_NAME).then(cache => cache.put(request, response));

    return response.clone();
  } catch {
    const cachedResponse = await caches.match(request);

    return cachedResponse || Promise.reject("no-match");
  }
}

/**
 * deletes all caches except specified one
 * @param {string} exceptName cache name to avoid
 */
async function deleteCacheExcept(exceptName) {
  const cacheNames = await caches.keys();

  const obsoleteNames = cacheNames.filter(name => name !== exceptName);

  await Promise.all(obsoleteNames.map(name => caches.delete(name)));

  return self.clients.claim();
}

/**
 * adds files to cache by specific name
 * @param {string} cacheName cache name key
 * @param {string[]} filesToCache array of file names to cache
 */
async function addToCache(cacheName, filesToCache) {
  const cache = await caches.open(cacheName);

  await cache.addAll(filesToCache);
}

/**
 * gets files requiring caching
 */
function getFilesToCache() {
  const staticJS = getStaticJS();
  const staticCSS = getStaticCSS();
  const staticImg = getStaticImg();

  const staticAssets = [
    ...addPrefixPath(staticJS, "js"),
    ...addPrefixPath(staticCSS, "css"),
    ...addPrefixPath(staticImg, "img")
  ];

  const manifestImg = getManifestImg();

  return [
    "index.html",
    "favicon.ico",
    "manifest.webmanifest",
    ...addPrefixPath(staticAssets, "static"),
    ...addPrefixPath(manifestImg, "images")
  ];
}

/**
 * CSS files and images used inside that files
 */
function getStaticCSS() {
  const componentNames = [
    "nav",
    "about",
    "career",
    "skills",
    "welcome",
    "projects",
    "contacts"
  ];

  const iconNames = [
    "at",
    "briefcase",
    "chevron-up",
    "chevron-down",
    "construct",
    "flash",
    "flask",
    "link",
    "logo-facebook",
    "logo-linkedin",
    "logo-github",
    "logo-instagram",
    "person"
  ];

  const icons = iconNames.map(file => `${file}.svg`);
  const components = componentNames.map(file => `${file}.css`);

  const queries = ["desktop", "tablet", "mobile", "small-mobile"];
  const cssImg = [
    "first-point.svg",
    "welcome.jpg",
    "welcome-min.jpg",
    ...addPrefixPath(icons, "ionicons")
  ];

  return [
    "base.css",
    "index.css",
    "ionicons.css",
    ...components,
    ...addPrefixPath(cssImg, "img"),
    ...queries.map(file => `${file}.query.css`)
  ];
}

/**
 * img which are used in img tags across index.html
 */
function getStaticImg() {
  const projectImg = getProjectImg();
  const profileImg = getProfileImg();

  const careerImg = [
    "altexsoft-labs.png",
    "altexsoft.png",
    "caspio.png",
    "innovecs.png",
    "krnu.png"
  ];

  const placeholders = [
    "placeholder-social.jpg",
    "placeholder-square.png",
    "placeholder-wide.png"
  ];

  return [
    ...placeholders,
    ...addPrefixPath(careerImg, "career"),
    ...addPrefixPath(projectImg, "projects"),
    ...addPrefixPath(profileImg, "profiles")
  ];
}

/**
 * gets js modules used across and app
 */
function getStaticJS() {
  return [
    "app.js",
    "index.js",
    "libs.js",
    "utilities.js",
    "registerServiceWorker.js"
  ];
}

/**
 * gets profile img used in about and recommendation sections
 */
function getProfileImg() {
  return [
    "antonvasko.jpg",
    "stassribnyi.jpg",
    "zakirnuriev.jpg",
    "nickolaysredin.jpg",
    "beatadobosiewicz.jpg",
    "vitaliygordiyenko.jpg"
  ];
}

/**
 * img used in projects section
 */
function getProjectImg() {
  const canvasPracticeImg = [
    "canvas-practice_320.png",
    "canvas-practice_486.png",
    "canvas-practice_625.png",
    "canvas-practice_749.png",
    "canvas-practice_869.png",
    "canvas-practice_1024.png"
  ];

  const imageManagerImg = [
    "image-manager_320.png",
    "image-manager_518.png",
    "image-manager_665.png",
    "image-manager_801.png",
    "image-manager_921.png",
    "image-manager_1024.png"
  ];

  const ambientImg = [
    "ambient_1280.jpg"
  ];

  const todoListReduxImg = [
    "todo-list-react_320.png",
    "todo-list-react_896.png",
    "todo-list-react_1024.png"
  ];

  return [
    ...canvasPracticeImg,
    ...imageManagerImg,
    ...ambientImg,
    ...todoListReduxImg
  ];
}

/**
 * img used rather in manifest.webmanifest or in header of index.html
 */
function getManifestImg() {
  return [
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "apple-touch-icon.png",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "safari-pinned-tab.svg"
  ];
}

/**
 * Adds a prefix path to each files
 * @param {string[]} files to add prefix to
 * @param {string} prefix which will be added to each file
 */
function addPrefixPath(files, prefix) {
  return files.map(file => `${prefix}/${file}`);
}
