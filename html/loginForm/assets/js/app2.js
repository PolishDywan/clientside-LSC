let sayfa = 0;
let cinsiyet = 0;
$(document).ready(function() {
    $('#footer .button').click(()=>{
        $('#footer .button').hide();
        $('#main').append(`
        <div class="char new">
                        <div class="cprofil"><img src="./assets/images/unisex.svg" /></div>
                        <div class="c"></div>
                        <div class="cisim"><input id="nchar" type="text" spellcheck="false" placeholder="AD SOYAD GİRİN" autofocus><span> Karakterinize bir isim vermek için yazın,<br>Ardından soldaki karakter resmine tıklayarak oluşturun.</span></div>
                    </div>
        `);
        $('.cprofil').click(function() {
            alt.emit('characterPage:CreateChar', $('#nchar').val());
        });
    });
    $('.menu ul li').click(function() {
        sayfa = $(this).attr('id');
        $('.menu ul li.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#karakterduzenle #main').children().not('.hidden').addClass('hidden');
        console.log(sayfa);
        switch(sayfa){
            case "0":
                $('.genel').removeClass('hidden');
                break;
            case "1":
                $('.gorunum').removeClass('hidden');
                break;
            case "2":
                $('.yuz').removeClass('hidden');
                break;
            case "3":
                $('.vucut').removeClass('hidden');
                break;
            case "4":
                $('.sac').removeClass('hidden');
                break;
            default:
                $('.footer').addClass('hidden');
                break;
        }
    });
    $('.cinsiyetsecim img').click(function() {
        cinsiyet = $(this).attr('id');
        $('.cinsiyetsecim img').toggleClass('selected');
    });
    $(document).on('input change', '.input input', function() {
        $(this).siblings().html($(this).val());
    });
    /*$('#footer .button').click(function(){
            $(this).toggle();
            $('#karakterduzenle').removeClass('hidden');
        });*/ alt.emit('characterPage:Loaded');
    alt.on('loginCEF:Chars', function(characterdata, limit) {
        let lim = 0;
        var char = JSON.parse(characterdata);
        char.forEach((e)=>{
            lim += 1;
            $('#main').append(`
                    <div char='${e.ID}' class="char ${e.isCK ? 'ck' : ''}" ${e.isCK ? 'style="background: linear-gradient(90deg, rgb(17 19 21 / 57%) 55.73%, rgba(73, 160, 205, 0.03) 100%) !important;"' : 'style="background: linear-gradient(90deg, rgba(73, 160, 205, 0.5) 55.73%, rgba(73, 160, 205, 0.03) 100%) !important;"'}>
                        <div class="cprofil"><img src="./assets/images/unisex.svg" /></div>
                        <div class="c"></div>
                        <div class="cisim" ${e.isCK ? 'style="text-decoration: line-through;"' : ''}><span>${e.characterName.replace('_', ' ').toUpperCase()}</span><span>${e.factionName ? e.factionName : ""}</span></div>
                    </div>`);
        });
        if (limit > lim) $('#footer').removeClass('hidden');
        $('#karaktersec .char:not(".new,.ck")').click(function() {
            alt.emit('characterPage:SelectChar', $(this).attr('char'));
        });
    });
    $('.button2').click(()=>{
        let data = {
            location: $('#dogumYeri').val(),
            nation: $('#uyruk').dropdown('get value'),
            age: $('#myRange').val(),
            secondLang: $('#dil').dropdown('get value')
        };
        $('#karakterduzenle').addClass('hidden');
        if ($('#dogumYeri').val().length > 3 || $('#uyruk').dropdown('get value').length >= 2 || $('#dil').dropdown('get value').length >= 2) {
            alt.emit('characterPage:CharSettings', JSON.stringify(data));
        }
    });
    alt.on("loginCEF:CreateSucces", function(cName) {
        $('#karaktersec').addClass('hidden');
        $('#title span').text(cName.replace("_", " "));
        $('#karakterduzenle').removeClass('hidden');
    });
});
