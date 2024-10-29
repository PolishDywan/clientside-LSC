import alt from 'alt-client';
import native from 'natives';
import { distance } from '../../utils/vector';
let player = alt.Player.local;
let interval = null;
let canBuy = null;
let vehPos = null;
let gaspumppos = null;
let rope = null;
let gaspump = null;
let checkPoint = null;
let inGas = false;
alt.onServer('GasStation:Start', (veh)=>{
    if (!inGas) {
        let vehicle = alt.Vehicle.getByID(veh);
        propGas.forEach((x)=>{
            if (canBuy == null || canBuy == 0) {
                canBuy = native.getClosestObjectOfType(player.pos.x, player.pos.y, player.pos.z, 3.0, alt.hash(x), false, false, false);
                gaspumppos = native.getEntityCoords(canBuy, false);
            }
        });
        if (canBuy == null || canBuy == 0) {
            alt.emit('chat:message', null, "{DF1111}[HATA] Yakınınızda bir benzinlik bulunamadı!");
        } else {
            inGas = true;
            let pumpPos = player.pos; //native.getEntityCoords(canBuy, false);
            alt.emit('chat:message', null, "{C2E111}[?] Aracın benzin deposuna doğru ilerleyerek benzin doldurmaya başlayabilirsiniz.");
            let vehPumpPos = native.getWorldPositionOfEntityBone(vehicle.scriptID, native.getEntityBoneIndexByName(vehicle.scriptID, "wheel_lr"));
            //let vehPumpPos = native.getEntityForwardVector(vehicle.scriptID);
            //function getEntityHeightAboveGround(entity: Entity): float
            checkPoint = native.createCheckpoint(6, vehPumpPos.x, vehPumpPos.y, vehPumpPos.z, vehPumpPos.x, vehPumpPos.y, vehPumpPos.z, 1, 255, 0, 0, 50, 0);
            gaspump = native.createObject(alt.hash("prop_cs_fuel_nozle"), player.pos.x, player.pos.y, player.pos.z, false, false, true);
            //native.attachEntityToEntity(gaspump, player.scriptID, native.getPedBoneIndex(player.scriptID, 58866), 0.075, -0.029, 0, 37.5, 0, 216.1, true, true, false, true, 1 ,true); // TODO AÇILACAK
            let pumpipumpi = native.getWorldPositionOfEntityBone(player.scriptID, native.getPedBoneIndex(player.scriptID, 58866));
            rope = native.addRope(player.pos.x, player.pos.y, player.pos.z, 0.0, 0.0, 0.0, 0.5, 5, 10.0, 0.5, 0.0, false, false, false, 5.0, false, -1)[0];
            native.attachEntitiesToRope(rope, gaspump, canBuy, pumpipumpi.x, pumpipumpi.y, pumpipumpi.z, gaspumppos.x, gaspumppos.y, gaspumppos.z + 1.5, 11.0, false, false, 0, 0);
            vehPos = vehicle.pos;
            interval = alt.setInterval(()=>{
                if (distance(vehPumpPos, player.pos) < 5) {
                    if (distance(vehPumpPos, player.pos) < 1.5) {
                        alt.emitServer('GasStation:Buy', vehicle);
                    }
                } else {
                    alt.clearInterval(interval);
                    interval = null;
                    canBuy = null;
                    vehPos = null;
                    native.deleteCheckpoint(checkPoint);
                    native.deleteRope(rope);
                    native.deleteObject(gaspump);
                    gaspump = null;
                    rope = null;
                    checkPoint = null;
                    inGas = false;
                }
            }, 2000);
        }
    }
});
alt.onServer('GasStation:Over', ()=>{
    alt.clearInterval(interval);
    interval = null;
    canBuy = null;
    vehPos = null;
    native.deleteCheckpoint(checkPoint);
    native.deleteRope(rope);
    native.deleteObject(gaspump);
    gaspump = null;
    rope = null;
    checkPoint = null;
    inGas = false;
});
let propGas = [
    "prop_gas_pump_1a",
    "prop_gas_pump_1b",
    "prop_gas_pump_1c",
    "prop_gas_pump_1d",
    "prop_gas_pump_old2",
    "prop_gas_pump_old3",
    "prop_vintage_pump"
];
