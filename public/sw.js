const CACHE_VERSION = 'yanapakuy-v1';
const CACHE_NAME = `${CACHE_VERSION}-cache`;
const ASSETS_CACHE = `${CACHE_VERSION}-assets`;

// Archivos que siempre deben estar en caché
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching essential files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== ASSETS_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia de fetch: Network first, cache fallback
self.addEventListener('fetch', event => {
  const { request } = event;

  // Ignorar requests no-GET
  if (request.method !== 'GET') {
    return;
  }

  // Para documentos HTML: network first
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Guardar en caché si es exitoso
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback a caché o página offline
          return caches.match(request)
            .then(cachedResponse => cachedResponse || caches.match('/index.html'));
        })
    );
    return;
  }

  // Para otros assets: cache first
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request)
          .then(response => {
            // Guardar en caché si es válido
            if (response.ok) {
              const clone = response.clone();
              caches.open(ASSETS_CACHE).then(cache => {
                cache.put(request, clone);
              });
            }
            return response;
          })
          .catch(error => {
            console.error('[SW] Fetch failed:', error);
            // Fallback: intentar caché o devolver error
            return caches.match(request);
          });
      })
  );
});

// Sincronización de background (opcional, para futuras mejoras)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-emergencies') {
    event.waitUntil(
      // Lógica de sincronización aquí
      Promise.resolve()
    );
  }
});
