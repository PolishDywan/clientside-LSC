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
var Objects = {}; // Önceki hali var Objecs=[]
// !Listeners
alt.on("gameEntityCreate", function() {
    var _ref = _asyncToGenerator(function*(entity) {
        //alt.log('entity Create oldu.')
        if (entity.hasStreamSyncedMeta('AttachedObjects')) addAllObjects(entity, entity.getStreamSyncedMeta('AttachedObjects'));
    });
    return function(entity) {
        return _ref.apply(this, arguments);
    };
}());
alt.on("gameEntityDestroy", function() {
    var _ref = _asyncToGenerator(function*(entity) {
        //alt.log('Entity Destroy oldu.')
        if (entity.hasStreamSyncedMeta('AttachedObjects')) deleteAllObjects(entity);
    });
    return function(entity) {
        return _ref.apply(this, arguments);
    };
}());
alt.on('streamSyncedMetaChange', function() {
    var _ref = _asyncToGenerator(function*(entity, key, value, oldvalue) {
        //alt.log('Synced Change:');
        //alt.log(key);
        //alt.log('~n~' + value);
        if (key === "AttachedObjects") {
            if (value === null || value === undefined) deleteAllObjects(entity);
            else checkUpdate(entity, value);
        }
    });
    return function(entity, key, value, oldvalue) {
        return _ref.apply(this, arguments);
    };
}());
function addAllObjects(entity, ObjectsData) {
    return _addAllObjects.apply(this, arguments);
}
function _addAllObjects() {
    _addAllObjects = // ?Functions
    _asyncToGenerator(function*(entity, ObjectsData) {
        try {
            let o = JSON.parse(ObjectsData);
            if (!Objects[entity.id]) {
                Objects[entity.id].Objects = [];
                o.forEach((x)=>{
                    addAttachedObject(entity, x);
                });
            }
        } catch (e) {}
    });
    return _addAllObjects.apply(this, arguments);
}
function addAttachedObject(entity, oData) {
    return _addAttachedObject.apply(this, arguments);
}
function _addAttachedObject() {
    _addAttachedObject = _asyncToGenerator(function*(entity, oData) {
        try {
            let objectID = undefined;
            loadModel(oData.Model).then(()=>{
                objectID = native.createObjectNoOffset(native.getHashKey(oData.Model), parseFloat(oData.x), parseFloat(oData.y), parseFloat(oData.z), false, false, false);
                native.attachEntityToEntity(objectID, entity.scriptID, /*native.getEntityBoneIndexByName(entity.scriptID, oData.boneIndex) */ /*oData.boneIndex*/ native.getPedBoneIndex(entity.scriptID, parseInt(oData.boneIndex)), parseFloat(oData.xPos), parseFloat(oData.yPos), parseFloat(oData.zPos), parseFloat(oData.xRot), parseFloat(oData.yRot), parseFloat(oData.zRot), true, true, false, true, 1, true);
                attachObjectToEntity(objectID, entity).then(()=>{
                    if (Objects[entity.id]) {
                        if (Objects[entity.id].Objects) Objects[entity.id].Objects[objectID] = {
                            ServerID: oData.serverID,
                            ObjectID: objectID
                        };
                        else {
                            Objects[entity.id].Objects = [];
                            Objects[entity.id].Objects[objectID] = {
                                ServerID: oData.serverID,
                                ObjectID: objectID
                            };
                        }
                    } else {
                        Objects[entity.id] = [];
                        Objects[entity.id].Objects = [];
                        Objects[entity.id].Objects[objectID] = {
                            ServerID: oData.serverID,
                            ObjectID: objectID
                        };
                    }
                });
            });
        } catch (e) {}
    });
    return _addAttachedObject.apply(this, arguments);
}
function deleteAllObjects(entity) {
    return _deleteAllObjects.apply(this, arguments);
}
function _deleteAllObjects() {
    _deleteAllObjects = _asyncToGenerator(function*(entity) {
        try {
            if (Objects[entity.id]) {
                if (Objects[entity.id].Objects) Objects[entity.id].Objects.forEach((x)=>{
                    native.deleteObject(x.ObjectID);
                });
            }
            if (Objects[entity.id]) delete Objects[entity.id];
        } catch (e) {}
    });
    return _deleteAllObjects.apply(this, arguments);
}
function checkUpdate(entity, objectData) {
    return _checkUpdate.apply(this, arguments);
}
function _checkUpdate() {
    _checkUpdate = _asyncToGenerator(function*(entity, objectData) {
        try {
            let oData = JSON.parse(objectData);
            oData.forEach((e)=>{
                if (Objects[entity.id]) {
                    if (Objects[entity.id].Objects !== undefined || Objects[entity.id].Objects !== null) {
                        if (Objects[entity.id].Objects.find((x)=>x.serverID == e.serverID) === undefined || Objects[entity.id].Objects.find((x)=>x.serverID == e.serverID) === null) {
                            addAttachedObject(entity, e);
                        }
                    }
                } else {
                    addAttachedObject(entity, e);
                }
            });
            if (Objects[entity.id]) {
                if (Objects[entity.id].Objects) {
                    Objects[entity.id].Objects.forEach((e)=>{
                        let check = oData.find((y)=>y.serverID == e.serverID);
                        if (check === null || check === undefined) {
                            native.deleteObject(check.ObjectID);
                        }
                        delete Objects[entity.id].Objects[check.ObjectID];
                    });
                }
            }
        } catch (e) {}
    });
    return _checkUpdate.apply(this, arguments);
}
function loadModel(model) {
    return _loadModel.apply(this, arguments);
}
function _loadModel() {
    _loadModel = _asyncToGenerator(function*(model) {
        return new Promise((resolve)=>{
            var oModel;
            oModel = native.getHashKey(model);
            if (!native.isModelValid(oModel)) return resolve(false);
            if (native.hasModelLoaded(oModel)) return resolve(true);
            native.requestModel(oModel);
            let interval = alt.setInterval(()=>{
                if (native.hasModelLoaded(oModel)) {
                    resolve(true);
                    alt.clearInterval(interval);
                }
            }, 10);
        });
    });
    return _loadModel.apply(this, arguments);
}
function attachObjectToEntity(object, entity) {
    return _attachObjectToEntity.apply(this, arguments);
}
function _attachObjectToEntity() {
    _attachObjectToEntity = _asyncToGenerator(function*(object, entity) {
        return new Promise((resolve)=>{
            if (!native.isEntityAttachedToEntity(object, entity)) return resolve(false);
            if (native.isEntityAttachedToEntity(object, entity)) return resolve(true);
            let interval = alt.setInterval(()=>{
                if (native.isEntityAttachedToEntity(object, entity)) {
                    resolve(true);
                    alt.clearInterval(interval);
                }
            }, 10);
        });
    });
    return _attachObjectToEntity.apply(this, arguments);
}
