import * as alt from 'alt-client';
let progressPage = new alt.WebView("http://resource/client/html/notify/ui.html");
alt.onServer('showNotify', (type, text)=>{
    let data = {};
    data.type = type;
    data.text = text;
    progressPage.emit("notifiy:WebStart", data);
});
