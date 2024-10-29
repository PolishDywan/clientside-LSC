import alt from 'alt-client';
import game from 'natives';
import { createPedEditCamera, destroyPedEditCamera, setFov, setZPos } from '../creator/camera.js';
let webView = null;
let cursor;
let canUse = true;
let lastUsage = Date.now();
alt.onServer('ClothingMenu:Show', ()=>{
    webView = new alt.WebView("http://resource/client/html/ClothingShop/index.html");
    cursor = true;
    canUse = true;
    alt.showCursor(true);
    webView.focus();
    game.freezeEntityPosition(alt.Player.local.scriptID, true);
    createPedEditCamera();
    setFov(80);
    setZPos(0.6);
    webView.on('load', ()=>{
        let sex = alt.Player.local.getSyncedMeta('PlayerSex');
        webView.emit('ClothingShop:LoadData', sex);
    });
    webView.on('ClothingShop:TryClothes', (a, b, c)=>{
        if (alt.Player.local.model == alt.hash("mp_f_freemode_01")) {
            switch(a){
                case 1:
                    if (b > 198) {
                        b += 14;
                    }
                    break;
                case 4:
                    if (b > 151) {
                        //b += 7;
                        b += 5;
                    }
                    break;
                case 6:
                    if (b > 106) {
                        //b += 8;
                        b += 7;
                    }
                    break;
                case 7:
                    if (b > 121) {
                        b += 1;
                    }
                    break;
                case 8:
                    if (b > 233) {
                        b += 2;
                    }
                    break;
                case 10:
                    if (b > 139) {
                        b += 5;
                    }
                    break;
                case 11:
                    if (b > 414) {
                        //b+=34;
                        b += 25;
                    }
                    break;
            }
        } else {
            // erkek
            switch(a){
                case 1:
                    if (b > 198) {
                        b += 14;
                    }
                    break;
                case 4:
                    if (b > 143) {
                        //b += 6;
                        b += 4;
                    }
                    break;
                case 6:
                    if (b > 99) {
                        //b+=8;
                        b += 7;
                    }
                    break;
                case 7:
                    if (b > 151) {
                        b += 2;
                    }
                    break;
                case 8:
                    if (b > 188) {
                        //b+=3;
                        b += 2;
                    }
                    break;
                case 10:
                    if (b > 129) {
                        b += 5;
                    }
                    break;
                case 11:
                    if (b > 392) {
                        //b+= 28;
                        b += 20;
                    }
                    break;
            }
        }
        game.setPedComponentVariation(alt.Player.local.scriptID, a, b, c, 2);
    });
    webView.on('ClothingShop:TryAccs', (a, b, c)=>{
        game.setPedPropIndex(alt.Player.local.scriptID, a, b, c, false);
    });
    webView.on('ClothingShop:Close', clothingMenuClose);
    webView.on('ClothingShop:Buy', (isAcc, type, id, texture, price)=>{
        if (canUse && lastUsage < Date.now()) {
            canUse = false;
            lastUsage = Date.now() + 1000;
            //alt.log(isAcc + " " + type + " " + id + " " + texture + " " + price);
            alt.emitServer('ClothingShop:WantToBuy', isAcc, type, id, texture, price);
        }
    });
});
alt.onServer('Clothes:Can:Use', ()=>{
    canUse = true;
});
alt.on('ClothingMenu:Close', clothingMenuClose);
function clothingMenuClose() {
    if (webView) {
        if (cursor) {
            alt.showCursor(false);
        }
        webView.destroy();
        webView = null;
        game.freezeEntityPosition(alt.Player.local.scriptID, false);
        destroyPedEditCamera();
    }
    alt.emitServer('ClothingShop:Close');
}
