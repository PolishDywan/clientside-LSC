import alt from 'alt-client';
var loginPage, characterPage, characterdata, cLimit;
alt.onServer('login:Start', loadLoginPage);
function loadLoginPage() {
    loginPage = new alt.WebView("http://resource/client/html/loginForm/index.html");
    loginPage.on('load', ()=>{
        alt.emitServer('LoginPage:GetServerUpdates');
    });
}
alt.onServer('LoginPage:LoadServerUpdates', (data)=>{
    if (loginPage) {
        loginPage.emit('LoadUpdates', data);
    }
});
