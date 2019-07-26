// let cacheName = "personal-cache";
// const cacheWhitelist = [cacheName];
//
// const filesToCache = getFilesToCache();
//
// self.addEventListener("install", async event => {
//   await addToCache(cacheName, filesToCache);
//
//   return self.skipWaiting();
// });
//
// self.addEventListener("activate", event => {
//   return self.clients.claim();
//
//   // const cacheNames = await caches.keys();
//
//   // await cacheNames.forEach(async name => {
//   //   if (cacheWhitelist.indexOf(name) === -1) {
//   //     await caches.delete(name);
//   //   }
//   // });
//
//   // cacheName = "personal-cache-v1";
//
//   // // await addToCache(cacheName, filesToCache);
//
//   // return self.skipWaiting();
// });
//
// self.addEventListener("fetch", async event => {
//   const request = event.request;
//   const url = new URL(request.url);
//
//   if (url.origin === location.origin) {
//     event.respondWith(cacheFirst(request));
//   } else {
//     event.respondWith(networkAndCache(request));
//   }
// });
//
// async function cacheFirst(request) {
//   const cache = await caches.open(cacheName);
//   const cached = await cache.match(request);
//
//   return cached || fetch(request);
// }
//
// async function networkAndCache(request) {
//   const cache = await caches.open(cacheName);
//
//   try {
//     const fresh = await fetch(request);
//     await cache.put(request, fresh.clone());
//
//     return fresh;
//   } catch (error) {
//     return await cache.match(request);
//   }
// }
//
// async function addToCache(cacheName, filesToCache) {
//   const cache = await caches.open(cacheName);
//
//   await cache.addAll(filesToCache);
// }
//
// /**
//  * Files to be cached with service worker
//  */
// function getFilesToCache() {
//   const staticJS = ["index.js", "utilities.js"];
//   const staticCSS = getStaticCSS();
//   const staticImg = getStaticImg();
//
//   const staticAssets = [
//     ...addPrefixPath(staticJS, "js"),
//     ...addPrefixPath(staticCSS, "css"),
//     ...addPrefixPath(staticImg, "img")
//   ];
//
//   const manifestImg = getManifestImg();
//
//   return [
//     "index.html",
//     "manifest.webmanifest",
//     "favicon.ico",
//     ...addPrefixPath(staticAssets, "static"),
//     ...addPrefixPath(manifestImg, "images")
//   ];
// }
//
// /**
//  * CSS files and images used inside that files
//  */
// function getStaticCSS() {
//   const componentNames = [
//     "nav",
//     "about",
//     "career",
//     "skills",
//     "welcome",
//     "projects",
//     "contacts"
//   ];
//
//   const iconNames = [
//     "at",
//     "briefcase",
//     "chevron-up",
//     "chevron-down",
//     "construct",
//     "flash",
//     "flask",
//     "link",
//     "logo-facebook",
//     "logo-linkedin",
//     "logo-github",
//     "logo-instagram",
//     "person"
//   ];
//
//   const icons = iconNames.map(file => `${file}.svg`);
//   const components = componentNames.map(file => `${file}.css`);
//
//   const queries = ["desktop", "tablet", "mobile", "small-mobile"];
//   const cssImg = [
//     "first-point.svg",
//     "welcome.jpg",
//     "welcome-min.jpg",
//     ...addPrefixPath(icons, "ionicons")
//   ];
//
//   return [
//     "base.css",
//     "index.css",
//     "ionicons.css",
//     ...components,
//     ...addPrefixPath(cssImg, "img"),
//     ...queries.map(file => `${file}.query.css`)
//   ];
// }
//
// /**
//  * Images which are used in img tags across index.html
//  */
// function getStaticImg() {
//   const projectImg = getProjectImg();
//
//   const careerImg = [
//     "altexsoft-labs.png",
//     "altexsoft.png",
//     "caspio.png",
//     "innovecs.png",
//     "krnu.png"
//   ];
//
//   const placeholders = [
//     "placeholder-social.jpg",
//     "placeholder-square.png",
//     "placeholder-wide.png"
//   ];
//
//   return [
//     "stassribnyi.jpg",
//     ...placeholders,
//     ...addPrefixPath(careerImg, "career"),
//     ...addPrefixPath(projectImg, "projects")
//   ];
// }
//
// /**
//  * Images used in projects section
//  */
// function getProjectImg() {
//   const canvasPracticeImg = [
//     "canvas-practice_320.png",
//     "canvas-practice_486.png",
//     "canvas-practice_625.png",
//     "canvas-practice_749.png",
//     "canvas-practice_869.png",
//     "canvas-practice_1024.png"
//   ];
//
//   const imageManagerImg = [
//     "image-manager_320.png",
//     "image-manager_518.png",
//     "image-manager_665.png",
//     "image-manager_801.png",
//     "image-manager_921.png",
//     "image-manager_1024.png"
//   ];
//
//   const magicAppReduxImg = [
//     "magic-app-redux_320.png",
//     "magic-app-redux_920.png",
//     "magic-app-redux_1024.png"
//   ];
//
//   const todoListReduxImg = [
//     "todo-list-react_320.png",
//     "todo-list-react_896.png",
//     "todo-list-react_1024.png"
//   ];
//
//   return [
//     ...canvasPracticeImg,
//     ...imageManagerImg,
//     ...magicAppReduxImg,
//     ...todoListReduxImg
//   ];
// }
//
// /**
//  * Images used rather in manifest.webmanifest or in header of index.html
//  */
// function getManifestImg() {
//   return [
//     "android-chrome-192x192.png",
//     "android-chrome-512x512.png",
//     "apple-touch-icon.png",
//     "favicon-16x16.png",
//     "favicon-32x32.png",
//     "safari-pinned-tab.svg"
//   ];
// }
//
// /**
//  * Adds a prefix path to each file
//  * @param {array} files to add prefix to
//  * @param {string} prefix which will be added to each file
//  */
// function addPrefixPath(files, prefix) {
//   return files.map(file => `${prefix}/${file}`);
// }
