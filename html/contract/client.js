/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
let view = null;
alt.onServer('Contract:Show', (data)=>{
    view = new alt.WebView("http://resource/client/html/contract/index.html");
    alt.showCursor(true);
    alt.toggleGameControls(false);
    view.on('load', ()=>{
        view.emit('Show', data);
        view.focus();
    });
    alt.on('keydown', (key)=>{
        if (key == 27 || key == 8) {
            if (view) {
                alt.showCursor(false);
                alt.toggleGameControls(true);
                view.destroy();
                view = null;
            }
        }
    });
});
