const canvas = document.getElementById("selfview-canvas");
setTimeout(()=>{
    canvas.style.display = "block";
    MainRender.renderToTarget(canvas);
}, 2000);
