export { }; /*
let cef = new alt.WebView("http://resource/client/html/screenshot/index.html");
let cursor = false;

alt.on('keydown', (key) => {
    if(key === 118){
        alt.takeScreenshot().then((res) => {
            cef.emit("showPhoto", res);
        })
    }
    else if(key === 192){

        alt.showCursor(!cursor);
        cursor = !cursor;

        if(cursor){cef.focus()}
        else{cef.unfocus();}

    }
});

*/ 
