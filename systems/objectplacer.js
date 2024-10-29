import * as alt from 'alt';
import * as game from 'natives';

const player = alt.Player.local;

let showObject = false;
let alphaMode = false;
let newObjectToPlace = null;
let placeObjectDistance = 3;
let placeObjeGround = 0;
let tmpObject = null;
let callBack = null;
let objectModel = null;
let tickHandler;

alt.onServer('PlacingModule:setObject', (callBackTriger , object) => {
    callBack = callBackTriger;
    objectModel = object;
    showAlphaObject(object);
});

function showAlphaObject(object) {
    requestModelPromise(game.getHashKey(object)).then((succ) => {
        if (succ) {
            newObjectToPlace = game.createObjectNoOffset(
                game.getHashKey(object),
                player.pos.x,
                player.pos.y,
                player.pos.z,
                false,
                false,
                true
            );
            game.setEntityAlpha(newObjectToPlace, 150, true);
            game.setEntityCollision(newObjectToPlace, false, true);
            showObject = true;
            tickHandler = alt.everyTick(() => {
                if(!showObject) alt.clearEveryTick(tickHandler);
                let pos = player.pos;
                let fv = game.getEntityForwardVector(player.scriptID);
            
                var posFront = {
                    x: pos.x + fv.x * placeObjectDistance,
                    y: pos.y + fv.y * placeObjectDistance,
                    z: pos.z + placeObjeGround,
                };
                    //go away
                    game.disableControlAction(0, 37, true);
                    if (game.isControlPressed(2, 27)) {
                        if (alphaMode) {
                            //alt.log(`ESKI ALPHA ${game.getEntityAlpha(newObjectToPlace)}`);
                            //alt.log(`YENI ALPHA ${game.getEntityAlpha(newObjectToPlace) + 1}`);
                            game.setEntityAlpha(
                                newObjectToPlace,
                                game.getEntityAlpha(newObjectToPlace) + 1,
                                true
                            );
                        } else {
                            if (placeObjectDistance < 10) {
                                placeObjectDistance += 0.1;
                            }
                        }
                    }
                    //come closer
                    if (game.isControlPressed(2, 173)) {
                        if (alphaMode) {
                            game.setEntityAlpha(
                                newObjectToPlace,
                                game.getEntityAlpha(newObjectToPlace) - 1,
                                true
                            );
                        } else {
                            if (placeObjectDistance > 0) {
                                placeObjectDistance -= 0.1;
                            }
                        }
                    }
                    //turn left
                    if (game.isControlPressed(2, 108)) {
                        let objectRot = game.getEntityRotation(newObjectToPlace,2);
                        game.setEntityRotation(
                            newObjectToPlace,
                            objectRot.x,
                            objectRot.y,
                            objectRot.z + 0.5,
                            2,
                            false
                        );
                    }
                    //turn right
                    if (game.isControlPressed(2, 109)) {
                        let objectRot = game.getEntityRotation(newObjectToPlace,2);
                        game.setEntityRotation(
                            newObjectToPlace,
                            objectRot.x,
                            objectRot.y,
                            objectRot.z - 0.5,
                            2,
                            false
                        );
                    }
            
                    if (game.isControlPressed(2, 175)) { // yukarı
                        placeObjeGround += 0.05;
                    }
            
                    if (game.isControlPressed(2, 174)) { // yukarı
                        placeObjeGround -= 0.05;
                    }
                    
                    
            
                    if (newObjectToPlace !== null) {
                        game.setEntityCoords(
                            newObjectToPlace,
                            posFront.x,
                            posFront.y,
                            player.pos.z + placeObjeGround,
                            false,
                            false,
                            false,
                            false
                        );
                       
                    }
            });
        }
    });
}

function requestModelPromise(model) {
    return new Promise((resolve, reject) => {
        if (!game.hasModelLoaded(model)) {
            game.requestModel(model);
        }
        // return resolve(false);
        let inter = alt.setInterval(() => {
            if (game.hasModelLoaded(model)) {
                alt.clearInterval(inter);
                return resolve(true);
            }
        }, 10);
    });
}



alt.on('keyup', (key) => {
    //SPACE to abort it
    if (key === 0x20) {
        //alt.log('PlacingModule: Obje silindi.');
        game.deleteObject(newObjectToPlace);
        game.deleteObject(tmpObject);
        showObject = false;
        newObjectToPlace = null;
    }
    //E to place the item
    if (key === 0x45) {
        if (showObject) {
            //alt.log('PlacingModule: Obje yerleştirildi.');
            game.freezeEntityPosition(newObjectToPlace, true);
            game.setModelAsNoLongerNeeded(newObjectToPlace);
            game.setEntityAlpha(newObjectToPlace, 255, true);
            game.setEntityCollision(newObjectToPlace, true, true);
            //Emit-Serverevent to do something serverside
            let objectRot = game.getEntityRotation(newObjectToPlace, 2);
            let objectPos = game.getEntityCoords(newObjectToPlace, 2);
            //alt.emitServer('ObjectCallBack', newObjectToPlace);
            alt.emitServer(callBack, JSON.stringify(objectRot), JSON.stringify(objectPos), objectModel);
            game.deleteObject(newObjectToPlace);
            newObjectToPlace = null;
            showObject = false;
            callBack = null;
            objectModel = null;
        }
    }
    //LEFTSHIFT to change alpha
    /*if (key === 0x10) {
        if (showObject) {
            alt.log(`PlacingModule: Alfa mod değiştirildi: ${alphaMode}`);
            alphaMode = !alphaMode;
        }
    }*/
});