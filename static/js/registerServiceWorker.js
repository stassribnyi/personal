export async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
    } catch {
      console.warn("Failed to register Service Worker");
    }
  }
}