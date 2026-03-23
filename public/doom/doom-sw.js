// Service Worker para assets de DOOM.
// Scope: /doom/ únicamente — NO intercepta nada fuera de esa ruta.
// Así otros proyectos en localhost:3000 no se ven afectados.
// @ts-nocheck
// Generated/runtime file — excluded from ESLint (see eslint.config.mjs globalIgnores).

const CACHE_NAME = "doom-assets-v1";

self.addEventListener("install", () => {
  globalThis.skipWaiting();
});

// Al activarse limpia cachés viejas y toma el control de los clientes actuales.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => globalThis.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Sólo procesamos assets pesados con URL estable (sin query string).
  // .data (~28 MB) y .wasm (~1.2 MB) son los únicos que justifican cache en SW.
  // doom.js usa ?v=timestamp → el browser los trata como distintos; no los cacheamos acá.
  const isHeavyAsset =
    url.pathname.startsWith("/doom/") &&
    (url.pathname.endsWith(".data") || url.pathname.endsWith(".wasm")) &&
    url.search === "";

  if (!isHeavyAsset) {
    return;
  }

  // Estrategia Cache-first: sirve instantáneo desde cache, rellena en primer acceso.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(event.request).then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    )
  );
});
