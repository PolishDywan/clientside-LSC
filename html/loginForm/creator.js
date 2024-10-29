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
const fModel = alt.hash('mp_f_freemode_01');
const mModel = alt.hash(`mp_m_freemode_01`);
let view;
let oldData = {};
let prevData = {};
let readyInterval;
native.requestModel(fModel);
native.requestModel(mModel);
alt.loadModel(fModel);
alt.loadModel(mModel);
function handleSync(data) {
    return _handleSync.apply(this, arguments);
}
function _handleSync() {
    _handleSync = _asyncToGenerator(function*(data) {
        native.clearPedBloodDamage(alt.Player.local.scriptID);
        native.clearPedDecorations(alt.Player.local.scriptID);
        native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        const hash = data.sex === 0 ? fModel : mModel;
        if (!prevData || prevData.sex !== data.sex) {
            native.setPlayerModel(alt.Player.local.scriptID, hash);
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
