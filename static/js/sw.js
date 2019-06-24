const cacheName = "personal-cache";

const staticJs = ["index.js", "utilities.js"];

const projectImgs = getProjectImgs();

const careerImgs = [
  "altexsoft-labs.png",
  "altexsoft.png",
  "caspio.png",
  "innovecs.png",
  "krnu.png"
];

const staticImg = [
  "stassribnyi.jpg",
  ...careerImgs.map(file => `career/${file}`),
  ...projectImgs.map(file => `projects/${file}`)
];

const staticAssets = [
  ...staticJs.map(file => `js/${file}`),
  ...staticImg.map(file => `img/${file}`)
];

const staticFiles = [
  "index.html",
  "manifest.webmanifest",
  "favicon.ico",
  ...staticAssets.map(file => `static/${file}`)
];

self.addEventListener("install", async e => {
  const cache = await caches.open(cacheName);

  await cache.addAll(staticAssets);

  return self.skipWaiting();
});

function getProjectImgs() {
  const canvasPracticeImgs = [
    "canvas-practice_320.png",
    "canvas-practice_486.png",
    "canvas-practice_625.png",
    "canvas-practice_749.png",
    "canvas-practice_869.png",
    "canvas-practice_1024.png"
  ];

  const imageManagerImgs = [
    "image-manager_320.png",
    "image-manager_518.png",
    "image-manager_665.png",
    "image-manager_801.png",
    "image-manager_921.png",
    "image-manager_1024.png"
  ];

  const magicAppReduxImgs = [
    "magic-app-redux_320.png",
    "magic-app-redux_920.png",
    "magic-app-redux_1024.png"
  ];

  const todoListReduxImgs = [
    "todo-list-react_320.png",
    "todo-list-react_896.png",
    "todo-list-react_1024.png"
  ];

  return [
    ...canvasPracticeImgs,
    ...imageManagerImgs,
    ...magicAppReduxImgs,
    ...todoListReduxImgs
  ];
}
