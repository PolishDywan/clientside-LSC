import * as alt from 'alt-client';
let cef = null;
let PageReady = false;
let PlayerReady = false;
alt.onServer('TV:Start', (link, date, sound)=>{
    if (cef) {
        cef.destroy();
        cef = null;
        alt.setTimeout(()=>{
            PageReady = false;
            PlayerReady = false;
            cef = new alt.WebView("http://resource/client/html/tv/index.html", 4054035569, "script_rt_tvscreen");
            cef.unfocus();
            cef.on('VideoPlayerReady', ()=>{
                PlayerReady = true;
                if (PlayerReady == true && PageReady == true) {
                    PlayVideo(link, date, sound);
                }
            });
            cef.on('load', ()=>{
                PageReady = true;
                if (PlayerReady == true && PageReady == true) {
                    PlayVideo(link, date, sound);
                }
            });
        }, 700);
        cef.unfocus();
    } else {
        cef = new alt.WebView("http://resource/client/html/tv/index.html", 4054035569, "script_rt_tvscreen");
        cef.unfocus();
        cef.on('VideoPlayerReady', ()=>{
            PlayerReady = true;
            if (PlayerReady == true && PageReady == true) {
                PlayVideo(link, date, sound);
            }
        });
        cef.on('load', ()=>{
            PageReady = true;
            if (PlayerReady == true && PageReady == true) {
                PlayVideo(link, date, sound);
            }
        });
        cef.unfocus();
    }
});
function PlayVideo(link, date, sound) {
    cef.emit('TV:StartVideo', link, date);
    cef.emit('TV:SetVolume', sound);
}
alt.onServer('TV:Change', (link, date)=>{
    if (cef) {
        cef.destroy();
        cef = null;
    }
    alt.setTimeout(()=>{
        cef = new alt.WebView("http://resource/client/html/tv/index.html", 4054035569, "script_rt_tvscreen");
        cef.unfocus();
        cef.on('VideoPlayerReady', ()=>{
            cef.emit('TV:StartVideo', link, date + 2);
        });
    }, 700);
});
alt.onServer('TV:SetSound', (volume)=>{
    if (cef) {
        cef.emit('TV:SetVolume', volume);
    }
});
alt.onServer('TV:Stop', ()=>{
    if (cef) {
        cef.destroy();
        cef = null;
    }
    PageReady = false;
    PlayerReady = false;
});
