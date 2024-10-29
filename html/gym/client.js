import * as alt from 'alt-client';
import * as native from 'natives';
let player = alt.Player.local;
let atmLoginPage = null;
let GymPage = null;
let gymProps = [
    "prop_muscle_bench_05",
    "prop_muscle_bench_03",
    "prop_muscle_bench_04",
    "prop_weight_rack_02",
    "prop_muscle_bench_01",
    "prop_weight_squat",
    "prop_muscle_bench_06", 
];
alt.onServer("GYM:WantToUse", ()=>{
    let usage = false;
    gymProps.forEach((e)=>{
        let a = native.getClosestObjectOfType(player.pos.x, player.pos.y, player.pos.z, 2, alt.hash(e), false, false, false);
        if (a !== 0) {
            usage = true;
            return;
        }
    });
    if (usage) {
        alt.emitServer("GYM:CanUse");
        native.taskStartScenarioInPlace(player.scriptID, "WORLD_HUMAN_MUSCLE_FREE_WEIGHTS", 0, true);
    } else alt.emitServer("GYM:NotNear");
});
alt.onServer("GYM:ShowGYM", ()=>{
    if (GymPage === null) {
        GymPage = new alt.WebView("http://resource/client/html/gym/html/index.html");
        alt.toggleGameControls(false);
        GymPage.focus();
        GymPage.on("GYM:Success", ()=>{
            alt.toggleGameControls(true);
            alt.emitServer("GYM:MSuccess");
            GymPage.destroy();
            GymPage = null;
        });
    }
}); /*
        alt.on('keydown', (key) => {
            if (key == 114){
                isShieldUp = true
                playAnim(animDict,animName,-1,50,false);
                alt.emitServer("Server:Shield:shieldUp")
                if(!game.isPedArmed(alt.Player.local.scriptID, 1)){
                game.giveWeaponToPed(alt.Player.local.scriptID, -1569615261, 0, false, true); 
                }
            }
        });
        */ 
