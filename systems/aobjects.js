/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

var Objects = [1]; // Önceki hali var Objecs=[]

// !Listeners
alt.on("gameEntityCreate", async(entity) => {
    //alt.log('entity Create oldu.')
    if(entity.hasStreamSyncedMeta('AttachedObjects'))
        addAllObjects(entity, entity.getStreamSyncedMeta('AttachedObjects'));
});

alt.on("gameEntityDestroy", async(entity) => {
    //alt.log('Entity Destroy oldu.')
    if(entity.hasStreamSyncedMeta('AttachedObjects'))
        deleteAllObjects(entity);
});

alt.on('streamSyncedMetaChange', async(entity, key, value, oldvalue) =>{
    //alt.log('Synced Change:');
    //alt.log(key);
    //alt.log('~n~' + value);
    if(key === "AttachedObjects"){
        if(value === null || value === undefined)
            deleteAllObjects(entity);
        else
            checkUpdate(entity, value);
    }
});
// ?Functions

async function addAllObjects(entity, ObjectsData){
    let o = JSON.parse(ObjectsData);
    if (!Objects[entity.id]) {
        Objects[entity.id].Objects = [];
        o.forEach(x => {
            addAttachedObject(entity, x);
        })
    }    
}

async function addAttachedObject(entity, oData)
{
    let objectID = undefined;
    loadModel(oData.Model).then(() => {
        objectID = native.createObjectNoOffset(native.getHashKey(oData.Model), parseFloat(oData.x), parseFloat(oData.y), parseFloat(oData.z), false, false, false);
        native.attachEntityToEntity(objectID, 
            entity.scriptID, 
            /*native.getEntityBoneIndexByName(entity.scriptID, oData.boneIndex) */ /*oData.boneIndex*/
            native.getPedBoneIndex(entity.scriptID, parseInt(oData.boneIndex)),
            parseFloat(oData.xPos),
            parseFloat(oData.yPos),
            parseFloat(oData.zPos),
            parseFloat(oData.xRot),
            parseFloat(oData.yRot),
            parseFloat(oData.zRot),
            true, true, false, true, 1, true);
        
        

        attachObjectToEntity(objectID, entity).then(() => {
            if(Objects[entity.id]){
                if(Objects[entity.id].Objects)
                Objects[entity.id].Objects[objectID] = { ServerID: oData.serverID ,ObjectID: objectID };
                else{
                    Objects[entity.id].Objects = [];
                    Objects[entity.id].Objects[objectID] = { ServerID: oData.serverID ,ObjectID: objectID };
                }
            }
            else{
                Objects[entity.id] = [];
                Objects[entity.id].Objects = [];
                Objects[entity.id].Objects[objectID] = { ServerID: oData.serverID ,ObjectID: objectID };
            }
        })
    });
}

async function deleteAllObjects(entity){
    if(Objects[entity.id])
        if(Objects[entity.id].Objects)
            Objects[entity.id].Objects.forEach(x => {
                native.deleteObject(x.ObjectID);
            });
    
    if(Objects[entity.id])
        delete Objects[entity.id];
}

async function checkUpdate(entity, objectData)
{
    let oData = JSON.parse(objectData);
    oData.forEach(e => {
        if(Objects[entity.id]){
            if(Objects[entity.id].Objects !== undefined || Objects[entity.id].Objects !== null){
                if(Objects[entity.id].Objects.find(x => x.serverID == e.serverID) === undefined || Objects[entity.id].Objects.find(x => x.serverID == e.serverID) === null){
                    addAttachedObject(entity, e);
                }
            }
        }
        else{
            addAttachedObject(entity, e);
        }
    });

    if(Objects[entity.id]){
        if(Objects[entity.id].Objects){
            Objects[entity.id].Objects.forEach(e => {
                let check = oData.find(y => y.serverID == e.serverID);
                if(check === null || check === undefined){
                    native.deleteObject(check.ObjectID);
                }
                delete Objects[entity.id].Objects[check.ObjectID];        
            })
        }
    }
}

async function loadModel(model) {
    return new Promise(resolve => {
        if(typeof(model) === Number){
           var oModel = model;
        }
        else{
          var oModel = native.getHashKey(model);
        }
        if (!native.isModelValid(oModel))
            return resolve(false);

        if (native.hasModelLoaded(oModel))
            return resolve(true);

            native.requestModel(oModel);

        let interval = alt.setInterval(() => {
                if (native.hasModelLoaded(oModel)) {
                    resolve(true);
                    alt.clearInterval(interval);
                }
            },
          10);
    });
}

async function attachObjectToEntity(object, entity){
    return new Promise(resolve => {
        if(!native.isEntityAttachedToEntity(object, entity))
            return resolve(false);

        if(native.isEntityAttachedToEntity(object, entity))
            return resolve(true);

        let interval = alt.setInterval(() => {
            if(native.isEntityAttachedToEntity(object, entity)){
                resolve(true);
                alt.clearInterval(interval);
            }
        }, 10);
    })
}