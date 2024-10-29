///<reference types="@altv/types-client" />
///<reference types="@altv/types-natives" />
import alt from 'alt-client';
import native from 'natives';
import { distance } from '../../utils/vector';
var KMsayac, cruiser = false, cruiseSpeed, cruiseCar;
let showSpeedoMeter = true;
let send = Date.now() + 10;
alt.onServer('startKM', (vFuel, vCons, maxFuel, currKm, engineBoost)=>{
    if (alt.Player.local.vehicle != null) {
        let totalKM = 0;
        let fPos;
        var speed = 0;
        let taximeter = 0;
        let dx, dy, dz;
        const veh = alt.Player.local.vehicle;
        fPos = veh.pos;
        native.modifyVehicleTopSpeed(alt.Player.local.vehicle.scriptID, engineBoost);
        KMsayac = alt.everyTick(()=>{
            if (alt.Player.local.vehicle == null) {
                alt.clearEveryTick(KMsayac);
                if (veh && send + 1000 < Date.now()) {
                    send = Date.now();
                    alt.emitServer('UpdateVehKM', veh, totalKM); // Dracarys 20.10.2021
                }
            //showSpeedoMeter(false);
            }
            dx = fPos.x - veh.pos.x;
            dy = fPos.y - veh.pos.y;
            dz = fPos.z - veh.pos.z;
            let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            fPos = veh.pos;
            if(distance <= 30) {
                totalKM += distance;
                vFuel -= distance / 2000 * vCons;
            }            
            if (vFuel <= 0) {
                alt.clearEveryTick(KMsayac);
                alt.emitServer('Vehicle:FuelOver', veh, totalKM);
            //showSpeedoMeter(false);
            }
            speed = native.getEntitySpeed(veh.scriptID);
            //if(speedoMeter) speedoMeter.emit('speedometer:Update', (veh.rpm - 0.2 ), speed * 3.6, ((totalKM / 1000 )+ currKm).toFixed(2), veh.gear, vFuel, maxFuel);
            //drawLongText('~c~Hız: ~w~' + (speed * 3.6).toFixed(0) + "~y~km/h~w~~n~Yakıt: " + vFuel.toFixed(0) + "~g~/~w~" + maxFuel.toFixed(0) + "~n~~y~RPM: ~w~" + veh.rpm.toFixed(1) + " || ~y~Vites: ~w~" + veh.gear, 0.90, 0.80, 0.5, 4,0,0,0,255, true, true,true);
            if (showSpeedoMeter) showSpeedo(speed, vFuel, maxFuel, veh.rpm, veh.gear, totalKM / 1000 + currKm);
            if (cruiser && alt.Player.local.vehicle.scriptID == cruiseCar) {
                native.setEntityMaxSpeed(veh.scriptID, cruiseSpeed);
                if (native.hasEntityCollidedWithAnything(veh.scriptID) == false && native.isEntityInAir(veh.scriptID) == false && native.getIsVehicleEngineRunning(veh.scriptID) == true && native.isVehicleOnAllWheels(veh.scriptID) == true && native.isEntityInWater(veh.scriptID) == false && native.isEntityInAir(veh.scriptID) == false) native.setVehicleForwardSpeed(veh.scriptID, cruiseSpeed);
                else {
                    cruiser = false;
                    native.setEntityMaxSpeed(alt.Player.local.vehicle.scriptID, 2000.0);
                }
                drawLongText("~b~Hız Sabitleyici: ~g~Açık ~w~[~g~" + (speed * 3.6).toFixed(2) + "~w~ km/h]", 0.185, 0.945, 0.3, 0, 0, 0, 0, 255, true, true, false);
            }
            if (veh.hasSyncedMeta('vehicle:CruiseControl')) {
                let speed1 = veh.getSyncedMeta('vehicle:CruiseControl');
                native.setEntityMaxSpeed(veh.scriptID, speed1);
                drawLongText("~b~Hız Limitleyici: ~g~Açık ~w~[~g~" + (parseInt(speed1) * 3.6).toFixed(2) + "~w~ km/h]", 0.185, 0.96, 0.3, 0, 0, 0, 0, 255, true, true, false);
            }
            if (!alt.getMeta("player:Hud")) {
                if (veh.hasSyncedMeta('VehTaxiMeter')) {
                    taximeter += distance;
                    drawLongText("~h~~y~Taksimetre~n~~w~Ücret: ~w~$~g~" + veh.getSyncedMeta('VehTaxiMeter') + "~n~~w~Gidilen Yol: ~w~" + (taximeter / 1000).toFixed(2) + " / km ~n~~w~T.Ücret: ~g~$~w~" + taximeter / 1000 * parseInt(veh.getSyncedMeta('VehTaxiMeter')), 0.02, 0.54, 0.3, 0, 255, 255, 255, 255, true, true, false);
                }
            }
        });
    }
});
function showSpeedo(speed, fuel, maxfuel, rpm, gear, km) {
    let tork = "~h~~w~ı";
    if (rpm >= 0.3 && rpm < 0.4) tork = "~h~~g~ıI";
    else if (rpm >= 0.4 && rpm < 0.5) tork = "~h~~g~ııI";
    else if (rpm >= 0.5 && rpm < 0.6) tork = "~h~~y~ıııI";
    else if (rpm >= 0.6 && rpm < 0.8) tork = "~h~~o~ııııI";
    else if (rpm >= 0.8) tork = "~h~~r~ıııııI";
    drawLongText('Hız: ' + (speed * 3.6).toFixed(0) + " ~h~mp/h", 0.185, 0.85, 0.4, 4, 255, 255 - speed * 3.6, 255 - speed * 3.6, 255, true, true, false);
    drawLongText('~w~Vites: ~g~' + gear + " ~w~|| " + tork, 0.185, 0.875, 0.4, 4, 0, 0, 0, 255, true, true, false);
    drawLongText('~w~Yakıt: ' + fuel.toFixed(0) + "~g~/~w~" + maxfuel, 0.185, 0.90, 0.4, 4, 0, 0, 0, 255, true, true, false);
    drawLongText('~w~KM: ' + km.toFixed(2), 0.185, 0.925, 0.4, 4, 0, 0, 0, 255, true, true, false);
}
let limiter = true;
let rightSignal = false;
let leftSingla = false;
let vehicleKeyUsage = Date.now() + 1000;
alt.on('keydown', (key)=>{
    if (alt.gameControlsEnabled() && alt.Player.local.vehicle != null && alt.Player.local.seat == 1 && vehicleKeyUsage < Date.now()) {
        vehicleKeyUsage = Date.now() + 1000;
        if (key === 122) {
            if (limiter) {
                limiter = false;
                alt.emitServer('Vehicle:CruiseControl', native.getEntitySpeed(alt.Player.local.vehicle.scriptID));
                alt.setTimeout(()=>{
                    limiter = true;
                    native.setEntityMaxSpeed(alt.Player.local.vehicle.scriptID, 200.0);
                }, 500);
            }
        }
        if (key === 123) {
            if (cruiser) {
                cruiser = false;
                cruiseCar = null;
                native.setEntityMaxSpeed(alt.Player.local.vehicle.scriptID, 200.0);
            } else {
                cruiser = true;
                cruiseCar = alt.Player.local.vehicle.scriptID;
                cruiseSpeed = native.getEntitySpeed(alt.Player.local.vehicle.scriptID);
            }
        }
        if (key == 100) {
            // ! Sol sinyal
            alt.emitServer('Vehicle:SignalState', alt.Player.local.vehicle, true);
        //leftSingla = !leftSingla;
        //native.setVehicleIndicatorLights(alt.Player.local.vehicle.scriptID, 1, leftSingla);
        }
        if (key == 102) {
            // ! sağ sinyal
            alt.emitServer('Vehicle:SignalState', alt.Player.local.vehicle, false);
        //rightSignal = !rightSignal;
        //native.setVehicleIndicatorLights(alt.Player.local.vehicle.scriptID, 0, rightSignal);
        }
    }
});
let pdPlayer = [];
let isOwner = false;
alt.onServer('PD:AddPlayer', (Player, isOwner)=>{
    checkPdCars(Player, isOwner);
});
alt.onServer('PD:CloseReq', closePDCars);
alt.setInterval(showOnMapPDCars, 500);
alt.onServer('PD:UpdatePosition', updateOwner);
alt.onServer('PD:SetOwner', ()=>{
    isOwner = true;
});
function checkPdCars(Player, isOwner) {
    pdPlayer[Player] = {
        Player: Player,
        isOwner: isOwner,
        Name: "LSPD",
        Position: alt.Player.getByID(Player).pos
    };
}
function updateOwner(id, Position = {
    x: 0,
    y: 0,
    z: 0
}) {
    pdPlayer[id].Position = Position;
}
alt.setInterval(()=>{
    if (isOwner) {
        alt.emitServer("PD:HelpReqUpdate");
    }
}, 3000);
function showOnMapPDCars() {
    pdPlayer.forEach((e)=>{
        if (e) {
            let player_1 = alt.Player.getByID(e.Player);
            let b;
            if (player_1) {
                if (e.isOwner) {
                    let coord = native.getEntityCoords(player_1.scriptID, true);
                    if (coord.x == 0 && coord.y == 0 && coord.z == 0) {
                        b = new alt.PointBlip(e.Position.x, e.Position.y, e.Position.z);
                        native.setNewWaypoint(e.Position.x, e.Position.y);
                    } else {
                        b = new alt.PointBlip(player_1.pos.x, player_1.pos.y, player_1.pos.z);
                        native.setNewWaypoint(player_1.pos.x, player_1.pos.y);
                    }
                } else {
                    b = new alt.PointBlip(player_1.pos.x, player_1.pos.y, player_1.pos.z);
                }
                b.name = e.Name;
                b.sprite = 271;
                if (e.isOwner) {
                    b.color = 1;
                    b.route = true;
                    b.routeColor = 3;
                } else {
                    b.color = 38;
                }
                b.tickVisible = true;
                b.category = 2;
                b.shortRange = false;
                if (e.isOwner) {
                    b.scale = 0.9;
                } else {
                    b.scale = 0.7;
                }
            }
            alt.setTimeout(()=>{
                b.destroy();
            }, 450);
        }
    });
}
function closePDCars() {
    pdPlayer.forEach((e)=>{
        delete pdPlayer[e.Player];
    });
    pdPlayer = [];
    isOwner = false;
}
function drawLongText(text, x, y, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true, center = false) {
    native.setTextFont(fontType);
    native.setTextProportional(false);
    native.setTextScale(scale, scale);
    native.setTextColour(r, g, b, a);
    native.setTextEdge(2, 0, 0, 0, 150);
    if (useOutline) {
        native.setTextOutline();
    }
    if (useDropShadow) {
        native.setTextDropshadow(0, 0, 0, 0, 255);
        native.setTextDropShadow();
    }
    native.setTextCentre(center);
    native.beginTextCommandDisplayText("CELL_EMAIL_BCON");
    text.match(/.{1,99}/g).forEach((textBlock)=>{
        native.addTextComponentSubstringPlayerName(textBlock);
    });
    native.endTextCommandDisplayText(x, y, 0.0);
}
alt.onServer('Vehicle:Repair', (veh)=>{
    try {
        let vehicle = alt.Vehicle.getByID(veh).scriptID;
        native.setVehicleFixed(vehicle);
        native.setVehicleDeformationFixed(vehicle);
        native.setVehicleUndriveable(vehicle, false);
    } catch (e) {}
});
alt.onServer('Vehicle:OpenTrunk', (veh, state)=>{
    try {
        if (!state) {
            native.setVehicleDoorShut(veh.scriptID, 5, true);
            native.setVehicleDoorShut(veh.scriptID, 6, true);
        } else {
            native.setVehicleDoorOpen(veh.scriptID, 5, true, true);
            native.setVehicleDoorOpen(veh.scriptID, 6, true, true);
        }
    } catch (e) {}
});
alt.onServer('Vehicle:OpenHood', (veh, state)=>{
    try {
        if (!state) {
            native.setVehicleDoorShut(veh.scriptID, 4, true);
        } else {
            native.setVehicleDoorOpen(veh.scriptID, 4, true, true);
        }
    } catch (e) {}
});
alt.onServer('Vehicle:Door', (veh, state, id)=>{
    try {
        if (!state) {
            native.setVehicleDoorShut(veh.scriptID, id, true);
            native.setVehicleDoorShut(veh.scriptID, id, true);
        } else {
            native.setVehicleDoorOpen(veh.scriptID, id, true, true);
            native.setVehicleDoorOpen(veh.scriptID, id, true, true);
        }
    } catch (e) {}
});
alt.on('globalMetaChange', (key, value, oldValue)=>{
    if (key !== "player:Hud" || alt.Player.local.vehicle == null) return;
    if (value) showSpeedoMeter = false;
    else showSpeedoMeter = true;
});
// Close Window:
alt.onServer('Vehicle:FixWindows', (vehicle, seat)=>{
    native.rollUpWindow(alt.Vehicle.getByID(vehicle).scriptID, 0);
    native.rollUpWindow(alt.Vehicle.getByID(vehicle).scriptID, 1);
    native.rollUpWindow(alt.Vehicle.getByID(vehicle).scriptID, 2);
    native.rollUpWindow(alt.Vehicle.getByID(vehicle).scriptID, 3);
});
// New Vehicle Events
let lCar = {};
alt.on("gameEntityCreate", (entity)=>{
    if (entity instanceof alt.Vehicle) {
        lCar[entity.id] = entity;
        if (entity.hasStreamSyncedMeta('Vehicle:Signal:Left')) setSignalState(entity, true, entity.getStreamSyncedMeta('Vehicle:Signal:Left'));
        if (entity.hasStreamSyncedMeta('Vehicle:Signal:Right')) setSignalState(entity, false, entity.getStreamSyncedMeta('Vehicle:Signal:Right'));
        if (entity.hasStreamSyncedMeta('Vehicle:Siren')) setSirenState(entity, entity.getStreamSyncedMeta('Vehicle:Siren'));
    }
});
alt.on("gameEntityDestroy", (entity)=>{
    if (entity instanceof alt.Vehicle) delete lCar[entity.id];
});
alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue)=>{
    if (entity instanceof alt.Vehicle) {
        if (key === "Vehicle:Signal:Left") setSignalState(entity, true, value);
        else if (key === "Vehicle:Signal:Right") setSignalState(entity, false, value);
        else if (key === "Vehicle:Siren") {
            setSirenState(entity, value);
        }
    }
});
// ? Car tag name vs.
alt.everyTick(()=>{
    for(let v in lCar){
        let veh = lCar[v];
        if (!veh.valid || distance(veh.pos, alt.Player.local.pos) >= 5) continue;
        if (veh.hasSyncedMeta('VehicleisTowwed')) {
            native.setDrawOrigin(veh.pos.x, veh.pos.y, veh.pos.z + 1.5, 0);
            native.beginTextCommandDisplayText('STRING');
            native.setTextFont(4);
            native.setTextCentre(true);
            native.setTextScale(0.4, 0.4);
            native.setTextProportional(true);
            native.setTextColour(150, 0, 0, 255);
            native.addTextComponentSubstringPlayerName('Vergi Kilidi');
            native.endTextCommandDisplayText(0, 0, 0);
            native.clearDrawOrigin();
        }
        if (veh.hasStreamSyncedMeta('NameTag1')) {
            native.setDrawOrigin(veh.pos.x, veh.pos.y, veh.pos.z + 1, 0);
            native.beginTextCommandDisplayText('CELL_EMAIL_BCON');
            native.addTextComponentSubstringPlayerName(veh.getStreamSyncedMeta('NameTag1'));
            native.setTextFont(0);
            native.setTextScale(0.3, 0.3);
            native.setTextWrap(0.0, 1.0);
            native.setTextColour(13, 222, 0, 255);
            native.setTextOutline();
            native.setTextCentre(true);
            native.setTextDropShadow();
            native.endTextCommandDisplayText(0, 0, 0);
            native.clearDrawOrigin();
        }
        if (veh.hasStreamSyncedMeta('NameTag2')) {
            native.setDrawOrigin(veh.pos.x, veh.pos.y, veh.pos.z, 0);
            native.beginTextCommandDisplayText('CELL_EMAIL_BCON');
            native.addTextComponentSubstringPlayerName(veh.getStreamSyncedMeta('NameTag2'));
            native.setTextFont(0);
            native.setTextScale(0.3, 0.3);
            native.setTextWrap(0.0, 1.0);
            native.setTextColour(13, 222, 0, 255);
            native.setTextOutline();
            native.setTextDropShadow();
            native.setTextCentre(true);
            native.endTextCommandDisplayText(0, 0, 0);
            native.clearDrawOrigin();
        }
    }
});
//#region Vehicle Updates etc.
function setSignalState(vehicle, isLeft, state) {
    if (isLeft) native.setVehicleIndicatorLights(vehicle.scriptID, 1, state);
    else native.setVehicleIndicatorLights(vehicle.scriptID, 0, state);
}
function setSirenState(vehicle, state) {
    native.setVehicleHasMutedSirens(vehicle.scriptID, state);
} //#endregion
