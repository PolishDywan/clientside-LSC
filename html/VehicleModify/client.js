import * as alt from "alt";
import * as native from "natives";
let cef = null;
let currCar = null;
alt.onServer("Vehicle:OpenTuning", (veh)=>{
    cef = new alt.WebView("http://resource/client/html/VehicleModify/index.html");
    currCar = alt.Vehicle.getByID(veh);
    cef.on('Vehicle:TuningReady', ()=>{
        tuningData.forEach((t)=>{
            let currentTuning = -1;
            native.setVehicleModKit(currCar.scriptID, 1);
            currentTuning = native.getVehicleMod(currCar.scriptID, t.id);
            let maxTunning = native.getNumVehicleMods(currCar.scriptID, t.id);
            //alt.log(maxTunning);
            if (maxTunning > 0) {
                cef.emit('Tuning:SetMaxTuningValue', t.id, maxTunning, currentTuning);
            }
        });
    });
    alt.showCursor(true);
    cef.focus();
    cef.on('Vehicle:windowTint', (color)=>{
        alt.emitServer('Vehicle:T_SetWindowTint', currCar, color);
    });
    cef.on('Vehicle:Color:dashBoard', (color)=>{
        alt.emitServer('Vehicle:T_dashBoard', currCar, color);
    });
    cef.on('Vehicle:Color:headLight', (color)=>{
        alt.emitServer('Vehicle:T_HeadLight', currCar, color);
    });
    cef.on('Vehicle:Color:interior', (color)=>{
        alt.emitServer('Vehicle:T_Interior', currCar, color);
    });
    cef.on('Vehicle:Color:Neon', (R, G, B, A)=>{
        alt.emitServer('Vehicle:T_Neon', currCar, R, G, B, A);
    });
    cef.on('Vehicle:Color:pearl', (color)=>{
        alt.emitServer('Vehicle:T_Pearl', currCar, color);
    });
    cef.on('Vehicle:Color:tire', (R, G, B, A)=>{
        alt.emitServer('Vehicle:T_Tire', currCar, R, G, B, A);
    });
    cef.on('Vehicle:Color:Wheel', (color)=>{
        alt.emitServer('Vehicle:T_Wheel', currCar, color);
    });
    cef.on('Vehicle:TryModify', (tID, value)=>{
        alt.emitServer('Vehicle:T_TryModifiy', currCar, tID, value);
    });
    cef.on('Vehicle:ModifyClose', ()=>{
        alt.emitServer('Vehicle:T_Close', currCar);
    });
});
/*

 oldTuning: {
               windowTint: 0,
               standartModifiy:[
                   {ID: 1, Value: 1}
               ],
               vehColors:{
                dashBoard:0,
                headLight:0,
                interior:0,
                neon: {R: 0, G: 0, B: 0, A: 0},
                pearl:0,
                tire: {R: 0, G: 0, B: 0, A: 0},
                Wheel: 0
               }
           }

*/ // Tuning Data
let tuningData = [
    {
        id: 0,
        name: "Spoiler"
    },
    {
        id: 1,
        name: "Front Bumper"
    },
    {
        id: 2,
        name: "Rear Bumper"
    },
    {
        id: 3,
        name: "Side skirt"
    },
    {
        id: 4,
        name: "Exhaust"
    },
    {
        id: 5,
        name: "Frame"
    },
    {
        id: 6,
        name: "Grille"
    },
    {
        id: 7,
        name: "Bonnet"
    },
    {
        id: 8,
        name: "Wing (Left wing)"
    },
    {
        id: 9,
        name: "Right wing"
    },
    {
        id: 10,
        name: "Roof"
    },
    {
        id: 12,
        name: "Brakes"
    },
    {
        id: 13,
        name: "Transmission"
    },
    {
        id: 14,
        name: "Horns"
    },
    {
        id: 15,
        name: "Suspension"
    },
    {
        id: 16,
        name: "Armor"
    },
    {
        id: 18,
        name: "Turbo"
    },
    {
        id: 22,
        name: "Xenon"
    },
    {
        id: 23,
        name: "Front Wheels"
    },
    {
        id: 24,
        name: "Back Wheels"
    },
    {
        id: 25,
        name: "Plate holders"
    },
    {
        id: 26,
        name: "Plate vanity"
    },
    {
        id: 27,
        name: "Trim Design"
    },
    {
        id: 28,
        name: "Ornaments"
    },
    {
        id: 30,
        name: "Dial Design"
    },
    {
        id: 31,
        name: "Door interior"
    },
    {
        id: 32,
        name: "Seats"
    },
    {
        id: 33,
        name: "Steering Wheel"
    },
    {
        id: 34,
        name: "Shift Lever"
    },
    {
        id: 35,
        name: "Plaques"
    },
    {
        id: 36,
        name: "Rear shelf"
    },
    {
        id: 37,
        name: "Trunk"
    },
    {
        id: 38,
        name: "Hydraulics"
    },
    {
        id: 39,
        name: "Engine block"
    },
    {
        id: 40,
        name: "Air filter"
    },
    {
        id: 41,
        name: "Strut bar"
    },
    {
        id: 42,
        name: "Arch Cover"
    },
    {
        id: 43,
        name: "Antenna"
    },
    {
        id: 44,
        name: "Exterior parts"
    },
    {
        id: 45,
        name: "Tank"
    },
    {
        id: 46,
        name: "Door"
    },
    {
        id: 48,
        name: "Livery"
    }
];
// Camera
let cameraControlsInterval;
let camera;
let zpos = 0;
let fov = 90;
let startPosition;
let startCamPosition;
let timeBetweenAnimChecks = Date.now() + 100;
function createPedEditCamera(pos) {
    startPosition = pos;
    if (!camera) {
        const forwardVector = native.getEntityForwardVector(currCar);
        const forwardCameraPosition = {
            x: startPosition.x + forwardVector.x * 4.2,
            y: startPosition.y + forwardVector.y * 4.2,
            z: startPosition.z + zpos
        };
        fov = 90;
        startCamPosition = forwardCameraPosition;
        camera = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', forwardCameraPosition.x, forwardCameraPosition.y, forwardCameraPosition.z, 0, 0, 0, fov, true, 0);
        native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false);
    }
    cameraControlsInterval = alt.setInterval(handleControls, 0);
}
function destroyPedEditCamera() {
    if (cameraControlsInterval !== undefined || cameraControlsInterval !== null) {
        alt.clearInterval(cameraControlsInterval);
        cameraControlsInterval = null;
    }
    if (camera) {
        camera = null;
    }
    native.destroyAllCams(true);
    native.renderScriptCams(false, false, 0, false, false);
    zpos = 0;
    fov = 90;
    startPosition = null;
    startCamPosition = null;
}
function handleControls() {
    native.hideHudAndRadarThisFrame();
    native.disableAllControlActions(0);
    native.disableAllControlActions(1);
    native.disableControlAction(0, 0, true);
    native.disableControlAction(0, 1, true);
    native.disableControlAction(0, 2, true);
    native.disableControlAction(0, 24, true);
    native.disableControlAction(0, 25, true);
    native.disableControlAction(0, 32, true); // w
    native.disableControlAction(0, 33, true); // s
    native.disableControlAction(0, 34, true); // a
    native.disableControlAction(0, 35, true); // d
    const [_, width] = native.getActualScreenResolution(0, 0);
    const cursor = alt.getCursorPos();
    const _x = cursor.x;
    let oldHeading = native.getEntityHeading(currCar);
    // Scroll Up
    if (native.isDisabledControlPressed(0, 15)) {
        if (_x < width / 2 + 250 && _x > width / 2 - 250) {
            fov -= 2;
            if (fov < 10) {
                fov = 10;
            }
            native.setCamFov(camera, fov);
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false);
        }
    }
    // SCroll Down
    if (native.isDisabledControlPressed(0, 16)) {
        if (_x < width / 2 + 250 && _x > width / 2 - 250) {
            fov += 2;
            if (fov > 130) {
                fov = 130;
            }
            native.setCamFov(camera, fov);
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false);
        }
    }
    if (native.isDisabledControlPressed(0, 32)) {
        zpos += 0.01;
        if (zpos > 1.2) {
            zpos = 1.2;
        }
        native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
        native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false);
    }
    if (native.isDisabledControlPressed(0, 33)) {
        zpos -= 0.01;
        if (zpos < -1.2) {
            zpos = -1.2;
        }
        native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
        native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false);
    }
    // rmb
    if (native.isDisabledControlPressed(0, 25)) {
        // Rotate Negative
        if (_x < width / 2) {
            const newHeading = oldHeading -= 2;
            native.setEntityRotation(currCar, 0, 0, newHeading, 0, false);
        }
        // Rotate Positive
        if (_x > width / 2) {
            const newHeading1 = oldHeading += 2;
            native.setEntityRotation(currCar, 0, 0, newHeading1, 0, false);
        }
    }
    // d
    if (native.isDisabledControlPressed(0, 35)) {
        const newHeading2 = oldHeading += 2;
        native.setEntityRotation(currCar, 0, 0, newHeading2, 0, false);
    }
    // a
    if (native.isDisabledControlPressed(0, 34)) {
        const newHeading3 = oldHeading -= 2;
        native.setEntityRotation(currCar, 0, 0, newHeading3, 0, false);
    }
}
export function setFov(value) {
    fov = value;
    native.setCamFov(camera, fov);
    native.setCamActive(camera, true);
    native.renderScriptCams(true, false, 0, true, false);
}
export function setZPos(value) {
    zpos = value;
    native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
    native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
    native.setCamActive(camera, true);
    native.renderScriptCams(true, false, 0, true, false);
}
