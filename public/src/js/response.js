//瀏覽器是否支援serviceworker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        //將js註冊進去
        navigator.serviceWorker.register('service-worker.js').then(function() {
            console.log('Service Worker 註冊成功');
        }).catch(function(error) {
            console.log('錯誤:', error);
        });
    });
} else {
    console.log('瀏覽器不支援');
}