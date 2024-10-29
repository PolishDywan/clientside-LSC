import * as alt from 'alt-client';
import * as native from 'natives';
import './lifeinvader/client'
import './date/client'
//import * as fs from 'fs';
//#region Phone contants
let phone;
let cursor = false;
let lastUse = Date.now();
//#endregion
alt.on('keydown', (key) => {
    if (key === 114) {
        if (phone) {
            cursor = !cursor;
            alt.showCursor(cursor);
            alt.toggleGameControls(!cursor);
            if (cursor) {
                phone.focus();
                alt.setMeta('player:PhoneOpen', true)
                phone.emit('display', cursor);
                alt.emitServer("Phone:OnHand", 1);
            } else {
                phone.unfocus();
                phone.emit('display', cursor);
                alt.emitServer("Phone:OnHand", 2);
                alt.setMeta('player:PhoneOpen', false)
            }
        }
    }
    if (key === 8) {
        if (phone) {
            if (inCam) {
                if (camInterval) alt.clearEveryTick(camInterval);
                native.cellCamActivate(false, false);
                native.destroyMobilePhone();
                inCam = false;
                alt.emit('chat:message', null, "{DF1111}[!] Kameradan çıkıldı.");
            }
        }
    }
});
// First Load
alt.onServer('Phone:Setup', (settings) => {
    phone = new alt.WebView("http://resource/client/html/telefon/index.html");
    phone.on('load', () => {
        alt.setTimeout(() => {
            alt.emitServer('cPhone:ShowContactList');
            phone.emit('pCef:UpdatePhoneSettings', settings);
        }, 500);
    });
    // ! Phone-Side Listeners 
    // ? NameTag: 'pCef'
    phone.on('pCef:Call', (number) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:CallNumber', number);
        }
    });
    phone.on('pCef:AnswerCall', (state) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:AnswerCall', state);
        }
    });
    phone.on('pCef:CloseCurrentCall', () => {
        alt.emitServer('cPhone:CloseCurrentCall');
    });
    phone.on('pCef:GetMessageList', () => {
        alt.emitServer('cPhone:GetMessages');
    });
    phone.on('pCef:DeleteMessage', (number) => {
        alt.emitServer('cPhone:DeleteMessage', parseInt(number));
    });
    phone.on('pCef:SelectMessage', (number, text) => {
        alt.emitServer('cPhone:SelectMessage', parseInt(number), text);
    });

    phone.on('pCef:OpenLifeInvader', () => {
        alt.emit('pCef:OpenInvaderView');
    })

    phone.on('pCef:OpenDate', () => {
        alt.emit('pCef:OpenDateView');
    })

    phone.on('pCef:SendMessage', (number, text) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:SendMessage', parseInt(number), text);
        }
    });
    phone.on('pCef:AddContact', (number, name) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:AddNewContact', parseInt(number), name);
        }
    });
    phone.on('pCef:RemoveContact', (number) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:RemoveContact', parseInt(number));
        }
    });
    phone.on('pCef:Hoparlor', (state) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:Hoparlor', state);
        }
    });
    phone.on('pCef:getbankAccounts', () => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:GetBankAccounts');
        }
    });
    phone.on('pCef:getCarList', () => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:GetCarList');
        }
    });
    phone.on('pCef:PayVehicleTax', (selectedCar, bankAccount) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:PayVehicleTax', parseInt(selectedCar), parseInt(bankAccount));
        }
    });
    phone.on('pCef:SendMoney', (sender, getter, price) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:SendMoney', parseInt(sender), parseInt(getter), parseInt(price));
        }
    });
    phone.on('pCef:settings', (paper, quite, fly) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:Settings', paper, parseInt(quite), parseInt(fly));
        }
    });
    phone.on('pCef:OpenCamera', () => {
        cursor = false;
        alt.showCursor(cursor);
        alt.toggleGameControls(!cursor);
        alt.emit('openCamera');
    });

    phone.on('pCef:GalleryOpened', () => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:GetPhotos');
        }
    });
    phone.on('pCef:AddNewPhoto', (link) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:AddNewPhoto', link);
        }
    });
    phone.on('pCef:DeletePhoto', (link) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:DeletePhoto', link);
        }
    });
    phone.on('pCef:SharePhoto', (number, link) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:SharePhoto', parseInt(number), link);
        }
    });
    phone.on('pCef:SendGPS', (number) => {
        if (lastUse < Date.now()) {
            lastUse = Date.now() + 1000;
            alt.emitServer('cPhone:SendGPS', parseInt(number), alt.Player.local.pos);
        }
    });
    phone.on('pCef:SetGPS', (_pos) => {
        let pos = JSON.parse(_pos);
        native.setNewWaypoint(pos.X, pos.Y);
    });
    phone.on('pCef:SettingsUpdate', (data) => {
        alt.emitServer('cPhone:SettingsUpdate', data);
    });
});
// ! Server-side events
alt.onServer('Phone:Settings', (data) => {
    if (phone) {
        phone.emit('pCef:Settings', data);
    }
});
alt.onServer('Phone:SetCarList', (data) => {
    if (phone) {
        phone.emit('pCef:UpdateCarList', data);
    }
});
alt.onServer('Phone:IncomingCall', (number) => {
    if (phone) {
        phone.emit('pCef:IncomingCall', number);
    }
});
alt.onServer('Phone:CallAnswerCB', (status) => {
    if (phone) {
        if (status) {
            phone.emit('pCef:phoneCallOpen');
        } else {
            phone.emit('pCef:ForceCloseCall');
        }
    }
});
alt.onServer('Phone:LoadMessageList', (data) => {
    if (phone) {
        phone.emit('pCef:LoadMessages', data);
    }
});
alt.onServer('Phone:SelectMessage', (data) => {
    if (phone) {
        phone.emit('pCef:setCurrentMessage', data);
    }
});
alt.onServer('Phone:reloadMessage', (data) => {
    if (phone) {
        phone.emit('pCef:relodCurrentMessage', data);
    }
});
alt.onServer('Phone:UpdateContactList', (data) => {
    if (phone) {
        phone.emit('pCef:ContactList', data);
    }
});
alt.onServer('Phone:SetBankAccounts', (data) => {
    if (phone) {
        phone.emit('pCef:SetBankAccount', data);
    }
});
alt.onServer('Phone:Notifi', (title, text, icon, color) => {
    if (phone) {
        phone.emit('pCef:SendNotifi', title, text, icon, color);
    }
});
alt.onServer('Phone:AddAdversiment', (text, number) => {
    if (phone) {
        phone.emit('pCef:AddAdvirsiment', text, number);
    }
});
// ! Destroy phone
alt.onServer('Phone:Destroy', () => {
    if (phone) {
        phone.destroy();
        phone = null;
    }
});
alt.onServer('Phone:UpdatePhotos', (data) => {
    if (phone) {
        phone.emit('pCef:UpdateAllPhotos', data);
    }
});

// Camera Events
let player = alt.Player.local;
let camInterval;
let inCam = false;
let camPos = {
    x: 0,
    y: 0,
    roll: 0,
    fov: 40,
    front: true,
    headY: 0,
    headRoll: 0,
    headHeight: 0,
    distance: 0.0
};
alt.on('openCamera', () => {
    if (inCam == false) {
        inCam = true;
        native.createMobilePhone(0);
        native.setPedConfigFlag(player.scriptID, 242, true);
        native.setPedConfigFlag(player.scriptID, 243, true);
        native.setPedConfigFlag(player.scriptID, 244, false);
        native.cellCamActivate(true, true);
        camInterval = alt.everyTick(() => {
            native.hideHudComponentThisFrame(7);
            native.hideHudComponentThisFrame(8);
            native.hideHudComponentThisFrame(9);
            native.hideHudComponentThisFrame(6);
            native.hideHudComponentThisFrame(19);
            native.hideHudAndRadarThisFrame();
            let mouseX = native.getDisabledControlNormal(0, 1) / 2.0;
            let mouseY = native.getDisabledControlNormal(0, 2) / 2.0;
            let roll = native.getDisabledControlNormal(0, 30) / 12.0;
            let fov = native.getDisabledControlNormal(0, 39) / 5.0;
            if (native.isControlPressed(0, 179) && camPos.front == true) {
                native.disableControlAction(0, 1, true);
                native.disableControlAction(0, 2, true);
                camPos.x = clamp(camPos.x + mouseX, 0.0, 1.0);
                camPos.y = clamp(camPos.y + mouseY, 0.0, 2.0);
                camPos.roll = clamp(camPos.roll + roll, -1.0, 1.0);
                camPos.distance = clamp(camPos.distance + fov, 0.0, 2.0);
            } else if (native.isControlPressed(0, 185) && camPos.front == true) {
                native.disableControlAction(0, 1, true);
                native.disableControlAction(0, 2, true);
                camPos.headY = clamp(camPos.headY + mouseX, -1.0, 1.0);
                camPos.headRoll = clamp(camPos.headRoll + roll, -1.0, 1.0);
                camPos.headHeight = clamp(camPos.headHeight + mouseY, -1.0, 1.0);
            }
            if (native.isControlPressed(0, 172)) {
                camPos.front = !camPos.front;
                native.cellCamActivateSelfieMode(camPos.front);
            }
            if (native.isControlPressed(3, 176)) {
                alt.clearEveryTick(camInterval);
                native.requestNamedPtfxAsset("scr_rcpaparazzo1");
                native.cellSetInput(5);
                native.playSoundFrontend(-1, "Camera_Shoot", "Phone_SoundSet_Michael", true);
                native.cellCamActivate(false, false);
                native.destroyMobilePhone();
                alt.takeScreenshotGameOnly().then((res) => {
                    inCam = false;
                    if (phone) {
                        phone.emit('pCef:Photo', res);
                    }
                });
            }
            //drawLongText("x: " + camPos.x, 0.50, 0.90, 0.5, 0, 255,0,0,250, true, true, true);
            // horizontal
            native.cellCamSetSelfieModeSideOffsetScaling(camPos.x);
            // vertical
            native.cellCamSetSelfieModeVertPanOffset(camPos.y);
            // roll
            native.cellCamSetSelfieModeRollOffset(camPos.roll);
            // distance
            native.cellCamSetSelfieModeHorzPanOffset(camPos.distance);
            // headY
            native._0x53F4892D18EC90A4(camPos.headY);
            // head roll
            native.cellCamSetSelfieModeHeadRollOffset(camPos.headRoll);
            // head Height
            native.cellCamSetSelfieModeHeadPitchOffset(camPos.headHeight);
        });
    } else {
        native.requestNamedPtfxAsset("scr_rcpaparazzo1");
        native.cellCamMoveFinger(5);
        native.playSoundFrontend(-1, "Camera_Shoot", "Phone_SoundSet_Michael", true);
        alt.clearEveryTick(camInterval);
        native.cellCamActivate(false, false);
        native.destroyMobilePhone();
        inCam = false;
    }
});

function clamp(value, min, max) {
    return Math.min(max, Math.max(value, min));
}