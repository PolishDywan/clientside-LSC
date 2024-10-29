import alt from 'alt';
import native from 'natives';

let lastKey = null;
let oldKey = null;
let keyDate = null;

alt.on('keydown', (key) => { 
    oldKey = lastKey;
    lastKey = key;
    keyDate = Date.now();
 } );

 alt.setInterval(() => {
    if(oldKey == lastKey){
        alt.emitServer('AFK:UserAfk');
    }  

    if(Date.now() - keyDate > 300000){
        alt.emitServer('AFK:UserAfk');
    }
    
 }, 300000);