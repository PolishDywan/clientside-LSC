/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';

const controls = [
    22,24,25,140,141,142,257,263,264,//Saldırı
    59, // Araç
    69,92,114 // Araç saldırı.    
]

alt.onServer('player:CuffEvent', playerCuffEvent);
let tick;
function playerCuffEvent(state){
    if(state){
        native.setEnableHandcuffs(alt.Player.local.scriptID, true);

        if(alt.Player.local.getSyncedMeta('PlayerSex') === 0)
            native.setPedComponentVariation(alt.Player.local.scriptID, 7, 25, 0, 2);
        else
            native.setPedComponentVariation(alt.Player.local.scriptID, 7, 41, 0, 2);

        tick = alt.everyTick(() => {
            controls.forEach((e) => {
                native.disableControlAction(2, e, true);
            });

            if(!native.isEntityPlayingAnim(alt.Player.local.scriptID, 'mp_arresting', 'idle', 3)){
                native.taskPlayAnim(alt.Player.local.scriptID, 'mp_arresting', 'idle', 8.0, -8, -1, 49, 1, false, false, false);
            }

        });
    }
    else{
        native.setEnableHandcuffs(alt.Player.local.scriptID, false);
        if(alt.Player.local.getSyncedMeta('PlayerSex') === 0)
            native.setPedComponentVariation(alt.Player.local.scriptID, 7, 41, 1, 2);
        else
            native.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 2);

        if(tick){
            alt.clearEveryTick(tick);
            native.clearPedTasks(alt.Player.local.scriptID);
        }
    }
}