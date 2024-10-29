import alt from 'alt-client';
import native from 'natives';
let web;
let type;
let id;
alt.onServer('Lockpick:Start', (Type, Id)=>{
    web = new alt.WebView("http://resource/client/html/lockpick/html/index.html");
    type = Type;
    id = Id;
    web.on('load', ()=>{
        web.focus();
        alt.showCursor(true);
        alt.toggleGameControls(false);
    });
    web.on('succes', ()=>{
        if (web) web.destroy();
        alt.showCursor(false);
        alt.toggleGameControls(true);
        native.clearPedTasks(alt.Player.local.scriptID);
        native.clearPedSecondaryTask(alt.Player.local.scriptID);
        alt.emitServer("Lockpick:Result", true, parseInt(type), parseInt(id));
    });
    web.on('no', ()=>{
        if (web) {
            web.destroy();
        }
        alt.showCursor(false);
        alt.toggleGameControls(true);
        native.clearPedTasks(alt.Player.local.scriptID);
        native.clearPedSecondaryTask(alt.Player.local.scriptID);
        alt.emitServer("Lockpick:Result", false, parseInt(type), parseInt(id));
    });
});
