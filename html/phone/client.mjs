import alt from 'alt';
import * as game from 'natives';

let player = alt.Player.local;


let phone;
let _phoneData;
let cursor = false;
let lastUsage = Date.now();

alt.onServer('Phone:Setup', () => {    
    if(phone) { 
        phone.destroy();
        phone = null;
     }
    getPlayerPhoneData();
    phone = new alt.WebView("http://resource/client/html/phone/html/index.html");    

    alt.onServer('Phone:IncomingCall', (number) => {
        phone.emit('Phone:IncomingCall', number);
        if(phone && !cursor){
                cursor = true;
                phone.focus();
                alt.showCursor(cursor);
                alt.toggleGameControls(!cursor);
                phone.emit('Phone:Toggle', cursor);
                alt.emitServer("Phone:OnHand", cursor);
        }
    });

    alt.onServer('Phone:TargetBusy', () => {
        phone.emit('Phone:TargetBusy');
    });

    alt.onServer('Phone:JoinCall', (number) => {
        phone.emit('Phone:JoinCall', number);
    })

    alt.onServer('Phone:SetActiveScreen', (number) => {
        phone.emit('Phone:SetActiveScreen', number);
    });

    alt.onServer('Phone:CloseCurrentCall', () => {
        phone.emit('Phone:TargetBusy');
    })

    // Phone Listeners
    phone.on('Phone:Ready', () => {        
        alt.setTimeout(() => { 
            phone.emit('Phone:SetupData', _phoneData);
         }, 300);
    });

    // Call Events
    phone.on('Phone:AcceptCall', (number) => {
        alt.emitServer('Phone:AcceptCall', number);
    });
    phone.on('Phone:DeclineCall', (number) => {
        alt.emitServer('Phone:DeclineCall', number);
    });

    phone.on('Phone:CallNumber', (number) => {        
        if (lastUsage < Date.now()) {
            lastUsage = Date.now() + 1000;
            alt.emitServer('Phone:Call', number);
        }
    });

    phone.on('Phone:CloseCurrentCall', () => {
        if (lastUsage < Date.now()) {
            lastUsage = Date.now() + 1000;
            alt.emitServer('Phone:CloseActiveCall');
        }
    });

    phone.on('Phone:AddNewContactToList', (name, number) => {
        alt.emitServer('Phone:AddNewContactToList', name, number);
    });

    phone.on('Phone:SendMessage', (number, message) => {
        if (lastUsage < Date.now()) {
            lastUsage = Date.now() + 1000;
            alt.emitServer('Phone:SendSMS', number, message);
        }
    });

    phone.on('Phone:DeleteMessage', (number) => {
        alt.emitServer('Phone:DeleteMessage', parseInt(number));
    })

    phone.on('Phone:RemoveContact', (number) => {
        alt.emitServer('Phone:DeleteContactToList', parseInt(number));
    })
})

alt.onServer('Phone:Destroy', () => {
    if(phone){
        phone.destroy();
        phone = null;
        _phoneData = null;
        cursor = false;
    }
})

alt.onServer('Phone:Update', () => {
    if(phone){
        getPlayerPhoneData();
        phone.emit('Phone:SetupData', _phoneData);
    }
})

alt.on('keydown', (key) => {        
    if (key === 114) {               
        if(phone){
            if(!cursor){
                cursor = true;
                phone.focus();
                alt.showCursor(cursor);
                alt.toggleGameControls(!cursor);
                phone.emit('Phone:Toggle', cursor);
                alt.emitServer("Phone:OnHand", cursor);
            }
            else{
                cursor = false;
                phone.unfocus();
                alt.showCursor(cursor);
                alt.toggleGameControls(!cursor);
                phone.emit('Phone:Toggle', cursor);
                alt.emitServer("Phone:OnHand", cursor);
            }
        }        
    }
});


// Functions
function getPlayerPhoneData(){
    let obj = alt.Player.local.getSyncedMeta('PlayerPhoneData');
    if(obj){alt.log("client.mjs phone data okey.");}    
    _phoneData = JSON.parse(obj);
}
