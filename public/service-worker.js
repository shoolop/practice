self.addEventListener('install', function(event) {
    console.log('安裝 Service Worker!', event);
});

self.addEventListener('activate', function(event) {
    console.log('觸發 Service Worker!', event);
    //更新用戶端的service
    return self.clients.claim();
});

//抓取頁面上資料
self.addEventListener('fetch', function(event) {
    console.log('抓資料!', event);
});