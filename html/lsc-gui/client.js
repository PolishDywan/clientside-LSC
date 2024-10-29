export { }; /*const view = new alt.WebView("http://127.0.0.1:8080");
view.unfocus();

view.on('load', () => {
    alt.log('~x~LSC-GUI ~w~başarıyla ~g~Yüklendi...');

    view.on('Dialog:Ok', (trigger, data) => {
        alt.emitServer(trigger, true ,data);
    })
    view.on('Dialog:Cancel', (trigger) => {
        alt.emitServer(trigger, false, null)
    })
})

alt.onServer('Quasar:Notify', (data, triger, trigerData) => { 
    alt.log(data);
    alt.log(triger);
    alt.log(trigerData);
    if(view){
        alt.log('~g~viewe yolladım...')
        view.emit('Notify', data);
    }
});

alt.onServer('Quasar:FullScreenLoading', (data, Trigger) => {
    if(view){
        view.emit('LoadingFS', data, d);
    }
})

alt.onServer('Quasar:Dialog', (data, trigger) => {
    if(view){
        view.emit('Dialog', data, triger, triger);
    }
})*/ 
