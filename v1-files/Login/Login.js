/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import native from 'natives';

import view from '../Utils/view.js';
import cursor from '../Utils/cursor.js';

view.on('Login:Ready', () => {
    getLoginData().then(obj => {
        view.emit('Login:Remember_Data', obj);
    })
})

view.on('Login:Submit', (username, password, remember) => {
    if(remember){
        saveLoginData(username, password);
    }
    else{
        clearLoginData();
    }

    alt.emitServer('LoginAttemp', username, password);
})

alt.onServer('login:Succes', (data, limit) => {
    
})

//#region Remember functions
function saveLoginData(username, password){
    alt.LocalStorage.set('username', username);
    alt.LocalStorage.set('password', password);
}

function getLoginData(){
    return new Promise(resolve => {
        let username = alt.LocalStorage.get('username');
        let password = alt.LocalStorage.get('password');
        resolve({
            username: username,
            password: password
        })
    })    
}

function clearLoginData(){
    alt.LocalStorage.delete('username');
    alt.LocalStorage.delete('password');
}
//#endregion