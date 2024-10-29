import alt from 'alt';

let date;

alt.on('pCef:OpenDateView', () => {
    date = new alt.WebView("http://resource/client/html/telefon/date/date.html");
    date.focus();

    date.on('pCef:closeDateView', () => {
        closeDateView();
    })
})

alt.on('keydown', (key) => {
    if (key === 27) {
        if (date) {
            closeDateView();
        }
    }

    if (key === 192) {
        alt.log(alt.Player.local.pos)
    }
})


function closeDateView() {
    date.unfocus();
    date.destroy();
}