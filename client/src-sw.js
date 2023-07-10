const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);


// The CacheFirst strategy will fetch resources from the cache first and only go to the network if the resource is not already in the cache.
const pageCache = new CacheFirst({  
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});


// The warmStrategyCache method preloads certain URLs with a specific caching strategy, here, the 'page-cache' set up above.
warmStrategyCache({  
  urls: ['/index.html', '/'],
  strategy: pageCache,
});


//when a navigation request is made (a page load, not fetches made from the page), it will use the 'page-cache' caching strategy.
registerRoute(({ request }) => request.mode === 'navigate', pageCache); 



//  Implement asset caching


registerRoute(
  //These lines of code  set up caching for specific types of resources - stylesheets, scripts, and web workers. They use the 'Stale While Revalidate' strategy, which means that it will return cached data if available, otherwise it will fetch from the network.
({request}) => ['style','script','worker'].includes(request.destination),
new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      stautus: [0,200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,// 30 days
    }),
  ],
})

);






