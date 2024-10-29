import alt from 'alt';
import * as game from 'natives';

let web;


alt.onServer('Bourse:Show', (data) => {
    web = new alt.WebView("http://resource/client/CompanySystems/html/bourse/index.html");

    alt.showCursor(true);
    alt.toggleGameControls(false);  

    web.on('load', () => {
        web.emit('Bourse:Data', data);
        web.focus();
    })


    web.on('exitApp', () => {
        web.destroy();
        web = null;
        alt.showCursor(false);
        alt.toggleGameControls(true);  
    })

    web.on('buyShare', (compID) => {
        alt.emitServer('Share:Buy', compID);
    })

    web.on('sellShare', (compID) => {
        alt.emitServer('Share:Sell', compID);
    })
})

alt.onServer('Bourse:Update', (date) => {
    web.emit('Bourse:Data', date);
})