const BUILD='1793603156',CACHE='tehobu-'+BUILD,CORE=['./','index.html','offline.html','manifest.webmanifest','config.js','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','icons/apple-touch-icon.png','icons/favicon-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('tehobu-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(CACHE).then(k=>k.put('index.html',c));return x}).catch(()=>caches.match('index.html').then(m=>m||caches.match('offline.html'))));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(CACHE).then(k=>k.put(r,c))}return x}).catch(()=>caches.match('offline.html'))))});
