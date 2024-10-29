import alt from 'alt';
import * as game from 'natives';

let player = alt.Player.local;

alt.onServer('Job:Trash:Search', () => {
    let canUse = false;

    TrashBoxList.forEach(e => {
        let canTake = game.getClosestObjectOfType(player.pos.x, player.pos.y, player.pos.z, 3.0, alt.hash(e), false, false, false);
        //let garbagePos = game.getEntityCoords(canBuy, false);
        if(!canUse){
            if(canTake != null && canTake != 0){
                canUse = true;
                alt.emitServer('Job:Trash:Take');
            }
        }
    });
    if(!canUse){alt.emit('chat:message', null, "{DF1111}[HATA] Yakınınızda bir çöp kutusu bulunamadı!");}

})
//

let TrashBoxList = [
    "prop_dumpster_01a",
    "prop_dumpster_02a",
    "prop_dumpster_02b",
    "prop_dumpster_3a",
    "prop_dumpster_4a",
    "prop_dumpster_4b",
    "prop_skip_01a",
    "prop_skip_02a",
    "prop_skip_06a",
    "prop_skip_05a",
    "prop_skip_03",
    "prop_skip_10a"
];