import alt from 'alt-client';
import game from 'natives';
var inv = new alt.WebView("http://resource/client/html/inventory/index.html");
var isOpen = false;
let canUse = true;
inv.on('load', function() {
    alt.on('keydown', (key)=>{
        if (key === 73) toggleInv();
    });
    alt.onServer("inventory:Update", function(data) {
        canUse = true;
        if (!alt.Player.local.hasSyncedMeta('PlayerClothesLock')) {
            let sex = alt.Player.local.getSyncedMeta('PlayerSex');
            if (sex === 0) {
                game.clearPedProp(alt.Player.local.scriptID, 0);
                game.clearPedProp(alt.Player.local.scriptID, 1);
                game.clearPedProp(alt.Player.local.scriptID, 6);
                game.clearPedProp(alt.Player.local.scriptID, 7);
                game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, -1, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, -1, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 11, 1, 20, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 8, 1, 20, 2);
                //game.setPedComponentVariation(alt.Player.local.scriptID,3,15,0,2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 9, 1, 20, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 4, 15, 0, 2);
            } else {
                game.clearPedProp(alt.Player.local.scriptID, 0);
                game.clearPedProp(alt.Player.local.scriptID, 1);
                game.clearPedProp(alt.Player.local.scriptID, 6);
                game.clearPedProp(alt.Player.local.scriptID, 7);
                game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, -1, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, -1, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 11, 1, 20, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 8, 1, 20, 2);
                //game.setPedComponentVariation(alt.Player.local.scriptID,3,15,0,2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 6, 34, 0, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 9, 1, 20, 2);
                game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2);
            }
        }
        inv.emit('inventory:Update', data);
    });
    //alt.emit('inventory:wantUse', $(this).attr('id'), secilenItem, 1);
    inv.on('inventory:wantUse', function(a, b, c) {
        if (canUse) {
            canUse = false;
            alt.emitServer('inventory:wantUse', parseInt(a), parseInt(b), parseInt(c));
        }
    });
    function toggleInv() {
        if (isOpen) {
            inv.emit('inventory:Close');
            isOpen = false;
            alt.showCursor(false);
            alt.toggleGameControls(true);
            inv.unfocus();
        } else {
            if (alt.gameControlsEnabled()) {
                inv.emit('inventory:Open');
                isOpen = true;
                alt.showCursor(true);
                alt.toggleGameControls(false);
                inv.focus();
            }
        }
    }
    inv.on('inventory:setProp', function(a, b, c) {
        let component = parseInt(a);
        let drawable = parseInt(b);
        let texture = parseInt(c);
        game.setPedPropIndex(alt.Player.local.scriptID, component, drawable, texture, false);
    });
    inv.on('inventory:setComp', function(a, b, c) {
        if (!alt.Player.local.hasSyncedMeta('PlayerClothesLock')) {
            let component = parseInt(a);
            let drawable = parseInt(b);
            let texture = parseInt(c);
            if (alt.Player.local.model == alt.hash("mp_f_freemode_01")) {
                switch(component){
                    case 1:
                        if (drawable > 198) {
                            drawable += 14;
                        }
                        break;
                    case 4:
                        if (drawable > 151) {
                            //drawable += 7;
                            drawable += 5;
                        }
                        break;
                    case 6:
                        if (drawable > 106) {
                            //drawable += 8;
                            drawable += 7;
                        }
                        break;
                    case 7:
                        if (drawable > 121) {
                            drawable += 1;
                        }
                        break;
                    case 8:
                        if (drawable > 233) {
                            drawable += 2;
                        }
                        break;
                    case 10:
                        if (drawable > 139) {
                            drawable += 5;
                        }
                        break;
                    case 11:
                        if (drawable > 414) {
                            //drawable+=34;
                            drawable += 25;
                        }
                }
            } else {
                // erkek
                switch(component){
                    case 1:
                        if (drawable > 198) {
                            drawable += 14;
                        }
                        break;
                    case 4:
                        if (drawable > 143) {
                            //drawable += 6;
                            drawable += 4;
                        }
                        break;
                    case 6:
                        if (drawable > 99) {
                            //drawable+=8;
                            drawable += 7;
                        }
                        break;
                    case 7:
                        if (drawable > 151) {
                            drawable += 2;
                        }
                        break;
                    case 8:
                        if (drawable > 188) {
                            //drawable+=3;
                            drawable += 2;
                        }
                        break;
                    case 10:
                        if (drawable > 129) {
                            drawable += 5;
                        }
                        break;
                    case 11:
                        if (drawable > 392) {
                            //drawable+= 28;
                            drawable += 20;
                        }
                        break;
                }
            }
            game.setPedComponentVariation(alt.Player.local.scriptID, component, drawable, texture, 2);
        //game.setPedComponentVariation(alt.Player.local.scriptID,parseInt(a),parseInt(b),parseInt(c),2);
        } else {
        //game.setPedComponentVariation(alt.Player.local.scriptID,a,b,parseInt(c),2);
        }
    /*if(a === 11){
            if(b <= 0){
                game.setPedComponentVariation(alt.Player.local.scriptID,3,15,0,2);
            }else{
                let sex = alt.Player.local.getSyncedMeta('PlayerSex');            
                //let torso = getTorso(sex, b);
                alt.log(b);
                alt.log(torso);
                alt.log(sex);
                game.setPedComponentVariation(alt.Player.local.scriptID,3,torso,0,2);
            }
            
        }*/ });
});
/*function getTorso(sex, elbise){
    if(sex === 1){
        return Male[elbise];
    }
    else{
        return Female[elbise];
    }
}*/ alt.onServer('Inv:ForceClose', ()=>{
    inv.emit('inventory:Close');
    isOpen = false;
    alt.showCursor(false);
    alt.toggleGameControls(true);
    inv.unfocus();
});
alt.onServer('Inv:CanUseYes', ()=>{
    canUse = true;
});
