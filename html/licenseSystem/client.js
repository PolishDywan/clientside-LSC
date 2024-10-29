import * as alt from 'alt-client';
let CEF = null;
alt.onServer('License:Show', (text, bg)=>{
    CEF = new alt.WebView("http://resource/client/html/licenseSystem/licencePlayer.html");
    CEF.on("load", ()=>{
        CEF.emit("LicenseAddData", text, bg);
    });
    CEF.on("CloseLicencePlayer", ()=>{
        closeLicense();
    });
});
function closeLicense() {
    if (CEF) {
        CEF.destroy();
        CEF = null;
    }
}
