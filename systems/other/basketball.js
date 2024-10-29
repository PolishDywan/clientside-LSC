/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as Vector from '../utilities/vector';
//#region Server Listeners.

//#endregion

//#region Variables
var Mode = false;
var Tick = undefined;
var Player = alt.Player.local;
var isBallOwner = false;
var Court_ID = 0;

let BallShutStrength = null;
//#endregion Variables End

alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue) => {
    if(entity == alt.Player.local){
        
        if(key == 'BasketBall:Ball:Owner'){
            if(value == true){
                isBallOwner = true;
            }
            else{
                isBallOwner = false;
            }
        }
    }
})

//#region Functions
function StartBasketBallMode(StartPosition){
    
}
//#endregion Functions End


// ! Key Events
alt.on('keyup', (key) => {
    if(Mode){
        let ball = native.getClosestObjectOfType(player.pos.x, player.pos.y, player.pos.z, 3.0, alt.hash("prop_bskball_01"), false, false, false);
        let ballCoord = native.getEntityCoords(ball, false);
        switch(key){
            case 82:
                if(Vector.distance(ballCoord, Player.pos) <= 1){
                    alt.emitServer('Basketball:PlayerEvent:BallPush', Court_ID);
                }
                break;
            case 69:
                if(isBallOwner){
                    if(BallShutStrength != null){
                        let strenght = (Date.now() - BallShutStrength);
                        BallShutStrength = null;
                        alt.emitServer('Basketball:PlayerEvent:BallShut', Court_ID, strenght);
                    }
                }
        }
    }

})

alt.on('keydown', (key) => {
    if(Mode){
        switch(key){
            case 69:
                if(isBallOwner){
                    BallShutStrength = Date.now();
                }
        }
    }
})