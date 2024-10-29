import alt from 'alt';
import native from 'natives';


let ped = alt.Player.local.scriptID;

let weps = [];
alt.onServer('Weapon:Add', (hash, ammo) => {
    let obj = {silah: hash, mermi: ammo};
    weps.push(obj);
})
alt.onServer('Weapon:Remove', (hash) => {
    native.setPedAmmo(alt.Player.local.scriptID, hash, 0, true)
    let i = weps.findIndex(x => x.silah === hash);
    weps.splice(i, 1);
    
})

let canSend = true;
alt.everyTick(() => {
    weps.forEach(x => {
        if(canSend){
            let ammo = native.getAmmoInPedWeapon(alt.Player.local.scriptID, x.silah);
            if(x.mermi != ammo){
                alt.emitServer('Weapon:BulletUpdate', x.silah, ammo);
                x.mermi = ammo;
            }
        }
    })
});


alt.onServer('Weapon:AddMagazine', (hash, bullet) => {
    canSend = false;
    native.addAmmoToPed(alt.Player.local.scriptID, hash, bullet);
    canSend = true;
})

