import alt from 'alt-client';
import native from 'natives';
let dicts = [];
alt.onServer("Animation:Play", (dict, anim, flag, duration)=>{
    native.requestAnimDict(dict);
    dicts.push(dict);
    alt.setTimeout(()=>{
        native.taskPlayAnim(alt.Player.local.scriptID, dict, anim, 1, -1, duration, flag, -1.0, false, false, false);
    }, 400);
});
alt.onServer("Animation:Stop", ()=>{
    if (alt.Player.local.vehicle == null) {
        native.clearPedTasks(alt.Player.local.scriptID);
    }
    native.clearPedSecondaryTask(alt.Player.local.scriptID);
    dicts.forEach((dict)=>{
        native.removeAnimDict(dict);
    });
    dicts = [];
});
