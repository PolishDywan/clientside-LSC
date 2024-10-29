import alt from 'alt-client';
var GUI = new alt.WebView("http://resource/client/html/GameMenu/index.html");
var cursor = false;
alt.onServer('GUI:Create', (data)=>{
    GUI.emit('GUI:CreateMenu', data);
    GUI.focus();
    alt.toggleGameControls(false);
    if (!cursor) {
        cursor = true;
        alt.showCursor(true);
    }
});
alt.onServer('GUI:Close', ()=>{
    GUI.emit('GUI:ClearAll');
    GUI.unfocus();
    alt.toggleGameControls(true);
    if (cursor) {
        cursor = false;
        alt.showCursor(false);
    }
});
GUI.on('GUI:MenuSelect', (triger, value)=>{
    alt.emitServer(triger, value);
});
