import alt from 'alt-client';
import native from 'natives';
alt.onServer('WoodCutter:GetTree', ()=>{
    alt.toggleGameControls(false);
    let player = alt.Player.local;
    let propTree = [
        "prop_tree_cedar_04",
        "prop_tree_cedar_03",
        "prop_s_pine_dead_01",
        "test_tree_cedar_trunk_001"
    ];
    let canUse = false;
    propTree.forEach((e)=>{
        let a = native.getClosestObjectOfType(player.pos.x, player.pos.y, player.pos.z, 1, alt.hash(e), false, false, false);
        if (a !== 0) {
            canUse = true;
        }
    });
    if (canUse) {
        alt.emitServer('WoodCutter:GetTreeResult');
        alt.toggleGameControls(true);
    } else {
        alt.log("agaç yok");
        alt.toggleGameControls(true);
    }
});
