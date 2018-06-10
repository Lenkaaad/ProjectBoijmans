const filesToCache = [
  '/',
  '/index.html'
];

const staticCacheName = `agame-cache-v1`;

self.addEventListener(`install`, event => {
  console.log(`Attempting to install service worker and cache static assets`);
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache =>  cache.addAll(filesToCache))
  );
});


self.addEventListener(`fetch`, event => {

  const requestURL = new URL(event.request.url);

  if(/\.json$/.test(requestURL.pathname)){
    event.respondWith(
      caches
        .open(staticCacheName)
        .then(cache => {
          return fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => caches.match(event.request.url));
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(response => {
        if(response.status === 404){
          return caches.match(`pages/404.html`);
        }
        return caches.open(staticCacheName)
          .then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
      });
    }).catch(() => caches.match(`pages/offline.html`))
  );
});

self.addEventListener(`activate`, event => {
  console.log(`Activating new service worker...`);

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});