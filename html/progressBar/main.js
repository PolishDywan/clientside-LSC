import * as alt from 'alt-client';
let progressPage = new alt.WebView("http://resource/client/html/progressBar/index.html");
alt.onServer('StartProgressBar', (text, time, color)=>{
    progressPage.emit("progressWeb:Start", text, time, color);
});
