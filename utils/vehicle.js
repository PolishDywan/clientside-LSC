/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

import * as Vec from './etc/vector';
import * as Func from './etc/functions';

//#region Server Event Listeners
alt.onServer('startKM', startVehicleKM);

alt.on('keydown', keyDown);

alt.onServer('PD:AddPlayer', PD_AddPlayer);
alt.onServer('PD:CloseReq', PD_CloseCall);

alt.onServer('PD:UpdatePosition', UpdateOwner);
alt.onServer('PD:SetOwner', UpdateOwner);

alt.onServer('Vehicle:Repair', RepairVehicle);
alt.onServer('Vehicle:OpenTrunk', Vehicle_OpenTrunk);
alt.onServer('Vehicle:OpenHood', Vehicle_OpenHood);
alt.onServer('Vehicle:Door', Vehicle_Door);
alt.onServer('Vehicle:FixWindows', Vehicle_FixWindows);

alt.on('globalMetaChange', GlobalMetaChange);
alt.on('gameEntityCreate', GameEntityCreate);
alt.on('gameEntityDestroy', GameEntityDestroy);
alt.on('streamSyncedMetaChange', streamSyncedMetaChanged);

alt.setInterval(showOnMapPDCars, 500);
alt.everyTick(ShowVehicleNameTag);
//#endregion

var KMsayac, cruiser = false, cruiseSpeed, cruiseCar;

let showSpeedoMeter = true;
function startVehicleKM(vFuel, vCons, maxFuel, currKm, engineBoost){
    let player = alt.Player.local;
    if(player.vehicle !=  null){
        let totalKM = 0;
        let fPos;
        let speed = 0;
        let taximeter = 0;
        //let dx,dy,dz;
        const veh = player.vehicle;
        fPos = veh.pos;

        native.modifyVehicleTopSpeed(veh.scriptID, engineBoost);

        KMsayac = alt.everyTick(() => {
            if(player.vehicle == null){
                alt.clearEveryTick(KMsayac);
                alt.emitServer('UpdateVehKM', veh, totalKM);
                return;
            }

            //let distance = Vec.distance(fPos, veh.pos);
            let dx = fPos.x - veh.pos.x;
            let dy = fPos.y - veh.pos.y;
            let dz = fPos.z - veh.pos.z;
            let distance = Math.sqrt( dx * dx + dy * dy + dz * dz );

            fPos = veh.pos;
            totalKM += distance;
            vFuel -= (distance / 2000) * vCons;
            if(vFuel <= 0){
                alt.clearEveryTick(KMsayac);
                alt.emitServer('Vehicle:FuelOver', veh, totalKM);
            }

            speed = native.getEntitySpeed(veh.scriptID);

            switch(true){
                case (veh.rpm < .3):
                    var tork = "~h~~w~i";
                    break;
                case (veh.rpm < .4):
                    var tork = "~h~~g~ıI";
                    break;
                case (veh.rpm < .5):
                    var tork = "~h~~g~ııI";
                    break;
                case (veh.rpm < .6):
                    var tork = "~h~~y~ıııI";
                    break;
                case (veh.rpm >= .6):
                    var tork = "~h~~o~ııııI";
                    break;
                default:
                    var tork = "~h~~w~ı";
                    break;
            }

            if(showSpeedoMeter){
                Func.drawLongText('Hız: ' + (speed * 3.6).toFixed(0) + ' ~h~km/h', 0.185, .850, .4, 4, 255, 255 - (speed * 3.6).toFixed(0), 255 - (speed * 3.6).toFixed(0), 255, true, true, false);
                Func.drawLongText("~w~Vites: ~g~" + veh.gear + " ~w~|| " + tork, .185, .875, .4, 4, 0, 0, 0, 255, true, true, false);
                Func.drawLongText('~w~Yakıt: ' + vFuel.toFixed(0) + "~y~/~w~" + maxFuel, .185, .900, .4, 4, 0, 0, 0, 255, true, true, false);
                Func.drawLongText('~w~KM: ' + ((totalKM / 1000)+ currKm).toFixed(2), .185, .925, .4, 4, 0, 0, 0, 255, true, true, false);
            }

            if(cruiser && veh.scriptID == cruiseCar){
                native.setEntityMaxSpeed(veh.scriptID, cruiseSpeed);
                if(native.hasEntityCollidedWithAnything(veh.scriptID) == false && native.isEntityInAir(veh.scriptID) == false && native.getIsVehicleEngineRunning(veh.scriptID) == true && native.isVehicleOnAllWheels(veh.scriptID) == true && native.isEntityInWater(veh.scriptID) == false && native.isEntityInAir(veh.scriptID) == false)
                native.setVehicleForwardSpeed(veh.scriptID, cruiseSpeed);
                else{
                    cruiser = false; native.setEntityMaxSpeed(veh.scriptID, 2000.0);
                }
                Func.drawLongText("~o~Hız Sabitleyici~b~ [~w~" + (speed * 3.6).toFixed(2) + " km/h~b~]", .185, .96, .3,  0, 0, 0, 0, 255, true, true, false);
            }

            if(veh.hasSyncedMeta('vehicle:CruiseControl')){
                let speed = veh.getSyncedMeta('vehicle:CruiseControl');
                native.setEntityMaxSpeed(veh.scriptID, speed);
                Func.drawLongText("~o~Hız Limitleyici~b~ [~w~"+ (speed * 3.6).toFixed(2) + "~b~]", .185, .96, .3, 0, 0, 0, 0, 255, true, true, false);
            }

            if(veh.hasSyncedMeta('VehTaxiMeter')){
                taximeter += distance;
                Func.drawLongText("~h~~y~Taksimetre~n~~b~Ücret: ~w~$~g~"+ veh.getSyncedMeta('VehTaxiMeter') +"~n~~g~Gidilen Yol: ~w~"+ (taximeter / 1000).toFixed(2) + " / km ~n~~r~T.Ücret: ~g~$~w~" + parseInt((taximeter / 1000) * veh.getSyncedMeta('VehTaxiMeter')), 0.02, 0.54, 0.3, 0, 255,255,255,255, true, true, false);
            }
        }) 
    }
}

let limiter = true;
let leftSignal = false;
let rightSignal = false;

function keyDown(key){
    let player = alt.Player.local;
    if(alt.gameControlsEnabled() && player.vehicle != null){
        switch(key){
            case 122:
                if(limiter){
                    limiter = false;
                    alt.emitServer('Vehicle:CruiseControl', native.getEntitySpeed(player.vehicle.scriptID));
                    alt.setTimeout(() => {
                        limiter = true;
                        native.setEntityMaxSpeed(player.vehicle.scriptID, 200.0);
                    }, 1000);
                }
                break;
            case 123:
                if(cruiser){
                    cruiser = false; cruiseCar = null; native.setEntityMaxSpeed(player.vehicle.scriptID, 200.0);
                }
                else{
                    cruiser = true; cruiseCar = player.vehicle.scriptID; cruiseSpeed = native.getEntitySpeed(player.vehicle.scriptID);
                }
                break;
            case 100:
                alt.emitServer('Vehicle:SignalState', player.vehicle, true);
                break;
            case 102:
                alt.emitServer('Vehicle:SignalState', player.vehicle, false);
                break;
        }
    }
}

// PD system
let pdPlayer = [];
let isOwner = false;

function PD_AddPlayer(player, isOwner){
    pdPlayer[player] = { Player: player, isOwner: isOwner, Name: "LSPD", Position: alt.Player.getByID(player).pos};
}

function PD_CloseCall(){
    pdPlayer.forEach( e => {
        delete pdPlayer[e.Player];
    });
    pdPlayer = [];
    isOwner = false;
}

function showOnMapPDCars(){
    pdPlayer.forEach(e => {
        if(e){
            let player_1 = alt.Player.getByID(e.Player);
            let b;
            if(e.isOwner){
                let coord = native.getEntityCoords(player_1.scriptID);
                if(coord.x == 0 && coord.y == 0 && coord.z == 0){
                    b = new alt.PointBlip(e.Position.x, e.Position.y, e.Position.z);
                    native.setNewWaypoint(e.Position.x, e.Position.y);
                }
                else{
                    b = new alt.PointBlip(player_1.pos.x, player_1.pos.y, player_1.pos.z);
                    native.setNewWaypoint(player_1.pos.x, player_1.pos.y);
                }
            }
            else{
                b = new alt.PointBlip(player_1.pos.x, player_1.pos.y, player_1.pos.z);
            }

            b.name = e.Name;
            b.sprite = 271;

            if(e.isOwner){
                b.color = 1;
                b.route = true;
                b.routeColor = 3;
            }else{
                b.color = 38;
            }

            b.tickVisible = true;
            b.category = 2;

            b.shortRange = false;
            if(e.isOwner){
                b.scale = 0.9;
            }else{
                b.scale = 0.7;
            }

            alt.setTimeout(() => { b.destroy(); }, 450);
        }
    })
}

function UpdateOwner(id, Position){
    pdPlayer[id].Position = Position;
}

function setOwner(){
    isOwner = true;
}

function RepairVehicle(veh){
    try{
        let vehicle = alt.Vehicle.getByID(veh).scriptID;
        native.setVehicleFixed(vehicle);
        native.setVehicleDeformationFixed(vehicle);
        native.setVehicleUndriveable(vehicle, false);
    }
    catch{}
}

function Vehicle_OpenTrunk(veh, state){
    try{
        if(!state){
            native.setVehicleDoorShut(veh.scriptID, 5, true);
            native.setVehicleDoorShut(veh.scriptID, 6, true);
        }
        else{
            native.setVehicleDoorOpen(veh.scriptID, 5, true, true);
            native.setVehicleDoorOpen(veh.scriptID, 6, true, true);
        }
    }catch{}
}

function Vehicle_OpenHood(veh, state){
    try{
        if(!state){
            native.setVehicleDoorsShut(veh.scriptID, 4, true);
        }
        else{
            native.setVehicleDoorOpen(veh.scriptID, 4, true, true);
        }
    }catch{}
}

function Vehicle_Door(veh, state, id){
    try{
        if(!state){
            native.setVehicleDoorShut(veh.scriptID, id, true);
            native.setVehicleDoorShut(veh.scriptID, id, true);
        }
        else{
            native.setVehicleDoorOpen(veh.scriptID, id, true, true);
            native.setVehicleDoorOpen(veh.scriptID, id, true, true);
        }
    }catch{}
}

function GlobalMetaChange(key, value, oldValue){
    if(key !== "player:Hud" || alt.Player.local.vehicle == null)return;
    if(value) showSpeedoMeter = false;
    else showSpeedoMeter = true;
}

function Vehicle_FixWindows(vehicle, seat){
    let veh = alt.Vehicle.getByID(vehicle).scriptID;
    native.rollUpWindow(veh, 0);
    native.rollUpWindow(veh, 1);
    native.rollUpWindow(veh, 2);
    native.rollUpWindow(veh, 3);
}

let lCar = {};

function GameEntityCreate(entity){
    if(entity instanceof alt.Vehicle){
        lCar[entity.id] = entity;
        if(entity.hasStreamSyncedMeta('Vehicle:Signal:Left'))
            setSignalState(entity, true, entity.getStreamSyncedMeta('Vehicle:Signal:Left'));

        if(entity.hasStreamSyncedMeta('Vehicle:Signal:Right'))
            setSignalState(entity, false, entity.getStreamSyncedMeta('Vehicle:Signal:Right'))

        if(entity.hasStreamSyncedMeta('Vehicle:Siren'))
            setSirenState(entity, entity.getStreamSyncedMeta('Vehicle:Siren'))
    }
}

function GameEntityDestroy(entity){
    if(entity instanceof alt.Vehicle)
        delete lCar[entity.id];
}

function streamSyncedMetaChanged(entity, key, value, oldValue){
    if(entity instanceof alt.Vehicle){
        switch(key){
            case "Vehicle:Signal:Left":
                setSignalState(entity, true, value);
                break;
            case "Vehicle:Signal:Right":
                setSignalState(entity, false, value);
                break;
            case "Vehicle:Siren":
                setSirenState(entity, value);
                break;
        }
    }
}

function setSignalState(vehicle, isLeft, state){
    if(isLeft) native.setVehicleIndicatorLights(vehicle.scriptID, 1, state);
    else native.setVehicleIndicatorLights(vehicle.scriptID, 0, state);
}

function setSirenState(vehicle, state){
    native.setVehicleHasMutedSirens(vehicle.scriptID, state);
}

async function ShowVehicleNameTag(){
    for (let v in lCar)
    {
        let veh = lCar[v];
        if (!veh.valid || Vec.distance(veh.pos, alt.Player.local.pos) >= 5) continue;
        if(veh.hasSyncedMeta('VehicleisTowwed')){
        native.setDrawOrigin(veh.pos.x, veh.pos.y, veh.pos.z + 1.5, false);
        native.beginTextCommandDisplayText('STRING');
        native.setTextFont(4);
        native.setTextCentre(true);
        native.setTextScale(0.4, 0.4);
        native.setTextProportional(true);
        native.setTextColour(150, 0, 0, 255);
        native.addTextComponentSubstringPlayerName('Vergi Kilidi');
        native.endTextCommandDisplayText(0, 0);
        native.clearDrawOrigin();
        }

        if(veh.hasStreamSyncedMeta('NameTag1')){
            native.setDrawOrigin(veh.pos.x , veh.pos.y , veh.pos.z + 1 , 0);
            native.beginTextCommandDisplayText( 'CELL_EMAIL_BCON' );
            native.addTextComponentSubstringPlayerName(veh.getStreamSyncedMeta('NameTag1'));
            native.setTextFont(0);
            native.setTextScale(0.3, 0.3);
            native.setTextWrap( 0.0, 1.0 );
            native.setTextColour( 13, 222, 0, 255 );
            native.setTextOutline();
            native.setTextCentre(true);
            native.setTextDropShadow();
            native.endTextCommandDisplayText( 0, 0, 0 );
            native.clearDrawOrigin();
        }

        if(veh.hasStreamSyncedMeta('NameTag2')){
            native.setDrawOrigin(veh.pos.x , veh.pos.y , veh.pos.z , 0);
            native.beginTextCommandDisplayText( 'CELL_EMAIL_BCON' );
            native.addTextComponentSubstringPlayerName(veh.getStreamSyncedMeta('NameTag2'));
            native.setTextFont(0);
            native.setTextScale(0.3, 0.3);
            native.setTextWrap( 0.0, 1.0 );
            native.setTextColour( 13, 222, 0, 255 );
            native.setTextOutline();
            native.setTextDropShadow();
            native.setTextCentre(true);
            native.endTextCommandDisplayText( 0, 0, 0 );
            native.clearDrawOrigin();
        }
    }
}