import * as alt from 'alt-client';
import * as native from 'natives';
import { createPedEditCamera, destroyPedEditCamera, setFov, setZPos } from './camera';
let cef;
let sex = alt.Player.local.getSyncedMeta('PlayerSex');
alt.onServer('Tatto:Show', ()=>{
    cef = new alt.WebView("http://resource/client/html/tattoSystem/index.html");
    cef.focus();
    alt.showCursor(true);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    createPedEditCamera();
    setFov(50);
    setZPos(0.6);
    cef.on('load', ()=>{
        //alt.setTimeout(() => {
        cef.emit('TattoPage:SetSex', sex);
    //}, 400)
    });
    cef.on('TattoPage:TryTatto', (collection, value)=>{
        native.clearPedDecorations(alt.Player.local.scriptID);
        native.addPedDecorationFromHashes(alt.Player.local.scriptID, alt.hash(collection), alt.hash(value));
        drawSubtitle("~x~LSC: ~w~Dövme modeli karakter üzerinde gösteriliyor.", 3000);
    });
    cef.on('TattoPage:BuyTatto', (collection, value, zone)=>{
        alt.emitServer('Tatto:WantToBuy', collection, value, zone);
    });
    cef.on('TattoPage:Close', ()=>{
        if (cef) {
            cef.destroy();
            cef = null;
            alt.showCursor(false);
            alt.toggleGameControls(true);
            native.freezeEntityPosition(alt.Player.local.scriptID, false);
            destroyPedEditCamera();
            alt.emitServer('Tatto:Close');
        }
    });
});
alt.onServer('Tatto:Load', (data)=>{
    native.clearPedDecorations(alt.Player.local.scriptID);
    let obj = JSON.parse(data);
    obj.forEach((e)=>{
        native.addPedDecorationFromHashes(alt.Player.local.scriptID, alt.hash(e.collection), alt.hash(e.value));
    });
});
// Subtitle
function drawSubtitle(text, duration) {
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}
