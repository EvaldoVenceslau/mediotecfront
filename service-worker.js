const CACHE_NAME = 'mediotec-cache-v1';
const urlsToCache = [
    '/',
    '/login/index.html',
    '/login/style.cssstyles.css',
    '/login/script.jsscript.js',
    '/img/icons/icon-192.png',
    '/img/icons/icon-512.png',
];

// Instalação do Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.error('Falha ao adicionar arquivos ao cache', error);
            })
    );
});

// Ativação do Service Worker e remoção de caches antigos
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Cache antigo removido:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar as requisições e buscar no cache ou na rede
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;  // Retorna do cache
                }
                return fetch(event.request)  // Busca na rede se não estiver no cache
                    .then(function(networkResponse) {
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                            // Clona a resposta para salvar no cache
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(function(cache) {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return networkResponse;
                    });
            }).catch(function() {
                // Pode adicionar um fallback aqui se a resposta falhar (offline)
                return caches.match('/fallback.html');
            })
    );
});
