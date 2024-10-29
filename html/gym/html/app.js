$(document).ready(function() {
    //Global Variables
    var score = 0;
    var time = 0;
    var difficulty = 1;
    var fetcher = 0;
    //Finish Sound
    var finishSound = document.createElement('audio');
    finishSound.setAttribute('src', 'http://www.orangefreesounds.com/wp-content/uploads/2017/06/Ting-sound-effect.mp3');
    //Difficulty Setting
    $("#difficulty").on('change', function() {
        difficulty = $(this).val();
    //alert("Changed difficulty to " + difficulty);
    });
    //stop watch timer
    var decreaseProgressBar = setInterval(function() {
        var decreaseSpeed = 5;
        $('#progressBox').height("-=" + decreaseSpeed);
    }, 100);
    var randNum = Math.floor(Math.random() * 70) + 40;
    $(".box").css("transform", "translateY(-" + randNum + "px)");
    fetcher = randNum;
    $('body').keyup(function(e) {
        if (e.keyCode == 77) {
            var pbarContainer = $('#container').height();
            var pbarHeightGrow = pbarContainer * 0.2;
            var pbarHeightNew = $('#progressBox').height() + pbarHeightGrow;
            var heightval = $('#progressBox').height();
            $('#progressBox').height("+=" + pbarHeightGrow);
            score += 20;
            $('#score').text(score);
            if (pbarHeightNew > fetcher + 20 && heightval - 20 < fetcher) {
                var pbar = $('#success').height();
                var pbarGrow = pbar * 0.5;
                var pbarNew = $('#succ').width();
                if (pbarNew >= 200) {
                    clearInterval(succBar);
                    if ("alt" in window) {
                        alt.emit("GYM:Success");
                    }
                }
                $('#succ').width("+=" + pbarGrow);
                clearInterval(succBar);
            } else {
                var succBar = setInterval(function() {
                    var decreaseSpeed = 0.5;
                    $('#succ').width("-=" + decreaseSpeed);
                }, 5000);
            }
        }
    });
});
