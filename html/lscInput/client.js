import * as alt from 'alt-client';
var input = null;
var cursor = false;
alt.onServer('UI:Input', (type, text, callback, otherValue)=>{
    input = new alt.WebView("http://resource/client/html/lscInput/index.html");
    input.focus();
    alt.toggleGameControls(false);
    if (!cursor) {
        cursor = true;
        alt.showCursor(true);
    }
    input.on('UI:Ready', ()=>{
        //alt.setTimeout(() => {
        input.emit('UI:cInput', type, text);
    //}, 200)
    });
    input.on('UI:Save', (text)=>{
        if (input) {
            alt.showCursor(false);
            alt.toggleGameControls(true);
            input.destroy();
            input = null;
            cursor = false;
            alt.emitServer(callback, text, otherValue);
        }
    });
});
