import alt from "alt-client";
import game from "natives";
let player = alt.Player.local;
let ped = player.scriptID;
var i = null;
let inRagdoll = false;
let radollTimeout = null;
alt.onServer('Damage:ClearStungun', ()=>{
    /*if(radollTimeout != null){
      alt.clearTimeout(radollTimeout);
      radollTimeout = null;
    }*/ game.resetPedRagdollTimer(ped);
    if (inRagdoll) {
        if (radollTimeout) {
            alt.clearEveryTick(radollTimeout);
            radollTimeout = null;
            inRagdoll = false;
        }
    }
});
alt.onServer('Damage:Stungun', (time)=>{
    /*if(radollTimeout != null) {
      alt.clearTimeout(radollTimeout);
      game.setPedToRagdoll(alt.Player.local.scriptID, 100, 100, 100, false, false, false);
    } 
    //if(time == null || time < 5) time = 120;
    alt.setTimeout(() => {
      game.setPedToRagdoll(alt.Player.local.scriptID, ((time * 1000) - 800), 0, 0, false, false, false);
      radollTimeout = alt.setTimeout(() => {
        radollTimeout = null;
      }, (time * 1000));
    }, 200);*/ game.setPedToRagdoll(ped, time * 1000, 0, 0, false, false, false);
});
alt.onServer('Damage:TazerGun', (time)=>{
    //if(time == null || time < 5) time = 120;
    alt.setTimeout(()=>{
        game.setPedToRagdoll(alt.Player.local.scriptID, time * 1000 - 800, 0, 0, false, false, false);
    }, 200);
});
alt.setInterval(injuredEvent, 5000);
alt.onServer("InjuredChange", ()=>{
    injuredEvent();
});
function injuredEvent() {
    if (player.hasSyncedMeta("PlayerHasInjuredFromHead")) {
        i = JSON.parse(player.getSyncedMeta("PlayerHasInjuredFromHead"));
    } else {
        i = null;
    }
    if (i) {
        if (i.Injured) {
            if (i.head) {
                game.requestAnimSet("move_injured_generic");
                game.setPedMovementClipset(ped, "move_injured_generic", 1.0);
            //game.setPedToRagdoll(ped, 1000, 1000, 0, 0, 0, 0);
            } else {
                game.resetPedMovementClipset(ped, 1.0);
            }
            if (i.torso) {
                game.shakeGameplayCam("ROAD_VIBRATION_SHAKE", 1);
            } else {
                game.stopGameplayCamShaking(true);
            }
            if (i.arms) {
                alt.setStat("shooting_ability", 0);
                alt.setStat("stamina", 2);
            } else {
                alt.setStat("shooting_ability", 50);
                alt.setStat("stamina", 50);
            }
            if (i.legs) {
                game.shakeGameplayCam("DEATH_FAIL_IN_EFFECT_SHAKE", 1.0);
                game.requestAnimSet("move_m@injured");
                game.setPedMovementClipset(ped, "move_m@injured", 2.0);
            //game.setPedToRagdoll(alt.Player.local.scriptID, 1000, 1000, 0, 0, 0, 0);
            } else {
                game.resetPedMovementClipset(ped, 1.0);
                game.stopGameplayCamShaking(true);
            }
            if (i.isDead) {
                if (game.animpostfxIsRunning("SwitchSceneNeutral")) {
                    game.animpostfxStop("SwitchSceneNeutral");
                }
                game.animpostfxPlay("DeathFailOut", 0, false);
            //game.setPedToRagdoll(alt.Player.local.scriptID, 10000, 10000, 0, 0, 0, 0);
            } else {
                if (game.animpostfxIsRunning("DeathFailOut")) {
                    game.animpostfxStop("DeathFailOut");
                }
                game.animpostfxPlay("SwitchSceneNeutral", 0, false);
            }
        } else {
            if (game.animpostfxIsRunning("DeathFailOut")) {
                game.animpostfxStop("DeathFailOut");
            }
            if (game.animpostfxIsRunning("SwitchSceneNeutral")) {
                game.animpostfxStop("SwitchSceneNeutral");
            }
        }
    } else {
        if (game.animpostfxIsRunning("DeathFailOut")) {
            game.animpostfxStop("DeathFailOut");
        }
        if (game.animpostfxIsRunning("SwitchSceneNeutral")) {
            game.animpostfxStop("SwitchSceneNeutral");
        }
    }
}
