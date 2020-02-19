if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function() {
            console.log('Service Worker 註冊成功');
        }).catch(function(error) {
            console.log('Service worker 註冊失敗:', error);
        });
    });
} else {
    console.log('瀏覽器不支援');
}