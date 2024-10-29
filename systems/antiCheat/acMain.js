import alt from 'alt';
import native from 'natives';


alt.setInterval(() => {
    setWeaponDamages();
    native.setPedSuffersCriticalHits(alt.Player.local.scriptID, false);
}, 5000)
//#region  Weapon Damage Modifiers
function setWeaponDamages(){
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[0].name), DamageModifiers[0].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[1].name), DamageModifiers[1].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[2].name), DamageModifiers[2].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[3].name), DamageModifiers[3].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[4].name), DamageModifiers[4].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[5].name), DamageModifiers[5].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[6].name), DamageModifiers[6].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[7].name), DamageModifiers[7].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[8].name), DamageModifiers[8].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[9].name), DamageModifiers[9].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[10].name), DamageModifiers[10].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[11].name), DamageModifiers[11].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[12].name), DamageModifiers[12].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[13].name), DamageModifiers[13].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[14].name), DamageModifiers[14].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[15].name), DamageModifiers[15].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[16].name), DamageModifiers[16].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[17].name), DamageModifiers[17].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[18].name), DamageModifiers[18].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[19].name), DamageModifiers[19].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[20].name), DamageModifiers[20].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[21].name), DamageModifiers[21].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[22].name), DamageModifiers[22].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[23].name), DamageModifiers[23].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[24].name), DamageModifiers[24].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[25].name), DamageModifiers[25].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[26].name), DamageModifiers[26].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[27].name), DamageModifiers[27].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[28].name), DamageModifiers[28].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[29].name), DamageModifiers[29].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[30].name), DamageModifiers[30].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[31].name), DamageModifiers[31].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[32].name), DamageModifiers[32].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[33].name), DamageModifiers[33].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[34].name), DamageModifiers[34].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[35].name), DamageModifiers[35].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[36].name), DamageModifiers[36].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[37].name), DamageModifiers[37].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[38].name), DamageModifiers[38].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[39].name), DamageModifiers[39].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[40].name), DamageModifiers[40].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[41].name), DamageModifiers[41].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[42].name), DamageModifiers[42].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[43].name), DamageModifiers[43].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[44].name), DamageModifiers[44].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[45].name), DamageModifiers[45].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[46].name), DamageModifiers[46].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[47].name), DamageModifiers[47].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[48].name), DamageModifiers[48].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[49].name), DamageModifiers[49].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[50].name), DamageModifiers[50].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[51].name), DamageModifiers[51].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[52].name), DamageModifiers[52].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[53].name), DamageModifiers[53].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[54].name), DamageModifiers[54].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[55].name), DamageModifiers[55].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[56].name), DamageModifiers[56].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[57].name), DamageModifiers[57].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[58].name), DamageModifiers[58].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[59].name), DamageModifiers[59].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[60].name), DamageModifiers[60].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[61].name), DamageModifiers[61].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[62].name), DamageModifiers[62].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[63].name), DamageModifiers[63].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[64].name), DamageModifiers[64].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[65].name), DamageModifiers[65].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[66].name), DamageModifiers[66].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[67].name), DamageModifiers[67].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[68].name), DamageModifiers[68].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[69].name), DamageModifiers[69].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[70].name), DamageModifiers[70].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[71].name), DamageModifiers[71].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[72].name), DamageModifiers[72].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[73].name), DamageModifiers[73].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[74].name), DamageModifiers[74].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[75].name), DamageModifiers[75].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[76].name), DamageModifiers[76].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[77].name), DamageModifiers[77].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[78].name), DamageModifiers[78].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[79].name), DamageModifiers[79].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[80].name), DamageModifiers[80].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[81].name), DamageModifiers[81].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[82].name), DamageModifiers[82].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[83].name), DamageModifiers[83].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[84].name), DamageModifiers[84].damage);
    native.setWeaponDamageModifierThisFrame(native.getHashKey(DamageModifiers[85].name), DamageModifiers[85].damage);
}

//#endregion

let DamageModifiers = [
    {name: "weapon_dagger", damage: 0.1},
    {name: "weapon_bat", damage: 0.1},
    {name: "weapon_battleaxe", damage: 0.1},
    {name: "weapon_knuckle", damage: 0.1},
    {name: "weapon_bottle", damage: 0.1},
    {name: "weapon_crowbar", damage: 0.1},
    {name: "weapon_unarmed", damage: 0.1},
    {name: "weapon_flashlight", damage: 0.1},
    {name: "weapon_glofclub", damage: 0.1},
    {name: "weapon_hammer", damage: 0.1},
    {name: "weapon_hatchet", damage: 0.1},
    {name: "weapon_knife", damage: 0.1},
    {name: "weapon_machete", damage: 0.1},
    {name: "weapon_stone_hatchet", damage: 0.1},
    {name: "weapon_switchblade", damage: 0.1},
    {name: "weapon_appistol", damage: 0.1},
    {name: "weapon_ceramicpistol", damage: 0.1},
    {name: "weapon_combatpistol", damage: 0.1},
    {name: "weapon_doubleaction", damage: 0.1},
    {name: "weapon_flaregun", damage: 0.1},
    {name: "weapon_heavypistol", damage: 0.1},
    {name: "weapon_revolver", damage: 0.1},
    {name: "weapon_revolver_mk2", damage: 0.1},
    {name: "weapon_marksmanpistol", damage: 0.1},
    {name: "weapon_navyrevolver", damage: 0.1},
    {name: "weapon_pistol", damage: 0.1},
    {name: "weapon_pistol50", damage: 0.1},
    {name: "weapon_pistol_mk2", damage: 0.1},
    {name: "weapon_snspistol", damage: 0.1},
    {name: "weapon_snspistol_mk2", damage: 0.1},
    {name: "weapon_stungun", damage: 0.1},
    {name: "weapon_raypistol", damage: 0.1},
    {name: "weapon_vintagepistol", damage: 0.1},
    {name: "weapon_assaultsmg", damage: 0.1},
    {name: "weapon_combatpdw", damage: 0.1},
    {name: "weapon_machinepistol", damage: 0.1},
    {name: "weapon_microsmg", damage: 0.1},
    {name: "weapon_minismg", damage: 0.1},
    {name: "weapon_smg", damage: 0.1},
    {name: "weapon_smg_mk2", damage: 0.1},
    {name: "weapon_raycarbine", damage: 0.1},
    {name: "weapon_assaultshotgun", damage: 0.1},
    {name: "weapon_bullpupshotgun", damage: 0.1},
    {name: "weapon_dbshotgun", damage: 0.1},
    {name: "weapon_heavyshotgun", damage: 0.1},
    {name: "weapon_musket", damage: 0.1},
    {name: "weapon_pumpshotgun", damage: 0.1},
    {name: "weapon_pumpshotgun_mk2", damage: 0.1},
    {name: "weapon_sawnoffshotgun", damage: 0.1},
    {name: "weapon_autoshotgun", damage: 0.1},
    {name: "weapon_advancedrifle", damage: 0.1},
    {name: "weapon_assaultrifle", damage: 0.1},
    {name: "weapon_assaultrifle_mk2", damage: 0.1},
    {name: "weapon_bullpuprifle", damage: 0.1},
    {name: "weapon_bullpuprifle_mk2", damage: 0.1},
    {name: "weapon_carbinerifle", damage: 0.1},
    {name: "weapon-carbinerifle_mk2", damage: 0.1},
    {name: "weapon_compactrifle", damage: 0.1},
    {name: "weapon_specialcarbine", damage: 0.1},
    {name: "weapon_specialcarbine_mk2", damage: 0.1},
    {name: "weapon_combatmg", damage: 0.1},
    {name: "weapon_combatmg_mk2", damage: 0.1},
    {name: "weapon_gusenberg", damage: 0.1},
    {name: "weapon_mg", damage: 0.1},
    {name: "weapon_heavysniper", damage: 0.1},
    {name: "weapon_heavysniper_mk2", damage: 0.1},
    {name: "weapon_marksmanrifle", damage: 0.1},
    {name: "weapon_marksmanrifle_mk2", damage: 0.1},
    {name: "weapon_sniperrifle", damage: 0.1},
    {name: "weapon_compactlauncher", damage: 0.1},
    {name: "weapon_firework", damage: 0.1},
    {name: "weapon_grenadelauncher", damage: 0.1},
    {name: "weapon_grenadelauncher_mk2", damage: 0.1},
    {name: "weapon_hominglauncher", damage: 0.1},
    {name: "weapon_minigun", damage: 0.1},
    {name: "weapon_railgun", damage: 0.1},
    {name: "weapon_rpg", damage: 0.1},
    {name: "weapon_rayminigun", damage: 0.1},
    {name: "weapon_ball", damage: 0.1},
    {name: "weapon_bzgas", damage: 0.1},
    {name: "weapon_grenade", damage: 0.1},
    {name: "weapon_molotov", damage: 0.1},
    {name: "weapon_pipebomb", damage: 0.1},
    {name: "weapon_proxmine", damage: 0.1},
    {name: "weapon_smokegrenade", damage: 0.1},
    {name: "weapon_stickybomb", damage: 0.1},
]

