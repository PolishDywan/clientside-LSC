import alt from 'alt-client';
let CEF = null;
alt.onServer('HelpPage:Show', (lvl)=>{
    CEF = new alt.WebView("http://resource/client/html/helpMenu/helpMenu.html");
    alt.showCursor(true);
    alt.toggleGameControls(false);
    CEF.focus();
    CEF.on('load', ()=>{
        CEF.emit('HelpPage:ShowAdmin', lvl);
    });
    CEF.on('HelpPage:Close', closeHelpPage);
});
function closeHelpPage() {
    if (CEF) {
        CEF.destroy();
        CEF = null;
        alt.showCursor(false);
        alt.toggleGameControls(true);
    }
}
