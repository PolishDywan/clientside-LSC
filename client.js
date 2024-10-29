import alt from 'alt';
import * as game from 'natives';

import * as loginSystem from './html/loginForm/login.js';
import * as inventory from './html/inventory/inventory.js';
import * as vehicleEvents from './systems/vehicleEvents.js';
import * as playerUpdate from './systems/playerUpdate.js';
import * as serverEvents from './systems/serverEvents.js';
// New Features
//import * as TestFeatures from './utils/startup.js';
// New Features END
import * as anims from './systems/animations/lelorAnims.js';
import * as progressBar from './html/progressBar/main.js';
import * as notifyBar from './html/notify/main.js';
import * as skincreator from './html/creator/editor.js';
import * as market from './html/market/client.js'
import * as vehicleVendor from './html/vehicleVendor/client.js';
import * as otherInventory from './html/inventoryOther/client.js';
import * as ATMSystem from './html/Bank/ATM.js';
import * as GUIMenu from './html/GameMenu/main.js';
import * as Bars from './systems/ui/client.js';
import * as ParticleEffects from './systems/particle-effect/particleEffect.js';
import * as PoliceAPL from './html/policeAPL/client.js';
import * as objectPlacer from './systems/objectplacer.js';
import * as factionPage from './html/factionpage/client.mjs';
import * as injuredEvents from './systems/injuredEvents.js';
import * as BoomBox from './html/boombox/client.mjs';
import * as Barber from './html/barber/editor.js';
import * as Job_WoodCutter from './systems/jobs/woodCutter.js';
import * as PlayerList from './html/playerList/client.js';
import * as DoorSystem from './systems/DoorSystem.js';
import * as otherLicense from './html/licenseSystem/client.js';
import * as PoliceMDC from './html/MDC/index.js';
import * as AntiCheat from './systems/anticheat/acMain.js';
import * as HelpPage from './html/helpMenu/index.js';
import * as AdminCamera from './systems/adminCamera/startup.js';
import * as LSCInputs from './html/lscInput/client.js';
import * as DrugSystem from './systems/drugSystem.js';
import * as TattoSystem from './html/tattoSystem/client.js';
import * as LSCCarShop from './html/carShop/client.js';
import * as CAMERAHelper from './systems/cameraHelper.js';
import * as Test from './html/ClothingShop/main.js';
import * as ModifyTest from './html/VehicleModify/client.js';
import * as ChairSit from './systems/chairSit.js';
import * as NewsBackground from './html/newsBroadCast/client.js';
import * as InteriorManager from './systems/interiorManager.js';
import * as Fishing from './html/fishingLSC/client.js';
import * as WeaponSystem from './systems/WeaponSystem.js';
import * as vineyardJob from './systems/other/vineyardJob.js';
import * as ScreenShots from './html/screenshot/client.js';
import * as newPhone from './html/telefon/client.js';
import * as Company from './CompanySystems/client.js';
import * as HUD from './systems/hud.js';
import * as LockPick from './html/lockpick/client.js';
import * as Contarct from './html/contract/client.js';
import * as gym from './html/gym/client.js';
//import * as TV from './html/tv/client.js'; Şimdilik pasif sonradan açılacak.
import * as qua_hud from './html/hud/client.js';
//import * as helicam from './systems/helicam.js';
//import * as trucker from './systems/trucker.js';
import * as pdshield from './systems/pdshield.js';
import * as LSCGUI from './html/lsc-gui/client.js';
import * as aObjects from './systems/aobjects.js';
//import * as PDCamera from './systems/pd/main.js';

// New Systems
import * as GasStation from './systems/other/gasStation.js';

// MarketJacking
import * as MarketJacking from './systems/marketJacking.js';

//#region  Interiors
alt.requestIpl('ex_dt1_02_office_02b');
alt.requestIpl('chop_props');
alt.requestIpl('FIBlobby');
alt.removeIpl('FIBlobbyfake');
alt.requestIpl('FBI_colPLUG');
alt.requestIpl('FBI_repair');
alt.requestIpl('v_tunnel_hole');
alt.requestIpl('TrevorsMP');
alt.requestIpl('TrevorsTrailer');
alt.requestIpl('TrevorsTrailerTidy');
alt.removeIpl('farm_burnt');
alt.removeIpl('farm_burnt_lod');
alt.removeIpl('farm_burnt_props');
alt.removeIpl('farmint_cap');
alt.removeIpl('farmint_cap_lod');
alt.requestIpl('farm');
alt.requestIpl('farmint');
alt.requestIpl('farm_lod');
alt.requestIpl('farm_props');
alt.requestIpl('facelobby');
alt.removeIpl('CS1_02_cf_offmission');
alt.requestIpl('CS1_02_cf_onmission1');
alt.requestIpl('CS1_02_cf_onmission2');
alt.requestIpl('CS1_02_cf_onmission3');
alt.requestIpl('CS1_02_cf_onmission4');
alt.requestIpl('v_rockclub');
alt.requestIpl('v_janitor');
alt.removeIpl('hei_bi_hw1_13_door');
alt.requestIpl('bkr_bi_hw1_13_int');
alt.requestIpl('ufo');
alt.requestIpl('ufo_lod');
alt.requestIpl('ufo_eye');
alt.removeIpl('v_carshowroom');
alt.removeIpl('shutter_open');
alt.removeIpl('shutter_closed');
alt.removeIpl('shr_int');
alt.requestIpl('csr_afterMission');
alt.requestIpl('v_carshowroom');
alt.requestIpl('shr_int');
alt.requestIpl('shutter_closed');
alt.requestIpl('smboat');
alt.requestIpl('smboat_distantlights');
alt.requestIpl('smboat_lod');
alt.requestIpl('smboat_lodlights');
alt.requestIpl('cargoship');
alt.requestIpl('railing_start');
alt.removeIpl('sp1_10_fake_interior');
alt.removeIpl('sp1_10_fake_interior_lod');
alt.requestIpl('sp1_10_real_interior');
alt.requestIpl('sp1_10_real_interior_lod');
alt.removeIpl('id2_14_during_door');
alt.removeIpl('id2_14_during1');
alt.removeIpl('id2_14_during2');
alt.removeIpl('id2_14_on_fire');
alt.removeIpl('id2_14_post_no_int');
alt.removeIpl('id2_14_pre_no_int');
alt.removeIpl('id2_14_during_door');
alt.requestIpl('id2_14_during1');
alt.removeIpl('Coroner_Int_off');
alt.requestIpl('coronertrash');
alt.requestIpl('Coroner_Int_on');
alt.removeIpl('bh1_16_refurb');
alt.removeIpl('jewel2fake');
alt.removeIpl('bh1_16_doors_shut');
alt.requestIpl('refit_unload');
alt.requestIpl('post_hiest_unload');
alt.requestIpl('Carwash_with_spinners');
alt.requestIpl('KT_CarWash');
alt.requestIpl('ferris_finale_Anim');
alt.removeIpl('ch1_02_closed');
alt.requestIpl('ch1_02_open');
alt.requestIpl('AP1_04_TriAf01');
alt.requestIpl('CS2_06_TriAf02');
alt.requestIpl('CS4_04_TriAf03');
alt.removeIpl('scafstartimap');
alt.requestIpl('scafendimap');
alt.removeIpl('DT1_05_HC_REMOVE');
alt.requestIpl('DT1_05_HC_REQ');
alt.requestIpl('DT1_05_REQUEST');
alt.requestIpl('dt1_05_hc_remove');
alt.requestIpl('dt1_05_hc_remove_lod');
alt.requestIpl('FINBANK');
alt.removeIpl('DT1_03_Shutter');
alt.removeIpl('DT1_03_Gr_Closed');
alt.requestIpl('golfflags');
alt.requestIpl('airfield');
alt.requestIpl('v_garages');
alt.requestIpl('v_foundry');
alt.requestIpl('hei_carrier');
alt.requestIpl('hei_Carrier_int1');
alt.requestIpl('hei_Carrier_int2');
alt.requestIpl('hei_Carrier_int3');
alt.requestIpl('hei_Carrier_int4');
alt.requestIpl('hei_Carrier_int5');
alt.requestIpl('hei_Carrier_int6');
alt.requestIpl('hei_carrier_LODLights');
alt.requestIpl('bkr_bi_id1_23_door');
alt.requestIpl('lr_cs6_08_grave_closed');
//alt.requestIpl('hei_sm_16_interior_v_bahama_milo_');
alt.requestIpl('CS3_07_MPGates');
alt.requestIpl('cs5_4_trains');
alt.requestIpl('v_lesters');
alt.requestIpl('v_trevors');
alt.requestIpl('v_michael');
alt.requestIpl('v_comedy');
alt.requestIpl('v_cinema');
alt.requestIpl('V_Sweat');
alt.requestIpl('V_35_Fireman');
alt.requestIpl('redCarpet');
alt.requestIpl('triathlon2_VBprops');
alt.requestIpl('jetstenativeurnel');
alt.requestIpl('Jetsteal_ipl_grp1');
//alt.requestIpl('v_hospital');
//alt.removeIpl('RC12B_Default');
//alt.removeIpl('RC12B_Fixed');
//alt.requestIpl('RC12B_Destroyed');
//alt.requestIpl('RC12B_HospitalInterior');
alt.requestIpl('canyonriver01');
alt.requestIpl('canyonriver01_lod');
alt.requestIpl('cs3_05_water_grp1');
alt.requestIpl('cs3_05_water_grp1_lod');
alt.requestIpl('trv1_trail_start');
alt.requestIpl('CanyonRvrShallow');

// CASINO
alt.requestIpl('vw_casino_penthouse');
alt.requestIpl('vw_casino_main');
alt.requestIpl('vw_casino_carpark');
alt.requestIpl('vw_dlc_casino_door');
alt.requestIpl('vw_casino_door');
alt.requestIpl('hei_dlc_windows_casino');
alt.requestIpl('hei_dlc_casino_door');
alt.requestIpl('hei_dlc_casino_aircon');
alt.requestIpl('vw_casino_garage');


alt.requestIpl("lafa2k_bkr_biker_dlc_int_02");
let interiorID = game.getInteriorAtCoords(889.67889404297,-2102.9304199219,30.761777877808);
if (game.isValidInterior(interiorID)) {
    game.activateInteriorEntitySet(interiorID, "walls_01")
    game.activateInteriorEntitySet(interiorID, "lower_walls_default")
    game.activateInteriorEntitySet(interiorID, "furnishings_02")
    game.activateInteriorEntitySet(interiorID, "mural_03")
    game.activateInteriorEntitySet(interiorID, "decorative_02")
    game.activateInteriorEntitySet(interiorID, "gun_locker")
    game.activateInteriorEntitySet(interiorID, "mod_booth")
    
    game.activateInteriorEntitySet(interiorID, "meth_small")
    game.activateInteriorEntitySet(interiorID, "meth_medium")
    game.activateInteriorEntitySet(interiorID, "meth_large")
    game.activateInteriorEntitySet(interiorID, "cash_small")
    game.activateInteriorEntitySet(interiorID, "cash_medium")
    game.activateInteriorEntitySet(interiorID, "cash_large")
    game.activateInteriorEntitySet(interiorID, "weed_small")
    game.activateInteriorEntitySet(interiorID, "weed_medium")
    game.activateInteriorEntitySet(interiorID, "weed_large")
    game.activateInteriorEntitySet(interiorID, "coke_small")
    game.activateInteriorEntitySet(interiorID, "coke_medium")
    game.activateInteriorEntitySet(interiorID, "coke_large")
    game.activateInteriorEntitySet(interiorID, "counterfeit_small")
    game.activateInteriorEntitySet(interiorID, "counterfeit_medium")
    game.activateInteriorEntitySet(interiorID, "counterfeit_large")
    game.activateInteriorEntitySet(interiorID, "id_small")
    game.activateInteriorEntitySet(interiorID, "id_medium")
    game.activateInteriorEntitySet(interiorID, "id_large")
    
    game.refreshInterior(interiorID)
}


interiorID = game.getInteriorAtCoords(1100.0, 220.0, -50.0);
if (game.isValidInterior(interiorID)) {
    game.activateInteriorEntitySet(interiorID, '0x30240D11');
    game.activateInteriorEntitySet(interiorID, '0xA3C89BB2');
    game.refreshInterior(interiorID);
}

interiorID = game.getInteriorAtCoords(976.6364, 70.29476, 115.1641);
if (game.isValidInterior(interiorID)) {
    game.activateInteriorEntitySet(interiorID, 'Set_Pent_Tint_Shell');
    game.activateInteriorEntitySet(interiorID, 'Set_Pent_Pattern_09');
    game.activateInteriorEntitySet(interiorID, 'Set_Pent_Spa_Bar_Open');
    game.activateInteriorEntitySet(interiorID, 'Set_Pent_Media_Bar_Open');
    game.activateInteriorEntitySet(interiorID, 'Set_Pent_Arcade_Modern');
    game.activateInteriorEntitySet(interiorID, 'Set_Pent_Bar_Clutter');
    game.activateInteriorEntitySet(interiorID, 'Set_Pent_Clutter_03');
    game.activateInteriorEntitySet(interiorID, 'Set_pent_bar_light_02');
    game.refreshInterior(interiorID);
}




//Barriers
game.requestIpl('ba_barriers_case9');

//#endregion

alt.requestIpl('bkr_bi_hw1_13_int');
alt.requestIpl('ex_sm_13_office_02b');
alt.requestIpl('ex_sm_15_office_02b');

// New PD interior



alt.requestIpl("gabz_mrpd_milo_")

    let pdinterior = game.getInteriorAtCoords(451.0129, -993.3741, 29.1718)
   
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm1")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm2")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm3")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm4")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm5")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm6")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm7")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm8")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm9")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm10")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm11")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm12")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm13")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm14")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm15")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm16")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm17")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm18")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm19")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm20")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm21")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm22")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm23")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm24")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm25")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm26")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm27")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm28")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm29")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm30")
            game.activateInteriorEntitySet(pdinterior, "v_gabz_mrpd_rm31")
            
    game.refreshInterior(pdinterior)