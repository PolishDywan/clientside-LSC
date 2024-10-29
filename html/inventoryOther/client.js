import alt from 'alt-client';
let webView = null;
var Items = null;
alt.onServer('otherEnv:Show', ShowInv);
let canUse = true;
let lastUsage = Date.now();
function ShowInv(type, obj) {
    webView = new alt.WebView("http://resource/client/html/inventoryOther/index.html");
    Items = obj;
    webView.on('load', ()=>{
        alt.showCursor(true);
        alt.toggleGameControls(false);
        webView.emit('otherEnv:LoadItems', type, obj);
        webView.focus();
    });
    webView.on('otherEnv:Take', (type, id)=>{
        if (canUse && lastUsage < Date.now()) {
            canUse = false;
            lastUsage = Date.now() + 1000;
            alt.emitServer("NativeLSC:sendCallBack", "otherInv:WantToTake", [
                type,
                id
            ]);
        } else {
            return;
        }
    });
    alt.onServer('otherEnv:Reload', (type, obj)=>{
        canUse = true;
        webView.emit('otherEnv:LoadItems', type, obj);
    });
    alt.on('keyup', (key)=>{
        if (key === 8) {
            if (webView !== null) {
                webView.destroy();
                webView = null;
                alt.showCursor(false);
                alt.toggleGameControls(true);
            }
        }
    });
    webView.on('cls', closedbutton);
}
function closedbutton() {
    if (webView !== null) {
        webView.destroy();
        webView = null;
        alt.showCursor(false);
        alt.toggleGameControls(true);
    }
}
