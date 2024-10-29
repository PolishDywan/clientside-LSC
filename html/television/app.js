import alt from 'alt-client';
/*
cef = null
alt.on('television:SetUrl'){
    cefleri listede tut her cef'e isim ver -> cef_'objeadi' = new webview ....
    cef varsa içerideki linki değiştir 
    yoksa cef kur linki pushla
}

*/ let cef;
alt.on('television:SetUrl', (link, propHash, textureHash)=>{
    cef = new alt.WebView("http://resource/client/html/television/index.html", propHash, textureHash);
    cef.on('televisionCef:Ready', ()=>{
        alt.setTimeout(()=>{
            cef.emit('television:SetYoutubeURL', link);
        }, 200);
    });
});
