$('#KontoLoginButton').click(()=>{
    mp.game.ui.notifications.show("Normal message with custom text and background color.", false, 15, 20);
    $('.alert').remove();
    mp.trigger('bKontoLoginToServer', $('#BankPinLogin').val());
});
$('#CloseButton').click(()=>{
    $('.alert').remove();
    mp.trigger('CloseMenu');
});
