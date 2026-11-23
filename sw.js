const CACHE="missiebord-1795455342";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png"];
const FIG=["um_bolter","um_ac","um_ml","um_pg","um_commander_axe","um_commander_glove","um_commander_hb","ba_bolter","ba_ac","ba_ml","ba_pg","ba_commander_axe","ba_commander_glove","ba_commander_hb","if_bolter","if_ac","if_ml","if_pg","if_commander_axe","if_commander_glove","if_commander_hb","ork","gretchin","android","csm","csm_heavy","chaos_commander","dreadnought","dreadnought_pg_ac","dreadnought_pg_ml","dreadnought_ml_ac","genestealer"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).then(()=>Promise.all(FIG.map(n=>c.add("figuren/"+n+".png").catch(()=>0))))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))));
});
