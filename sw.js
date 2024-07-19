// sw.js
self.addEventListener('install', event => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated.');
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('/static/isUnderMaintenance.json')) {
        event.respondWith(
            fetch(event.request).then(response => {
                if (response.status === 200) {
                    return new Response(JSON.stringify({ maintenance: true }));
                }
                return new Response(JSON.stringify({ maintenance: false }));
            }).catch(() => {
                return new Response(JSON.stringify({ maintenance: false }));
            })
        );
    }
});
