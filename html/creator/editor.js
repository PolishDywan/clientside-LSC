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
import * as alt from 'alt-client';
import * as native from 'natives';
import { createPedEditCamera, destroyPedEditCamera, setFov, setZPos } from './camera';
const fModel = alt.hash('mp_f_freemode_01');
const mModel = alt.hash(`mp_m_freemode_01`);
const url = `http://resource/client/html/creator/html/index.html`;
let view;
let oldData = {};
let prevData = {};
let readyInterval;
let isHair = false;
let isDecor = false;
native.requestModel(fModel);
native.requestModel(mModel);
alt.loadModel(fModel);
alt.loadModel(mModel);
alt.onServer('character:Edit', handleEdit);
alt.onServer('character:Redit', handleRedit);
alt.onServer('character:Hair', handleHair);
alt.onServer('character:Decor', handleDecor);
alt.onServer('character:Sync', handleSync);
alt.onServer('character:ServerSync', fixedServerSync);
alt.onServer('character:SyncServerSkin', fixHanleSync);
function fixedServerSync(data) {
    ServerSync(data);
}
function handleEdit(_oldData) {
    oldData = _oldData;
    if (!view) {
        view = new alt.WebView(url);
        view.on('character:ReadyDone', handleReadyDone);
        view.on('character:Done', handleDone);
        view.on('character:Cancel', handleCancel);
        view.on('character:Sync', handleSync);
    }
    view.focus();
    showCursor(true);
    createPedEditCamera();
    setFov(50);
    setZPos(0.6);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    readyInterval = alt.setInterval(waitForReady, 100);
}
function handleRedit(_oldData) {
    oldData = JSON.parse(_oldData);
    if (!view) {
        view = new alt.WebView(url);
        view.on('character:ReadyDone', handleReadyDone);
        view.on('character:Done', handleDone);
        view.on('character:Cancel', handleCancel);
        view.on('character:Sync', handleSync);
    }
    view.focus();
    showCursor(true);
    createPedEditCamera();
    setFov(50);
    setZPos(0.6);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    readyInterval = alt.setInterval(waitForReady, 100);
}
function handleHair(_oldData) {
    oldData = JSON.parse(_oldData);
    isHair = true;
    if (!view) {
        view = new alt.WebView(url);
        view.on('character:ReadyDone', handleReadyDone);
        view.on('character:Done', handleDone);
        view.on('character:Cancel', handleCancel);
        view.on('character:Sync', handleSync);
    }
    view.focus();
    showCursor(true);
    createPedEditCamera();
    setFov(50);
    setZPos(0.6);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    readyInterval = alt.setInterval(waitForReady, 100);
}
function handleDecor(_oldData) {
    oldData = JSON.parse(_oldData);
    isDecor = true;
    if (!view) {
        view = new alt.WebView(url);
        view.on('character:ReadyDone', handleReadyDone);
        view.on('character:Done', handleDone);
        view.on('character:Cancel', handleCancel);
        view.on('character:Sync', handleSync);
        view.on('character:Sync', handleSync);
    }
    view.focus();
    showCursor(true);
    createPedEditCamera();
    setFov(50);
    setZPos(0.6);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    readyInterval = alt.setInterval(waitForReady, 100);
}
function closeView() {
    if (view && view.destroy) {
        view.destroy();
    }
    isHair = false;
    isDecor = false;
    oldData = null;
    view = null;
    showCursor(false);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    destroyPedEditCamera();
}
function handleDone(newData) {
    if (isHair) alt.emitServer('barber:HairComp', JSON.stringify(newData));
    else if (isDecor) alt.emitServer('barber:SaveDecor', JSON.stringify(newData));
    else alt.emitServer('login:SetupComp', JSON.stringify(newData));
    closeView();
    alt.emit('login:callUpdate');
}
function handleCancel() {
    if (isHair) alt.emitServer('barber:Cancel');
    else if (isDecor) alt.emitServer('barber:DecorCancel');
    else alt.emitServer('login:SetupComp', JSON.stringify(oldData));
    closeView();
    alt.emit('login:callUpdate');
}
function waitForReady() {
    if (!view) {
        return;
    }
    view.emit('character:Ready');
}
function handleReadyDone() {
    if (readyInterval !== undefined || readyInterval !== null) {
        alt.clearInterval(readyInterval);
        readyInterval = null;
    }
    view.emit('character:SetData', oldData);
    if (isHair) view.emit('character:Hair');
    if (isDecor) view.emit('character:Decor');
}
function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) {
        return;
    }
}
function doesModelMatch(model) {
    return new Promise((resolve)=>{
        let attempts = 0;
        let interval = alt.setInterval(()=>{
            attempts++;
            if (attempts > 5000) {
                alt.clearInterval(interval);
                resolve(true);
                return;
            }
            const pModel = native.getEntityModel(alt.Player.local.scriptID);
            if (pModel !== model) {
                return;
            }
            resolve(true);
            alt.clearInterval(interval);
        }, 25);
    });
}
function handleSync(data) {
    return _handleSync.apply(this, arguments);
}
function _handleSync() {
    _handleSync = _asyncToGenerator(function*(data) {
        let currSkin = "mp_f_freemode_01";
        if (data.sex == 1) currSkin = "mp_m_freemode_01";
        alt.emitServer('Player:SetSkin', currSkin);
        native.clearPedBloodDamage(alt.Player.local.scriptID);
        native.clearPedDecorations(alt.Player.local.scriptID);
        native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        alt.emitServer("Player:SetSex", data.sex);
        const hash = data.sex === 0 ? fModel : mModel;
        if (!prevData || prevData.sex !== data.sex) {
        //native.setPlayerModel(alt.Player.local.scriptID, hash);
        //await doesModelMatch(hash);
        }
        native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(alt.Player.local.scriptID, data.faceFather, data.faceMother, 0, data.skinFather, data.skinMother, 0, parseFloat(data.faceMix), parseFloat(data.skinMix), 0, false);
        // Facial Features
        for(let i = 0; i < data.structure.length; i++){
            const value = data.structure[i];
            native.setPedMicroMorph(alt.Player.local.scriptID, i, value);
        }
        // Overlay Features - NO COLORS
        for(let i1 = 0; i1 < data.opacityOverlays.length; i1++){
            const overlay = data.opacityOverlays[i1];
            native.setPedHeadOverlay(alt.Player.local.scriptID, overlay.id, overlay.value, parseFloat(overlay.opacity));
        }
        // Hair
        const collection = native.getHashKey(data.hairOverlay.collection);
        const overlay1 = native.getHashKey(data.hairOverlay.overlay);
        native.addPedDecorationFromHashes(alt.Player.local.scriptID, collection, overlay1);
        native.setPedComponentVariation(alt.Player.local.scriptID, 2, data.hair, 0, 0);
        native.setPedHairTint(alt.Player.local.scriptID, data.hairColor1, data.hairColor2);
        // Facial Hair
        native.setPedHeadOverlay(alt.Player.local.scriptID, 1, data.facialHair, data.facialHairOpacity);
        native.setPedHeadOverlayTint(alt.Player.local.scriptID, 1, 1, data.facialHairColor1, data.facialHairColor1);
        // Eyebrows
        native.setPedHeadOverlay(alt.Player.local.scriptID, 2, data.eyebrows, 1);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, 2, 1, data.eyebrowsColor1, data.eyebrowsColor1);
        // Decor
        for(let i2 = 0; i2 < data.colorOverlays.length; i2++){
            const overlay2 = data.colorOverlays[i2];
            const color2 = overlay2.color2 ? overlay2.color2 : overlay2.color1;
            native.setPedHeadOverlay(alt.Player.local.scriptID, overlay2.id, overlay2.value, parseFloat(overlay2.opacity));
            native.setPedHeadOverlayColor(alt.Player.local.scriptID, overlay2.id, 1, overlay2.color1, color2);
        }
        // Eyes
        native.setHeadBlendEyeColor(alt.Player.local.scriptID, data.eyes);
        if (data.sex === 0) {
            native.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 0); // arms
            native.setPedComponentVariation(alt.Player.local.scriptID, 4, 14, 0, 0); // pants
            native.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 0); // shoes
            native.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 0); // shirt
            native.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, 0, 0); // torso
        } else {
            native.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 0); // arms
            native.setPedComponentVariation(alt.Player.local.scriptID, 4, 14, 0, 0); // pants
            native.setPedComponentVariation(alt.Player.local.scriptID, 6, 34, 0, 0); // shoes
            native.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 0); // shirt
            native.setPedComponentVariation(alt.Player.local.scriptID, 11, 91, 0, 0); // torso
        }
        prevData = data;
    });
    return _handleSync.apply(this, arguments);
}
function ServerSync(_data) {
    return _ServerSync.apply(this, arguments);
}
function _ServerSync() {
    _ServerSync = _asyncToGenerator(function*(_data) {
        let data = JSON.parse(_data);
        native.clearPedBloodDamage(alt.Player.local.scriptID);
        native.clearPedDecorations(alt.Player.local.scriptID);
        native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        alt.emitServer("Player:SetSex", data.sex);
        const hash = data.sex === 0 ? fModel : mModel;
        if (!prevData || prevData.sex !== data.sex) {
        //native.setPlayerModel(alt.Player.local.scriptID, hash);
        //await doesModelMatch(hash);
        }
        native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(alt.Player.local.scriptID, data.faceFather, data.faceMother, 0, data.skinFather, data.skinMother, 0, parseFloat(data.faceMix), parseFloat(data.skinMix), 0, false);
        // Facial Features
        for(let i = 0; i < data.structure.length; i++){
            const value = data.structure[i];
            native.setPedFaceFeature(alt.Player.local.scriptID, i, value);
        }
        // Overlay Features - NO COLORS
        for(let i1 = 0; i1 < data.opacityOverlays.length; i1++){
            const overlay = data.opacityOverlays[i1];
            native.setPedHeadOverlay(alt.Player.local.scriptID, overlay.id, overlay.value, parseFloat(overlay.opacity));
        }
        // Hair
        //const collection = native.getHashKey(data.hairOverlay.collection);
        //const overlay = native.getHashKey(data.hairOverlay.overlay);
        const collection = alt.hash(data.hairOverlay.collection);
        const overlay1 = alt.hash(data.hairOverlay.overlay);
        native.setPedComponentVariation(alt.Player.local.scriptID, 2, data.hair, 0, 0);
        native.addPedDecorationFromHashes(alt.Player.local.scriptID, collection, overlay1);
        native.setPedHairColor(alt.Player.local.scriptID, data.hairColor1, data.hairColor2);
        // Facial Hair
        native.setPedHeadOverlay(alt.Player.local.scriptID, 1, data.facialHair, data.facialHairOpacity);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, 1, 1, data.facialHairColor1, data.facialHairColor1);
        // Eyebrows
        native.setPedHeadOverlay(alt.Player.local.scriptID, 2, data.eyebrows, 1);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, 2, 1, data.eyebrowsColor1, data.eyebrowsColor1);
        // Decor
        for(let i2 = 0; i2 < data.colorOverlays.length; i2++){
            const overlay2 = data.colorOverlays[i2];
            const color2 = overlay2.color2 ? overlay2.color2 : overlay2.color1;
            native.setPedHeadOverlay(alt.Player.local.scriptID, overlay2.id, overlay2.value, parseFloat(overlay2.opacity));
            native.setPedHeadOverlayColor(alt.Player.local.scriptID, overlay2.id, 1, overlay2.color1, color2);
        }
        // Eyes
        native.setPedEyeColor(alt.Player.local.scriptID, data.eyes);
        prevData = data;
    });
    return _ServerSync.apply(this, arguments);
}
function fixHanleSync(obj) {
    return _fixHanleSync.apply(this, arguments);
}
function _fixHanleSync() {
    _fixHanleSync = _asyncToGenerator(function*(obj) {
        let data = JSON.parse(obj);
        native.clearPedBloodDamage(alt.Player.local.scriptID);
        native.clearPedDecorations(alt.Player.local.scriptID);
        native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(alt.Player.local.scriptID, data.faceFather, data.faceMother, 0, data.skinFather, data.skinMother, 0, parseFloat(data.faceMix), parseFloat(data.skinMix), 0, false);
        // Facial Features
        for(let i = 0; i < data.structure.length; i++){
            const value = data.structure[i];
            native.setPedFaceFeature(alt.Player.local.scriptID, i, value);
        }
        // Overlay Features - NO COLORS
        for(let i1 = 0; i1 < data.opacityOverlays.length; i1++){
            const overlay = data.opacityOverlays[i1];
            native.setPedHeadOverlay(alt.Player.local.scriptID, overlay.id, overlay.value, parseFloat(overlay.opacity));
        }
        // Hair
        const collection = native.getHashKey(data.hairOverlay.collection);
        const overlay1 = native.getHashKey(data.hairOverlay.overlay);
        native.addPedDecorationFromHashes(alt.Player.local.scriptID, collection, overlay1);
        native.setPedComponentVariation(alt.Player.local.scriptID, 2, data.hair, 0, 0);
        native.setPedHairColor(alt.Player.local.scriptID, data.hairColor1, data.hairColor2);
        // Facial Hair
        native.setPedHeadOverlay(alt.Player.local.scriptID, 1, data.facialHair, data.facialHairOpacity);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, 1, 1, data.facialHairColor1, data.facialHairColor1);
        // Eyebrows
        native.setPedHeadOverlay(alt.Player.local.scriptID, 2, data.eyebrows, 1);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, 2, 1, data.eyebrowsColor1, data.eyebrowsColor1);
        // Decor
        for(let i2 = 0; i2 < data.colorOverlays.length; i2++){
            const overlay2 = data.colorOverlays[i2];
            const color2 = overlay2.color2 ? overlay2.color2 : overlay2.color1;
            native.setPedHeadOverlay(alt.Player.local.scriptID, overlay2.id, overlay2.value, parseFloat(overlay2.opacity));
            native.setPedHeadOverlayColor(alt.Player.local.scriptID, overlay2.id, 1, overlay2.color1, color2);
        }
        // Eyes
        native.setPedEyeColor(alt.Player.local.scriptID, data.eyes);
        if (data.sex === 0) {
            native.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 0); // arms
            native.setPedComponentVariation(alt.Player.local.scriptID, 4, 14, 0, 0); // pants
            native.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 0); // shoes
            native.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 0); // shirt
            native.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, 0, 0); // torso
        } else {
            native.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 0); // arms
            native.setPedComponentVariation(alt.Player.local.scriptID, 4, 14, 0, 0); // pants
            native.setPedComponentVariation(alt.Player.local.scriptID, 6, 34, 0, 0); // shoes
            native.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 0); // shirt
            native.setPedComponentVariation(alt.Player.local.scriptID, 11, 91, 0, 0); // torso
        }
        prevData = data;
    });
    return _fixHanleSync.apply(this, arguments);
}
