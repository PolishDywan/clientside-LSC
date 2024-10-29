/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt';
import * as native from 'natives';
import { cef } from '../StartUp.js';

let inCam;
alt.on('keydown', (key) => {
    if(key === 114){
        if(cef){
            cef.emit('Phone:Display');
        }
    }
    else if(key === 8){
        if(cef){
            if(inCam){
                if(camInterval) alt.clearEveryTick(camInterval);
                native.cellCamActivate(false, false);
                native.destroyMobilePhone();
                inCam = false;
                alt.emit('chat:message', null, "{DF1111}[!] Kameradan çıkıldı.")
            }
        }
    }
})

alt.onServer('Phone:Setup', (settings) => {
    cef.on('Phone:Ready', () => {
        alt.emitServer('cPhone:ShowContactList');
        cef.emit('Phone:UpdatePhoneSettings', settings);
    })

    cef.on('Phone:Wiew:Call', (number) => {
        alt.emitServer('cPhone:CallNumber', parseInt(number));
    })
})