/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

import * as func from './etc/functions';
import * as Vec from './etc/vector';

//#region Keydown Events
let eventKey_E = true;
alt.on('keyup', (key) => {
    if(key === 69){
        if(eventKey_E){
            if(alt.gameControlsEnabled()){
                eventKey_E = false;
                alt.emitServer('player:EventKey:E');
                alt.setTimeout(() => {
                    eventKey_E = true;
                }, 300);
            }
        }
    }
})
//#endregion

//#region Server Listeners
alt.onServer('setPlayerOutVehicle', setPlayerOutVehicle);
alt.onServer('setPlayerToVehicle', setPlayerToVehicle);

alt.onServer('Text:ShowAll', Text_Show_All);
alt.onServer('Text:ShowAllVehicle', Text_Show_Vehicle);

alt.onServer('SetClothes', SetClothes);
alt.onServer('SetClothesProps', SetClothes_Prop);
alt.onServer('SetClothSet', SetClothes_Set);

alt.onServer('Text:ShowPlayer', ShowScreenText);

alt.onServer('Player:WaitToEnterVehicle', WaitToEnterVehicle);
alt.onServer('Player:ExitVehicleSpector', ExitVehicleSpectator);

alt.onServer('Player:VehicleExitWatch', VehicleChecker);
alt.onServer('Notification:Show', ShowIconNotification);

alt.onServer('Player:SetWalkingStyle', SetWalkingStyle);
alt.onServer('Injured:ClearBloods', ClearBloodDamage);

alt.onServer('Show:Subtitle', DrawSubTitle);

alt.onServer('teleportToWaypoint', TeleportToWaypoint);

alt.onServer('Faction:CheckClothes', GetPlayerFactionClothes);
alt.onServer('Player:CheckClothes', GetPlayerClothes);

alt.onServer('PlayerScenario', PlayerScenario);

alt.onServer('Show:VehicleModify', ShowVehicleModifys);

alt.onServer('Spec:ON', StartSpectator);
alt.onServer('Spec:OFF', StopSpectator);

alt.onServer('Controls:Disable', DisableControls);
alt.onServer('Controls:Disable:Close', DisableControl_Close);

alt.onServer('Clear:Ears', ClearEars);
//#endregion

function setPlayerOutVehicle( vehicle, flag = 0 ) {
    if( vehicle === null || vehicle.valid ) return;

    let interval = alt.setInterval(() => {
        if( alt.Player.local.vehicle === vehicle ) alt.clearInterval(interval);
        
        native.taskLeaveAnyVehicle(alt.Player.local.scriptID, vehicle.scriptID, flag);
    }, 0);
}

function setPlayerToVehicle( vehicle, flag = 0 ){
    if( vehicle === null || vehicle.valid ) return;

    let interval = alt.setInterval(() => {
        if( alt.Player.local.vehicle === vehicle ) alt.clearInterval(interval);

        native.taskEnterVehicle(alt.PLayer.local.scriptID, vehicle.scriptID, 100, -1, 2, 16, flag);
    }, 0);
}

function Text_Show_All(player, text, time = 3){
    if(!player) return;

    let a = 0;
    let posZ = player.pos.z + 0.1;
    let sayac = 0;

    a = alt.everyTick(() => {
        if (player && Vec.distance(player.pos, alt.Player.local.pos) < 30) {
            native.requestPedVisibilityTracking(player.scriptID);
            if(player === alt.Player.local){
                native.setDrawOrigin(player.pos.x, player.pos.y, posZ, false);    
                    native.setDrawOrigin(player.pos.x , player.pos.y , posZ, 0);
                    native.beginTextCommandDisplayText( 'STRING' );
                    native.addTextComponentSubstringPlayerName( text );
                    native.setTextFont( 0 );
                    native.setTextScale( 0.38, 0.34 );
                    native.setTextWrap( 0.0, 1.0 );
                    native.setTextColour( 13, 222, 0, 255 );
                    native.setTextOutline();
                    native.setTextDropShadow();
    
                    native.endTextCommandDisplayText( 0, 0, 0 );
                    native.clearDrawOrigin();
            }
            else {
                if (native.isTrackedPedVisible(player.scriptID)) {    
                    native.setDrawOrigin(player.pos.x , player.pos.y , posZ, 0);
                    native.beginTextCommandDisplayText( 'STRING' );
                    native.addTextComponentSubstringPlayerName( text );
                    native.setTextFont( 0 );
                    native.setTextScale( 0.38, 0.34 );
                    native.setTextWrap( 0.0, 1.0 );
                    native.setTextColour( 13, 222, 0, 255 );
                    native.setTextOutline();
                    native.setTextDropShadow();
    
                    native.endTextCommandDisplayText( 0, 0, 0 );
                    native.clearDrawOrigin();
                }
            }
        }
		if(time == 3) posZ += 0.003;
        sayac += 0.03;
        if(sayac >= time){ alt.clearEveryTick(a); }
    });
}

function Text_Show_Vehicle(vehicle, text){
    let a = 0;
    let posZ = vehicle.pos.z + 0.1;
    let sayac = 0;
    a = alt.everyTick(() => {
        if(vehicle){
            if (Vec.distance(vehicle.pos, alt.Player.local.pos) < 30) {             
                native.setDrawOrigin(vehicle.pos.x , vehicle.pos.y , posZ, 0);
                native.beginTextCommandDisplayText( 'STRING' );
                native.addTextComponentSubstringPlayerName( text );
                native.setTextFont( 0 );
                native.setTextScale( 0.4, 0.4 );
                native.setTextWrap( 0.0, 1.0 );
                native.setTextColour( 13, 222, 0, 255 );
                native.setTextOutline();
                native.setTextDropShadow();
    
                native.endTextCommandDisplayText( 0, 0, 0 );
                native.clearDrawOrigin();
            }
            posZ += 0.003;
            sayac += 0.03;
            if(sayac >= 3){ alt.clearEveryTick(a); }
        }
    });
}

function SetClothes(componentID, drawableID, textureID){
    native.setPedComponentVariation(alt.Player.local.scriptID, componentID, drawableID, textureID, true);
}

function SetClothes_Prop(componentID, drawableID, textureID){
    native.setPedPropIndex(alt.Player.local.scriptID, componentID, drawableID, textureID);
}

function SetClothes_Set(json){
    let obj = JSON.parse(json);
    
    obj.forEach(e => {
        native.setPedComponentVariation(alt.Player.local.scriptID, e.cID, e.iID, e.tID, 2);
    });
}

function ShowScreenText(text){
    let singleTexts = 0;
    let a = 0;
    let sayac = 0;
    let pos = 0.6 - (singleTexts / 100);
    singleTexts += 1;

    a = alt.everyTick(() => {
        func.drawLongText(text, 0.5, pos, 0.3, 0, 133, 187, 101, 255, true, true, true);
        pos -= 0.0008;
        sayac += 0.03;
        if(sayac >= 3)
            alt.clearEveryTick(a);
    })

}

function WaitToEnterVehicle(triger, ErrTrigger, value, time){
    let Time = time;
    let player = alt.Player.local;

    let interval = alt.setInterval(() => {
        if(player.vehicle){
            alt.clearInterval(interval);
            if(value)
                alt.emitServer(triger, player.vehicle, value);
            else
                alt.emitServer(triger, player.vehicle);
        }
        if(Time <= 0){
            alt.clearInterval(interval);
            alt.emitServer(ErrTrigger);
        }
    }, 1000);
}

function ExitVehicleSpectator(triger){
    let time = 60;
    let player = alt.Player.local;

    let interval = alt.setInterval(() => {
        time -= 1;
        if(player.vehicle){
            alt.clearInterval(interval);
            alt.emitServer(triger, player.vehicle);
            return;
        }

        if(time <= 0){
            if(player.vehicle){
                alt.clearInterval(interval);
                alt.emitServer(triger, player.vehicle);
                return;
            }
            else{
                alt.clearInterval(interval);
                alt.emitServer(triger, null);
            }
        }

    }, 1000);
}

function VehicleChecker(triger){    
    let interval = alt.setInterval(() => {
        if(alt.Player.local.vehicle === null){
            alt.clearInterval(interval);
            alt.emitServer(triger);
        }
    }, 500)
}

function ShowIconNotification(message, title, subtitle, icon = null, color = undefined, blink = false){
    func.ShowIconNotification(message, title, subtitle, icon, color, blink);
}

async function SetWalkingStyle(style){
    let player = alt.Player.local;

    if(!native.hasClipSetLoaded(stlye)){
        native.requestClipSet(style);
        while(!native.hasClipSetLoaded(style)) await func.wait(1);
    }

    native.setPedMovementClipset(player.scriptID, style, 0.0);
}

function ClearBloodDamage(player = alt.Player.local){ // TODO Eğer hata verirse args. boşaltılacak.
    native.clearPedBloodDamage(player.scriptID);
}

function DrawSubTitle(text, duration){
    func.drawSubtitle(text, duration * 1000);
}

function TeleportToWaypoint(){
    if(!native.isWaypointActive())
        return alt.emit('chat:message', null, "{DF1111}[HATA] Öncelikle bir waypoint işaretlemelisiniz!");

    let player = alt.Player.local;
    const waypoint = native.getFirstBlipInfoId(8);
    const coords = native.getBlipInfoIdCoord(waypoint);

    let z = 0.1;
    
    native.freezeEntityPosition(player.scriptID, true);
    native.requestCollisionAtCoord(coords.x, coords.y, z);
    native.setEntityCoords(player.scriptID, coords.x, coords.y, coords.z);

    const interval = alt.setInterval(() => {
        let playerCoord = native.getEntityCoords(player.scriptID);
        let loaded, ground;

        if(z > 1999.0)
            z = 0.1;
        else
            z += 15.1;

        native.requestCollisionAtCoord(playerCoord.x, playerCoord.y, z);
        native.setEntityCoords(player.scriptID, coords.x, coords.y, z);

        [loaded, ground] = native.getGroundZFor3dCoord(playerCoord.x, playerCoord.y, playerCoord.z);
        if(loaded){
            alt.clearInterval(interval);
            z = ground;

            native.setEntityCoords(player.scriptID, coords.x, coords.y, z);
            native.freezeEntityPosition(player.scriptID, false);
            alt.emit('chat:message', null, "{28DB0F} Waypoint'e gidildi.");            
        }
    }, 0);
}

function GetPlayerFactionClothes(name){
    let player = alt.Player.local.scriptID;
    let comps = [];
    let props = [];

    for(let i = 3; i <= 11; i++){
        if(i != 7){
            let id = native.getPedDrawableVariation(ped, i);
            let texture = native.getPedTextureVariation(ped, i);
            let add = {comp: i, ID: id, texture: texture};
            comps.push(add);
        }
    }

    for(let a = 0; a <= 3; a++){
        let id = native.getPedPropIndex(ped, a);
        let texture = native.getPedPropTextureIndex(ped, a);
        let add = {prop: a, ID: id, texture: texture};
        props.push(add);
    }
    
    alt.emitServer("Faction:SaveClothes", name, JSON.stringify(comps), JSON.stringify(props));
}

function GetPlayerClothes(name){
    let ped = alt.Player.local.scriptID;
    let comps = [];
    let props = [];

    for(let i = 3; i <= 11; i++){
        if(i != 7){
            let id = native.getPedDrawableVariation(ped, i);
            let texture = native.getPedTextureVariation(ped, i);
            let add = {comp: i, ID: id, texture: texture};
            comps.push(add);
        }
    }

    for(let a = 0; a <= 3; a++){
        let id = native.getPedPropIndex(ped, a);
        let texture = native.getPedPropTextureIndex(ped, a);
        let add = {prop: a, ID: id, texture: texture};
        props.push(add);
    }
    
    alt.emitServer("Player:SaveClothes", name, JSON.stringify(comps), JSON.stringify(props));
}

function PlayerScenario(scnr){
    native.taskStartScenarioInPlace(alt.Player.local.scriptID, scnr, -1, true);
}

function ShowVehicleModifys(id){
    let veh = alt.Vehicle.getByID(id).scriptID;

    let spoiler = native.getVehicleMod(veh, 0); let frontBumber = native.getVehicleMod(veh, 1); let rearBumber = native.getVehicleMod(veh, 2);
    let sideSkirt = native.getVehicleMod(veh, 3); let exhaust = native.getVehicleMod(veh, 4); let frame = native.getVehicleMod(veh, 5); 
    let grille = native.getVehicleMod(veh, 6); let bonnet = native.getVehicleMod(veh, 7); let wingleft = native.getVehicleMod(veh, 8);
    let wingright = native.getVehicleMod(veh, 9); let roof = native.getVehicleMod(veh, 10); let engine = native.getVehicleMod(veh, 11);
    let brakes =native.getVehicleMod(veh, 12); let horns = native.getVehicleMod(veh, 14); let suspension = native.getVehicleMod(veh, 15);
    let armor = native.getVehicleMod(veh, 16); let turbo = native.getVehicleMod(veh, 18); let xenon = native.getVehicleMod(veh, 22);
    let livery = native.getVehicleMod(veh, 48); let transmission = native.getVehicleMod(veh, 13);

    let text = "{DF1111}<center>Araca Ait Modifiyeler</center><br>Spoiler: " + getModifyText(spoiler) + " | Ön Tampon: " + getModifyText(frontBumber) + " | Arka Tampon " + 
    getModifyText(rearBumber) + " | Etek: " + getModifyText(sideSkirt) + " | Egzos: " + getModifyText(exhaust) + " | Frame: " + getModifyText(frame) + " | Izgara: " + getModifyText(grille) + " | Kaput: " + getModifyText(bonnet) + 
    " | Etek Yan: " + getModifyText(wingleft) + " | Etek Yan 2: " + getModifyText(wingright) + " | Çatı: " + getModifyText(roof) + " | Motor: " + getModifyText(engine) + " | Frenler: " + getModifyText(brakes) +
    " | Korna: " + getModifyText(horns) + " | Süspansiyon: " + getModifyText(suspension) + " | Zırh: " + getModifyText(armor) + " | Turbo: " + getModifyText(turbo) + " | Xenon: " + getModifyText(xenon) + " | Livery: " + getModifyText(livery) + " | Şanzıman: " + getModifyText(transmission);

    alt.emit('chat:message', null, text);
}

function getModifyText(modLevel){
    if(modLevel < 0)
        return "Yok";
    else
        return "Var(Seviye: " + (modLevel + 1) + ")";
}

function StartSpectator(entity){
    let target = alt.Player.getByID(entity);
    let player = alt.Player.local;
    let boneindex = native.getEntityBoneIndexByName(alt.Player.getByID(entity).scriptID, "FB_R_Brow_Out_000" );
    native.attachEntityToEntity(alt.Player.local.scriptID, alt.Player.getByID(entity).scriptID, boneindex, 0, 0, -4, 0, 0, 0, true, false, true, false, 0, true)
    let interval = alt.setInterval(() => {
        if(native.isEntityAttachedToEntity(player.scriptID, target.scriptID)){
            if(interval){
            alt.clearInterval(interval);
            interval = null;}

            native.networkSetInSpectatorMode(true, target.scriptID);
            native.setMinimapInSpectatorMode(true, target.scriptID);
            
        }
        else{
            native.attachEntityToEntity(alt.Player.local.scriptID, alt.Player.getByID(entity).scriptID, boneindex, 0, 0, -4, 0, 0, 0, true, false, true, false, 0, true)
        }
    }, 50);
}

function StopSpectator(pos){
    native.detachEntity(alt.Player.local.scriptID, true, true);
    //native.setEntityVisible(alt.Player.local.scriptID, true, 0)
    native.setPedCanBeTargetted(alt.Player.local.scriptID, true);
    native.setEntityCanBeDamaged(alt.Player.local.scriptID, true);
    native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0,0,0, true);
    native.networkSetInSpectatorMode(false, alt.Player.local.scriptID);
    native.setMinimapInSpectatorMode(false, alt.Player.local.scriptID);
}

var _ControlDisable = null;
function DisableControls(){
    if(_ControlDisable)
        alt.clearInterval(_ControlDisable);

    _ControlDisable = alt.setInterval(() =>{
        control.forEach(element => {
            native.disableControlAction(2, element, true); 
        });
    }, 10)
}

function DisableControl_Close(){
    if(_ControlDisable)
    alt.clearInterval(_ControlDisable);
}

function ClearEars(){
    native.clearPedProp(alt.Player.local.scriptID, 2);
}