let players = [];
alt.on('Boom:StartSound', play);
alt.on('Boom:StopSound', stop);
alt.on('Boom:SetVolume', setVolume);
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var ytScript = document.getElementsByTagName('script')[0];
ytScript.parentNode.insertBefore(tag, ytScript);
function play(carID, id, data) {
    //if(document.getElementById("player"+carID)){
    //document.getElementById("player"+carID).remove();
    if (players[carID]) {
        //console.log("Açık olan radyo vardı yeni gelen linki koyuyorum...");
        players[carID].loadVideoById(id, data);
        players[carID].playVideo();
    //console.log("Koydum tşk.");
    } else {
        //console.log("Radyo için yeni div oluşturdum basıyorum içine.")
        $('.app').append('<div id="player' + carID + '" tabindex="-1"></div>');
        let plyr = new YT.Player('player' + carID, {
            height: '0',
            width: '0',
            videoId: id,
            playerVars: {
                'start': data,
                'autoplay': 1,
                'controls': 0
            },
            events: {
                'onReady': onPlayerReady
            }
        });
        players[carID] = plyr;
    //console.log("Radyoyu oluşturdum, içinede linki koydum. (Göbekte atarım kalçayla, yemekte yaparım salçayla)");
    }
//players[carID].loadVideoById(id, data, "tiny");
//players[carID].playVideo();
}
function onPlayerReady(event) {
//player.setPlaybackRate(2);
//event.target.playVideo();
}
function stop(id) {
    // if(document.getElementById("player"+id))
    //     document.getElementById("player"+id).remove();
    //console.log("Radyoyu durdurdum.");
    if (players[id] instanceof YT.Player) {
        players[id].stopVideo();
    }
// players[id].destroy();
// delete players[id];
}
function setVolume(id, volume) {
    if (players[id] instanceof YT.Player) {
        if (players[id] && typeof players[id].setVolume == 'function') players[id].setVolume(volume);
    }
}
