///<reference types="@altv/types-client" />
///<reference types="@altv/types-natives" />

import * as alt from 'alt';
import * as native from 'natives';

import {distance} from './utilities/vector.js';

var control = [
    140,141,142,257,263,264,24,25,22, // saldırı
    59, // araç
    69,92,114 // araçta saldırı
];
var tick;

alt.onServer('player:CuffEvent', playerCuffEvent);
native.requestAnimDict('mp_arresting');


function playerCuffEvent(status) {
    if (status) {
       native.setEnableHandcuffs(alt.Player.local.scriptID, true);
       if(alt.Player.local.getSyncedMeta('PlayerSex') == 0) native.setPedComponentVariation(alt.Player.local.scriptID, 7,25,0, 2);
       else native.setPedComponentVariation(alt.Player.local.scriptID, 7,41,0, 2);
       

        tick = alt.everyTick(function(){
            control.forEach(element => {
                native.disableControlAction(2, element, true); 
            });
            
            if(!native.isEntityPlayingAnim(alt.Player.local.scriptID, 'mp_arresting', 'idle', 3)){
            native.taskPlayAnim(alt.Player.local.scriptID,'mp_arresting','idle', 8.0,-8,-1,49,1,false,false,false);
            }
        });      
    }
    else {
        native.setEnableHandcuffs(alt.Player.local.scriptID, false);
        if(alt.Player.local.getSyncedMeta('PlayerSex') == 0) native.setPedComponentVariation(alt.Player.local.scriptID, 7,41,1, 2);
           else native.setPedComponentVariation(alt.Player.local.scriptID, 7,0,0, 2);
           
        if(tick) alt.clearEveryTick(tick);
        native.clearPedTasks(alt.Player.local.scriptID);
    }
}


//--------- KeyDowns -----------
let eventKey_E = true;
alt.on('keyup', (key) => {
    if (key === 69) {
        if(eventKey_E){
            if(alt.gameControlsEnabled()){    
                eventKey_E = false;
                alt.emitServer("player:EventKey:E");
                alt.setTimeout(() => { eventKey_E = true; }, 300);
            }
        }
    }
});
//-------- KeyDowns End -----------

//-------- Other Server Events ------------
export function setPlayerToVehicle( vehicle ) {
    if ( vehicle === null || !vehicle.valid ) return;
    
    let interval = alt.setInterval( () => {
        if ( alt.Player.local.vehicle == vehicle ) alt.clearInterval(interval);
		
        native.taskEnterVehicle(alt.Player.local.scriptID, vehicle.scriptID, 100, -1, 2, 16, 0);
    }, 0 );
}

export function setPlayerOutVehicle( vehicle ) {
    if ( vehicle === null || !vehicle.valid ) return;
    
    let interval = alt.setInterval( () => {
        if ( alt.Player.local.vehicle == vehicle ) alt.clearInterval(interval);
		
        native.taskLeaveVehicle(alt.Player.local.scriptID, vehicle.scriptID, 0);
    }, 0 );
}

alt.onServer( "setPlayerOutVehicle", vehicle => {
    setPlayerOutVehicle( vehicle )
});

alt.onServer( "setPlayerToVehicle", vehicle => {
    setPlayerToVehicle( vehicle )
});

alt.onServer('Text:ShowAll', (player, text, time = 3) =>{
    if(!player) return;
    let a = 0;
    let posZ = player.pos.z + 0.1;
    let sayac = 0;
    a = alt.setInterval(() => {
        if (player && player.valid && distance(player.pos, alt.Player.local.pos) < 30) {
            native.requestPedVisibilityTracking(player.scriptID);
            if(player === alt.Player.local){
                native.setDrawOrigin(player.pos.x, player.pos.y, posZ, 0);    
                    native.setDrawOrigin(player.pos.x , player.pos.y , posZ, 0);
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
            else {
                if (native.isTrackedPedVisible(player.scriptID)) {    
                    native.setDrawOrigin(player.pos.x , player.pos.y , posZ, 0);
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
            }
        }
		if(time == 3) posZ += 0.003;
        sayac += 0.03;
        if(sayac >= time){ alt.clearInterval(a); }
    },0);   

});

alt.onServer('Text:ShowAllVehicle', (vehicle, text) =>{
    let a = 0;
    let posZ = vehicle.pos.z + 0.1;
    let sayac = 0;
    a = alt.setInterval(() => {        
        if(vehicle || vehicle.pos != null | undefined){ // Önceki if(vehicle.pos) // Dracarys 20.10.2021
            if (distance(vehicle.pos, alt.Player.local.pos) < 30) {             
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
            if(sayac >= 3){ alt.clearInterval(a); }
        }
        else {alt.clearInterval(a);}
    },0);   

});

alt.onServer('SetClothes', (a,b,c) => {
    native.setPedComponentVariation(alt.Player.local.scriptID, a, b, c, 2);
});

alt.onServer('SetClothesProps', (a,b,c) => {
    native.setPedPropIndex(alt.Player.local.scriptID, a, b, c, true)
});

alt.onServer('SetClothSet', (data) => {
    let obj = JSON.parse(data);
    obj.forEach(e => {
        native.setPedComponentVariation(alt.Player.local.scriptID, e.cID, e.iID, e.tID, 2);
    })
});

let singleTexts = 0;
alt.onServer('Text:ShowPlayer', (text) => {
    let a = 0;
    let sayac = 0;
    let pos = 0.6 - (singleTexts / 100);
    singleTexts += 1;
    a = alt.setInterval( () => {
        drawLongText(text, 0.5, pos, 0.3, 0, 133, 187, 101, 255, true, true, true);
        pos -= 0.0008;
        sayac += 0.03;
        if(sayac >= 3){ singleTexts -= 1; alt.clearInterval(a); }
    },0 );
});
let checkpointId = null;
let checkpointInterval = null; 
alt.onServer('Checkpoint:Create', (pos, cType, radius, r,g,b,a, triger, extravalue) => {
       
    let player = alt.Player.local;
    if(checkpointId != null){
        native.deleteCheckpoint(checkpointId);  
        alt.clearInterval(checkpointInterval);      
    }
    
    native.setNewWaypoint(pos.x, pos.y);
    checkpointId = native.createCheckpoint(cType, pos.x, pos.y, pos.z, pos.x, pos.y, pos.z, radius, r,g,b,a,0);
    checkpointInterval = alt.setInterval(() => {
        if(distance(player.pos, pos) < radius){
            if(extravalue !== null){
                alt.emitServer(triger, extravalue);
                native.deleteCheckpoint(checkpointId);
                checkpointId = null;
                alt.clearInterval(checkpointInterval);
                checkpointInterval = null;
            }
            else{
                alt.emitServer(triger);
                native.deleteCheckpoint(checkpointId);
                checkpointId = null;
                alt.clearInterval(checkpointInterval);
                checkpointInterval = null;
            }
        }
    }, 0)
})
alt.onServer('Checkpoint:Destroy', () => {
    if(checkpointId) native.deleteCheckpoint(checkpointId);  
    if(checkpointInterval) alt.clearInterval(checkpointInterval);  
});

alt.onServer('Player:WaitToEnterVehicle', (triger, ErrTriger, value, time) => {
    let interval;
    let Time = time;
    let player = alt.Player.local;
    interval = alt.setInterval(() => {
        Time -= 1;
        if(alt.Player.local.vehicle){
            if(value){
                alt.emitServer(triger, alt.Player.local.vehicle, value);
                alt.clearInterval(interval);
            }
            alt.emitServer(triger, alt.Player.local.vehicle);
            alt.clearInterval(interval);            
        }
        if(Time <= 0){
            alt.emitServer(ErrTriger);
            alt.clearInterval(interval);  
        }
    }, 1000)
});

alt.onServer('Player:ExitVehicleSpector', (triger) => {
    let interval;
    let time = 60;
    interval = alt.setInterval( () => {
        time -= 1;
        if(alt.Player.local.vehicle){
            alt.emitServer(triger, alt.Player.local.vehicle);
            alt.clearInterval(interval);
            return;
        }

        if(time <= 0){
            if(alt.Player.local.vehicle){
                alt.emitServer(triger, alt.Player.local.vehicle);
                alt.clearInterval(interval);
                return;
            }
            
            alt.emitServer(triger, null);      
            alt.clearInterval(interval);
            return;      
        }
    }, 1000);
});

alt.onServer("Player:VehicleExitWatch", (triger) =>{
    let interval;
    interval = alt.setInterval(() => {
        if(alt.Player.local.vehicle === null){
            alt.emitServer(triger);
            alt.clearInterval(interval);
        }
    }, 500);
})

alt.onServer('Notification:Show', (message, title, subtitle, icon = null, color = undefined, blink = false) => {
    ShowIconNotification(message, title, subtitle, icon, color, blink);
});

alt.onServer('Player:SetWalkingStyle', (style) => {
    native.resetPedMovementClipset(alt.Player.local.scriptID, 0);
    let clipset = style;
    native.requestAnimSet(clipset);
    alt.setTimeout(() => { 
        native.setPedWeaponMovementClipset(alt.Player.local.scriptID, clipset);
     }, 1000);
})

alt.onServer('Injured:ClearBloods', () => {
   native.clearPedBloodDamage(alt.Player.local.scriptID);
});


//-------- Other Server Events End ----------


function getClosestVehicle() {
    let closestVehicle = null;
    let lastDistance = 10;
    alt.Vehicle.all.forEach((v) => {
        let distance = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, v.pos.x, v.pos.y, v.pos.z, false);
        if (distance < lastDistance) {
            closestVehicle = v;
            lastDistance = distance;
        }
    });
    return closestVehicle;
}

function drawLongText(text, x, y, scale = 0.3, fontType, r, g, b, a, useOutline = true, useDropShadow = true, center = false) {
    native.setTextFont(fontType);
    native.setTextProportional(false);
    native.setTextScale(scale, scale);
    native.setTextColour(r, g, b, a);
    native.setTextEdge(2, 0, 0, 0, 150);

    if(useOutline) { 
        native.setTextOutline();
    }
    if(useDropShadow) {
        native.setTextDropshadow(0, 0, 0, 0, 255);
        native.setTextDropShadow();
    }

    native.setTextCentre(center);
    native.beginTextCommandDisplayText("CELL_EMAIL_BCON");

    text.match(/.{1,99}/g).forEach(textBlock => {
        native.addTextComponentSubstringPlayerName(textBlock);
    });
    native.endTextCommandDisplayText(x, y, 0.0);
}

async function ShowIconNotification(
    message,
    title,
    subtitle,
    icon,
    color = undefined,
    blink = false
) {    
    if (icon != null) {
        let pedHeadshot = native.registerPedheadshot(icon.scriptID);
        icon = await loadPlayerHead(pedHeadshot);
    }

    native.beginTextCommandThefeedPost('CELL_EMAIL_BCON');

    native.addTextComponentSubstringPlayerName(message);


    if (icon) native.endTextCommandThefeedPostMessagetext(icon, icon, false, 0, title, subtitle);
    if (color) native.thefeedSetNextPostBackgroundColor(color);
    native.endTextCommandThefeedPostTicker(blink, false);

    native.unregisterPedheadshot(alt.Player.local.scriptID);
}

function loadPlayerHead(pedHeadshot) {
    return new Promise(resolve => {
        let interval = alt.setInterval(() => {
            if (native.isPedheadshotReady(pedHeadshot) && native.isPedheadshotValid(pedHeadshot)) {
                alt.clearInterval(interval);
                return resolve(native.getPedheadshotTxdString(pedHeadshot));
            }
        }, 0);
    });
}


alt.onServer('Show:Subtitle', (text, duration) => {
    drawSubtitle(text, duration * 1000);
});

function drawSubtitle(text, duration) {
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}

alt.onServer('teleportToWaypoint', () => {
    if(!native.isWaypointActive())
    return alt.emit('chat:message', null, "{DF1111}[HATA] Öncelikle bir waypoint işaretlemelisiniz!");

    let player = alt.Player.local;
    const waypoint = native.getFirstBlipInfoId(8);
    const coords = native.getBlipInfoIdCoord(waypoint);

    let z = 0.1;

    native.freezeEntityPosition(player.scriptID, true);
    native.requestCollisionAtCoord(coords.x, coords.y, z);
    native.setEntityCoords(player.scriptID, coords.x, coords.y, coords.z, true, true, true, true);

    const interval = alt.setInterval(() => {
        let playerCoord = native.getEntityCoords(player.scriptID, true);
        let loaded, ground;

        if(z > 1999.0)
            z = 0.1;
        else
            z += 15.1;

        native.requestCollisionAtCoord(playerCoord.x, playerCoord.y, z);
        native.setEntityCoords(player.scriptID, coords.x, coords.y, z, true, true, true, true);

        [loaded, ground] = native.getGroundZFor3dCoord(playerCoord.x, playerCoord.y, playerCoord.z, 0, true, 0);
        if(loaded){
            alt.clearInterval(interval);
            z = ground;

            native.setEntityCoords(player.scriptID, coords.x, coords.y, z, true, true, true, true);
            native.freezeEntityPosition(player.scriptID, false);
            alt.emit('chat:message', null, "{28DB0F} Waypoint'e gidildi.");            
        }
    }, 0);
  });



alt.onServer("Faction:CheckClothes", (name) => {
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
    
    alt.emitServer("Faction:SaveClothes", name, JSON.stringify(comps), JSON.stringify(props));
})

alt.onServer("Player:CheckClothes", (name) => {
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
        if(a == 3){
            let id = native.getPedPropIndex(ped, a + 3);
            let texture = native.getPedPropTextureIndex(ped, a + 3);
            let add = {prop: (a + 3), ID: id, texture: texture};
            props.push(add);
        }
        else{
            let id = native.getPedPropIndex(ped, a);
            let texture = native.getPedPropTextureIndex(ped, a);
            let add = {prop: a, ID: id, texture: texture};
            props.push(add);
        }
    }
    
    alt.emitServer("Player:SaveClothes", name, JSON.stringify(comps), JSON.stringify(props));
})


let currentCam = null
let _camInterval = null;

alt.onServer('News:StartCamera', (id) => {
    // if (currentCam) {
    //      native.destroyCam(currentCam, false);
    //     native.renderScriptCams(false, false, 0, false, false, 0); 
    //     native.detachEntity(alt.Player.local.scriptID, true, true);
    //     native.setEntityVisible(alt.Player.local.scriptID, true, 0)
    //     native.setPedCanBeTargetted(alt.Player.local.scriptID, true);
    //     native.setEntityCanBeDamaged(alt.Player.local.scriptID, true);
    //     //native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0,0,0, true);      
    //     native.setPedConfigFlag(alt.Player.local.scriptID, 314, false); 
    //     //native.destroyAllCams(true);
    //     native.renderScriptCams(false, false, 0, false, false, 0);
    //     currentCam = null;
    // }
    native.destroyAllCams(true);
    alt.setMeta("player:News", true);
    let target = alt.Player.getByID(id);
    let player = alt.Player.local;

    let boneindex = native.getEntityBoneIndexByName(target.scriptID, "FB_R_Brow_Out_000" );
    native.attachEntityToEntity(alt.Player.local.scriptID, target.scriptID, boneindex, 0, 0, -0.3, 0, 0, 0, true, false, true, false, 0, true)
    native.freezeEntityPosition(alt.Player.local.scriptID, true);

    _camInterval = alt.everyTick(() => {
        if(native.isEntityAttachedToEntity(player.scriptID, target.scriptID)){
            
            if(!currentCam){
            currentCam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA',
                target.pos.x,
                target.pos.y,
                target.pos.z + 1,
                target.rot.x,
                target.rot.y,
                target.rot.z,
                60,
                true,
                0
                );          
            }   

            native.setCamActive(currentCam, true);
            native.renderScriptCams(true, false, 0, true, false, 0);
        
            native.attachCamToEntity(currentCam, target.scriptID, 0.35,0.0,0.6, true);
            let rot = native.getEntityRotation(target.scriptID, 2);
            native.setCamRot(currentCam, rot.x, rot.y, rot.z, 0);
            native.setCamActive(currentCam, true);
            native.renderScriptCams(true, false, 0, true, false, 0);      
            native.attachCamToEntity(currentCam, target.scriptID, 0.35,0.0,0.6, true);
            control.forEach(element => {
                native.disableControlAction(2, element, true); 
            });
  
        }
        else{
            native.attachEntityToEntity(alt.Player.local.scriptID, alt.Player.getByID(id).scriptID, boneindex, 0, 0, -4, 0, 0, 0, true, false, true, false, 0, true)
        }
    });

    

})



alt.onServer('News:StopCamera', (pos) => {
    if(_camInterval){
        alt.clearEveryTick(_camInterval);
        _camInterval == null;
    }
    
    currentCam = null;
    alt.setTimeout(() => {
        native.destroyCam(currentCam, false);
        native.renderScriptCams(false, false, 0, false, false, 0); 
        native.detachEntity(alt.Player.local.scriptID, true, true);
        native.setEntityVisible(alt.Player.local.scriptID, true, 0)
        native.setPedCanBeTargetted(alt.Player.local.scriptID, true);
        native.setEntityCanBeDamaged(alt.Player.local.scriptID, true);
        //native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0,0,0, true);      
        native.setPedConfigFlag(alt.Player.local.scriptID, 314, false); 
        //native.destroyAllCams(true);
        native.renderScriptCams(false, false, 0, false, false, 0);
    }, 50);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    alt.setMeta("player:News", false);
})

alt.onServer('PlayerScenario', (scnr) => {
    native.taskStartScenarioInPlace(alt.Player.local.scriptID, scnr, -1, true);
})


alt.onServer('Show:VehicleModify', (id) => {
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
})

function getModifyText(modLevel){
    if(modLevel < 0)
        return "Yok";
    else
        return "Var(Seviye: " + (modLevel + 1) + ")";
}

alt.onServer('Spec:ON', (entity) => {
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
    /*
    let boneindex = native.getEntityBoneIndexByName(alt.Player.getByID(entity).scriptID, "FB_R_Brow_Out_000" )
    native.attachEntityToEntity(alt.Player.local.scriptID, alt.Player.getByID(entity).scriptID, boneindex, 0, 0, -4, 0, 0, 0, true, false, true, false, 0, true)
    //native.setEntityVisible(alt.Player.local.scriptID, false, 0)
    native.setPedCanBeTargetted(alt.Player.local.scriptID, false);
    native.setEntityCanBeDamaged(alt.Player.local.scriptID, false);
    alt.setTimeout(() =>{
        //native.setEntityVisible(alt.Player.local.scriptID, false, 0)
        native.setPedCanBeTargetted(alt.Player.local.scriptID, false);
        native.setEntityCanBeDamaged(alt.Player.local.scriptID, false);
    }, 500)

    alt.setTimeout(() => {
        let boneindex = native.getEntityBoneIndexByName(alt.Player.getByID(entity).scriptID, "FB_R_Brow_Out_000" )
        native.attachEntityToEntity(alt.Player.local.scriptID, alt.Player.getByID(entity).scriptID, boneindex, 0, -5, 2, 0, 0, 0, true, false, true, false, 0, true)
        //native.setEntityVisible(alt.Player.local.scriptID, false, 0)
        native.setPedCanBeTargetted(alt.Player.local.scriptID, false);
        native.setEntityCanBeDamaged(alt.Player.local.scriptID, false);
    },200)

    alt.setTimeout(() =>{
        native.setEntityVisible(alt.Player.local.scriptID, false, 0)
        native.setPedCanBeTargetted(alt.Player.local.scriptID, false);
        native.setEntityCanBeDamaged(alt.Player.local.scriptID, false);
    }, 1000) */
})

alt.onServer('Spec:OFF', (pos) => {
    native.detachEntity(alt.Player.local.scriptID, true, true);
    //native.setEntityVisible(alt.Player.local.scriptID, true, 0)
    native.setPedCanBeTargetted(alt.Player.local.scriptID, true);
    native.setEntityCanBeDamaged(alt.Player.local.scriptID, true);
    native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0,0,0, true);
    native.networkSetInSpectatorMode(false, alt.Player.local.scriptID);
    native.setMinimapInSpectatorMode(false, alt.Player.local.scriptID);
  })

let _ControlDisable = null;
alt.onServer('Controls:Disable', () => {
    if(_ControlDisable)
        alt.clearInterval(_ControlDisable);

    _ControlDisable = alt.setInterval(() =>{
        control.forEach(element => {
            native.disableControlAction(2, element, true); 
        });
    }, 10)
})

alt.onServer('Controls:Disable:Close', () =>  {
    if(_ControlDisable)
        alt.clearInterval(_ControlDisable);
})

alt.onServer('Clear:Ears', () => {
    native.clearPedProp(alt.Player.local.scriptID, 2);
})

alt.onServer('Noti:Show', leftBottomNotifyShow);
function leftBottomNotifyShow(message, flashing = false, textColor = -1, bgColor = -1, flashColor = [0, 0, 0, 50] ) {
	native.beginTextCommandThefeedPost('STRING');

	if (textColor > -1) native.setColourOfNextTextComponent(textColor);
	if (bgColor > -1) native.thefeedSetNextPostBackgroundColor(bgColor);
	if (flashing) {
		native.thefeedSetAnimpostfxColor(
			flashColor[0],
			flashColor[1],
			flashColor[2],
			flashColor[3]
		);
	}

	native.addTextComponentSubstringPlayerName(message);

	native.endTextCommandThefeedPostTicker(flashing, true);
}

alt.onServer('Noti:ShowPicture', leftBottomNotifyShowWithPicture)
function leftBottomNotifyShowWithPicture(title, sender, message, notifPic, iconType = 0, flashing = false, textColor = -1,
	bgColor = -1, flashColor = [0, 0, 0, 50]) {
	native.beginTextCommandThefeedPost('CELL_EMAIL_BCON');

	if (textColor > -1) native.setColourOfNextTextComponent(textColor);
	if (bgColor > -1) native.thefeedSetNextPostBackgroundColor(bgColor);
	if (flashing) {
		native.thefeedSetAnimpostfxColor(
			flashColor[0],
			flashColor[1],
			flashColor[2],
			flashColor[3]
		);
	}

    message.match(/.{1,99}/g).forEach(textBlock => {
        native.addTextComponentSubstringPlayerName(textBlock);
    });
    
	//native.addTextComponentSubstringPlayerName(message);

	native.endTextCommandThefeedPostMessagetext(
		notifPic,
		notifPic,
		flashing,
		iconType,
		title,
		sender
	);

	native.endTextCommandThefeedPostTicker(flashing, true);
}

alt.onServer('FacialAnimation', (type) => {
    switch(type){
        case 1: var animation = "mood_angry_1"; break;
        case 2: var animation = "mood_drunk_1"; break;
        case 3: var animation = "pose_injured_1"; break;
        case 4: var animation = "electrocuted_1"; break;
        case 5: var animation = "effort_1"; break;
        case 6: var animation = "mood_drivefast_1"; break;
        case 7: var animation = "pose_angry_1"; break;
        case 8: var animation = "mood_happy_1"; break;
        case 9: var animation = "mood_injured_1"; break;
        case 10: var animation = "mood_dancing_low_1"; break;
        case 11: var animation = "smoking_hold_1"; break;
        case 12: var animation = "pose_normal_1"; break;
        case 13: var animation = "pose_aiming_1"; break;
        case 14: var animation = "shocked_1"; break;
        case 15: var animation = "shocked_2"; break;
        case 16: var animation = "mood_sleeping_1"; break;
        case 17: var animation = "dead_1"; break;
        case 18: var animation = "dead_2"; break;
        case 19: var animation = "mood_smug_1"; break;
        case 20: var animation = "mood_aiming_1"; break;
        case 21: var animation = "mood_stressed_1"; break;
        case 22: var animation = "mood_sulk_1"; break;
        case 23: var animation = "effort_2"; break;
        case 24: var animation = "effort_3"; break;
        default: var animation = "mood_angry_1"; break;
    }

    native.playFacialAnim(alt.Player.local.scriptID, "facials@gen_female@base", animation);
})