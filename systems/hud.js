import * as alt from 'alt';
import * as native from 'natives';
import {distance} from './utilities/vector.js';


alt.onServer('Chat:AddTag', (id, message, r,g,b,a, time) => {
    let entity = alt.Player.getByID(id);
    let check = list[id];
    if(check){
        alt.clearTimeout(list[id].timeOut);
        delete list[id];
    }
        

    
    let obj = {entity: entity, message: message, color: {r: r, g: g, b: b, a: a}};
    
    list[id] = obj;

    list[id].timeOut = alt.setTimeout(() => {
        delete list[id];
    }, time * 1000);
});

alt.onServer('Chat:Bouble', (id, message) => {
    let entity = alt.Player.getByID(id);
    let check = bouble[id];
    if(check){
        alt.clearTimeout(bouble[id].timeOut);
        delete list[id];
    }
        

    
    let obj = {entity: entity, message: message};
    
    bouble[id] = obj;

    bouble[id].timeOut = alt.setTimeout(() => {
        delete bouble[id];
    }, 6000);
})

alt.setMeta('Chat:Bouble', true);

alt.onServer('Chat:BoubleClose', () => {
    let text = (alt.getMeta('Chat:Bouble')) ? "kapatıldı.":"Açıldı.";
    alt.emit('chat:message', null, "{BFCB41}[?] Sohbet baloncukları " + text);
    alt.setMeta('Chat:Bouble', !alt.getMeta('Chat:Bouble'));
})

alt.everyTick(showChatOnHead);

let list = [];
let bouble = [];
function showChatOnHead(){

    list.forEach(x => {
        if(x && x.entity && x.entity.pos){ // Önceki: if(x)
            let d = distance(x.entity.pos, alt.Player.local.pos);
            if(d <= 10){
                if (x.message && x.message != "") {
                    if (native.isTrackedPedVisible(x.entity.scriptID) || x.entity.id != alt.Player.local.id) {                        
                        native.setDrawOrigin(x.entity.pos.x , x.entity.pos.y , x.entity.pos.z + 1 , 0);
                        native.beginTextCommandDisplayText( 'CELL_EMAIL_BCON' );
                        x.message.match(/.{1,99}/g).forEach(textBlock => {
                            native.addTextComponentSubstringPlayerName("~n~" + textBlock);
                        });
                        //native.addTextComponentSubstringPlayerName( x.message );
                        native.setTextFont(0);
                        native.setTextCentre(true);
                        native.setTextScale(0.26, 0.25);
                        native.setTextProportional(true);
                        native.setTextColour(x.color.r, x.color.g, x.color.b, x.color.a);                 
                        native.setTextWrap( 0.0, 0.5 );                    
                        native.setTextOutline();
                        native.setTextDropShadow();
                        native.endTextCommandDisplayText( 0, 0, 0 );
                        native.clearDrawOrigin();
                    }
                }
            } 
        }
    })

    if(alt.getMeta('Chat:Bouble')){
        bouble.forEach(x => {
            if(x){
                let d = distance(x.entity.pos, alt.Player.local.pos);
                if(d <= 10){
                    if (x.message && x.message != "") {
                        if (native.isTrackedPedVisible(x.entity.scriptID) || x.entity.id != alt.Player.local.id) {                        
                            native.setDrawOrigin(x.entity.pos.x , x.entity.pos.y , x.entity.pos.z + 1.35 , 0);
                            native.beginTextCommandDisplayText( 'CELL_EMAIL_BCON' );
                            x.message.match(/.{1,99}/g).forEach(textBlock => {
                                native.addTextComponentSubstringPlayerName("~n~" + textBlock);
                            });
                            native.setTextFont(0);
                            native.setTextCentre(true);
                            native.setTextScale(0.24, 0.24);
                            native.setTextProportional(true);
                            native.setTextColour(250,250,250,180);                 
                            native.setTextWrap( 0.0, 0.5 );                    
                            native.setTextOutline();
                            native.setTextDropShadow();
                            native.endTextCommandDisplayText( 0, 0, 0 );
                            native.clearDrawOrigin();
                        }
                    }
                } 
            }
        })
    }
    
}
