import alt from 'alt-client';
let state = true;
let cef = new alt.WebView("http://resource/client/html/playerList/html/index.html");
let pageOpen = false;
let interval;
alt.on('keydown', (key)=>{
    if (key === 113) {
        if (state) {
            state = false;
            if (pageOpen) {
                cef.emit('Close');
                pageOpen = false;
                alt.toggleGameControls(true);
                alt.showCursor(false);
                cef.unfocus();
                stop();
            } else {
                alt.emitServer('WantPlayerMenu');
                pageOpen = true;
                alt.toggleGameControls(false);
                alt.showCursor(true);
                start();
            }
            alt.setTimeout(()=>{
                state = true;
            }, 500);
        }
    }
});
alt.onServer('ShowPMenu', (obj, record, admin, helper, lspd, lsmd, news, avukat, taxi)=>{
    cef.focus();
    let data = JSON.parse(obj);
    cef.emit('playerlistshow', data, record, admin, helper, lspd, lsmd, news, avukat, taxi);
});
function start() {
    if (!interval) {
        interval = alt.setInterval(()=>{
            if (!pageOpen) stop();
            alt.emitServer('WantPlayerMenu');
        }, 20000);
    }
}
function stop() {
    if (interval) {
        alt.clearInterval(interval);
        interval = null;
    }
}
