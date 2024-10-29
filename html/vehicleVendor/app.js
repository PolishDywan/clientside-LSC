$(document).ready(function() {
    if ('alt' in window) {
        alt.emit('VehicleVendor:Ready');
    }
    alt.on('VehicleVendor:LoadItems', (obj)=>{
        let data = JSON.parse(obj);
        data.forEach((e)=>{
            $('.inventory').append(`<div class="box">
                <div class="icerik">
                    <img src="${e.picture}">
                    <div class="yazilar">
                        <div class="dyazi">
                            <span>${e.name}</span>
                            <span><d>$</d>${e.price}</span>
                            <span><d>Bagaj:</d>${e.inventoryCapacity}Lt</span>
                            <span><d>Yakıt Tankı:</d>${e.petrolTank}Lt</span>
                            <span><d>Y.Tüketim:</d>${e.fuelConsumption}Lt/kmh</span>
                            <span><d>Vergi:</d>${e.defaultTax}$</span>
                        </div>
                    </div>
                </div>
                <div class="satinal" onclick="clickBuy(${e.ID})">
                    <span>SATIN AL</span>
                </div>
            </div>`);
        });
    });
});
function clickBuy(id) {
    alt.emit('VehicleVendor:WantBuy', id);
}
 /*
#item Örneği

<div class="box">
    <div class="icerik">
        <img src="item.png">
        <div class="yazilar">
            <div class="dyazi">
                <span>Tamir Kiti</span>
                <span>250<d>$</d></span>
            </div>
        </div>
    </div>
    <div class="satinal">
        <span>SATIN AL</span>
    </div>
</div>
*/ 