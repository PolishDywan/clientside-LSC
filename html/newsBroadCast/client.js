import * as alt from 'alt-client';
let cef = null;
alt.onServer('NewsBackground', (link)=>{
    if (cef) {
        cef.destroy();
        cef = null;
    }
    cef = new alt.WebView("http://resource/client/html/newsBroadCast/index.html", 721582778, "xj_v_fameorshame01");
    cef.on('load', ()=>{
        //alt.setTimeout(() => {
        cef.emit('News:ChangeBackground', link);
    //}, 300);
    });
    alt.onServer('newBackground', (link)=>{
        alt.setTimeout(()=>{
            cef.emit('News:ChangeBackground', link);
        }, 300);
    });
});
alt.onServer('NewsBackgroundClose', ()=>{
    if (cef) {
        cef.destroy();
        cef = null;
    }
});
