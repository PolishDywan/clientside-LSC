let sounds = [];
let carSounds = [];
alt.on('Boom:StartSound', play);
alt.on('Boom:StopSound', stop);
alt.on('Boom:SetVolume', setVolume);
/*
function PlaySound(data){
    data.Audio = new Audio(data.link);
    data.Audio.play();
    var date = new Date(Date.now() - new Date(data.Date));
    data.Audio.currentTime = date.getTime() * 1000;
    sounds[data.id] = data;
}

function StopSound(id){
    sounds[id].Audio.pause();
    sounds[id].Audio.currentTime = 0;
}

function SetVolume(id, volume){    
    sounds[id].Audio.volume = volume;
}
*/ //#region ? Boombox Api
window.addEventListener('message', function(event) {
    // Check for playSound transaction
    if (event.data.transactionType == "playSound") {
        play(event.data.transactionData);
    }
    if (event.data.transactionType == "stopSound") {
        stop();
    }
    if (event.data.transactionType == "volume") {
        setVolume(event.data.transactionData);
    }
});
//YouTube IFrame API player.
var player;
//Create DOM elements for the player.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var ytScript = document.getElementsByTagName('script')[0];
ytScript.parentNode.insertBefore(tag, ytScript);
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width: '1',
        height: '',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'enablejsapi': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}
function onPlayerReady(event) {
    title = event.target.getVideoData().title;
    player.setVolume(30);
}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        title = event.target.getVideoData().title;
    }
    if (event.data == YT.PlayerState.ENDED) {
        musicIndex++;
        play();
    }
}
function onPlayerError(event) {
    switch(event.data){
        case 2:
            break;
        case 5:
        //console.log("An HTML 5 player issue occured on video id: " + vid);
        case 100:
        //console.log("Video " + vid + "does not exist, wrong video id?" );
        case 101:
        case 150:
            break;
        default:
    }
    skip();
}
function skip() {
    play();
}
function play(id, data) {
    title = "n.a.";
    //var t1 = new Date();
    //var t2 = new Date(data);
    //var dif = t1.getTime() - t2.getTime();
    //dif = Math.round(dif / 1000);
    //dif = dif.getSeconds();
    //console.log(dif);
    //player.seekTo(dif);
    player.loadVideoById(id, data, "tiny");
    player.playVideo();
}
function resume() {
    player.playVideo();
}
function pause() {
    player.pauseVideo();
}
function stop() {
    player.stopVideo();
}
function setVolume(volume) {
    player.setVolume(volume);
} //#endregion boomboox end
