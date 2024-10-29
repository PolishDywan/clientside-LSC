import * as alt from 'alt-client';
import * as native from 'natives';
let player = alt.Player.local;
let atmLoginPage = null;
let atmPage = null;
let atmProps = [
    "prop_fleeca_atm",
    "prop_atm_03",
    "prop_atm_02",
    "prop_atm_01"
];
let atmCanUse = true;
var phoneInterval;

function checkPhoneisOpened() {
    phoneInterval = alt.setInterval(() => {
        var phoneOpened = alt.getMeta('player:PhoneOpen');

        if (phoneOpened && atmPage !== null) {
            atmPage.destroy();
            atmPage = null;
            alt.showCursor(false);
            alt.toggleGameControls(true);
            alt.emitServer("ATM:MenuClosed");
        } else {
            alt.clearInterval(phoneInterval)
        }
    }, 500);
}
alt.onServer("ATM:WantToUse", () => {
    let usage = false;
    atmProps.forEach((e) => {
        let a = native.getClosestObjectOfType(player.pos.x, player.pos.y, player.pos.z, 1, alt.hash(e), false, false, false);
        if (a !== 0) {
            usage = true;
            return;
        }
    });
    if (usage) alt.emitServer("ATM:CanUse");
    else alt.emitServer("ATM:NotNear");
});

alt.onServer("ATM:ShowLoginPage", () => {
    if (atmPage === null) {
        atmPage = new alt.WebView("http://resource/client/html/Bank/bKontoLogin.html");
        alt.showCursor(true);
        alt.toggleGameControls(false);
        atmPage.focus();
        atmPage.on('ATM:PassTry', (password) => {
            alt.emitServer('ATM:PassTry', password);
        });
        atmPage.on('load', () => {
            const player = alt.Player.local;
            let names = player.getStreamSyncedMeta('PlayerCharacterName').replace("_", " "); // -> Cone Anderson
            atmPage.emit('char:name', names);
        });
        atmPage.on('ATM:CloseLoginPage', () => {
            atmPage.destroy();
            atmPage = null;
            alt.showCursor(false);
            alt.toggleGameControls(true);
        });
    }
});
alt.onServer('ATM:ShowMainPage', (oName, tMoney) => {
    if (atmPage !== null) {
        atmPage.destroy();
        alt.showCursor(false);
        atmPage = new alt.WebView("http://resource/client/html/Bank/bterminal.html");
        alt.showCursor(true);
        alt.toggleGameControls(false);
        atmPage.focus();
    }
    let ownerName = oName;
    let TotalMoney = tMoney;
    atmPage.on('ATM:PageReady', () => {
        atmCanUse = true;
        alt.setTimeout(() => {
            atmPage.emit('ATM:PageUpdateInfo', ownerName, TotalMoney);
        }, 100);
    });
    atmPage.on('ATM:ClosePage', () => {
        atmPage.destroy();
        atmPage = null;
        alt.showCursor(false);
        alt.toggleGameControls(true);
        alt.emitServer("ATM:MenuClosed");
    });
    atmPage.on('ATM:WithdrawMoney', (money) => {
        if (atmCanUse) {
            atmCanUse = false;
            alt.emitServer("ATM:WithdrawMoney", money);
            checkPhoneisOpened()
        }
    });
    atmPage.on('ATM:DepositMoney', (money) => {
        if (atmCanUse) {
            atmCanUse = false;
            alt.emitServer("ATM:DepositMoney", money);
            checkPhoneisOpened()
        }
    });
    alt.onServer('ATM:MoneyUpdate', (money) => {
        atmPage.emit('ATM:UpdateMoney', money);
    });
});
alt.onServer('ATM:SetCardPin', () => {
    atmPage = new alt.WebView("http://resource/client/html/Bank/bKontoRegister.html");
    atmPage.focus();
    alt.toggleGameControls(false);
    alt.showCursor(true);
    atmPage.on('ATMPage:SetPIN', (pin) => {
        alt.emitServer('Bank:SetCardPin', pin);
    });
});
alt.onServer('ATM:PINPageClose', () => {
    if (atmPage !== null) {
        atmPage.destroy();
        atmPage = null;
        alt.showCursor(false);
        alt.toggleGameControls(true);
    }
});
alt.onServer('ATM:CanUsePage', () => {
    atmCanUse = true;
});
alt.on('keydown', (key) => {
    if (key === 114) {
        if (atmPage) {
            atmPage.destroy();
            atmPage = null;
            alt.showCursor(false);
            alt.toggleGameControls(true);
            alt.emitServer("ATM:MenuClosed");
        }
    }
});