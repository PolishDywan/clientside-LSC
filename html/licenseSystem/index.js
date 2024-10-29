'use strict';
let licenseCef = null;
var isMenuActive = false;
mp.events.add('ShowLicencePlayer', (firstname, lastname, birthday, id)=>{
    if (isMenuActive == false) {
        licenseCef = mp.browsers.new('package://LC/components/licencePlayer/licencePlayer.html');
        mp.gui.cursor.show(false, false);
        isMenuActive = true;
        licenseCef.emit = (eventName, ...args)=>{
            let argumentsString = '';
            for (let arg of args){
                switch(typeof arg){
                    case 'string':
                        {
                            argumentsString += `'${arg}', `;
                            break;
                        }
                    case 'number':
                    case 'boolean':
                        {
                            argumentsString += `${arg}, `;
                            break;
                        }
                    case 'object':
                        {
                            argumentsString += `${JSON.stringify(arg)}, `;
                            break;
                        }
                }
            }
            licenseCef.execute(`typeof window['${eventName}'] !== 'undefined' && window['${eventName}'](${argumentsString})`);
        };
        licenseCef.emit('setLicencePlayerName', lastname + ", " + firstname);
        licenseCef.emit('setLicencePlayerBirthday', birthday);
        licenseCef.emit('setLicencePlayerId', id);
    }
});
mp.events.add('CloseLicencePlayer', ()=>{
    isMenuActive = false;
    mp.gui.cursor.show(false, false);
    if (licenseCef) {
        licenseCef.destroy();
        licenseCef = null;
    }
});
