
//Declare scope for ServiceWorker
const currentCache = 'restaurantsCache1';

//initiate ServiceWorker and caching of current version
self.addEventListener('install', event => {
    //scope for ServiceWorker -> all http files which should be cached
    const urlsToCache = [
        './',
        './index.html',
        './restaurant.html',
        './css/styles.css',
        './js/main.js',
        './js/restaurant_info.js',
        './js/dbhelper.js',        
        './restaurant.html?id=1',
        './restaurant.html?id=2',
        './restaurant.html?id=3',
        './restaurant.html?id=4',
        './restaurant.html?id=5',
        './restaurant.html?id=6',
        './restaurant.html?id=7',
        './restaurant.html?id=8',
        './restaurant.html?id=9',
        './restaurant.html?id=10',
        './data/restaurants.json',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
        './sw.js',
        ];
    event.waitUntil(
        caches.open(currentCache).then(cache => cache.addAll(urlsToCache)).catch(error => {
            console.log(error);
        })
    );
    
});


//route ServiceWorker to the cached version
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request);
                })
    );
});



//make ServiceWorker delete the older cached version and to shift to the new cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.filter(cacheName => cacheName !== currentCache).map(cacheName => caches.delete(cacheName))
       ))
    );
});



