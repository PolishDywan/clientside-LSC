import alt from 'alt-client';
import native from 'natives';
let interval = null;
let totalTaken = 0;
let jackStartTime = Date.now() + 600000;
let pdDate = Date.now() + 120000;
alt.onServer('MJacking:Start', (marketPos)=>{
    totalTaken = 0;
    startJacking(marketPos);
});
function startJacking(marketPos) {
    //native.createCheckpoint(47, marketPos.x, marketPos.y, marketPos.z, marketPos.x, marketPos.y, marketPos.z, 4, 255, 0, 0, 120, 1);
    if (interval) {
        alt.clearInterval(interval);
    }
    let player = alt.Player.local;
    interval = alt.everyTick(()=>{
        native.drawMarker(1, marketPos.x, marketPos.y, marketPos.z - 1, 0, 0, 0, 0, 0, 0, 10, 10, 0.5, 255, 0, 0, 120, false, true, 0, false, "", "", false);
        if (player.pos.distanceTo(marketPos) > 6) {
            alt.emitServer('MJacking:Abort', totalTaken);
            alt.clearEveryTick(interval);
            interval = null;
        }
        if (Date.now() > jackStartTime) {
            alt.emitServer('MJacking:Finish', totalTaken);
            alt.clearEveryTick(interval);
            interval = null;
        }
        if (Date.now() > pdDate) {
            alt.emitServer('MJacking:SendPD');
            pdDate = Date.now() + 60000;
        }
    });
}
let lastUsed = Date.now() - 100;
alt.on('keyup', (key)=>{
    if (key === 69) {
        if (interval != null) {
            if (Date.now() > lastUsed) {
                lastUsed = Date.now() + 4500;
                totalTaken += 1;
                native.requestAnimDict("anim@heists@ornate_bank@grab_cash_heels");
                native.taskPlayAnim(alt.Player.local.scriptID, "anim@heists@ornate_bank@grab_cash_heels", "grab", 8.0, -8, 3000, 49, 1, false, false, false);
            }
        }
    }
});
alt.on("resourceStop", ()=>{
    if (interval) {
        alt.clearEveryTick(interval);
    }
});
