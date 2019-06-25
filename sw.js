const cacheName = "personal-cache";

const filesToCache = getFilesToCache();

// self.addEventListener("install", async e => {
//   const cache = await caches.open(cacheName);

//   await cache.addAll(filesToCache);

//   return self.skipWaiting();
// });

// self.addEventListener("activate", e => {
//   self.clients.claims();
// });

// self.addEventListener("fetch", async e => {
//   const req = e.request;
//   const url = new URL(req.url);

//   if (url.origin === location.origin) {
//     e.respondWith(cacheFirst(req));
//   } else {
//     e.respondWith(networkAndCache(req));
//   }
// });

// async function cacheFirst(req) {
//   const cache = await caches.open(cacheName);
//   const cached = await cache.match(req);

//   return cached || fetch(req);
// }

// async function networkAndCache(req) {
//   const cache = await caches.open(cacheName);

//   try {
//     const fresh = await fetch(req);
//     await cache.put(req, fresh.clone());

//     return fresh;
//   } catch (error) {
//     return await cache.match(req);
//   }
// }

/**
 * Files to be cached with service worker
 */
function getFilesToCache() {
  const staticJS = ["index.js", "utilities.js"];
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
  const cssImg = ["first-point.svg", "welcome.jpg"];

  const componentNames = [
    "nav",
    "about",
    "career",
    "skills",
    "welcome",
    "projects",
    "contacts"
  ];

  const components = [
    ...componentNames.map(name => `${name}/${name}.css`),
    ...componentNames.map(name => `${name}/${name}.query.css`)
  ];

  return [
    "base.css",
    "custom.css",
    "custom.query.css",
    "ionicons.substitute.css",
    ...components,
    ...addPrefixPath(cssImg, "img")
  ];
}

/**
 * Images which are used in img tags across index.html
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

  return [
    "stassribnyi.jpg",
    ...addPrefixPath(careerImg, "career"),
    ...addPrefixPath(projectImg, "projects")
  ];
}

/**
 * Images used in projects section
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
 * Images used rather in manifest.webmanifest or in header of index.html
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
