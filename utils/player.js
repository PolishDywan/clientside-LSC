/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

import * as func from './etc/functions';
import * as Vec from './etc/vector';

var lPlyr = [];

//#region  Server Listeners
alt.on('gameEntityCreate', GameEntityCreate);
alt.on('gameEntityDestroy', GameEntityDestroy);
alt.on('connectionComplete', ConnectionComplete);

alt.on('keydown', KeyDownEvents);

alt.onServer('Animation:Play', PlayAnimation);
alt.onServer('Animation:Stop', StopAnimation);

alt.onServer('Player:GameControls', ToggleGameControls);

alt.onServer('Player:FreezePos', FreezeEntity);

alt.onServer('Server:CalculateCoordZ', CalculateCoordZ);
alt.onServer('Player:Graphics', GraphicMode);
alt.on('login:callUpdate', Login_Call_Update)
//#endregion

function GameEntityCreate(entity){
    if(entity instanceof alt.Player)
        lPlyr[entity.id] = entity;
}

function GameEntityDestroy(entity){
    if(entity instanceof alt.Player)
        delete lPlyr[entity.id];
}

function ConnectionComplete(){
    alt.setMeta("player:Hud", false);
    alt.setMeta('player:Nametag', false);

    native.pauseClock(true);
    alt.setStat('stamina', 100);
}

function Login_Call_Update(){
    alt.log('Login Başarılı.');
    native.clearPedTasks(alt.Player.local.scriptID);
    // ! TODO playerUpdate.js:48-50 arası eklenecek.
    alt.everyTick(renderNameTags);
}

var recording = false;
var canPress =true;
var crouched = false;
function KeyDownEvents(key){
    switch(key){
        case 17:
            if (alt.gameControlsEnabled()) {
                native.disableControlAction(0, 36, true);
                if (!native.isPlayerDead(alt.Player.local) && !native.isPedSittingInAnyVehicle(alt.Player.local.scriptID)) {
                    if (!native.isPauseMenuActive()) {
                        native.requestAnimSet("move_ped_crouched");
                        if (crouched) {
                            native.clearPedTasks(alt.Player.local.scriptID);
                            alt.setTimeout(() => {
                                native.resetPedMovementClipset(alt.Player.local.scriptID, 0.45);
                                crouched = false;
                            }, 100);
                        } else {
                            native.setPedMovementClipset(alt.Player.local.scriptID, "move_ped_crouched", 0.45);
                            crouched = true;
                        }
                    }
                }
            }
            break;

        case 'G'.charCodeAt(0):
            if (alt.gameControlsEnabled()) {
                const playerPed = alt.Player.local.scriptID;
                if (!native.isPedSittingInAnyVehicle(playerPed)) {
                    const coords = native.getEntityCoords(playerPed);
                    const offset = native.getOffsetFromEntityInWorldCoords(playerPed, 0.0, 1.0, 0.0);
                    const rayHandle = native.startShapeTestCapsule(coords.x, coords.y, coords.z - 0.5, offset.x, offset.y, offset.z, 0.8, 10, playerPed, 7);
                    const result = native.getShapeTestResult(rayHandle)[4];
                    if (!result) return;
                    if (native.doesEntityExist(result)) {
                        const seatBones = ['seat_pside_f', 'seat_dside_r', 'seat_pside_r'];
                        let closestSeat = [null, 3.0];
                        seatBones.forEach((item, i) => {
                            if (native.getEntityBoneIndexByName(result, item) != -1 && !native.getPedInVehicleSeat(result, i)) {
                                const boneIndex = native.getEntityBoneIndexByName(result, item);
                                const boneCoords = native.getWorldPositionOfEntityBone(result, boneIndex);
                                const dd = Vec.distance(coords, boneCoords);
                                if (dd < closestSeat[1]) closestSeat = [i, dd];
                            }
                        });
                        if (closestSeat[0] !== null) {
                            native.setPedConfigFlag(playerPed, 184, true);
                            native.taskEnterVehicle(playerPed, result, -1, closestSeat[0], 1.0, 1, 0);
                        }
                    }
                }
            }
            break;

        case 78:
            if(alt.gameControlsEnabled()){
                if(canPress){
                    canPress = false;
                    alt.emitServer('Player:VehicleLockKey');
                    alt.setTimeout(() => {
                        canPress = true;
                    }, 1500);
                }
            }
            break;       

        case 89:
            if(alt.gameControlsEnabled()){
                if(canPress){
                    canPress = false;
                    alt.emitServer('Player:VehicleEngineKey');
                    alt.setTimeout(() => {
                        canPress = true;
                    }, 1500);
                }
            }
            break;

        case 112:
            if(!recording){
                native.startRecording(1);
                recording = true;
            }
            else{
                native.stopRecordingAndSaveClip();
                recording = false;
            }
            break;

        case 116:
                if (alt.gameControlsEnabled()) {
                   isAutoWalk = !isAutoWalk;
                   if(isAutoWalk){
                       if(alt.Player.local.vehicle == null) {
                           _autoWalkinterval = alt.setInterval(() => {
                               autoWalk();
                           }, 1000);
                       }
                   }
                   else{
                       alt.clearInterval(_autoWalkinterval);
                       native.clearPedTasks(alt.Player.local.scriptID);
                   }
                }
            break;

        case 120:
            alt.setMeta('player:Hud', !alt.getMeta('player:Hud'));
            func.drawSubtitle("~w~Hud " + (alt.getMeta("player:Hud") ? "~r~Kapatıldı" : "~y~Açıldı"), 2000);
            break;

        case 121:
            alt.setMeta("player:Nametag", !alt.getMeta("player:Nametag"));
            func.drawSubtitle("~w~İsimler " + (alt.getMeta("player:Nametag") ? "~r~Kapatıldı" : "~y~Açıldı"), 2000);
            break;

        

    }
}

let isAutoWalk = false;
let _autoWalkinterval = null;
function autoWalk(){
    let fv = native.getEntityForwardVector(alt.Player.local.scriptID);
    let pos = alt.Player.local.pos;
    native.taskGoToCoordAnyMeans(alt.Player.local.scriptID, pos.x + fv.x * 4 , pos.y + fv.y * 4, pos.z, 1.0, 0, false, 786603, 1.0 );
}

function PlayAnimation(animDict, animationName, duration, flag){
    native.requestAnimDict(animDict);
    alt.setTimeout(() => {
        native.taskPlayAnim(alt.Player.local.scriptID, animDict, animationName, 1, -1, flag, duration, -1.0, false, false, false);
    }, 1000);
}

function StopAnimation(){
    if(alt.Player.local.vehicle === null)
        native.clearPedTasks(alt.Player.local.scriptID);
    
    native.clearPedSecondaryTask(alt.Player.local.scriptID);
}

function ToggleGameControls(state){
    alt.ToggleGameControls(state);
}

async function renderNameTags(){
    native.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 184, true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 241, true);
    native.disableControlAction(2, 140, true);

    if(!alt.getMeta('player:Hud')){
        let date = new Date();
        func.drawLongText("$" + alt.Player.local.getSyncedMeta('PlayerCash'), 0.95, 0.05, 0.6, 4, 133, 187, 101, 255, true, true, true);
        func.drawLongText("~b~" + showStreet() + " ~w~| ~y~" + getHeading(native.getEntityHeading(alt.Player.local.scriptID)), 0.04, 0.755, 0.4, 4, 133, 187, 101, 255, true, true, false);
        func.drawLongText("LSC RolePlay", 0.955, 0.935, 0.4, 1, 220, 220, 220, 220, false, true, true);
        func.drawLongText(date.getDate() + "/" +  (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() , 0.910, 0.975, 0.3, 0, 220, 220, 220, 255, false, true, false);    
    }

    if(!alt.getMeta('player:Nametag')){
        let localPlayer = alt.Player.local;
        for(let ply in lPlyr){
            let p = lPlyr[ply];
            if(!p.valid || !p.hasStreamSyncedMeta('PlayerCharacterName')) continue;
            if(p.getSyncedMeta('FREECAM')) native.setEntityAlpha(p.scriptID, 0, false); else {
                if(native.getEntityAlpha(p.scriptID) < 1)
                    native.resetEntityAlpha(p.scriptID);
            }

            if(!native.hasEntityClearLosToEntity(localPlayer.scriptID, p.scriptID, 17)) continue;
            if(Vec.distance(p.pos, localPlayer.pos) >= 20) continue;

            const vector = native.getEntityVelocity(p.vehicle ? p.vehicle.scriptID : p.scriptID);
            const frameTime = native.getFrameTime();
            const xPos = [p.pos.x + (vector.x * frameTime),p.pos.y + (vector.y * frameTime), p.pos.z + (vector.z * frameTime)];
            native.setDrawOrigin(xPos[0], xPos[1] , xPos[2] + 1.1, 0);
            native.beginTextCommandDisplayText('STRING');
            native.addTextComponentSubstringPlayerName(p.getStreamSyncedMeta('PlayerCharacterName').replace("_", " "));
            native.setTextFont(4);
            native.setTextScale(0.18, 0.37);
            native.setTextCentre(true);
            native.setTextOutline();
            native.setTextDropShadow();
            native.setTextProportional(true);
            native.setTextColour(255, 255, 255, 255);
            native.endTextCommandDisplayText(0, 0);
            native.clearDrawOrigin();

            if(p.hasSyncedMeta("NameTag1")){
                native.setDrawOrigin(xPos[0], xPos[1] , xPos[2] + 1.3, 0);
                native.beginTextCommandDisplayText('CELL_EMAIL_BCON');
                native.addTextComponentSubstringPlayerName(p.getSyncedMeta("NameTag1"));
                native.setTextFont(0);
                native.setTextCentre(true);
                native.setTextScale(0.25, 0.25);
                native.setTextProportional(true);
                native.setTextColour(255, 255, 255, 255);                    
                native.setTextWrap( 0.0, 1.0 );                    
                native.setTextOutline();
                native.setTextDropShadow();
                native.endTextCommandDisplayText( 0, 0, 0 );
                native.clearDrawOrigin();
            }
            if(p.hasSyncedMeta("NameTag2")){
                native.setDrawOrigin(xPos[0], xPos[1] , xPos[2] + 0.9, 0);
                native.beginTextCommandDisplayText( 'CELL_EMAIL_BCON' );
                native.addTextComponentSubstringPlayerName(p.getSyncedMeta("NameTag2") );
                native.setTextFont(0);
                native.setTextCentre(true);
                native.setTextScale(0.25, 0.25);
                native.setTextProportional(true);
                native.setTextColour(255, 255, 255, 255);                    
                native.setTextWrap( 0.0, 1.0 );                    
                native.setTextOutline();
                native.setTextDropShadow();
                native.endTextCommandDisplayText( 0, 0, 0 );
                native.clearDrawOrigin();
            }
        }
    }
}

function FreezeEntity(state){
    native.freezeEntityPosition(alt.Player.local.scriptID, state)
}

function showStreet(){
    let name = native.getNameOfZone(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
    switch (name) {
        case "AIRP":
            name = "Los Santos International Airport";
            break;
        case "ALAMO":
            name = "Alamo Sea";
            break;
        case "ALTA":
            name = "Alta";
            break;
        case "ARMYB":
            name = "Fort Zancudo";
            break;
        case "BANHAMC":
            name = "Banham Canyon Dr";
            break;
        case "BANNING":
            name = "Banning";
            break;
        case "BEACH":
            name = "Vespucci Beach";
            break;
        case "BHAMCA":
            name = "Banham Canyon";
            break;
        case "BRADP":
            name = "Braddock Pass";
            break;
        case "BRADT":
            name = "Braddock Tunnel";
            break;
        case "BURTON":
            name = "Burton";
            break;
        case "CALAFB":
            name = "Calafia Bridge";
            break;
        case "CANNY":
            name = "Raton Canyon";
            break;
        case "CCREAK":
            name = "Cassidy Creek";
            break;
        case "CHAMH":
            name = "Chamberlain Hills";
            break;
        case "CHIL":
            name = "Vinewood Hills";
            break;
        case "CHU":
            name = "Chumash";
            break;
        case "CMSW":
            name = "Chiliad Mountain State Wilderness";
            break;
        case "CYPRE":
            name = "Cypress Flats";
            break;
        case "DAVIS":
            name = "Davis";
            break;
        case "DELBE":
            name = "Del Perro Beach";
            break;
        case "DELPE":
            name = "Del Perro";
            break;
        case "DELSOL":
            name = "La Puerta";
            break;
        case "DESRT":
            name = "Grand Senora Desert";
            break;
        case "DOWNT":
            name = "Downtown";
            break;
        case "DTVINE":
            name = "Downtown Vinewood";
            break;
        case "EAST_V":
            name = "East Vinewood";
            break;
        case "EBURO":
            name = "El Burro Heights";
            break;
        case "ELGORL":
            name = "El Gordo Lighthouse";
            break;
        case "ELYSIAN":
            name = "Elysian Island";
            break;
        case "GALFISH":
            name = "Galilee";
            break;
        case "GOLF":
            name = "GWC and Golfing Society";
            break;
        case "GRAPES":
            name = "Grapeseed";
            break;
        case "GREATC":
            name = "Great Chaparral";
            break;
        case "HARMO":
            name = "Harmony";
            break;
        case "HAWICK":
            name = "Hawick";
            break;
        case "HORS":
            name = "Vinewood Racetrack";
            break;
        case "HUMLAB":
            name = "Humane Labs and Research";
            break;
        case "JAIL":
            name = "Bolingbroke Penitentiary";
            break;
        case "KOREAT":
            name = "Little Seoul";
            break;
        case "LACT":
            name = "Land Act Reservoir";
            break;
        case "LAGO":
            name = "Lago Zancudo";
            break;
        case "LDAM":
            name = "Land Act Dam";
            break;
        case "LEGSQU":
            name = "Legion Square";
            break;
        case "LMESA":
            name = "La Mesa";
            break;
        case "LOSPUER":
            name = "La Puerta";
            break;
        case "MIRR":
            name = "Mirror Park";
            break;
        case "MORN":
            name = "Morningwood";
            break;
        case "MOVIE":
            name = "Richards Majestic";
            break;
        case "MTCHIL":
            name = "Mount Chiliad";
            break;
        case "MTGORDO":
            name = "Mount Gordo";
            break;
        case "MTJOSE":
            name = "Mount Josiah";
            break;
        case "MURRI":
            name = "Murrieta Heights";
            break;
        case "NCHU":
            name = "North Chumash";
            break;
        case "NOOSE":
            name = "N.O.O.S.E";
            break;
        case "OCEANA":
            name = "Pacific Ocean";
            break;
        case "PALCOV":
            name = "Paleto Cove";
            break;
        case "PALETO":
            name = "Paleto Bay";
            break;
        case "PALFOR":
            name = "Paleto Forest";
            break;
        case "PALHIGH":
            name = "Palomino Highlands";
            break;
        case "PALMPOW":
            name = "Palmer-Taylor Power Station";
            break;
        case "PBLUFF":
            name = "Pacific Bluffs";
            break;
        case "PBOX":
            name = "Pillbox Hill";
            break;
        case "PROCOB":
            name = "Procopio Beach";
            break;
        case "RANCHO":
            name = "Rancho";
            break;
        case "RGLEN":
            name = "Richman Glen";
            break;
        case "RICHM":
            name = "Richman";
            break;
        case "ROCKF":
            name = "Rockford Hills";
            break;
        case "RTRAK":
            name = "Redwood Lights Track";
            break;
        case "SANAND":
            name = "San Andreas";
            break;
        case "SANCHIA":
            name = "San Chianski";
            break;
        case "SANDY":
            name = "Sandy Shores";
            break;
        case "SKID":
            name = "Mission Row";
            break;
        case "SLAB":
            name = "Stab City";
            break;
        case "STAD":
            name = "Maze Bank Arena";
            break;
        case "STRAW":
            name = "Strawberry";
            break;
        case "TATAMO":
            name = "Tataviam Mountains";
            break;
        case "TERMINA":
            name = "Terminal";
            break;
        case "TEXTI":
            name = "Textile City";
            break;
        case "TONGVAH":
            name = "Tongva Hills";
            break;
        case "TONGVAV":
            name = "Tongva Valley";
            break;
        case "VCANA":
            name = "Vespucci Canals";
            break;
        case "VESP":
            name = "Vespucci";
            break;
        case "VINE":
            name = "Vinewood";
            break;
        case "WINDF":
            name = "Wind Farm";
            break;
        case "WVINE":
            name = "West Vinewood";
            break;
        case "ZANCUDO":
            name = "Zancudo River";
            break;
        case "ZP_ORT":
            name = "Port of South LS";
            break;
        case "ZQ_UAR":
            name = "Davis Quartz";
            break;
    }
    return name;
}

function CalculateCoordZ(callBack, pos){
    let CoordZ = native.getGroundZFor3dCoord(pos.x, pos.y, pos.z, 1000, false, false);
    alt.emitServer(cb, CoordZ[1]);
}

function GraphicMode(type){
    native.clearTimecycleModifier();
    switch (type) {
        case 1:
            native.setTimecycleModifier("NG_filmic01");
            break;

        case 2:
            native.setTimecycleModifier("NG_filmic07");
            break;

        case 3:
            native.setTimecycleModifier("NG_filmic12");
            break;

        case 4:
            native.setTimecycleModifier("NG_filmic15");
            break;

        case 5:
            native.setTimecycleModifier("NG_filmic25");
            break;

        case 6:
            native.setTimecycleModifier("ArenaWheelPurple01");
            break;

        case 7:
            native.setTimecycleModifier("ArenaWheelPurple02");
            break;

        case 8:
            native.setTimecycleModifier("BeastLaunch01");
            break;

        case 9:
            native.setTimecycleModifier("BeastLaunch02");
            break;

        case 10:
            native.setTimecycleModifier("BleepYellow01");
            break;

        case 11:
            native.setTimecycleModifier("BleepYellow02");
            break;

        case 12:
            native.setTimecycleModifier("DeadlineNeon01");
            break;

        case 13:
            native.setTimecycleModifier("DrivingFocusDark");
            break;

        case 14:
            native.setTimecycleModifier("Forest");
            break;

        case 15:
            native.setTimecycleModifier("InchOrange01");
            break;

        case 16:
            native.setTimecycleModifier("InchOrange02");
            break;

        case 17:
            native.setTimecycleModifier("InchPickup01");
            break;

        case 18:
            native.setTimecycleModifier("InchPurple01");
            break;

        case 19:
            native.setTimecycleModifier("InchPurple02");
            break;

        case 20:
            native.setTimecycleModifier("MP_Arena_theme_atlantis");
            break;

        case 21:
            native.setTimecycleModifier("MP_Killstreak");
            break;

        case 22:
            native.setTimecycleModifier("NEW_abattoir");
            break;

        case 23:
            native.setTimecycleModifier("NG_filmnoir_BW01");
            break;

        case 24:
            native.setTimecycleModifier("NeutralColorCode");
            break;

        case 25:
            native.setTimecycleModifier("TrevorColorCode");
            break;

        case 26:
            native.setTimecycleModifier("cinema");
            break;

        case 27:
            native.setTimecycleModifier("glasses_Darkblue");
            break;

        case 28:
            native.setTimecycleModifier("hud_def_desatcrunch");
            break;

        case 29:
            native.setTimecycleModifier("hud_def_desatcrunch");
            break;

        case 30:
            native.setTimecycleModifier("rply_contrast");
            break;

        case 31:
            native.setTimecycleModifier("rply_saturation");
            break;

        case 32:
            native.setTimecycleModifier("LODmult_HD_orphan_LOD_reduce");
            break;
        case 33:
            native.setTimecycleModifier("LODmult_HD_orphan_reduce");
            break;
        case 34:
            native.setTimecycleModifier("LODmult_LOD_reduce");
            break;
        case 35:
            native.setTimecycleModifier("LODmult_SLOD1_reduce");
            break;
        case 36:
            native.setTimecycleModifier("LODmult_SLOD2_reduce");
            break;
        case 37:
            native.setTimecycleModifier("LODmult_SLOD3_reduce");
            break;
        case 38:
            native.setTimecycleModifier("LODmult_global_reduce");
            break;
        case 39:
            native.setTimecycleModifier("LODmult_global_reduce");
            break;
        case 40:
            native.setTimecycleModifier("LODmult_global_reduce_NOHD");
            break;

        case 41:
            native.setTimecycleModifier("V_CIA_Facility");
            break;

        case 0:
        default:
            native.clearTimecycleModifier();
            native.setTimecycleModifier("default");
            break;
    }
}

function getHeading(degre){
    if(degre <= 22 || degre > 337) return "Kuzey";
    else if(degre <= 67 && degre > 22) return "Kuzey Batı";
    else if(degre <= 112 && degre > 67) return "Batı";
    else if(degre <= 157 && degre > 112) return "Güney Batı";
    else if(degre <= 202 && degre > 157) return "Güney";
    else if(degre <= 247 && degre > 202) return "Güney Dogu";
    else if(degre <= 292 && degre > 247) return "Dogu";
    else return "Kuzey Dogu";
}