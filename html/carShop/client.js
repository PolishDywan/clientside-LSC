function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
import * as alt from "alt-client";
import * as native from "natives";
let cef = null;
let carList = [];
let currState = 0;
let currCar = null;
let interval = null;
let heading = 0;
let carShowPos;
let oldPos = null;
let canUse = true;
alt.onServer("CarShop:Show", (vehList, spawnPos)=>{
    canUse = true;
    cef = new alt.WebView("http://resource/client/html/carShop/index.html");
    carList = JSON.parse(vehList);
    carShowPos = spawnPos;
    firstCreateVehicle("adder");
    //currState = state;
    alt.showCursor(true);
    cef.focus();
    oldPos = alt.Player.local.pos;
    cef.on("load", ()=>{
        alt.setTimeout(()=>{
            cef.emit("CarShop:LoadCarList", vehList);
        }, 400);
    });
    createPedEditCamera(spawnPos);
    cef.on("carCEF:ChangeCar", createVehicle);
    cef.on("carCEF:WantBuyCar", (ID)=>{
        if (canUse) {
            alt.emitServer("VehicleVendor:WantBuy", ID);
            canUse = false;
        }
    });
    cef.on("carCEF:CloseShop", closeShop);
});
alt.onServer("CarShop:Succes", ()=>{
    closeShop();
    canUse = true;
    drawSubtitle("~g~Aracı başarıyla satın aldınız.", 5000);
});
alt.onServer("CarShop:Fail", ()=>{
    canUse = true;
    drawSubtitle("~r~Bu araç için yeterli paranız bulunmuyor.", 5000);
});
function closeShop() {
    if (cef) {
        cef.unfocus();
        cef.destroy();
        cef = null;
        alt.showCursor(false);
    }
    alt.toggleGameControls(true);
    alt.emitServer("CarShop:Close");
    if (currCar) {
        native.deleteVehicle(currCar);
    }
    destroyPedEditCamera();
}
function firstCreateVehicle(model) {
    if (currCar) native.deleteVehicle(currCar);
    loadModelAsync(model);
    currCar = native.createVehicle(native.getHashKey(model), carShowPos.x, carShowPos.y, carShowPos.z, 0, false, false, false);
    if (cef) {
        let carInfo = getVehicleStats(currCar);
        cef.emit("CarShop:ShowCarStats", carInfo[0], carInfo[1], carInfo[2], carInfo[3]);
    //createPedEditCamera(currCar);
    }
}
let canCreate = true;
function createVehicle(model) {
    return _createVehicle.apply(this, arguments);
}
function _createVehicle() {
    _createVehicle = _asyncToGenerator(function*(model) {
        if (canCreate) {
            canCreate = false;
            if (currCar) native.deleteVehicle(currCar);
            yield loadModelAsync(model);
            currCar = native.createVehicle(native.getHashKey(model), carShowPos.x, carShowPos.y, carShowPos.z, 0, false, false, false);
            if (cef) {
                let carInfo = getVehicleStats(currCar);
                cef.emit("CarShop:ShowCarStats", carInfo[0], carInfo[1], carInfo[2], carInfo[3]);
            //createPedEditCamera(currCar);
            }
            canCreate = true;
        }
    });
    return _createVehicle.apply(this, arguments);
}
// Subtitle
function drawSubtitle(text, duration) {
    native.beginTextCommandPrint("STRING");
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}
function getVehicleStats(veh) {
    let speed = native.getVehicleEstimatedMaxSpeed(veh);
    let breaking = native.getVehicleMaxBraking(veh);
    let horsePower = native.getVehicleMaxTraction(veh);
    let RPM = native.getVehicleAcceleration(veh);
    return [
        speed,
        breaking,
        horsePower,
        RPM
    ];
}
function loadModelAsync(model) {
    return new Promise((resolve, reject)=>{
        if (typeof model === "string") {
            model = native.getHashKey(model);
        }
        if (!native.isModelValid(model)) return resolve(false);
        if (native.hasModelLoaded(model)) return resolve(true);
        native.requestModel(model);
        let interval = alt.setInterval(()=>{
            if (native.hasModelLoaded(model)) {
                alt.clearInterval(interval);
                return resolve(true);
            }
        }, 0);
    });
}
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
        native.renderScriptCams(true, false, 0, true, false, 0);
    }
    alt.setTimeout(()=>{
        cameraControlsInterval = alt.setInterval(handleControls, 0);
    }, 1000);
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
    native.renderScriptCams(false, false, 0, false, false, 0);
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
    //let oldHeading = 0;
    // Scroll Up
    if (native.isDisabledControlPressed(0, 15)) {
        if (_x < width / 2 + 250 && _x > width / 2 - 250) {
            fov -= 2;
            if (fov < 10) {
                fov = 10;
            }
            native.setCamFov(camera, fov);
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false, 0);
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
            native.renderScriptCams(true, false, 0, true, false, 0);
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
        native.renderScriptCams(true, false, 0, true, false, 0);
    }
    if (native.isDisabledControlPressed(0, 33)) {
        zpos -= 0.01;
        if (zpos < -1.2) {
            zpos = -1.2;
        }
        native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
        native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false, 0);
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
    native.renderScriptCams(true, false, 0, true, false, 0);
}
export function setZPos(value) {
    zpos = value;
    native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
    native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
    native.setCamActive(camera, true);
    native.renderScriptCams(true, false, 0, true, false, 0);
}
