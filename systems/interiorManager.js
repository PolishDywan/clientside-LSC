import * as alt from 'alt';
import * as native from 'natives';

let currentInt = null;
let interiorID = null;
let props = null;
let tick = undefined;
alt.onServer('InteriorManager:LoadInterior', (data, x,y,z) => {
    let obj = JSON.parse(data);
    
    if(obj.businessInterior != null | undefined){
        alt.requestIpl(obj.businessInterior);
        currentInt = obj.businessInterior;
        interiorID = native.getInteriorAtCoords(x,y,z);
        props = obj.businessInteriorSettings;
        if(obj.businessInteriorSettings)
            obj.businessInteriorSettings.forEach(e => {
                native.activateInteriorEntitySet(interiorID, e.entitySet);
            });
    
        native.refreshInterior(interiorID);
    
        if(obj.interiorTime){
            if(obj.interiorTime != 0){
                if(tick)
                    alt.clearEveryTick(tick);
        
                tick = alt.everyTick(() => {
                    native.setClockTime(obj.interiorTime, 0, 0);
                });
            }
        }
    }
    else if(obj.houseInteriorSettings != null | undefined){
        alt.requestIpl(obj.houseInterior);
        currentInt = obj.houseInteriorSettings;
        interiorID = native.getInteriorAtCoords(x,y,z);
        props = obj.houseInteriorSettings;
        if(obj.houseInteriorSettings)
            obj.houseInteriorSettings.forEach(e => {
                native.activateInteriorEntitySet(interiorID, e.entitySet);
            });
    
        native.refreshInterior(interiorID);

    }

})

alt.onServer('InteriorManager:ExitInterior', () => {
    if(currentInt){
        props.forEach(e => {
            native.deactivateInteriorEntitySet(interiorID, e.entitySet);
        });
        native.refreshInterior(interiorID);
        alt.removeIpl(currentInt);
        currentInt = null;
        interiorID = null;
        props = null;

        if(tick){
            alt.clearEveryTick(tick);
            tick = undefined;
        }
    }
})