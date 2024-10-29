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
import alt from 'alt-client';
import native from 'natives';
export function drawSubtitle(text, duration) {
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}
export function drawLongText(text, x, y, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true, center = false) {
    native.setTextFont(fontType);
    native.setTextProportional(false);
    native.setTextScale(scale, scale);
    native.setTextColour(r, g, b, a);
    native.setTextEdge(2, 0, 0, 0, 150);
    if (useOutline) native.setTextOutline();
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
export function setPlayerToVehicle(vehicle) {
    if (vehicle === null || !vehicle.valid) return;
    let interval = alt.setInterval(()=>{
        if (alt.Player.local.vehicle == vehicle) alt.clearInterval(interval);
        native.taskEnterVehicle(alt.Player.local.scriptID, vehicle.scriptID, 100, -1, 2, 16, 0);
    }, 0);
}
export function setPlayerOutVehicle(vehicle) {
    if (vehicle === null || !vehicle.valid) return;
    let interval = alt.setInterval(()=>{
        if (alt.Player.local.vehicle == vehicle) alt.clearInterval(interval);
        native.taskLeaveVehicle(alt.Player.local.scriptID, vehicle.scriptID, 0);
    }, 0);
}
export function loadAnimDict(Dict) {
    return _loadAnimDict.apply(this, arguments);
}
function _loadAnimDict() {
    _loadAnimDict = _asyncToGenerator(function*(Dict) {
        return new Promise(function() {
            var _ref = _asyncToGenerator(function*(resolve) {
                native.requestAnimDict(Dict);
                let interval = alt.setInterval(()=>{
                    if (native.hasAnimDictLoaded(Dict)) {
                        alt.clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return function(resolve) {
                return _ref.apply(this, arguments);
            };
        }());
    });
    return _loadAnimDict.apply(this, arguments);
}
export function playAnimation(dict, animName, duration, flag) {
    return _playAnimation.apply(this, arguments);
}
function _playAnimation() {
    _playAnimation = _asyncToGenerator(function*(dict, animName, duration, flag) {
        yield loadAnimDict(dict);
        native.taskPlayAnim(alt.Player.local.scriptID, dict, animName, 1, -1, duration, flag, -1.0, false, false, false);
    });
    return _playAnimation.apply(this, arguments);
}
export function playPedAnimation(entity, dict, animName, duration, flag) {
    return _playPedAnimation.apply(this, arguments);
}
function _playPedAnimation() {
    _playPedAnimation = _asyncToGenerator(function*(entity, dict, animName, duration, flag) {
        yield loadAnimDict(dict);
        native.taskPlayAnim(entity, dict, animName, 1, -1, duration, flag, -1.0, false, false, false);
    });
    return _playPedAnimation.apply(this, arguments);
}
export function stopAnimation() {
    return _stopAnimation.apply(this, arguments);
}
function _stopAnimation() {
    _stopAnimation = _asyncToGenerator(function*() {
        native.clearPedTasks(alt.Player.local.scriptID);
    });
    return _stopAnimation.apply(this, arguments);
}
export function setRagdoll(duration) {
    return _setRagdoll.apply(this, arguments);
}
function _setRagdoll() {
    _setRagdoll = _asyncToGenerator(function*(duration) {
        native.setPedToRagdoll(alt.Player.local.scriptID, duration, duration, 0, false, false, false);
    });
    return _setRagdoll.apply(this, arguments);
}
export function freezeLocalPlayer(state) {
    return _freezeLocalPlayer.apply(this, arguments);
}
function _freezeLocalPlayer() {
    _freezeLocalPlayer = _asyncToGenerator(function*(state) {
        native.freezeEntityPosition(alt.Player.local.scriptID, state);
    });
    return _freezeLocalPlayer.apply(this, arguments);
}
export function loadPlayerHeadShot(target) {
    return _loadPlayerHeadShot.apply(this, arguments);
}
function _loadPlayerHeadShot() {
    _loadPlayerHeadShot = _asyncToGenerator(function*(target) {
        return new Promise(function() {
            var _ref = _asyncToGenerator(function*(resolve) {
                let interval = alt.setInterval(()=>{
                    if (native.isPedheadshotReady(target) && native.isPedheadshotValid(target)) {
                        alt.clearInterval(interval);
                        return resolve(native.getPedheadshotTxdString(target));
                    }
                }, 50);
            });
            return function(resolve) {
                return _ref.apply(this, arguments);
            };
        }());
    });
    return _loadPlayerHeadShot.apply(this, arguments);
}
export function notificationWithPlayerIcon(message, title, subtitle, icon, color, blink) {
    return _notificationWithPlayerIcon.apply(this, arguments);
}
function _notificationWithPlayerIcon() {
    _notificationWithPlayerIcon = _asyncToGenerator(function*(message, title, subtitle, icon, color, blink) {
        if (icon) {
            let pedHeadshot = native.registerPedheadshot(icon.scriptID);
            var _icon = yield loadPlayerHeadShot(pedHeadshot);
        }
        native.beginTextCommandThefeedPost('CELL_EMAIL_BCON');
        native.addTextComponentSubstringPlayerName(message);
        if (_icon) native.endTextCommandThefeedPostMessagetext(_icon, _icon, false, 0, title, subtitle);
        if (color) native.thefeedSetBackgroundColorForNextPost(color);
        native.endTextCommandThefeedPostTicker(blink, false);
        native.unregisterPedheadshot(icon.scriptID);
    });
    return _notificationWithPlayerIcon.apply(this, arguments);
}
export function teleportToWaypoint() {
    return _teleportToWaypoint.apply(this, arguments);
}
function _teleportToWaypoint() {
    _teleportToWaypoint = _asyncToGenerator(function*() {
        if (!native.isWaypointActive()) {
        // TODO checkpoint not setted.
        } else {
            const waypoint = native.getFirstBlipInfoId(8);
            const coords = native.getBlipInfoIdCoord(waypoint);
            let z = 0.1;
            native.freezeEntityPosition(alt.Player.local.scriptID, true);
            native.requestCollisionAtCoord(coords.x, coords.y, z);
            native.setEntityCoords(alt.Player.local.scriptID, coords.x, coords.y, coords.z, true, true, true, true);
            const interval = alt.setInterval(()=>{
                let playerCoord = native.getEntityCoords(alt.Player.local.scriptID, true);
                let loaded, ground;
                if (z > 1999.0) z = 0.1;
                else z += 15.1;
                native.requestCollisionAtCoord(playerCoord.x, playerCoord.y, z);
                native.setEntityCoords(alt.Player.local.scriptID, coords.x, coords.y, z, true, true, true, true);
                [loaded, ground] = native.getGroundZFor3dCoord(playerCoord.x, playerCoord.y, playerCoord.z, 0, true, false);
                if (loaded) {
                    alt.clearInterval(interval);
                    z = ground;
                    native.setEntityCoords(alt.Player.local.scriptID, coords.x, coords.y, z, true, true, true, true);
                    native.freezeEntityPosition(alt.Player.local.scriptID, false);
                }
            }, 0);
        }
    });
    return _teleportToWaypoint.apply(this, arguments);
}
export function requestObjectModel(model) {
    return _requestObjectModel.apply(this, arguments);
}
function _requestObjectModel() {
    _requestObjectModel = _asyncToGenerator(function*(model) {
        return new Promise(function() {
            var _ref = _asyncToGenerator(function*(resolve, reject) {
                if (native.hasModelLoaded(model)) {
                    native.requestModel(model);
                }
                let interval = alt.setInterval(()=>{
                    if (native.hasModelLoaded) {
                        alt.clearInterval(interval);
                        return resolve(true);
                    }
                }, 10);
            });
            return function(resolve, reject) {
                return _ref.apply(this, arguments);
            };
        }());
    });
    return _requestObjectModel.apply(this, arguments);
}
export function rotationToDirection(rotation) {
    const z = degToRad(rotation.z);
    const x = degToRad(rotation.x);
    const num = Math.abs(Math.cos(x));
    return {
        x: -Math.sin(z) * num,
        y: Math.cos(z) * num,
        z: Math.sin(x)
    };
}
export function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
export function getCrossProduct(v1, v2) {
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };
}
export function getNormalizedVector(vector) {
    const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    return {
        x: vector.x / mag,
        y: vector.y / mag,
        z: vector.z / mag
    };
}
export function distanceB(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }
    return Math.sqrt(Math.pow(vector1.x - vector2.X, 2) + Math.pow(vector1.y - vector2.Y, 2) + Math.pow(vector1.z - vector2.Z, 2));
}
export function getPedHeadShot(entity) {
    return _getPedHeadShot.apply(this, arguments);
}
function _getPedHeadShot() {
    _getPedHeadShot = _asyncToGenerator(function*(entity) {
        let pedHeadshot = native.registerPedheadshot(entity);
        var _icon = yield loadPlayerHeadShot(pedHeadshot);
        return _icon;
    });
    return _getPedHeadShot.apply(this, arguments);
}
