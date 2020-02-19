var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

function InstallModal() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
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