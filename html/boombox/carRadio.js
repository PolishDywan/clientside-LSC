import alt from 'alt-client';
import { distance } from '../../utils/vector';
let player = alt.Player.local;
let isSound = true;
var cef = new alt.WebView("http://resource/client/html/boombox/index2.html");
alt.onServer('Boom:isSound', ()=>{
    isSound = !isSound;
});
var vehicles = {};
alt.on('gameEntityCreate', (ent)=>{
    if (ent instanceof alt.Vehicle) {
        let radio = ent.getStreamSyncedMeta('Vehicle:Radio:Link') ? ent.getStreamSyncedMeta('Vehicle:Radio:Link') : '';
        let date = ent.getStreamSyncedMeta('Vehicle:Radio:Date') ? ent.getStreamSyncedMeta('Vehicle:Radio:Date') : 0;
        let volume = ent.getStreamSyncedMeta('Vehicle:Radio:Volume') ? ent.getStreamSyncedMeta('Vehicle:Radio:Volume') : 0;
        let window = ent.getStreamSyncedMeta("Vehicle:Window") ? ent.getStreamSyncedMeta("Vehicle:Window") : true;
        vehicles[ent.id] = {
            ent: ent,
            radio: radio,
            date: date,
            volume: volume,
            window: window
        };
        if (vehicles[ent.id].radio) {
            let now = new Date().getTime();
            let date1 = Math.abs(Math.round((vehicles[ent.id].date - now) / 1000)) - 320;
            cef.emit('Boom:StartSound', ent.id, vehicles[ent.id].radio, date1);
            cef.emit('Boom:SetVolume', ent.id, 0);
        }
    }
});
alt.on('gameEntityDestroy', (ent)=>{
    if (ent instanceof alt.Vehicle && vehicles[ent.id]) {
        cef.emit('Boom:StopSound', ent.id);
        delete vehicles[ent.id];
    }
});
alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue)=>{
    if (entity instanceof alt.Vehicle) {
        if (vehicles[entity.id]) {
            if (key == "Vehicle:Window") {
                vehicles[entity.id].window = value;
            } else if (key == 'Vehicle:Radio:Link') {
                if (value) {
                    vehicles[entity.id].radio = value;
                    let now = new Date().getTime();
                    let date = Math.abs(Math.round((vehicles[entity.id].date - now) / 1000)) - 320;
                    cef.emit('Boom:StartSound', entity.id, value, date);
                    cef.emit('Boom:SetVolume', entity.id, 0);
                } else {
                    vehicles[entity.id].radio = null;
                    cef.emit('Boom:StopSound', entity.id);
                }
            } else if (key == 'Vehicle:Radio:Date') {
                vehicles[entity.id].date = value;
            } else if (key == 'Vehicle:Radio:Volume') {
                vehicles[entity.id].volume = value;
            }
        }
    }
});
alt.setInterval(()=>{
    for(let i in vehicles){
        let ent = vehicles[i];
        if (isSound) {
            let dist = distance(player.pos, ent.ent.pos);
            if (dist < 50) {
                if (!ent.window) {
                    let volume = ent.volume ? ent.volume : 0;
                    volume = volume - dist * 17;
                    if (volume < 0) {
                        volume = 0;
                    }
                    if (player.vehicle == ent.ent) {
                        cef.emit('Boom:SetVolume', ent.ent.id, ent.volume ? ent.volume : 0);
                    } else {
                        cef.emit('Boom:SetVolume', ent.ent.id, volume);
                    }
                } else {
                    let volume1 = ent.volume ? ent.volume : 0;
                    volume1 = volume1 - dist * 2;
                    if (volume1 < 0) {
                        volume1 = 0;
                    }
                    cef.emit('Boom:SetVolume', ent.ent.id, volume1);
                }
            } else {
                cef.emit('Boom:SetVolume', ent.ent.id, 0);
            }
        } else {
            cef.emit('Boom:SetVolume', ent.ent.id, 0);
        }
    }
}, 500);
