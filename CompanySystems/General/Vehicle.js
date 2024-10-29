import alt from 'alt';
import * as game from 'natives';

let cars = {};
let objectList = {};

alt.on("gameEntityCreate", (entity) => {
    if(entity instanceof alt.Vehicle){
        cars[entity.id] = entity;
        if(entity.hasStreamSyncedMeta('WoodStorage'))
            AttachWoodToFlatBed(entity);
        
        if(entity.hasStreamSyncedMeta('PlankStorage') && !entity.hasStreamSyncedMeta('WoodStorage'))
            AttachPlankToFlatBed(entity);
    }
});

alt.on("gameEntityDestroy", (entity) => {
    if(entity instanceof alt.Vehicle){ 
        if(entity.hasStreamSyncedMeta('WoodStorage') || entity.hasStreamSyncedMeta('PlankStorage'))
            DetachWoodFromFlatBed(entity);

            delete cars[entity.id]; 
    }
});

alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue) =>{
    //alt.log(key, value, oldvalue, entity);
    if(entity instanceof alt.Vehicle){
        if(key === "WoodStorage"){        
            if(oldvalue <= 0 || oldvalue == undefined || oldvalue == null)
                if(value > 0 || !entity.hasStreamSyncedMeta('PlankStorage')){
                    clearVehicleAttach(entity);
                    AttachWoodToFlatBed(entity);
                }

                    
            if(value == undefined || value == null)
                    DetachWoodFromFlatBed(entity);
        }
        if(key === 'PlankStorage'){
            if(oldvalue <= 0 || oldvalue == undefined || oldvalue == null){
                if(value >= 0 && !entity.hasStreamSyncedMeta('WoodStorage')){
                    clearVehicleAttach(entity);
                    AttachPlankToFlatBed(entity);
                }
            }
            if(value < 0 || value == undefined || value == null){
                DetachPlankFromFlatBed(entity);
            }
        }
        
    }
});


function AttachWoodToFlatBed(vehicle){
    let obj = game.createObject(4257791223, vehicle.pos.x, vehicle.pos.y, vehicle.pos.z, 1, 0, 1);
    game.attachEntityToEntity(obj, vehicle.scriptID, 60113, 0, -3, 0.2, 0,0,0, false, true, true, false, 0, true);
    objectList[vehicle.id] = {Object: obj, Vehicle: vehicle};
}
function DetachWoodFromFlatBed(vehicle){
    game.deleteObject(objectList[vehicle.id].Object);
    delete objectList[vehicle.id];
}

function AttachPlankToFlatBed(vehicle){
    let obj = game.createObject(1367246936, vehicle.pos.x, vehicle.pos.y, vehicle.pos.z, 1, 0, 1);
    game.attachEntityToEntity(obj, vehicle.scriptID, 60113, 0, -2, 0.2, 0,0,0, false, true, true, false, 0, true);
    objectList[vehicle.id] = {Object: obj, Vehicle: vehicle};
}
function DetachPlankFromFlatBed(vehicle){
    game.deleteObject(objectList[vehicle.id].Object);
    delete objectList[vehicle.id];
}

function clearVehicleAttach(vehicle){
    if(objectList[vehicle.id]){
        game.detachEntity(objectList[vehicle.id].Object);
        game.deleteObject(objectList[vehicle.id].Object);
        delete objectList[vehicle.id];
    }
}
