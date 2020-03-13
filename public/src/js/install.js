var deferredPrompt;
//不觸發提示安裝視窗
window.addEventListener('beforeinstallprompt', function(event) {
    //觸發提示視窗的動作存起
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

function InstallModal() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        //檢查使用者安裝
        deferredPrompt.userChoice.then(function(choiceResult) {
            console.log(choiceResult.outcome);
            if (choiceResult.outcome == 'dismissed')
                console.log('使用者取消安裝');
            else
                console.log('使用者安裝');
        });
        deferredPrompt = null;
    }
}

function InstallAlarm() {
    if (confirm("確定要下載鬧鐘chrome插件嗎?")) {
        location.href = 'https://drive.google.com/file/d/107XQeF5XJRfkzXbJOky9iiiWqNXrZ_wc/view?usp=sharing';
    }
}