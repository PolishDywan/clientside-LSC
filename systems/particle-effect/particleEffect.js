import * as alt from 'alt';
import * as native from 'natives';

native.requestNamedPtfxAsset("core");


let pEffects = [];


alt.onServer('Particle:LoadAll', (obj) => {
    let data = JSON.parse(obj);
    data.forEach(e => {    
        native.useParticleFxAsset("core");
        let id = native.startParticleFxLoopedAtCoord(e.name, e.pos.X, e.pos.Y, e.pos.Z, e.rot.X, e.rot.Y, e.rot.Z, e.scale, e.xAxis, e.yAxis, e.zAxis, 0);
        pEffects[e.ID] = { Id: id ,name: e.name, pos: e.pos, rot: e.rot, scale: e.scale, xAxis: e.xAxis, yAxis: e.yAxis, zAxis: e.zAxis };         
    });
});


alt.onServer('Particle:Create', (obj) => {
    alt.log(obj);
    let data = JSON.parse(obj);
    if(pEffects[data.ID]) {
        native.useParticleFxAsset("core");
        native.stopParticleFxLooped(pEffects[data.ID].Id, 0);
        let id = native.startParticleFxLoopedAtCoord(data.name, data.pos.X, data.pos.Y, data.pos.Z, data.rot.X, data.rot.Y, data.rot.Z, data.scale, data.xAxis, data.yAxis, data.zAxis, 0);
        pEffects[data.ID].Id = id;
        pEffects[data.ID].name = data.name;
        pEffects[data.ID].pos = data.pos;
        pEffects[data.ID].rot = data.rot;
        pEffects[data.ID].scale = data.scale;
        pEffects[data.ID].xAxis = data.xAxis;
        pEffects[data.ID].yAxis = data.yAxis;
        pEffects[data.ID].zAxis = data.zAxis;
    }
    else{
        native.useParticleFxAsset("core");
        let id2 = native.startParticleFxLoopedAtCoord(data.name, data.pos.X, data.pos.Y, data.pos.Z, data.rot.X, data.rot.Y, data.rot.Z, data.scale, data.xAxis, data.yAxis, data.zAxis, 0);
        pEffects[data.ID] = { Id: id2 ,name: data.name, pos: data.pos, rot: data.rot, scale: data.scale, xAxis: data.xAxis, yAxis: data.yAxis, zAxis: data.zAxis };
    
    }
    
});

alt.onServer('Particle:Remove', (id) => {
    native.stopParticleFxLooped(pEffects[id].Id, 0);
    delete pEffects[id];
});

alt.onServer('Particle:ClearAll', () => {
    pEffects.forEach(e => {
        native.stopParticleFxLooped(e.Id, 0);
        delete pEffects[e];
    });
    pEffects = [];
});


var canStopFire = true;
alt.setInterval(() => {
    let wep = native.getCurrentPedWeapon(alt.Player.local.scriptID, 0x060EC506, true)
    if(wep[0]){
        let a = native.isPlayerFreeAiming(alt.Player.local);
        if(a){
            if(canStopFire){
                canStopFire = false;
                alt.emitServer('FD:TryStopFire');
                alt.setTimeout(() => { 
                    canStopFire = true;
                    }, 2000);
            }
        }       
             
    }
}, 0);