import alt from 'alt-client';
import game from 'natives';
alt.on('keydown', (key)=>{
    let v = key;
    if (v != 97) return;
    if (alt.gameControlsEnabled()) sitOnchair();
});
let isOnChair;
function sitOnchair() {
    //alt.emit('chat:message', null, "{DF1111}[HATA] Sistem bir süreliğine pasif duruma alınmıştır.");
    if (alt.Player.local.vehicle != null) return alt.emit('chat:message', null, "{DF1111}[HATA] Sistem bir süreliğine pasif duruma alınmıştır.");
    if (isOnChair) {
        game.clearPedTasks(alt.Player.local.scriptID);
        game.clearPedSecondaryTask(alt.Player.local.scriptID);
        isOnChair = false;
        return;
    }
    let a, pos;
    chairs.forEach((e)=>{
        a = game.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 1.5, alt.hash(e), false, false, false);
        game.trackObjectVisibility(a);
        if (a !== 0 && game.isObjectVisible(a)) {
            isOnChair = true;
            pos = game.getEntityCoords(a, false);
            game.taskStartScenarioAtPosition(alt.Player.local.scriptID, "PROP_HUMAN_SEAT_BENCH", pos.x, pos.y, pos.z + 0.5, game.getEntityHeading(a) + 180.0, 0, true, true);
        }
    });
}
let chairs = [
    'prop_bench_01a',
    'prop_bench_01b',
    'prop_bench_01c',
    'prop_bench_02',
    'prop_bench_03',
    'prop_bench_04',
    'prop_bench_05',
    'prop_bench_06',
    'prop_bench_05',
    'prop_bench_08',
    'prop_bench_09',
    'prop_bench_10',
    'prop_bench_11',
    'prop_fib_3b_bench',
    'prop_ld_bench01',
    'prop_wait_bench_01',
    'hei_prop_heist_off_chair',
    'hei_prop_hei_skid_chair',
    'prop_chair_01a',
    'prop_chair_01b',
    'prop_chair_02',
    'prop_chair_03',
    'prop_chair_04a',
    'prop_chair_04b',
    'prop_chair_05',
    'prop_chair_06',
    'prop_chair_05',
    'prop_chair_08',
    'prop_chair_09',
    'prop_chair_10',
    'v_club_stagechair',
    'prop_chateau_chair_01',
    'prop_clown_chair',
    'prop_cs_office_chair',
    'prop_direct_chair_01',
    'prop_direct_chair_02',
    'prop_gc_chair02',
    'prop_off_chair_01',
    'prop_off_chair_03',
    'prop_off_chair_04',
    'prop_off_chair_04b',
    'prop_off_chair_04_s',
    'prop_off_chair_05',
    'prop_old_deck_chair',
    'prop_old_wood_chair',
    'prop_rock_chair_01',
    'prop_skid_chair_01',
    'prop_skid_chair_02',
    'prop_skid_chair_03',
    'prop_sol_chair',
    'prop_wheelchair_01',
    'prop_wheelchair_01_s',
    'p_armchair_01_s',
    'p_clb_officechair_s',
    'p_dinechair_01_s',
    'p_ilev_p_easychair_s',
    'p_soloffchair_s',
    'p_yacht_chair_01_s',
    'v_club_officechair',
    'v_corp_bk_chair3',
    'v_corp_cd_chair',
    'v_corp_offchair',
    'v_ilev_chair02_ped',
    'v_ilev_hd_chair',
    'v_ilev_p_easychair',
    'v_ret_gc_chair03',
    'prop_ld_farm_chair01',
    'prop_table_04_chr',
    'prop_table_05_chr',
    'prop_table_06_chr',
    'v_ilev_leath_chr',
    'prop_table_01_chr_a',
    'prop_table_01_chr_b',
    'prop_table_02_chr',
    'prop_table_03b_chr',
    'prop_table_03_chr',
    'prop_torture_ch_01',
    'v_ilev_fh_dineeamesa',
    'v_ilev_fh_kitchenstool',
    'v_ilev_tort_stool',
    'v_ilev_fh_kitchenstool',
    'v_ilev_fh_kitchenstool',
    'v_ilev_fh_kitchenstool',
    'v_ilev_fh_kitchenstool',
    'hei_prop_yah_seat_01',
    'hei_prop_yah_seat_02',
    'hei_prop_yah_seat_03',
    'prop_waiting_seat_01',
    'prop_yacht_seat_01',
    'prop_yacht_seat_02',
    'prop_yacht_seat_03',
    'prop_hobo_seat_01',
    'prop_rub_couch01',
    'miss_rub_couch_01',
    'prop_ld_farm_couch01',
    'prop_ld_farm_couch02',
    'prop_rub_couch02',
    'prop_rub_couch03',
    'prop_rub_couch04',
    'p_lev_sofa_s',
    'p_res_sofa_l_s',
    'p_v_med_p_sofa_s',
    'p_yacht_sofa_01_s',
    'v_ilev_m_sofa',
    'v_res_tre_sofa_s',
    'v_tre_sofa_mess_a_s',
    'v_tre_sofa_mess_b_s',
    'v_tre_sofa_mess_c_s',
    'prop_roller_car_01',
    'prop_roller_car_02',
    "v_med_fabricchair1",
    "v_ret_gc_chair01",
    "prop_armchair_01",
    "prop_off_chair_03",
    "v_ret_gc_chair02",
    "v_serv_ct_chair02",
    "v_corp_bk_chair1",
    "v_corp_offchair",
    "prop_off_chair_05",
    "prop_chair_06",
    "prop_chair_08",
    "v_res_fh_barcchair",
    "prop_skid_chair_03",
    "prop_yaught_chair_01",
    "prop_old_deck_chair",
    "prop_chair_04b",
    "prop_chair_08",
    "prop_chair_09",
    "v_res_tre_officechair",
    "apa_mp_h_din_chair_04",
    "apa_mp_h_din_chair_08",
    "apa_mp_h_din_chair_09",
    "apa_mp_h_din_chair_12",
    "apa_mp_h_stn_chairarm_01",
    "apa_mp_h_stn_chairarm_02",
    "apa_mp_h_stn_chairarm_03",
    "apa_mp_h_stn_chairarm_09",
    "apa_mp_h_stn_chairarm_11",
    "apa_mp_h_stn_chairarm_12",
    "apa_mp_h_stn_chairarm_13",
    "apa_mp_h_stn_chairarm_23",
    "apa_mp_h_stn_chairarm_24",
    "apa_mp_h_stn_chairarm_25",
    "apa_mp_h_stn_chairarm_26",
    "apa_mp_h_stn_chairstool_12",
    "apa_mp_h_stn_chairstrip_01",
    "apa_mp_h_stn_chairstrip_02",
    "apa_mp_h_stn_chairstrip_03",
    "apa_mp_h_stn_chairstrip_04",
    "apa_mp_h_stn_chairstrip_05",
    "apa_mp_h_stn_chairstrip_06",
    "apa_mp_h_stn_chairstrip_07",
    "apa_mp_h_stn_chairstrip_08",
    "apa_mp_h_yacht_armchair_01",
    "apa_mp_h_yacht_armchair_03",
    "apa_mp_h_yacht_armchair_04",
    "apa_mp_h_yacht_strip_chair_01",
    "ba_prop_battle_club_chair_01",
    "ba_prop_battle_club_chair_02",
    "ba_prop_battle_club_chair_03",
    "bkr_prop_biker_boardchair01",
    "bkr_prop_biker_chairstrip_01",
    "bkr_prop_biker_chairstrip_02",
    "bkr_prop_biker_chair_01",
    "bkr_prop_clubhouse_armchair_01a",
    "bkr_prop_clubhouse_chair_01",
    "bkr_prop_clubhouse_chair_01",
    "bkr_prop_clubhouse_chair_03",
    "bkr_prop_clubhouse_offchair_01a",
    "bkr_prop_weed_chair_01a",
    "ch_prop_casino_chair_01a",
    "ch_prop_casino_chair_01b",
    "ch_prop_casino_chair_01c",
    "ch_prop_casino_track_chair_01",
    "ex_mp_h_din_chair_04",
    "ex_mp_h_din_chair_08",
    "ex_mp_h_din_chair_09",
    "ex_mp_h_din_chair_12",
    "ex_mp_h_off_chairstrip_01",
    "ex_mp_h_off_easychair_01",
    "ex_mp_h_stn_chairarm_03",
    "ex_mp_h_stn_chairarm_24",
    "ex_mp_h_stn_chairstrip_01",
    "ex_mp_h_stn_chairstrip_010",
    "ex_mp_h_stn_chairstrip_011",
    "ex_mp_h_stn_chairstrip_05",
    "ex_mp_h_stn_chairstrip_07",
    "ex_prop_offchair_exec_01",
    "ex_prop_offchair_exec_02",
    "ex_prop_offchair_exec_03",
    "ex_prop_offchair_exec_04",
    "gr_prop_gr_chair02_ped",
    "gr_prop_gr_offchair_01a",
    "gr_prop_highendchair_gr_01a",
    "hei_heist_din_chair_01",
    "hei_heist_din_chair_02",
    "hei_heist_din_chair_03",
    "hei_heist_din_chair_04",
    "hei_heist_din_chair_05",
    "hei_heist_din_chair_06",
    "hei_heist_din_chair_08",
    "hei_heist_din_chair_09",
    "hei_heist_stn_chairarm_01",
    "hei_heist_stn_chairarm_03",
    "hei_heist_stn_chairarm_04",
    "hei_heist_stn_chairarm_06",
    "hei_heist_stn_chairstrip_01",
    "hei_prop_heist_off_chair",
    "hei_prop_hei_skid_chair",
    "imp_prop_impexp_offchair_01a",
    "prop_armchair_01",
    "prop_chair_01a",
    "prop_chair_01b",
    "prop_chair_02",
    "prop_chair_03",
    "prop_chair_04a",
    "prop_chair_04b",
    "prop_chair_05",
    "prop_chair_06",
    "prop_chair_07",
    "prop_chair_08",
    "prop_chair_09",
    "prop_chair_10",
    "prop_chateau_chair_01",
    "prop_clown_chair",
    "prop_cs_folding_chair_01",
    "prop_cs_office_chair",
    "prop_direct_chair_01",
    "prop_direct_chair_02",
    "prop_flipchair_01",
    "prop_gc_chair02",
    "prop_ld_farm_chair01",
    "prop_off_chair_01",
    "prop_off_chair_03",
    "prop_off_chair_04",
    "prop_off_chair_04b",
    "prop_off_chair_04_s",
    "prop_off_chair_05",
    "prop_old_deck_chair",
    "prop_old_wood_chair",
    "prop_old_wood_chair_lod",
    "prop_rock_chair_01",
    "prop_skid_chair_01",
    "prop_skid_chair_02",
    "prop_skid_chair_03",
    "prop_sol_chair",
    "prop_yaught_chair_01",
    "p_armchair_01_s",
    "p_clb_officechair_s",
    "p_dinechair_01_s",
    "p_ilev_p_easychair_s",
    "p_soloffchair_s",
    "p_yacht_chair_01_s",
    "sm_prop_offchair_smug_01",
    "sm_prop_offchair_smug_02",
    "sm_prop_smug_offchair_01a",
    "vw_prop_casino_chair_01a",
    "vw_prop_casino_track_chair_01",
    "vw_prop_vw_offchair_01",
    "vw_prop_vw_offchair_02",
    "vw_prop_vw_offchair_03",
    "v_club_officechair",
    "v_corp_bk_chair3",
    "v_corp_cd_chair",
    "v_corp_offchair",
    "v_ilev_chair02_ped",
    "v_ilev_hd_chair",
    "v_ilev_m_dinechair",
    "v_ilev_p_easychair",
    "v_ret_gc_chair03",
    "xm_base_cia_chair_conf",
    "xm_int_lev_sub_chair_01",
    "xm_int_lev_sub_chair_02",
    "xm_lab_chairarm_02",
    "xm_lab_chairarm_03",
    "xm_lab_chairarm_11",
    "xm_lab_chairarm_12",
    "xm_lab_chairarm_24",
    "xm_lab_chairarm_25",
    "xm_lab_chairarm_26",
    "xm_lab_chairstool_12",
    "xm_lab_easychair_01",
    "xm_mp_h_stn_chairarm_13",
    "xm_prop_x17_avengerchair",
    "xm_prop_x17_avengerchair_02",
    "xm_prop_x17_corp_offchair",
    "sum_mp_h_yacht_armchair_01",
    "sum_mp_h_yacht_armchair_03",
    "sum_mp_h_yacht_armchair_04",
    "sum_mp_h_yacht_strip_chair_01", 
];