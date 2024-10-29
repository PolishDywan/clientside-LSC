/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as game from 'natives';

import {distance} from '../utilities/vector.js';
import * as utilities from '../utilities/functions.js';

//#region Static
let Plyrs = {};

let player = alt.Player.local;
//#endregion


//#region Entity Create-Destory events
alt.on('gameEntityCreate', (entity) => {
  if(entity instanceof alt.Player)
    Plyrs[entity.id] = entity;
})

alt.on('gameEntityDestroy', (entity)=>{
    if(entity instanceof alt.Player)
        delete Plyrs[entity.id];
})

alt.on('connectionComplete', () => {
    alt.setMeta('player:Hud', false);
    alt.setMeta('player:NameTag', false);

    game.pauseClock(true);
    alt.setStat(alt.StatName.Stamina, 100);    
})
//#endregion

alt.on('login:callUpdate', () => {
    game.clearPedTasks(player.scriptID);
    alt.everyTick()// rendernameTags
});


//#region keyDown events
let recording = false;
let canPress = true;
let crouched = false;
//#endregion




//#region NameTags

//#endregion
