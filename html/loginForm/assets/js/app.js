$(document).ready(function() {
    if ('alt' in window) {
        alt.emit('loginPage:Ready');
        alt.on('loginPage:DATAReady', (data)=>{
            var obj = JSON.parse(data);
            obj.forEach((e)=>{
                $('#duyurular ul').append(`<li>#${e.ID} | ${e.text}</li>`);
            });
        });
        alt.on('loginCEF:ShowError', ()=>{
            jQuery('#error').css('display', 'block');
            setTimeout(()=>{
                jQuery('#error').css('display', 'none');
            }, 5000);
        });
    }
    $('button').click(function() {
        alt.emit('login:Attempt', $('#custom-input-28274').val(), $('#custom-input-84785').val());
    });
});
function passwordfac() {
    var x = document.getElementById("custom-input-84785");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
$(document).keypress(function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13 && $("#custom-input-84785").is(':focus')) {
        $('button').trigger('click');
    }
});
