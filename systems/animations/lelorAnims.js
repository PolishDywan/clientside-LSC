import * as alt from 'alt';
import * as game from 'natives';


var AnimationDuration = -1;
var ChosenAnimation = "";
var ChosenDict = "";
var IsInAnimation = false;
var MostRecentChosenAnimation = "";
var MostRecentChosenDict = "";
var MovementType = 0;
var PlayerGender = "male";
var PlayerHasProp = false;
var PlayerProps = [];
var PlayerParticles = [];
var SecondPropEmote = false;
var PtfxNotif = false;
var PtfxPrompt = false;
var PtfxWait = 500;
var PtfxNoProp = false;

alt.onServer("Animation2:Play", (data) => {
    PlayAnim(data);
});
alt.onServer("Animation2:Stop", () => {
    EmoteCancel();
});


function PlayAnim(data) {
    let obj = JSON.parse(data);
    ChosenDict = obj.dictionary;
    ChosenAnimation = obj.animation;

    if (game.doesEntityExist(alt.Player.local.scriptID) === false) { return false; }
    if (PlayerHasProp) { DestroyAllProps(); }
    AnimationDuration = -1

    if (ChosenDict === "Expression") { game.setFacialIdleAnimOverride(game.playerPedId(), ChosenAnimation, 0); return; }
    else if (ChosenDict === "MaleScenario" && ChosenDict === "Scenario") {
        if (ChosenDict === "MaleScenario") {
            CheckGender();
            if (PlayerGender === "male") {
                game.clearPedTasks(alt.Player.local.scriptID);
                game.taskStartScenarioInPlace(alt.Player.local.scriptID, ChosenAnimation, 0, true);
            }
            else {
                return;
            }
        }
    }
    else if (ChosenDict === "ScenarioObject") {
        let BehindPlayer = game.getOffsetFromEntityInWorldCoords(game.playerPedId(), 0.0, 0 - 0.5, -0.5);
        game.clearPedTasks(alt.Player.local.scriptID);
        game.taskStartScenarioAtPosition(alt.Player.local.scriptID, ChosenAnimation, BehindPlayer['x'], BehindPlayer['y'], BehindPlayer['z'], game.getEntityHeading(game.playerPedId()), 0, 1, false);
        IsInAnimation = true;
    }
    else if (ChosenDict === "Scenario") {
        game.clearPedTasks(alt.Player.local.scriptID);
        game.taskStartScenarioInPlace(alt.Player.local.scriptID, ChosenAnimation, 0, true);
        IsInAnimation = true;
    }

    LoadAnim(obj.AnimationOptions.dictionary);  

    if (obj.AnimationOptions) {
        if (obj.AnimationOptions.EmoteLoop) MovementType = 1;
        if (obj.AnimationOptions.EmoteMoving) MovementType = 51;
    }
    else if (obj.AnimationOptions.EmoteMoving) MovementType = 51;
    else if (obj.AnimationOptions.EmoteMoving) MovementType = 0;
    else if (obj.AnimationOptions.EmoteStuck) MovementType = 50;
    else { MovementType = 0; }

    if (obj.AnimationOptions) {
        if (obj.AnimationOptions.EmoteDuration === null) {
            obj.AnimationOptions.EmoteDuration = -1;
            var AttachWait = 0;
        }
        else {
            AnimationDuration = obj.AnimationOptions.EmoteDuration;
            var AttachWait = obj.AnimationOptions.EmoteDuration;
        }

        if (obj.AnimationOptions.PtfxAsset) {
            var PtfxAsset = obj.AnimationOptions.PtfxAsset;
            var PtfxName = obj.AnimationOptions.PtfxName;

            if (obj.AnimationOptions.PtfxNoProp) PtfxNoProp = obj.AnimationOptions.PtfxNoProp;
            else PtfxNoProp = false; 
        
            let leloPtfx = obj.AnimationOptions.PtfxPlacement.split(",");
            var Ptfx1 = leloPtfx[0];
            var Ptfx2 = leloPtfx[1];
            var Ptfx3 = leloPtfx[2];
            var Ptfx4 = leloPtfx[3];
            var Ptfx5 = leloPtfx[4];
            var Ptfx6 = leloPtfx[5];
            var PtfxScale = obj.AnimationOptions.PtfxPlacement.PtfxScale;
            var PtfxInfo = obj.AnimationOptions.PtfxInfo;
            var PtfxWait = obj.AnimationOptions.PtfxWait;
            var PtfxNotif = false;
            var PtfxPrompt = true;
            PtfxThis(PtfxAsset);
        }
    }
    else PtfxPrompt = false;     
    game.requestAnimDict(ChosenDict);
    game.taskPlayAnim(alt.Player.local.scriptID, ChosenDict, ChosenAnimation, 1, -1, AnimationDuration, MovementType, 1.0, false, false, false);
    game.removeAnimDict(ChosenDict);
    IsInAnimation = true;
    var MostRecentDict = ChosenDict;
    var MostRecentAnimation = ChosenAnimation;

    if (obj.AnimationOptions) {
        if (obj.AnimationOptions.Prop) {
            let leloProp = obj.AnimationOptions.PropPlacement.split(",");
            var PropName = obj.AnimationOptions.Prop
            var PropBone = obj.AnimationOptions.PropBone
            var PropPl1 = leloProp[0];
            var PropPl2 = leloProp[1];
            var PropPl3 = leloProp[2];
            var PropPl4 = leloProp[3];
            var PropPl5 = leloProp[4];
            var PropPl6 = leloProp[5];
            if (obj.AnimationOptions.SecondProp) {
                let leloProp2= obj.AnimationOptions.SecondPropPlacement.split(",");
                var SecondPropName = obj.AnimationOptions.SecondProp;
                var SecondPropBone = obj.AnimationOptions.SecondPropBone;
                var SecondPropPl1 = leloProp2[0];
                var SecondPropPl2 = leloProp2[1];
                var SecondPropPl3 = leloProp2[2];
                var SecondPropPl4 = leloProp2[3];
                var SecondPropPl5 = leloProp2[4];
                var SecondPropPl6 = leloProp2[5];
                var SecondPropEmote = true;
            }
            else { SecondPropEmote = false; }
            AddPropToPlayer(PropName, PropBone, PropPl1, PropPl2, PropPl3, PropPl4, PropPl5, PropPl6);
            alt.setTimeout(()=>{                
                if (SecondPropEmote) {
                    AddPropToPlayer(SecondPropName, SecondPropBone, SecondPropPl1, SecondPropPl2, SecondPropPl3, SecondPropPl4, SecondPropPl5, SecondPropPl6);
                }
            }, AttachWait * 1000);
        }
    }

    return true;

}

function EmoteCancel() {
    if (ChosenDict === "MaleScenario" && IsInAnimation) { game.clearPedTasksImmediately(PlayerPedId()); IsInAnimation = false; }
    else if (ChosenDict === "Scenario" && IsInAnimation) { game.clearPedTasksImmediately(PlayerPedId()); IsInAnimation = false; }

    PtfxNotif = false;
    PtfxPrompt = false;

    if (IsInAnimation) {
        PtfxStop();
        game.clearPedTasks(alt.Player.local.scriptID);
        DestroyAllProps();
        IsInAnimation = false;
    }
}

function PtfxStart() {
    if (PtfxNoProp) { PtfxAt = PlayerPedId(); }
    else { PtfxAt = prop; }

    game.useParticleFxAsset(PtfxAsset);
    Ptfx = game.startNetworkedParticleFxLoopedOnEntityBone(PtfxName, PtfxAt, Ptfx1, Ptfx2, Ptfx3, Ptfx4, Ptfx5, Ptfx6, game.getEntityBoneIndexByName(PtfxName, "VFX"), 1065353216, 0, 0, 0, 1065353216, 1065353216, 1065353216, 0);
    game.setParticleFxLoopedColour(Ptfx, 1.0, 1.0, 1.0);
    //table.insert(PlayerParticles, Ptfx);
    PlayerParticles.push(Ptfx);
}

function PtfxStop() {
    for (const [a, b] of PlayerParticles) {
        game.stopParticleFxLooped(b, false);
        table.remove(PlayerParticles, a);
    }
}

function pairsByKeys(t, f) {
    let a = {};
    for (const [n] of t) {
        table.insert(a, n);
    }
    table.sort(a, f);
    let i = 0;
    let iter = function () {
        i = i + 1;
        if (a === null) { return null; }
        else { return a[i], t[a[i]];}
    }
    return iter;
}

function LoadAnim(dict) {
    game.requestAnimDict(dict);        
}

function LoadPropDict(model) {
    game.requestModel(game.getHashKey(model));
}

function PtfxThis(asset) {
    game.requestNamedPtfxAsset(asset);
}

function DestroyAllProps() {
    for (let v of PlayerProps) {
        game.deleteEntity(v);
    }
    PlayerHasProp = false;
}

function AddPropToPlayer(prop1, bone, off1, off2, off3, rot1, rot2, rot3) {
    let Player = alt.Player.local.scriptID;
    let x = alt.Player.local.pos.x;
    let y = alt.Player.local.y;
    let z = alt.Player.local.z;


    if (!game.hasModelLoaded(prop1)) {
        LoadPropDict(prop1);
    }

    let prop = game.createObject(game.getHashKey(prop1), x, y, z + 0.2, true, true, true);
    game.attachEntityToEntity(prop, Player, game.getPedBoneIndex(Player, bone), off1, off2, off3, rot1, rot2, rot3, true, true, false, true, 1, true);
    PlayerProps.push(prop);
    //table.insert(PlayerProps, prop);
    PlayerHasProp = true;
    game.setModelAsNoLongerNeeded(prop1);
}
function AddPropToPlayerSync(player,prop1, bone, off1, off2, off3, rot1, rot2, rot3) {
    let Player = player.scriptID;
    let x = alt.Player.local.pos.x;
    let y = alt.Player.local.y;
    let z = alt.Player.local.z;


    if (!game.hasModelLoaded(prop1)) {
        LoadPropDict(prop1);
    }

    let prop = game.createObject(game.getHashKey(prop1), x, y, z + 0.2, true, true, true);
    game.attachEntityToEntity(prop, Player, game.getPedBoneIndex(Player, bone), off1, off2, off3, rot1, rot2, rot3, true, true, false, true, 1, true);
    PlayerProps.push(prop);
    //table.insert(PlayerProps, prop);
    PlayerHasProp = true;
    game.setModelAsNoLongerNeeded(prop1);
}

function CheckGender() {
    let hashSkinMale = game.getHashKey("mp_m_freemode_01");
    let hashSkinFemale = game.getHashKey("mp_f_freemode_01");

    if (game.getEntityModel(PlayerPedId()) === hashSkinMale) { PlayerGender = "male"; }
    else if (game.getEntityModel(PlayerPedId()) === hashSkinFemale) { PlayerGender = "female";}
}