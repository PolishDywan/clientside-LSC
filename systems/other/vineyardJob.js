import * as alt from 'alt';
import * as native from 'natives';

let vineyardPos = {x: -1831, y: 2215, z: 86};
let player = alt.Player.local;

let onWork = false;

alt.onServer('Vine:Start', () => {

    if(onWork){
        alt.emit('chat:message', null, "{C2E111}[!] Şuan zaten üzüm topluyorsunuz! Lütfen önce üzüm toplamanın bitmesini bekleyin.");
    }else{
        let canMake = null; let vinePos = null; 

        if(distance(player.pos, vineyardPos) < 100){
            onWork = true;
            /*props.forEach(x => {
                if(canMake == null || canMake == 0){
                    canMake = native.getClosestObjectOfType(player.pos.x, player.pos.y, player.pos.z, 15.0, alt.hash(x), false, false, false);
                    vinePos = native.getEntityCoords(canMake, false);
                }
            });*/

            //if(canMake){
                native.taskStartScenarioInPlace(player.scriptID, "WORLD_HUMAN_GARDENER_PLANT", 0, true);
                alt.setTimeout(() => {
                    alt.emitServer('Vine:Success');
                    native.clearPedTasks(player.scriptID);
                    onWork = false;
                }, 10000);
            //}

        }
    }
});




let props = [
    'ch1_04b_vinegrapes__01', 'ch1_04b_vinegrapes__02', 'ch1_04b_vinegrapes__03', 'ch1_04b_vinegrapes__04', 'ch1_04b_vinegrapes__05', 'ch1_04b_vinegrapes__06', 'ch1_04b_vinegrapes__46', 'ch1_04b_vinegrapes__08', 'ch1_04b_vinegrapes__09', 'ch1_04b_vinegrapes__10', 'ch1_04b_vinegrapes__11', 'ch1_04b_vinegrapes__12', 'ch1_04b_vinegrapes__13', 'ch1_04b_vinegrapes__14', 'ch1_04b_vinegrapes__15', 'ch1_04b_vinegrapes__16', 'ch1_04b_vinegrapes__17', 'ch1_04b_vinegrapes__18', 'ch1_04b_vinegrapes__19', 'ch1_04b_vinegrapes__20', 'ch1_04b_vinegrapes__21', 'ch1_04b_vinegrapes__22', 'ch1_04b_vinegrapes_46', 'ch1_04b_vinegrapes_45', 'ch1_04b_vinegrapes_44', 'ch1_04b_vinegrapes_43', 'ch1_04b_vinegrapes_42', 'ch1_04b_vinegrapes_41', 'ch1_04b_vinegrapes_40', 'ch1_04b_vinegrapes_39', 'ch1_04b_vinegrapes_38', 'ch1_04b_vinegrapes_37', 'ch1_04b_vinegrapes_36', 'ch1_04b_vinegrapes_35', 'ch1_04b_vinegrapes_34', 'ch1_04b_vinegrapes_33', 'ch1_04b_vinegrapes_32', 'ch1_04b_vinegrapes_31', 'ch1_04b_vinegrapes_30', 'ch1_04b_vinegrapes_29', 'ch1_04b_vinegrapes_28', 'ch1_04b_vinegrapes_27', 'ch1_04b_vinegrapes_26', 'ch1_04b_vinegrapes_25', 'ch1_04b_vinegrapes__23', 'ch1_04b_vinegrapes__24', 'ch1_04b_vinegrapes__25', 'ch1_04b_vinegrapes__26', 'ch1_04b_vinegrapes__27', 'ch1_04b_vinegrapes__28', 'ch1_04b_vinegrapes__29', 'ch1_04b_vinegrapes__30', 'ch1_04b_vinegrapes__31', 'ch1_04b_vinegrapes__32', 'ch1_04b_vinegrapes__33', 'ch1_04b_vinegrapes__34', 'ch1_04b_vinegrapes__35', 'ch1_04b_vinegrapes__36', 'ch1_04b_vinegrapes__37', 'ch1_04b_vinegrapes__38', 'ch1_04b_vinegrapes__39', 'ch1_04b_vinegrapes__40', 'ch1_04b_vinegrapes__41', 'ch1_04b_vinegrapes__42', 'ch1_04b_vinegrapes__43', 'ch1_04b_vinegrapes__44', 'ch1_04b_vinegrapes__07', 'ch1_04b_vinegrapes__45', 'ch1_04b_vinegrapes_24', 'ch1_04b_vinegrapes_23', 'ch1_04b_vinegrapes_22', 'ch1_04b_vinegrapes_21', 'ch1_04b_vinegrapes_20', 'ch1_04b_vinegrapes_19', 'ch1_04b_vinegrapes_18', 'ch1_04b_vinegrapes_17', 'ch1_04b_vinegrapes_16', 'ch1_04b_vinegrapes_15', 'ch1_04b_vinegrapes_14', 'ch1_04b_vinegrapes_13', 'ch1_04b_vinegrapes_12', 'ch1_04b_vinegrapes_11', 'ch1_04b_vinegrapes_10', 'ch1_04b_vinegrapes_09', 'ch1_04b_vinegrapes_08', 'ch1_04b_vinegrapes_07', 'ch1_04b_vinegrapes_06', 'ch1_04b_vinegrapes_05', 'ch1_04b_vinegrapes_04', 'ch1_04b_vinegrapes_03', 'ch1_04b_vinegrapes_02', 'ch1_04b_vinegrapes_01', 'ch1_05_vinegrapes_18', 'ch1_05_vinegrapes_21', 'ch1_05_vinegrapes_22', 'ch1_05_vinegrapes_02', 'ch1_05_vinegrapes_19', 'ch1_05_vinegrapes_20', 'ch1_05_vinegrapes_23', 'ch1_05_vinegrapes_01', 'ch1_05_vinegrapes_03', 'ch1_05_vinegrapes_04', 'ch1_05_vinegrapes_05', 'ch1_05_vinegrapes_06', 'ch1_05_vinegrapes_07', 'ch1_05_vinegrapes_08', 'ch1_05_vinegrapes_09', 'ch1_05_vinegrapes_10', 'ch1_05_vinegrapes_11', 'ch1_05_vinegrapes_12', 'ch1_05_vinegrapes_13', 'ch1_05_vinegrapes_17', 'ch1_05_vinegrapes_14', 'ch1_05_vinegrapes_15', 'ch1_05_vinegrapes_16', 'ch1_09b_vinegrapes_35', 'ch1_09b_vinegrapes_37', 'ch1_09b_vinegrapes_38', 'ch1_09b_vinegrapes_41', 'ch1_09b_vinegrapes_42', 'ch1_09b_vinegrapes_44', 'ch1_09b_vinegrapes_33', 'ch1_09b_vinegrapes_32', 'ch1_09b_vinegrapes_01', 'ch1_09b_vinegrapes_02', 'ch1_09b_vinegrapes_03', 'ch1_09b_vinegrapes_08', 'ch1_09b_vinegrapes_09', 'ch1_09b_vinegrapes_10', 'ch1_09b_vinegrapes_11', 'ch1_09b_vinegrapes_12', 'ch1_09b_vinegrapes_13', 'ch1_09b_vinegrapes_16', 'ch1_09b_vinegrapes_17', 'ch1_09b_vinegrapes_18', 'ch1_09b_vinegrapes_19', 'ch1_09b_vinegrapes_20', 'ch1_09b_vinegrapes_21', 'ch1_09b_vinegrapes_22', 'ch1_09b_vinegrapes_23', 'ch1_09b_vinegrapes_24', 'ch1_09b_vinegrapes_25', 'ch1_09b_vinegrapes_26', 'ch1_09b_vinegrapes_27', 'ch1_09b_vinegrapes_28', 'ch1_09b_vinegrapes_29', 'ch1_09b_vinegrapes_30', 'ch1_09b_vinegrapes_31', 'ch1_09b_vinegrapes_34', 'ch1_09b_vinegrapes_43', 'ch1_09b_vinegrapes_73', 'ch1_09b_vinegrapes_72', 'ch1_09b_vinegrapes_71', 'ch1_09b_vinegrapes_70', 'ch1_09b_vinegrapes_69', 'ch1_09b_vinegrapes_68', 'ch1_09b_vinegrapes_67', 'ch1_09b_vinegrapes_66', 'ch1_09b_vinegrapes_65', 'ch1_09b_vinegrapes_04', 'ch1_09b_vinegrapes_05', 'ch1_09b_vinegrapes_06', 'ch1_09b_vinegrapes_07', 'ch1_09b_vinegrapes_14', 'ch1_09b_vinegrapes_15', 'ch1_09b_vinegrapes_36', 'ch1_09b_vinegrapes_39', 'ch1_09b_vinegrapes_40', 'ch1_09b_vinegrapes_45', 'ch1_09b_vinegrapes_46', 'ch1_09b_vinegrapes_47', 'ch1_09b_vinegrapes_48', 'ch1_09b_vinegrapes_49', 'ch1_09b_vinegrapes_50', 'ch1_09b_vinegrapes_51', 'ch1_09b_vinegrapes_52', 'ch1_09b_vinegrapes_53', 'ch1_09b_vinegrapes_54', 'ch1_09b_vinegrapes_55', 'ch1_09b_vinegrapes_56', 'ch1_09b_vinegrapes_57', 'ch1_09b_vinegrapes_58', 'ch1_09b_vinegrapes_59', 'ch1_09b_vinegrapes_60', 'ch1_09b_vinegrapes_61', 'ch1_09b_vinegrapes_62', 'ch1_09b_vinegrapes_63', 'ch1_09b_vinegrapes_64', 'ch1_09b_vinegrapes_84', 'ch1_09b_vinegrapes_85', 'ch1_09b_vinegrapes_81', 'ch1_09b_vinegrapes_86', 'ch1_09b_vinegrapes_78', 'ch1_09b_vinegrapes_94', 'ch1_09b_vinegrapes_91', 'ch1_09b_vinegrapes_93', 'ch1_09b_vinegrapes_95', 'ch1_09b_vinegrapes_92', 'ch1_09b_vinegrapes_99', 'ch1_09b_vinegrapes_100', 'ch1_09b_vinegrapes_98', 'ch1_09b_vinegrapes_97', 'ch1_09b_vinegrapes_96', 'ch1_09b_vinegrapes_77', 'ch1_09b_vinegrapes_90', 'ch1_09b_vinegrapes_79', 'ch1_09b_vinegrapes_80', 'ch1_09b_vinegrapes_82', 'ch1_09b_vinegrapes_83', 'ch1_09b_vinegrapes_101', 'ch1_09b_vinegrapes_87', 'ch1_09b_vinegrapes_88', 'ch1_09b_vinegrapes_89'    
]

// Other Functions
function distance(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) +
            Math.pow(vector1.y - vector2.y, 2) +
            Math.pow(vector1.z - vector2.z, 2)
    );
}