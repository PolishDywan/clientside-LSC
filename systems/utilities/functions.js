import * as alt from 'alt';
import * as native from 'natives';

export function drawSubtitle(text, duration){
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}

export function getNearestVeh() {
    let entityWorld = native.getOffsetFromEntityInWorldCoords(alt.Player.local.scriptID, 0.0, 3.0, 0.0);
    let rayHandle = native.startShapeTestRay(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, entityWorld.x, entityWorld.y, entityWorld.z, 10, alt.Player.local.scriptID, 0);
    let vehicleHandle = native.getShapeTestResult(rayHandle);
    return vehicleHandle[4];
}