import * as alt from 'alt';
import * as native from 'natives';

// Weed Use Event
alt.onServer('Drug:UseWeed', (level) => {
    // Start
    switch(level){
        case 1:
            native.setTimecycleModifier("Drug_deadman");            

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                alt.emitServer('Drug:StateEnd');
            },  150000);
            break;

        case 2:
            native.setTimecycleModifier("Drug_deadman_blend");

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                alt.emitServer('Drug:StateEnd');
            }, 300000);
            break;

        case 3:
            native.setTimecycleModifier("Drug_deadman_blend");

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                alt.emitServer('Drug:StateEnd');
            }, 450000);
            break;

        case 4:
            native.setTimecycleModifier("dying");

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                alt.emitServer('Drug:StateEnd');
            },  600000);
            break;

        case 5:
            native.setTimecycleModifier("drug_wobbly");

            native.animpostfxPlay("DrugsMichaelAliensFightIn", level * 10000, false);

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                native.animpostfxStop("DrugsMichaelAliensFightIn");
                alt.emitServer('Drug:StateEnd');
            },  750000);
            break;

        case 6:
            native.setTimecycleModifier("drug_wobbly");

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                alt.emitServer('Drug:StateEnd');
            },  900000);
            break;


        case 7:
        case 8:
        case 9:
            native.setTimecycleModifier("drug_wobbly");

            native.animpostfxPlay("DMT_flight_intro", level * 10000, false);

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                native.animpostfxStop("DMT_flight_intro");
                alt.emitServer('Drug:StateEnd');
            }, 1200000);
            break;

        case 10:
            native.setTimecycleModifier("ufo_deathray");

            native.animpostfxPlay("DeathFailMPDark", level * 10000, false);

            alt.setTimeout( () => {
                native.clearTimecycleModifier();
                native.animpostfxStop("DeathFailMPDark");
                alt.emitServer('Drug:StateEnd');
            }, 1200000);
            break;
    }    
})