/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

alt.onServer("Helicam:Vehicle", (veh) =>{
    var cam = native.createCam("DEFAULT_SCRIPTED_FLY_CAMERA", true);
    var vehicle =  alt.Player.getByID(veh);
    var fov = (15)*0.5
    native.attachCamToEntity(cam, vehicle, 0.0,0.0,-1.5, true);
    native.setCamRot( cam, 0.0,0.0,native.GetEntityHeading(vehicle));
    native.setCamFov(cam, fov); 
    while (vehicle) {
        native.pointCamAtEntity(cam, vehicle, 0.0, 0.0, 0.0, true);
    }
});