import alt from 'alt-client';
import native from 'natives';
//import 'creator.js';
var charCam, loadCam, tO, tO2;
var Data = {};
native.setEntityCoords(alt.Player.local.scriptID, -74, -819, 326, true, false, false, true);
alt.onServer('login:Start', loadLoginPage);
alt.setMeta("player:Hud", false);
alt.setMeta("player:Nametag", false);
native.displayHud(false);
native.displayRadar(false);
loadCam = native.createCam("DEFAULT_SCRIPTED_CAMERA", true);
native.setCamCoord(loadCam, 33.665936, -107.156044, 173.71643);
native.setCamRot(loadCam, 2.157543659210205, 0.054333966225385666, 150, 0);
native.setCamFov(loadCam, 60);
native.setCamActive(loadCam, true);
native.renderScriptCams(true, false, 0, true, false, 0);
/*
native.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE"); 
native.cancelAllPoliceReports(); 
native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", 1, 0); 
native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", 1, 0); 
native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", 1, 0);
native.setAmbientZoneState(0, 0, 0); 
native.clearAmbientZoneState("AZ_DISTANT_SASQUATCH", 0, 0);
native.setAudioFlag("LoadMPData", true);
native.setAudioFlag("DisableFlightMusic", true);
*/ var loginPage, characterPage, characterdata, cLimit;
function loadLoginPage(data) {
    loginPage = new alt.WebView("http://resource/client/html/loginForm/login/index.html");
    // data.ID | data.text
    //
    //native.triggerScreenblurFadeIn(0);
    loginPage.on("load", ()=>{
        alt.emit('loginPage:DATAReady', data);
    });
    alt.showCursor(true);
    loginPage.focus();
    alt.toggleGameControls(false);
    alt.onServer('login:Succes', loginSucces);
    alt.onServer('login:Failed', ()=>{
        loginPage.emit('loginCEF:ShowError');
    });
    loginPage.on('login:Attempt', function(username, password) {
        alt.emitServer('LoginAttemp', username, password);
    });
}
function loginSucces(data, limit) {
    loginPage.destroy();
    characterdata = data;
    cLimit = limit;
    characterPage = new alt.WebView("http://resource/client/html/loginForm/creator.html");
    characterPage.focus();
    native.setCamActive(loadCam, false);
    native.destroyCam(loadCam, false);
    native.setEntityHeading(alt.Player.local.scriptID, 1);
    const camX = -74;
    const camY = -819;
    const camZ = 350;
    //charCam = native.createCam("DEFAULT_SCRIPTED_CAMERA", 1);
    //native.setCamCoord(charCam, camX, camY, camZ);
    //native.setCamRot(charCam, 2.157543659210205, 0.054333966225385666, 150);
    //native.setCamFov(charCam, 30);
    //native.setCamActive(charCam, true);
    //native.setFocusPosAndVel(camX, camY, camZ, 5, 0.0, 0.0, 0.0);
    //native.setHdArea(camX, camY, camZ, 5, 30);
    characterPage.on('load', characterPageLoaded);
    //characterPage.on('characterPage:Loaded', characterPageLoaded);
    characterPage.on('characterPage:SelectChar', selectCharacter);
    characterPage.on('characterPage:CreateChar', function(name) {
        alt.emitServer('characterPage:CreateChar', name);
    });
    characterPage.on('characterPage:CharSettings', function(data) {
        alt.emitServer('characterPage:SettingChar', data);
        characterPage.destroy();
        alt.showCursor(false);
        alt.toggleGameControls(true);
        //if(tO) alt.clearTimeout(tO);
        //if(tO2) alt.clearTimeout(tO2);
        native.clearFocus();
        native.clearHdArea();
        native.renderScriptCams(false, true, 1, true, false, 0);
        native.setCamActive(charCam, false);
        native.destroyCam(charCam, false);
        native.displayHud(true);
        native.displayRadar(true);
    });
}
function characterPageLoaded() {
    characterPage.emit('loginCEF:Chars', characterdata, cLimit);
}
/*
var char = JSON.parse(characterdata);
  char.forEach(elements => {
    characterPage.emit('loginCEF:Chars', elements.characterName.replace('_',' ').toUpperCase(), elements.ID, elements.factionName); 
  });
*/ function selectCharacter(id) {
    characterPage.destroy();
    alt.showCursor(false);
    alt.toggleGameControls(true);
    if (tO) alt.clearTimeout(tO);
    if (tO2) alt.clearTimeout(tO2);
    native.clearFocus();
    native.clearHdArea();
    native.renderScriptCams(false, true, 1, true, false, 0);
    native.setCamActive(parseInt(charCam), false);
    native.destroyCam(parseInt(charCam), false);
    native.displayHud(true);
    native.displayRadar(true);
    alt.emitServer('login:selectedChar', parseInt(id));
    alt.emit('login:callUpdate');
}
alt.onServer('characterPage:Valid', function(newCharName) {
    characterPage.emit('loginCEF:CreateSucces', newCharName);
});


alt.onServer('reCreateChar', function() {
    let characterPage2 = new alt.WebView("http://resource/client/html/loginForm/creator2.html");
    characterPage2.focus();
    alt.showCursor(true);
    alt.toggleGameControls(false);
    native.setCamActive(loadCam, false);
    native.destroyCam(loadCam, false);
    native.setEntityHeading(alt.Player.local.scriptID, 1);
    const camX = -74;
    const camY = -819;
    const camZ = 350;
    alt.setMeta("player:Hud", true);
    alt.setMeta("player:Nametag", true);
    //charCam = native.createCam("DEFAULT_SCRIPTED_CAMERA", 1);
    //native.setCamCoord(charCam, camX, camY, camZ);
    //native.setCamRot(charCam, 2.157543659210205, 0.054333966225385666, 150);
    //native.setCamFov(charCam, 30);
    //native.setCamActive(charCam, true);
    //native.setFocusPosAndVel(camX, camY, camZ, 5, 0.0, 0.0, 0.0);
    //native.setHdArea(camX, camY, camZ, 5, 30);
    characterPage2.on('load', characterPageLoaded);
    //characterPage.on('characterPage:Loaded', characterPageLoaded);
    characterPage2.on('characterPage:SelectChar', selectCharacter);
    characterPage2.on('characterPage:CreateChar', function(name) {
        alt.emitServer('characterPage:CreateChar', name);
    });
    characterPage2.on('characterPage:CharSettings', function(data) {
        alt.emitServer('OOCMarket:NCx', data);
        characterPage2.destroy();
        alt.showCursor(false);
        alt.toggleGameControls(true);
        //if(tO) alt.clearTimeout(tO);
        //if(tO2) alt.clearTimeout(tO2);
        native.clearFocus();
        native.clearHdArea();
        native.renderScriptCams(false, true, 1, true, false, 0);
        native.setCamActive(charCam, false);
        native.destroyCam(charCam, false);
        native.displayHud(true);
        native.displayRadar(true);
        alt.setMeta("player:Hud", false);
        alt.setMeta("player:Nametag", false);
    });
})