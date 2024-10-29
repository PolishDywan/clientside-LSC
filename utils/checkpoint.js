/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

import { distance } from './etc/vector.js';

let checkPoint_ID = null;
let checkPoint_Tick = null;

alt.onServer('Checkpoint:Create', CreateCheckpoint);
alt.onServer('Checkpoint:Destroy', DestroyCheckpoint);

function CreateCheckpoint(pos, cType, radius, r, g, b, a, triger, extraValue){
    let player = alt.Player.local;

    if(checkPoint_ID != null){
        native.deleteCheckpoint(checkPoint_ID);    
        alt.clearEveryTick(checkPoint_Tick);
    }

    checkPoint_ID = native.createCheckpoint(cType, pos.x, pos.y, pos.z, pos.x, pos.y, pos.z, radius, r,g,b,a,0);
    native.setNewWaypoint(pos.x, pos.y);
    checkPoint_Tick = alt.everyTick(() => {
        if(distance(player.pos, pos) < radius){
            alt.clearEveryTick(checkPoint_Tick)
            if(extraValue !== null)
                alt.emitServer(triger, extraValue);
            else
                alt.emitServer(triger);

            native.deleteCheckpoint(checkPoint_ID);
            checkPoint_ID = null;
            checkPoint_Tick = null;
        }
    })
}

function DestroyCheckpoint(){
    if(checkPoint_ID) native.deleteCheckpoint(checkPoint_ID);
    if(checkPoint_Tick) alt.clearEveryTick(checkPoint_Tick);
}