$(document).ready(function() {
    if ('alt' in window) {
        alt.emit('Market:Ready');
    }
    alt.on('Market:LoadItems', (obj)=>{
        let data = JSON.parse(obj);
        data.forEach((e)=>{
            $('.inventory').append(`<div class="box">
                <div class="icerik">
                    <img src="../inventory/itemicons/${e.picture}.png">
                    <div class="yazilar">
                        <div class="dyazi">
                            <span>${e.name}</span>
                            <span>${e.price}<d>$</d></span>
                        </div>
                    </div>
                </div>
                <div class="satinal" onclick="buyItem(${e.ID})">
                    <span>SATIN AL</span>
                </div>
            </div>`);
        });
    });
});
function buyItem(ID) {
    alt.emit('Market:WantBuy', ID);
} /*
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
