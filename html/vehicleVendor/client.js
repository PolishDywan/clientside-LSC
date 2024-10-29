import alt from 'alt-client';
let webView = null;
let Type = 0;
alt.onServer('VehicleVendor:Show', ShowMarket);
function ShowMarket(type, obj) {
    webView = new alt.WebView("http://resource/client/html/vehicleVendor/index.html");
    Type = type;
    webView.on('load', ()=>{
        alt.showCursor(true);
        webView.emit('VehicleVendor:LoadItems', obj);
        webView.focus();
    });
    webView.on('VehicleVendor:WantBuy', (id)=>{
        alt.emitServer('VehicleVendor:WantBuy', id);
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
