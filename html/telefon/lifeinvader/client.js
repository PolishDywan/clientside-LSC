import alt from 'alt';

let invader;

alt.on('pCef:OpenInvaderView', () => {
    invader = new alt.WebView("http://resource/client/html/telefon/lifeinvader/lifeinvader.html");
    invader.focus();

    invader.on('pCef:closeExtraView', () => {
        closeInvaderView()
    })
})

alt.on('keydown', (key) => {
    if (key === 27) {
        if (invader) {
            closeInvaderView();
        }
    }
})



function closeInvaderView() {
    invader.unfocus();
    invader.destroy();
}