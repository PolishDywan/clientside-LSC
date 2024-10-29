let typeText = "d";
$(document).ready(function() {
    if ('alt' in window) {
        alt.emit('otherEnv:Ready');
    }
    alt.on('otherEnv:LoadItems', (type, obj)=>{
        getTypeText(type);
        $('.inventory').empty();
        $('#baslik').text(typeText);
        let data = JSON.parse(obj);
        data.forEach((e)=>{
            $('.inventory').append(`<div class="box">
            <div class="icerik">
                <div class="imge">
                <img src="../inventory/itemicons/${e.picture}.png">
                  </div>      
                    <div class="yazilar">
                    <div class="dyazi"><div class="satinal" onclick="Take(${type}, ${e.selectID})">
                            <span>Al</span>
                        </div>
                        
                                    <span class="qua_text"><d>Miktar: </d>${e.amount}</span>
                                    <span class="qua_text"><d>Ağırlık: </d>${e.weight}</span>
                    </div>
                </div>
                
            </div>
            <span class="qua_name">${e.name}</span>
        </div>`);
        });
    });
});
function getTypeText(type) {
    switch(type){
        case 1:
            typeText = "Araç Bagajı";
            break;
        case 2:
            typeText = "İşyeri Kasası";
            break;
        case 3:
            typeText = "Ev Kasası";
            break;
        case 4:
            typeText = "Kutu/Çanta";
            break;
        default:
            typeText = type;
            break;
    }
}
function closinv() {
    alt.emit('cls');
}
function Take(type, id) {
    alt.emit('otherEnv:Take', type, id);
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
