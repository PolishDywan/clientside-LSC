// const player = alt.Player.local;
// let showObject = false;
// let alphaMode = false;
// let newObjectToPlace = null;
// let placeObjectDistance = 3;
// let placeObjeGround = 0;
// let tmpObject = null;
// let callBack = null;
// let objectModel = null;
// let tickHandler;
// alt.onServer('PlacingModule:setObject', (callBackTriger, object) => {
//     callBack = callBackTriger;
//     objectModel = object;
//     showAlphaObject(object);
// });
// function showAlphaObject(object) {
//     requestModelPromise(game.getHashKey(object)).then((succ) => {
//         if (succ) {
//             newObjectToPlace = game.createObjectNoOffset(
//                 game.getHashKey(object),
//                 player.pos.x,
//                 player.pos.y,
//                 player.pos.z,
//                 false,
//                 false,
//                 true
//             );
//             game.setEntityAlpha(newObjectToPlace, 150, true);
//             game.setEntityCollision(newObjectToPlace, false, true);
//             showObject = true;
//             tickHandler = alt.everyTick(() => {
//                 if (!showObject) alt.clearEveryTick(tickHandler);
//                 let pos = player.pos;
//                 let fv = game.getEntityForwardVector(player.scriptID);
//                 var posFront = {
//                     x: pos.x + fv.x * placeObjectDistance,
//                     y: pos.y + fv.y * placeObjectDistance,
//                     z: pos.z + placeObjeGround,
//                 };
//                 //go away
//                 game.disableControlAction(0, 37, true);
//                 if (game.isControlPressed(2, 27)) {
//                     if (alphaMode) {
//                         //alt.log(`ESKI ALPHA ${game.getEntityAlpha(newObjectToPlace)}`);
//                         //alt.log(`YENI ALPHA ${game.getEntityAlpha(newObjectToPlace) + 1}`);
//                         game.setEntityAlpha(
//                             newObjectToPlace,
//                             game.getEntityAlpha(newObjectToPlace) + 1,
//                             true
//                         );
//                     } else {
//                         if (placeObjectDistance < 10) {
//                             placeObjectDistance += 0.1;
//                         }
//                     }
//                 }
//                 //come closer
//                 if (game.isControlPressed(2, 173)) {
//                     if (alphaMode) {
//                         game.setEntityAlpha(
//                             newObjectToPlace,
//                             game.getEntityAlpha(newObjectToPlace) - 1,
//                             true
//                         );
//                     } else {
//                         if (placeObjectDistance > 0) {
//                             placeObjectDistance -= 0.1;
//                         }
//                     }
//                 }
//                 //turn left
//                 if (game.isControlPressed(2, 108)) {
//                     let objectRot = game.getEntityRotation(newObjectToPlace, 2);
//                     game.setEntityRotation(
//                         newObjectToPlace,
//                         objectRot.x,
//                         objectRot.y,
//                         objectRot.z + 0.5,
//                         2,
//                         false
//                     );
//                 }
//                 //turn right
//                 if (game.isControlPressed(2, 109)) {
//                     let objectRot = game.getEntityRotation(newObjectToPlace, 2);
//                     game.setEntityRotation(
//                         newObjectToPlace,
//                         objectRot.x,
//                         objectRot.y,
//                         objectRot.z - 0.5,
//                         2,
//                         false
//                     );
//                 }
//                 if (game.isControlPressed(2, 175)) { // yukarı
//                     placeObjeGround += 0.05;
//                 }
//                 if (game.isControlPressed(2, 174)) { // yukarı
//                     placeObjeGround -= 0.05;
//                 }
//                 if (newObjectToPlace !== null) {
//                     game.setEntityCoords(
//                         newObjectToPlace,
//                         posFront.x,
//                         posFront.y,
//                         player.pos.z + placeObjeGround,
//                         false,
//                         false,
//                         false,
//                         false
//                     );
//                 }
//             });
//         }
//     });
// }
// function requestModelPromise(model) {
//     return new Promise((resolve, reject) => {
//         if (!game.hasModelLoaded(model)) {
//             game.requestModel(model);
//         }
//         // return resolve(false);
//         let inter = alt.setInterval(() => {
//             if (game.hasModelLoaded(model)) {
//                 alt.clearInterval(inter);
//                 return resolve(true);
//             }
//         }, 10);
//     });
// }
// alt.on('keyup', (key) => {
//     //SPACE to abort it
//     if (key === 0x20) {
//         //alt.log('PlacingModule: Obje silindi.');
//         game.deleteObject(newObjectToPlace);
//         game.deleteObject(tmpObject);
//         showObject = false;
//         newObjectToPlace = null;
//     }
//     //E to place the item
//     if (key === 0x45) {
//         if (showObject) {
//             //alt.log('PlacingModule: Obje yerleştirildi.');
//             game.freezeEntityPosition(newObjectToPlace, true);
//             game.setModelAsNoLongerNeeded(newObjectToPlace);
//             game.setEntityAlpha(newObjectToPlace, 255, true);
//             game.setEntityCollision(newObjectToPlace, true, true);
//             //Emit-Serverevent to do something serverside
//             let objectRot = game.getEntityRotation(newObjectToPlace, 2);
//             let objectPos = game.getEntityCoords(newObjectToPlace, false);
//             //alt.emitServer('ObjectCallBack', newObjectToPlace);
//             alt.emitServer(callBack, JSON.stringify(objectRot), JSON.stringify(objectPos), objectModel);
//             game.deleteObject(newObjectToPlace);
//             newObjectToPlace = null;
//             showObject = false;
//             callBack = null;
//             objectModel = null;
//         }
//     }
//     //LEFTSHIFT to change alpha
//     /*if (key === 0x10) {
//         if (showObject) {
//             alt.log(`PlacingModule: Alfa mod değiştirildi: ${alphaMode}`);
//             alphaMode = !alphaMode;
//         }
//     }*/
// });
import alt from 'alt-client';
import native from 'natives';
import * as stw from './Utils';
import { requestObjectModel } from '../../utils/functions';
let view;
const raycastFlags = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256;
var objectList = [];
let currentObject = null;
let lastObject = null;
let cb_id = null;
let isHouse = true;
let callBack = "";
let model = "";
let enable = false;
let showObject = false;
let alphaMode = false;
let interval = null;
let lastRayCast = Date.now();
let lastViewEmit = Date.now();
class InteriorEditor {
    set object(state) {
        showObject = state;
    }
    get object() {
        return showObject;
    }
    set alpha(state) {
        alphaMode = state;
    }
    get alpha() {
        return alphaMode;
    }
    static setEnable(cb, obj) {
        if (enable) return;
        InteriorEditor.addObject(obj);
        enable = true;
        //cb_id = id;
        model = obj;
        callBack = cb;
        objectList = [];
        interval = alt.everyTick(()=>{
            InteriorEditor.editorHandler();
        });
        InteriorEditor.createListeners();
    //native.setEntityAlpha(alt.Player.local, 0, true);
    }
    static setDisable() {
        if (!enable) return;
        if (interval) {
            alt.clearInterval(interval);
            interval = null;
        }
        enable = false;
        InteriorEditor.destroyListeners();
    //native.setEntityAlpha(alt.Player.local, 255, true);
    }
    static addObject(model) {
        requestObjectModel(native.getHashKey(model)).then(()=>{
            const [_, hit, endCoords, surfaceNormal, entity] = stw.screenCenterToWorld(raycastFlags, -1, native.getFinalRenderedCamCoord(), native.getFinalRenderedCamRot(2));
            const obj = native.createObjectNoOffset(native.getHashKey(model), endCoords.x, endCoords.y, endCoords.z, false, false, true);
            if (obj != 0) {
                let add = {
                    model: model,
                    scriptId: obj,
                    position: endCoords,
                    rotation: new alt.Vector3(0, 0, 0)
                };
                if (objectList != null || objectList != undefined) objectList.push(add);
                else objectList = [
                    add
                ];
                currentObject = add;
            //interiorEditor.sendObjectListToView();
            } else {
                view.destroy();
                view = null;
                alt.showCursor(false);
                alt.emit('chat:message', null, `{DF1111}[HATA] ${model} modeli yüklenemedi.`);
            }
        });
    }
    static removeObject(_scriptId) {
        let scriptId = parseInt(_scriptId);
        let check = objectList.find((x)=>x.scriptId == scriptId);
        if (check) {
            native.deleteObject(scriptId);
            objectList.splice(objectList.indexOf(check), 1);
        } else if (scriptId) {
            native.deleteObject(scriptId);
        }
        InteriorEditor.sendObjectListToView();
    }
    static setObjectPosition(scriptId, position) {
        let check = objectList.find((x)=>x.scriptId == scriptId);
        if (check) {
            check.position = position;
            native.setEntityCoords(scriptId, position.x, position.y, position.z, true, true, true, false);
        }
    }
    static sumObjectPosition(x, y, z) {
        if (lastObject) {
            let pos = lastObject.position;
            // pos.x += x;
            // pos.y += y;
            // pos.z += z;
            let _pos = {
                x: parseFloat(pos.x + x),
                y: parseFloat(pos.y + y),
                z: parseFloat(pos.z + z)
            };
            InteriorEditor.setObjectPosition(lastObject.scriptId, _pos);
        }
    }
    static setObjectRotation(scriptId, position) {
        let check = objectList.find((x)=>x.scriptId == scriptId);
        if (check) {
            check.rotation = position;
            native.setEntityRotation(scriptId, parseFloat(position.x), parseFloat(position.y), parseFloat(position.z), 2, true);
        }
    }
    static selectObject() {
        const [_, hit, endCoords, surfaceNormal, entity] = stw.screenToWorld(raycastFlags, -1, native.getFinalRenderedCamCoord(), native.getFinalRenderedCamRot(2));
        if (hit) {
            if (objectList) {
                if (entity) {
                    let check = objectList.find((x)=>x.scriptId == entity);
                    if (check) {
                        currentObject = check;
                    }
                }
            }
        } else return;
    }
    static deselectObject() {
        lastObject = currentObject;
        currentObject = null;
        view.emit('view:interiorEditor:user:deselectObject');
    }
    static clickHandler() {
        if (currentObject != null) {
            InteriorEditor.deselectObject();
        } else {
        //InteriorEditor.selectObject();
        //InteriorEditor.deselectObject();
        }
    }
    static sendObjectListToView() {
        view.emit('view:interiorEditor:user:setObjectList', objectList);
    }
    static editorHandler() {
        native.disableControlAction(0, 24, true); // Left Mouse
        native.disableControlAction(0, 25, true); // Right Mouse
        native.disableControlAction(0, 63, true); // Vehicle Left
        native.disableControlAction(0, 64, true); // Vehicle Right
        native.disableControlAction(0, 68, true);
        native.disableControlAction(0, 1, true);
        native.disableControlAction(0, 2, true);
        native.disablePlayerFiring(alt.Player.local.scriptID, true);
        if (currentObject != null) {
            if (Date.now() > lastViewEmit) {
                lastViewEmit = Date.now() + 50;
                view.emit('view:interiorEditor:user:setData', currentObject, alt.worldToScreen(currentObject.position.x, currentObject.position.y, currentObject.position.z), alt.worldToScreen(currentObject.position.x + 1, currentObject.position.y, currentObject.position.z), alt.worldToScreen(currentObject.position.x, currentObject.position.y + 1, currentObject.position.z), alt.worldToScreen(currentObject.position.x, currentObject.position.y, currentObject.position.z + 1));
            }
            if (Date.now() > lastRayCast) {
                lastRayCast = Date.now() + 25;
                const [_, hit, endCoords, surfaceNormal, entity] = stw.screenToWorld(raycastFlags, currentObject.scriptId, native.getFinalRenderedCamCoord(), native.getFinalRenderedCamRot(2));
                if (entity === 0) return;
                if (hit) {
                    native.setEntityCoords(currentObject.scriptId, endCoords.x, endCoords.y, endCoords.z, false, false, false, true);
                    currentObject.position = endCoords;
                }
            }
        } else if (lastObject != null) {
            if (Date.now() > lastViewEmit) {
                lastViewEmit = Date.now() + 50;
                view.emit('view:interiorEditor:user:setData', lastObject, alt.worldToScreen(lastObject.position.x, lastObject.position.y, lastObject.position.z), alt.worldToScreen(lastObject.position.x + 1, lastObject.position.y, lastObject.position.z), alt.worldToScreen(lastObject.position.x, lastObject.position.y + 1, lastObject.position.z), alt.worldToScreen(lastObject.position.x, lastObject.position.y, lastObject.position.z + 1));
            }
        }
    }
    static createListeners() {
        view.on('view:interiorEditor:user:calcPos', InteriorEditor.sumObjectPosition);
        view.on('view:interiorEditor:user:addObject', InteriorEditor.addObject);
        view.on('view:interiorEditor:user:setPosition', InteriorEditor.setObjectPosition);
        view.on('view:interiorEditor:user:setRotation', InteriorEditor.setObjectRotation);
        view.on('view:interiorEditor:user:clickHandler', InteriorEditor.clickHandler);
        view.on('view:interiorEditor:user:deleteObject', InteriorEditor.removeObject);
        view.on('view:interiorEditor:user:cancel', InteriorEditor.cancel);
        view.on('view:interiorEditor:user:save', InteriorEditor.save);
        return;
    }
    static destroyListeners() {
        view.off('view:interiorEditor:user:calcPos', InteriorEditor.sumObjectPosition);
        view.off('view:interiorEditor:user:addObject', InteriorEditor.addObject);
        view.off('view:interiorEditor:user:setPosition', InteriorEditor.setObjectPosition);
        view.off('view:interiorEditor:user:setRotation', InteriorEditor.setObjectRotation);
        view.off('view:interiorEditor:user:clickHandler', InteriorEditor.clickHandler);
        view.off('view:interiorEditor:user:deleteObject', InteriorEditor.removeObject);
        view.off('view:interiorEditor:user:cancel', InteriorEditor.cancel);
        view.off('view:interiorEditor:user:save', InteriorEditor.save);
        return;
    }
    static save() {
        try {
            //let objects = JSON.stringify(objectList);
            //alt.emitServer('script:interiorEditor:save', isHouse, cb_id, objects);
            if (currentObject != null) lastObject = currentObject;
            if (lastObject.scriptId) InteriorEditor.removeObject(lastObject.scriptId);
            let rot = JSON.stringify(lastObject.rotation);
            let pos = JSON.stringify(lastObject.position);
            InteriorEditor.setDisable();
            view.destroy();
            view = null;
            alt.showCursor(false);
            alt.emitServer(callBack, rot, pos, model);
        } catch (e) {
            if (view) {
                view.destroy();
                view = null;
            }
            alt.showCursor(false);
        }
    }
    static cancel() {
        try {
            if (currentObject != null) lastObject = currentObject;
            InteriorEditor.setDisable();
            if (lastObject.scriptId) InteriorEditor.removeObject(lastObject.scriptId);
            view.destroy();
            view = null;
            alt.showCursor(false);
        } catch (e) {
            if (view) {
                view.destroy();
                view = null;
            }
            alt.showCursor(false);
        }
    }
    constructor(){
        showObject = false;
        alphaMode = false;
    }
}
// const interiorEditor = new InteriorEditor();
// export default interiorEditor;
// // alt.onServer('test', () => {
// //     if (interiorEditor.enable) {
// //         interiorEditor.setDisable();
// //     } else {
// //         interiorEditor.setEnable();
// //     }
// // });
alt.onServer('PlacingModule:setObject', (callBack, model)=>{
    if (enable) {
        InteriorEditor.setDisable(); //
    } else {
        view = new alt.WebView("http://resource/client/html/objectPlacer/html/index.html");
        view.focus();
        alt.showCursor(true);
        alt.setTimeout(()=>{
            InteriorEditor.setEnable(callBack, model);
        }, 200);
    }
});
