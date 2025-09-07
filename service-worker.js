// Service worker that deletes ALL site data for this website
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing - will delete all site data');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] DELETING ALL SITE DATA FOR THIS WEBSITE');
  
  event.waitUntil(
    Promise.all([
      // Delete ALL caches
      caches.keys().then((cacheNames) => {
        console.log('[ServiceWorker] Found caches:', cacheNames);
        return Promise.all(cacheNames.map(cacheName => {
          console.log('[ServiceWorker] Deleting cache:', cacheName);
          return caches.delete(cacheName);
        }));
      }),
      
      // Clear all storage for this origin
      new Promise((resolve) => {
        try {
          // Clear localStorage
          if (typeof localStorage !== 'undefined') {
            localStorage.clear();
            console.log('[ServiceWorker] localStorage cleared');
          }
        } catch (e) {
          console.log('[ServiceWorker] localStorage not available');
        }
        
        try {
          // Clear sessionStorage  
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.clear();
            console.log('[ServiceWorker] sessionStorage cleared');
          }
        } catch (e) {
          console.log('[ServiceWorker] sessionStorage not available');
        }
        
        resolve();
      }),
      
      // Delete all IndexedDB databases for this origin
      new Promise((resolve) => {
        try {
          if ('indexedDB' in self && indexedDB.databases) {
            indexedDB.databases().then((databases) => {
              const deletePromises = databases.map((db) => {
                console.log('[ServiceWorker] Deleting IndexedDB database:', db.name);
                return new Promise((resolveDelete) => {
                  const deleteReq = indexedDB.deleteDatabase(db.name);
                  deleteReq.onsuccess = () => resolveDelete();
                  deleteReq.onerror = () => resolveDelete();
                  deleteReq.onblocked = () => resolveDelete();
                });
              });
              return Promise.all(deletePromises);
            }).then(() => {
              console.log('[ServiceWorker] All IndexedDB databases deleted');
              resolve();
            }).catch(() => resolve());
          } else {
            resolve();
          }
        } catch (e) {
          console.log('[ServiceWorker] IndexedDB cleanup failed:', e);
          resolve();
        }
      }),
      
      // Clear storage quota for this origin
      new Promise((resolve) => {
        try {
          if ('navigator' in self && 'storage' in navigator) {
            if ('estimate' in navigator.storage) {
              navigator.storage.estimate().then((estimate) => {
                console.log('[ServiceWorker] Storage usage before cleanup:', estimate);
              }).catch(() => {});
            }
          }
        } catch (e) {}
        resolve();
      })
    ])
    .then(() => {
      console.log('[ServiceWorker] ALL SITE DATA DELETED');
      return self.clients.claim();
    })
    .then(() => {
      // Unregister ALL other service workers for this origin
      return self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          console.log('[ServiceWorker] Telling client to unregister all other service workers');
          client.postMessage({ 
            type: 'UNREGISTER_ALL_SERVICE_WORKERS',
            message: 'All site data deleted. Unregistering all service workers.' 
          });
        });
      });
    })
    .then(() => {
      // Self-destruct after a delay
      setTimeout(() => {
        console.log('[ServiceWorker] Self-destructing...');
        self.registration.unregister().then(() => {
          console.log('[ServiceWorker] Successfully unregistered self');
        });
      }, 5000);
    })
    .catch((error) => {
      console.error('[ServiceWorker] Error during data deletion:', error);
    })
  );
});

// Don't cache anything - always fetch fresh
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  
  console.log('[ServiceWorker] Fetching fresh (no caching):', event.request.url);
  
  event.respondWith(
    fetch(event.request, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  );
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FORCE_DATA_DELETE') {
    console.log('[ServiceWorker] Received force delete command');
    // Trigger the activate event logic again
    self.skipWaiting();
  }
});

console.log('[ServiceWorker] Data deletion service worker loaded');