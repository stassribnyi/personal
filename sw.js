const CACHE_KEY = "personal-cache-v1";
const FILES = getFilesToCache();

self.addEventListener("install", event => {
  event.waitUntil(addToCache(CACHE_KEY, FILES).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheKeys => cacheKeys.filter(name => name !== CACHE_KEY))
      .then(oldKeys => Promise.all(oldKeys.map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkAndCache(request));
  }
});

/**
 * returns cached value, if none exists executes fetch
 * @param {*} request fetch request
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_KEY);
  const cached = await cache.match(request);
  try {
    return cached || fetch(request);
  } catch (error) {
    console.log(error);

    throw error;
  }
}

/**
 * executes fetch first and falls back to cache in case of error
 * @param {*} request fetch request
 */
async function networkAndCache(request) {
  const cache = await caches.open(CACHE_KEY);

  try {
    const fresh = await fetch(request);
    await cache.put(request, fresh.clone());

    return fresh;
  } catch (error) {
    return await cache.match(request);
  }
}

/**
 * adds files to cache by specific name
 * @param {string} cacheName cache name key
 * @param {array} filesToCache array of file names to cache
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
    "manifest.webmanifest",
    "favicon.ico",
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
    "stassribnyi.jpg",
    ...placeholders,
    ...addPrefixPath(careerImg, "career"),
    ...addPrefixPath(projectImg, "projects")
  ];
}

/**
 * gets js modules used across and app
 */
function getStaticJS() {
  return ["app.js", "index.js", "libs.js", "utilities.js"];
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

  const magicAppReduxImg = [
    "magic-app-redux_320.png",
    "magic-app-redux_920.png",
    "magic-app-redux_1024.png"
  ];

  const todoListReduxImg = [
    "todo-list-react_320.png",
    "todo-list-react_896.png",
    "todo-list-react_1024.png"
  ];

  return [
    ...canvasPracticeImg,
    ...imageManagerImg,
    ...magicAppReduxImg,
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
 * Adds a prefix path to each file
 * @param {array} files to add prefix to
 * @param {string} prefix which will be added to each file
 */
function addPrefixPath(files, prefix) {
  return files.map(file => `${prefix}/${file}`);
}
