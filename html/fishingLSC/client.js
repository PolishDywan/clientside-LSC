import alt from 'alt-client';
let CEF = null;
alt.onServer('Fishing:OpenPushPage', ()=>{
    // TODO : Olta fırlatma zımbırtısını göster (Html) ->
    CEF = new alt.WebView("http://resource/client/html/fishingLSC/index.html");
    alt.showCursor(true);
    alt.toggleGameControls(false);
    CEF.focus();
    //native.taskStartScenarioInPlace(alt.Player.local.scriptID, "WORLD_HUMAN_STAND_FISHING", 0, true);
    CEF.on('Fishing:Succes', ()=>{
        if (CEF) {
            CEF.destroy();
            CEF = null;
            alt.showCursor(false);
            alt.toggleGameControls(true);
            alt.emitServer('Fishing:Succes');
        //native.clearPedTasks(alt.Player.local.scriptID);
        }
    });
    CEF.on('Fishing:PageClose', ()=>{
        if (CEF) {
            CEF.destroy();
            CEF = null;
            alt.showCursor(false);
            alt.toggleGameControls(true);
            alt.emitServer('Fishing:Closed');
        //native.clearPedTasks(alt.Player.local.scriptID);
        }
    });
});
