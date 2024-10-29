/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt';
import * as native from 'natives';

let fov_max = 80.0;
let fov_min = 10.0;
let zoomspeed = 2.0;
let speed_lr = 3.0;
let speed_ud = 3.0;
let toggle_helicam = 51;
let toggle_vision = 25;
let toggle_rappel = 154;
let toggle_spotlight = 183;
let toggle_lock_on = 22;

let helicam = false;
let polmav_hash = alt.hash('polmav');
let fov = (fov_max+fov_min) * 0.5;
let vision_state = 0; // 0 normal , 1 nightmode, 2 thermal

let interval;
alt.onServer('PD:StartPolmav', () => {
    alt.log('Helikopyer sistemi yükleniyor.');
    let cam = null;
    if(isPlayerInPolmav()){
        if(interval)
            alt.clearInterval(interval);

        let lPed = alt.Player.local.scriptID;
        let heli = alt.Player.local.vehicle.scriptID;

        let scaleform = native.requestScaleformMovie("HELI_CAM");


        interval = alt.setInterval(() => {            
            if(IsHeliHighEnough(heli)){
                if(native.isControlJustPressed(0, toggle_helicam)){
                    native.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    helicam = true;
                }

                if(native.isControlJustPressed(0, toggle_rappel)){
                    if(native.getPedInVehicleSeat(heli, -1) == lPed || native.getPedInVehicleSeat(heli, 1) == lPed) {
                        native.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        native.taskRappelFromHeli(lPed, 1);
                    }
                    else{
                        alt.emit('chat:message', null, "{DF1111}[HATA] Sürücü koltuğundayken iple sarkamazsınız!");
                    }
                }

                if(native.isControlJustPressed(0, toggle_spotlight) && native.getPedInVehicleSeat(heli, -1)){
                    // Spotlight açılacak.
                }
            }

            if(helicam){
                native.setTimecycleModifier("heliGunCam");
                native.setTimecycleModifierStrength(0.3);
                
                /*while(!native.hasScaleformMovieLoaded(scaleform)){
                    native.wait(0);
                }*/

                if(!cam)
                    cam = native.createCam("DEFAULT_SCRIPTED_FLY_CAMERA", true);

                native.attachCamToEntity(cam, heli, 0.0, 0.0, -1.5, true);
                native.setCamRot(cam, 0.0, 0.0, native.getEntityHeading(heli));
                native.setCamFov(cam, fov);
                native.renderScriptCams(true, false, 0, 1, 0);
                native.beginScaleformMovieMethod(scaleform, "SET_CAM_LOGO");
                native.scaleformMovieMethodAddParamInt(1);
                native.endScaleformMovieMethod();

                let locked_on_vehicle = null;

                //if(helicam){// && !native.isEntityDead(lPed) && (native.getVehiclePedIsIn(lPed) == heli) && IsHeliHighEnough(heli)){
                    if(native.isControlJustPressed(0, toggle_helicam)){
                        native.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        helicam = false;
                    }

                    if(native.isControlJustPressed(0, toggle_vision)){
                        native.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        ChangeVision();
                    }

                    if(locked_on_vehicle){
                        if(native.doesEntityExist(locked_on_vehicle)){
                            native.pointCamAtEntity(cam, locked_on_vehicle, 0.0, 0.0, 0.0, true);
                            RenderVehicleInfo(locked_on_vehicle);

                            if(native.isControlJustPressed(0, toggle_lock_on)){
                                native.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                locked_on_vehicle = null;
                                let rot = native.getCamRot(cam, 2);
                                let fov = native.getCamFov(cam);
                                let old_cam = cam;
                                native.destroyCam(old_cam);
                                cam = native.createCam("DEFAULT_SCRIPTED_FLY_CAM", true);
                                native.attachCamToEntity(cam, heli, 0.0, 0.0, -1.5, true);
                                native.setCamRot(cam, rot.x, rot.y, rot.z, 2);
                                native.setCamFov(cam, fov);
                                native.renderScriptCams(true, false, 0, 1, 0);
                            }
                            
                        }
                        else{
                            locked_on_vehicle = null;
                        }
                    }
                    else{
                        let zoomvalue = (1.0/(fov_max - fov_min)) * (fov-fov_min);
                        CheckInputRotation(cam, zoomvalue);
                        let vehicle_detected = GetVehicleInView(cam);
                        if(native.doesEntityExist(vehicle_detected)){
                            RenderVehicleInfo(vehicle_detected);
                            if(native.isControlJustPressed(0, toggle_lock_on)){
                                native.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                locked_on_vehicle = vehicle_detected;
                            }
                        }
                //    }
                if(!helicam){
                    //helicam = false;
                    native.clearTimecycleModifier();
                    fov = (fov_max + fov_min) * 0.5;
                    native.renderScriptCams(false, false, 0, 1, 0);
                    native.setScaleformMovieAsNoLongerNeeded(scaleform);
                    native.destroyCam(cam);
                    native.setNightvision(false);
                    native.setSeethrough(false);
                }
            }

        }, 0);
        
    }
})


function isPlayerInPolmav(){
    if(alt.Player.local.vehicle.model == polmav_hash)
        return true;
    else
        return false;    
}

function IsHeliHighEnough(heli){
    //return native.getEntityHeightAboveGround(heli);
    return true;
}

function ChangeVision(){
    if(vision_state == 0){
        native.setNightvision(true);
        vision_state = 1;
    }
    else if(vision_state == 1){
        native.setNightvision(false);
        native.setSeethrough(true);
        vision_state = 2;
    }
    else{
        native.setSeethrough(false);
        vision_state = 0;
    }
}

function HideHUDThisFrame(){
    native.hideHelpTextThisFrame();
    native.hideHudAndRadarThisFrame();
    native.hideHudComponentThisFrame(19);
    native.hideHudComponentThisFrame(1);
    native.hideHudComponentThisFrame(2);
    native.hideHudComponentThisFrame(3);
    native.hideHudComponentThisFrame(4);
    native.hideHudComponentThisFrame(13);
    native.hideHudComponentThisFrame(11);
    native.hideHudComponentThisFrame(12);
    native.hideHudComponentThisFrame(15);
    native.hideHudComponentThisFrame(18);
}

function CheckInputRotation(cam, zoomvalue){
    let rightAxisX = native.getDisabledControlNormal(0, 220);
    let rightAxisY = native.getDisabledControlNormal(0, 221);
    let rotation = native.getCamRot(cam, 2);

    if(rightAxisX != 0.0 && rightAxisY != 0.0){
        let new_z = rotation.z + rightAxisX * -1.0 * speed_ud * (zoomvalue +0.1);
        let new_x = Math.max(Math.min(20.0, rotation.x + rightAxisY * -1.0 * speed_lr * (zoomvalue + 0.1)), -89.5);
        native.setCamRot(cam, new_x , 0.0, new_z, 2);
    }
}

function HandleZoom(cam){
    if(native.isControlJustPressed(0, 241)){
        fov = Math.max(fov - zoomspeed, fov_min);
    }

    if(native.isControlJustPressed(0, 242)){
        fov = Math.min(fov + zoomspeed, fov_max);
    }

    let current_fov = native.getCamFov(cam);

    if(Math.abs(fov - current_fov) < 0.1){
        fov = current_fov;
    }
    
    native.setCamFov(cam, current_fov + (fov - current_fov) * 0.05);
}

function GetVehicleInView(cam){
    let coords = native.getCamCoord(cam);
    let forward_vector = RotAnglesToVec(native.getCamRot(cam, 2));

    let rayhandle = getEntityFromRaycast(2, true);
    return rayhandle;
}

function RenderVehicleInfo(vehicle){
    let model = native.getEntityModel(vehicle);
    let vehname = native.getLabelText(native.getDisplayNameFromVehicleModel(model));
    let licensePlate = native.getVehicleNumberPlateText(vehicle);

    native.setTextFont(0);
    native.setTextProportional(1);
    native.setTextScale(0.0, 0.55);
    native.setTextColour(255,255,255,255);
    native.setTextDropShadow(0,0,0,0,255);
    native.setTextEdge(1, 0,0 ,0, 255);
    native.setTextDropShadow();
    native.setTextOutline();
    native.beginTextCommandDisplayText("STRING");
    native.addTextComponentSubstringPlayerName("Model: " + vehname + "\nPlaka: " + licensePlate);
    native.endTextCommandDisplayText( 0, 0, 0 );
}

function RotAnglesToVec(rot){
    let z = (rot.z * Math.PI) / 180.0;
    let x = (rot.x * Math.PI) / 180.0;

    let num = Math.abs(Math.cos(x));
    return {x: -Math.sin(z)*num, y: Math.cos(z)*num,z: Math.sin(x)};
}


function getEntityFromRaycast(flag, ignorePlayer) {
    let pos = alt.Player.local.pos;
    let fv = native.getEntityForwardVector(alt.Player.local.scriptID);

    // Cast multiple raycasts from center-forward to center-downards.
    // Think of a pool noodle pointing down.
    for (let i = 1; i < 5; i++) {
        let posFront = {
            x: pos.x + fv.x * 40,
            y: pos.y + fv.y * 40,
            z: pos.z - i * 0.1
        };

        // Do a ray cast.
        let ray;
        if (ignorePlayer) {
            ray = native.startExpensiveSynchronousShapeTestLosProbe(
                pos.x,
                pos.y,
                pos.z,
                posFront.x,
                posFront.y,
                posFront.z,
                flag,
                alt.Player.local.vehicle.scriptID,
                0
            );
        } else {
            ray = native.startExpensiveSynchronousShapeTestLosProbe(
                pos.x,
                pos.y,
                pos.z,
                posFront.x,
                posFront.y,
                posFront.z,
                flag,
                undefined,
                0
            );
        }

        // Get the Result
        // eslint-disable-next-line no-unused-vars
        let [_, _hit, _endCoords, _surfaceNormal, _entity] = native.getShapeTestResult(
            ray
        );

        // Check if the entity was hit.
        if (_hit) {
            // Vehicle Type
            if (flag === 2) {
                return alt.Vehicle.all.find(v => v.scriptID === _entity); 
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
