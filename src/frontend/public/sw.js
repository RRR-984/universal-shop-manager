// Universal Shop Manager — Service Worker
// Minimal cache-first strategy for static assets.
// A service worker MUST exist for browsers to show the PWA install prompt.

const CACHE_NAME = 'usm-cache-v1';

// Assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => {
        // Silently ignore pre-cache failures — not critical
      }),
    ),
  );
  // Skip waiting so the new SW activates immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Remove old caches when a new SW activates
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  // Take control of all clients immediately
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests — skip POST/PUT/etc.
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (e.g. Internet Computer API calls)
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Skip ICP canister calls (icp0.io, ic0.app)
  if (url.hostname.endsWith('icp0.io') || url.hostname.endsWith('ic0.app')) return;

  // Network-first for HTML (so SPA routing always gets fresh shell)
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r ?? fetch(request))),
    );
    return;
  }

  // Cache-first for static assets (JS, CSS, images, fonts)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Only cache successful responses for same-origin static assets
        if (
          response.ok &&
          (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|woff2?|ico)$/i))
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    }),
  );
});
