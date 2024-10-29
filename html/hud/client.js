import * as alt from 'alt-client';
import * as native from 'natives';
const player = alt.Player.local;
let webview = new alt.WebView("http://resource/client/html/hud/html/index.html");
var map = native.displayRadar(false);
webview.unfocus();
const r = alt.getMeta("player:Nametag");
webview.on('load', ()=>{
    if (r) {
        //let name = (player.getStreamSyncedMeta('PlayerCharacterName') as string).replace("_", " "); // -> Cone Anderson
        let name = player.getStreamSyncedMeta('PlayerCharacterName').replace("_", " "); // -> Cone Anderson
        webview.emit('char:name', name);
    }
});
alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue)=>{
    if (entity == alt.Player.local) {
        if (key == "PlayerCharacterName") {
            webview.emit('char:name', value.replace("_", " "));
        } else if (key == 'Player:ID') {
            webview.emit("char:ID", value);
        }
    }
});
alt.on('globalMetaChange', (key, value, oldValue)=>{
    if (key == "player:Hud") {
        webview.emit("Display", !value);
    }
});
