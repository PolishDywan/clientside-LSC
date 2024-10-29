import alt from 'alt-client';
let webView = null;
var Items = null;
let lastUsage = Date.now();
alt.onServer('Market:Show', ShowMarket);
let canUse = true;
function ShowMarket(obj) {
    canUse = true;
    webView = new alt.WebView("http://resource/client/html/market/index.html");
    Items = obj;
    webView.on('load', ()=>{
        alt.showCursor(true);
        alt.toggleGameControls(false);
        webView.emit('Market:LoadItems', obj);
        webView.focus();
    });
    webView.on('Market:WantBuy', (ID)=>{
        if (canUse && lastUsage < Date.now()) {
            canUse = false;
            lastUsage = Date.now() + 1000;
            alt.emitServer('Market:WantBuy', ID);
        }
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
}
alt.onServer('Market:Canuse', ()=>{
    canUse = true;
});
