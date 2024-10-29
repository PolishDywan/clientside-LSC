import * as alt from 'alt';
import * as native from 'natives';

export function wait(ms) {
    return new Promise(resolve => alt.setTimeout(resolve, ms));
}

export function drawLongText(text, x, y, scale = 0.3, fontType, r, g, b, a, useOutline = true, useDropShadow = true, center = false) {
    native.setTextFont(fontType);
    native.setTextProportional(false);
    native.setTextScale(scale, scale);
    native.setTextColour(r, g, b, a);
    native.setTextEdge(2, 0, 0, 0, 150);

    if(useOutline) { 
        native.setTextOutline();
    }
    if(useDropShadow) {
        native.setTextDropshadow(0, 0, 0, 0, 255);
        native.setTextDropShadow();
    }

    native.setTextCentre(center);
    native.beginTextCommandDisplayText("CELL_EMAIL_BCON");

    text.match(/.{1,99}/g).forEach(textBlock => {
        native.addTextComponentSubstringPlayerName(textBlock);
    });
    native.endTextCommandDisplayText(x, y, 0.0);
}

export async function ShowIconNotification(
    message,
    title,
    subtitle,
    icon,
    color = undefined,
    blink = false
) {    
    if (icon != null) {
        let pedHeadshot = native.registerPedheadshot(icon.scriptID);
        icon = await loadPlayerHead(pedHeadshot);
    }

    native.beginTextCommandThefeedPost('CELL_EMAIL_BCON');

    native.addTextComponentSubstringPlayerName(message);


    if (icon) native.endTextCommandThefeedPostMessagetext(icon, icon, false, 0, title, subtitle);
    if (color) native.thefeedSetNextPostBackgroundColor(color);
    native.endTextCommandThefeedPostTicker(blink, false);

    native.unregisterPedheadshot(alt.Player.local.scriptID);
}

function loadPlayerHead(pedHeadshot) {
    return new Promise(resolve => {
        let interval = alt.setInterval(() => {
            if (native.isPedheadshotReady(pedHeadshot) && native.isPedheadshotValid(pedHeadshot)) {
                alt.clearInterval(interval);
                return resolve(native.getPedheadshotTxdString(pedHeadshot));
            }
        }, 0);
    });
}

export function getClosestVehicle() {
    let closestVehicle = null;
    let lastDistance = 10;
    alt.Vehicle.all.forEach((v) => {
        let distance = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, v.pos.x, v.pos.y, v.pos.z, false);
        if (distance < lastDistance) {
            closestVehicle = v;
            lastDistance = distance;
        }
    });
    return closestVehicle;
}

export function drawSubtitle(text, duration) {
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}