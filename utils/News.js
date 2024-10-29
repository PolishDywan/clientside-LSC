/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

import * as func from './etc/functions';

let currentCam = null;
let _camInterval = null;

alt.onServer('News:StartCamera', StartCamera);
alt.onServer('News:StopCamera', StopCamera);

function StartCamera(id){
    native.destroyAllCams(true);
    let target = alt.Player.getByID(id);
    let player = alt.Player.local;

    let boneindex = native.getEntityBoneIndexByName(target.scriptID, "FB_R_Brow_Out_000" );
    native.attachEntityToEntity(alt.Player.local.scriptID, target.scriptID, boneindex, 0, 0, -0.5, 0, 0, 0, true, false, true, false, 0, true)
    
    _camInterval = alt.setInterval(() => {
        if(native.isEntityAttachedToEntity(player.scriptID, target.scriptID)){
            
            if(!currentCam){
            currentCam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA',
                target.pos.x,
                target.pos.y,
                target.pos.z + 1,
                target.rot.x,
                target.rot.y,
                target.rot.z,
                60,
                true,
                0
                );          
            }   

            native.setCamActive(currentCam, true);
            native.renderScriptCams(true, false, 0, true, false);
        
            native.attachCamToEntity(currentCam, target.scriptID, 0.2,0.3,0.1, true);
            let rot = native.getEntityRotation(target.scriptID, 2);
            native.setCamRot(currentCam, rot.x, rot.y, rot.z, 0);
            native.setCamActive(currentCam, true);
            native.renderScriptCams(true, false, 0, true, false);      
            native.attachCamToEntity(currentCam, target.scriptID, 0.2,0.3,0.1, true);
            control.forEach(element => {
                native.disableControlAction(2, element, true);
            });
  
        }
        else{
            native.attachEntityToEntity(alt.Player.local.scriptID, alt.Player.getByID(id).scriptID, boneindex, 0, 0, -4, 0, 0, 0, true, false, true, false, 0, true)
        }
    }, 50);
}

function StopCamera(pos){
    if(_camInterval){
        alt.clearEveryTick(_camInterval);
        _camInterval == null;
    }

    alt.setTimeout(() => {
        native.destroyCam(currentCam, true);
        native.renderScriptCams(false, false, 0, false, false); 
        native.detachEntity(alt.Player.local.scriptID, true, true);
        native.setEntityVisible(alt.Player.local.scriptID, true, 0)
        native.setPedCanBeTargetted(alt.Player.local.scriptID, true);
        native.setEntityCanBeDamaged(alt.Player.local.scriptID, true);
        native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0,0,0, true);      
        native.setPedConfigFlag(alt.Player.local.scriptID, 314, false); 
        native.destroyAllCams(true);
    }, 50);
}