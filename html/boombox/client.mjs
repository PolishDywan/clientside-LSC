import alt from 'alt';
import native from 'natives';
import {
    distance,
    distanceB
} from '../../systems/utilities/vector.js';


//#region  Boombox
let sounds = [];
let player = alt.Player.local;
let isSound = true;

var cef = new alt.WebView("http://resource/client/html/boombox/index.html");


alt.onServer('Boom:AddSound', AddSound);

alt.onServer('Boom:RemoveSound', RemoveSound);

alt.onServer("Boom:SetVolume", (id,volume)=>{
	sounds[id].volume = volume;
});

alt.onServer('Boom:isSound', () => {
    isSound = !isSound;
    if(isSound){
        alt.emit('chat:message', null, "{DF1111}Radyo sesleri açıldı.");
    }else 
    {
        alt.emit('chat:message', null, "{DF1111}Radyo sesleri kapatıldı.");
        cef.emit('Boom:StopSound');
    }
})

alt.onServer('Boom:PlaySoundDirectly', (link, date = 0) => {
    if(isSound)
    cef.emit('Boom:StartSound', link, date);
})
 alt.onServer('Boom:SetVolumeDirectly', (volume) => {
     cef.emit('Boom:SetVolume', volume);
 })

 alt.onServer('Boom:StopSoundDirectly', () => {
     cef.emit('Boom:StopSound');
 })

alt.setInterval(() => {
    
    sounds.forEach(s => {
        if(s){
            s.Date += 1;
            let distanceP = distance(player.pos, s.coord);
            if(isSound){
                if(distanceP < 30){

                    if(s.isPlaying){
                        let volume = s.volume - Math.round(distanceP * 3);
                        //if(volume > 80) { volume = 80; }
                        //if(volume <= 0) { volume = 10; }
                        cef.emit('Boom:SetVolume', volume);
                    }
                    else{
                        s.isPlaying = true;
                        cef.emit('Boom:StartSound', s.link, s.Date);
                    }
    
                }
                else{
                    
                    if(s.isPlaying){
                        s.isPlaying = false;
                        cef.emit('Boom:StopSound', s.id);
                    }
                }
            }
            else{
                if(distanceP < 30){

                    if(s.isPlaying){
                        //let volume = s.volume - Math.round(distanceP * 3);
                        //if(volume > 80) { volume = 80; }
                        //if(volume <= 0) { volume = 10; }
                        cef.emit('Boom:SetVolume', 0);
                    }
                    else{
                        s.isPlaying = true;
                        cef.emit('Boom:StartSound', s.link, s.Date);
                    }
    
                }
                else{
                    
                    if(s.isPlaying){
                        s.isPlaying = false;
                        cef.emit('Boom:StopSound', s.id);
                    }
                }
            }
            
        }
    });

   


}, 1000);

function AddSound(id, volume, link, coord){
    let sound = {
        id: id,
		volume: volume,
        link: link,
        Date: 0,
        coord: coord,
        isPlaying: false,
        Audio: null
    };

    sounds[id] = sound;
    
}

function RemoveSound(id){
    if(sounds[id]){
        cef.emit('Boom:StopSound', sounds[id].id);
        sounds[id] = null;
    }  

}
//#endregion bombox End

//#region  ! CAR RADİO

// Car Radio 
/*
let lCar = {};
let carCefs = [];

alt.on("gameEntityCreate", (entity) => {
    if(entity instanceof alt.Vehicle){
        lCar[entity.id] = entity;
        //if(entity.hasStreamSyncedMeta('Vehicle:Radio:Link'))
            //startVehicleRadio(entity);   
    }
});

alt.on("gameEntityDestroy", (entity) => {
    if(entity instanceof alt.Vehicle) 
    {
        delete lCar[entity.id];
        stopVehicleRadio(entity);
    }
});


alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue) =>{
    if(entity instanceof alt.Vehicle){
        if(key === "Vehicle:Radio:Link"){
            if(oldvalue == undefined || oldvalue == null)
                startVehicleRadio(entity);
            else{
                stopVehicleRadio(entity);
                alt.setTimeout(() => {
                    startVehicleRadio(entity);    
                }, 50);            
                
                             
            }
        }
        if(key === "Vehicle:Radio:Volume"){
                setVehicleSoundU(entity);
            
        }
            
    }
});


alt.setInterval(() => {
    for (let x in lCar) {
        let v = lCar[x];
        if(v.hasStreamSyncedMeta('Vehicle:Radio:Link'))
            calcSound(v, v.getStreamSyncedMeta('Vehicle:Radio:Volume'));
    }
}, 100);


/*
function startVehicleRadio(entity){
    let now = new Date().getTime();
    //let carDate = new Date(entity.getSyncedMeta('Vehicle:Radio:Date')).getTime();
    //let date = (Date.now() - Date.parse(entity.getStreamSyncedMeta('Vehicle:Radio:Date'))) / 1000;
    let date = Math.abs(Math.round((entity.getSyncedMeta('Vehicle:Radio:Date') - now) / 1000));
    
    alt.log(now, carDate,date);
    carCef.emit('Boom:StartSound', entity.id, entity.getStreamSyncedMeta('Vehicle:Radio:Link'), date);    
    
    
    //carCefs[entity.id] = {Web: carCef, Sound: entity.getStreamSyncedMeta('Vehicle:Radio:Volume'), isPlaying: false, Entity: entity};            
}

function stopVehicleRadio(entity){
    carCef.emit('Boom:StopSound', entity.id);
}

function setVehicleSoundU(entity){
    
}

function calcSound(entity, sound){
    let dist = distance(player.pos, entity.pos);    
    if(dist < 50){
        if(!entity.getStreamSyncedMeta('Vehicle:Window')){
            let volume = sound - (dist * 17);
            if(volume < 0)
                volume = 0;
            if(player.Vehicle == entity){
                carCef.emit('Boom:SetVolume',entity.id, sound);
            }else  
            carCef.emit('Boom:SetVolume', entity.id, volume);
        }
        else{
            let volume = sound - (dist * 2);
            if(volume < 0)
                volume = 0;
                carCef.emit('Boom:SetVolume', entity.id, volume);
        }
    }
    else{
        carCef.emit('Boom:SetVolume', entity.id, 0);
    }
}

function startVehicleRadio(entity){
    //let check = carCefs.find(x => x.ID == entity.id);
    //if(!check){
            let carCef = new alt.WebView("http://resource/client/html/boombox/index2.html");
            
            carCef.on('load', () => {
                let now = new Date().getTime();
                let carDate = new Date(entity.getStreamSyncedMeta('Vehicle:Radio:Date')).getTime();
                //let date = (Date.now() - Date.parse(entity.getStreamSyncedMeta('Vehicle:Radio:Date'))) / 1000;
                let date = Math.abs(Math.round((carDate - now) / 1000));
                carCef.emit('Boom:StartSound', entity.getStreamSyncedMeta('Vehicle:Radio:Link'), date);
                carCefs[entity.id] = {Web: carCef, Sound: entity.getStreamSyncedMeta('Vehicle:Radio:Volume'), isPlaying: false, Entity: entity};
            })
            carCefs[entity.id] = {Web: carCef, Sound: entity.getStreamSyncedMeta('Vehicle:Radio:Volume'), isPlaying: false, Entity: entity};            
 
}

function stopVehicleRadio(entity){
    let cef = carCefs[entity.id];
    if(cef){
        cef.Web.destroy();
        cef.Web = null;
        carCefs[entity.id] = null;
        delete carCefs[entity.id];
    }
}

function setVehicleSoundU(entity){
    let cef = carCefs[entity.id].Web;
    if(cef){
        cef.Sound = entity.getStreamSyncedMeta('Vehicle:Radio:Volume');
    }
}

function calcSound(entity, sound){
    let dist = distance(player.pos, entity.pos);    
    let cef = carCefs[entity.id].Web;
    if(!entity.getStreamSyncedMeta('Vehicle:Window')){
        let volume = sound - (dist * 17);
        if(volume < 0)
            volume = 0;
        if(player.Vehicle == entity){
            cef.emit('Boom:SetVolume', sound);
        }else  
            cef.emit('Boom:SetVolume', volume);
    }
    else{
        let volume = sound - (dist * 2);
        if(volume < 0)
            volume = 0;
        cef.emit('Boom:SetVolume', volume);
    }
}*/

//#endregion
/*
alt.on('connectionComplete', () => {
    let carView = new alt.WebView("http://resource/client/html/boombox/index2.html");

    let streamedCars = {};

    alt.on("gameEntityCreate", (entity) => {
        if(entity instanceof alt.Vehicle){
            //alt.log('Araç Streame girdi ID' + entity.id);
            streamedCars[entity.id] = entity;
            if(entity.hasStreamSyncedMeta('Vehicle:Radio:Link'))
               StartRadio_Car(entity);  
        }
    });

    alt.on("gameEntityDestroy", (entity) => {
        if(entity instanceof alt.Vehicle) 
        {
            delete streamedCars[entity.id];
            StopRadio_Car(entity);
            //alt.log('Araç Streamden çıktı Radyo kapatıldı. ID: ' + entity.id);
        }
    });


    // https://www.youtube.com/watch?v=SI17KrbTIfM
    /*alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue) =>{
        if(entity instanceof alt.Vehicle){
            //alt.log(Math.abs(Math.round((new Date().getTime() - entity.getSyncedMeta('Vehicle:Radio:Date') ) / 1000)));
            if(key === "Vehicle:Radio:Link"){
                if(oldvalue === undefined || oldvalue === null)
                    StartRadio_Car(entity);
                else{
                    // StreamChange'de de çıktı
                    //StopRadio_Car(entity);
                    if(value == undefined || value == null){                      
                        StopRadio_Car(entity); 
                        //alt.log("Radyo vardı kapadım yeni linkle açıyorum abim.");
                    }
                    else{
                        StartRadio_Car(entity); 
                    }
                }
            }
            if(key === "Vehicle:Radio:Volume"){
                DistanceSound_Car(entity);
                //alt.log('Ses değişti. Araç ID:' + entity.id + " | Ses: " + value + " | Eski Ses: " + oldvalue);
            }
        }
    });*/
/*+
    alt.on('streamSyncedMetaChange', (entity, key, value, oldvalue) => {
        if(entity instanceof alt.Vehicle){
            if(streamedCars[entity.id]){
                if(key === "Vehicle:Radio:Link"){
                    if(oldvalue === undefined || oldvalue === null)
                        StartRadio_Car(entity);
                    else{
                        // StreamChange'de de çıktı
                        //StopRadio_Car(entity);
                        if(value == undefined || value == null){                      
                            StopRadio_Car(entity); 
                            //alt.log("Radyo vardı kapadım yeni linkle açıyorum abim.");
                        }
                        else{
                            StartRadio_Car(entity); 
                        }
                    }
                }
                if(key === "Vehicle:Radio:Volume"){
                    DistanceSound_Car(entity);
                    //alt.log('Ses değişti. Araç ID:' + entity.id + " | Ses: " + value + " | Eski Ses: " + oldvalue);
                }
            }
        }
    });

    function StartRadio_Car(entity){
        //let now = new Date().getTime();

        let date = Math.abs(Math.round((parseInt(new Date().getTime()) - parseInt(entity.getSyncedMeta('Vehicle:Radio:Date'))) / 1000));
        //alt.log("Şu kadar saniye: " +  date);
        //let date = (parseInt(new Date().getTime()) - parseInt(entity.getSyncedMeta('Vehicle:Radio:Date'))) / 1000;

        //alt.log(date);

        carView.emit('Boom:StartSound', entity.id, entity.getStreamSyncedMeta('Vehicle:Radio:Link'), date);
    }

    function StopRadio_Car(entity){
        carView.emit('Boom:StopSound', entity.id);
    }

    function DistanceSound_Car(entity, sound){
        let dist = distance(player.pos, entity.pos);    
        if(dist < 50){
            if(!entity.getStreamSyncedMeta('Vehicle:Window')){
                let volume = sound - (dist * 17);
                if(volume < 0)
                    volume = 0;
                if(player.Vehicle == entity){
                    carView.emit('Boom:SetVolume',entity.id, sound);
                }else  
                    carView.emit('Boom:SetVolume', entity.id, volume);
            }
            else{
                let volume = sound - (dist * 2);
                if(volume < 0)
                    volume = 0;
                carView.emit('Boom:SetVolume', entity.id, volume);
            }
        }
        else{
            carView.emit('Boom:SetVolume', entity.id, 0);
        }
    }


    alt.setInterval(() => {
        for (let x in streamedCars) {
            let v = streamedCars[x];
            if(v.hasStreamSyncedMeta('Vehicle:Radio:Link'))
                DistanceSound_Car(v, v.getStreamSyncedMeta('Vehicle:Radio:Volume'));
        }
    }, 150);
})

*/