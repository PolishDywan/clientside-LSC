import alt from 'alt-client';
import * as game from 'natives';
import { screenToWorld } from '../../utils/utility';
let player = alt.Player.local;
let pPed = player.scriptID;
let web = null;
let targetVehicle = null;
let policeInterval = null;
let playerVehicle = null;
alt.onServer('APL:Start', ()=>{
    policeInterval = alt.setInterval(()=>{
        if (player.vehicle != null) {
            playerVehicle = player.vehicle;
            if (playerVehicle.hasSyncedMeta('VehicleisRadarOn')) {
                if (!web) {
                    web = new alt.WebView('http://resource/client/html/policeAPL/html/index.html');
                } else {
                    // let hitTarget = getEntityFromRaycast(2, true) as number;
                    // if(hitTarget != targetVehicle){
                    //     let speed = game.getEntitySpeed(hitTarget);
                    //     let currSpeed = speed * 3.6;
                    //     currSpeed = Math.floor(currSpeed)
                    //     let plate = game.getVehicleNumberPlateText(hitTarget)
                    //     web.emit('Update', currSpeed, plate);
                    // }
                    const [_, hit, endCoords, surfaceNormal, entity] = screenToWorld(2, player.vehicle.scriptID, game.getFinalRenderedCamCoord(), game.getFinalRenderedCamRot(2));
                    if (hit) {
                        let speed = game.getEntitySpeed(entity);
                        let currSpeed = speed * 3.6;
                        currSpeed = Math.floor(currSpeed);
                        let plate = game.getVehicleNumberPlateText(entity);
                        web.emit('Update', currSpeed, plate);
                    }
                }
            }
        } else {
            if (web) {
                web.destroy();
                web = null;
                alt.clearInterval(policeInterval);
                policeInterval = null;
            }
        }
    }, 0);
});
alt.onServer('APL:Stop', ()=>{
    if (policeInterval) {
        alt.clearInterval(policeInterval);
        policeInterval = null;
        if (web) {
            web.destroy();
            web = null;
        }
    }
});
function getEntityFromRaycast(flag, ignorePlayer) {
    let pos = alt.Player.local.pos;
    let fv = game.getEntityForwardVector(alt.Player.local.scriptID);
    // Cast multiple raycasts from center-forward to center-downards.
    // Think of a pool noodle pointing down.
    for(let i = 1; i < 5; i++){
        let posFront = {
            x: pos.x + fv.x * 40,
            y: pos.y + fv.y * 40,
            z: pos.z - i * 0.1
        };
        // Do a ray cast.
        let ray;
        if (ignorePlayer) {
            ray = game.startShapeTestLosProbe(pos.x, pos.y, pos.z, posFront.x, posFront.y, posFront.z, flag, alt.Player.local.vehicle.scriptID, 0);
        } else {
            ray = game.startShapeTestLosProbe(pos.x, pos.y, pos.z, posFront.x, posFront.y, posFront.z, flag, undefined, 0);
        }
        // Get the Result
        // eslint-disable-next-line no-unused-vars
        let [_, _hit, _endCoords, _surfaceNormal, _entity] = game.getShapeTestResult(ray);
        // Check if the entity was hit.
        if (_hit) {
            // Vehicle Type
            if (flag === 2) {
                return alt.Vehicle.all.find((v)=>v.scriptID === _entity).scriptID;
            }
            // Player Type
            if (flag === 4 || flag == 8) {
                return _entity;
            }
            // Return the entityNumber for object.
            if (flag === 16) {
                return _entity;
            }
            // Just the map
            if (flag === 1) {
                return _endCoords;
            }
        }
    }
    return undefined;
}
