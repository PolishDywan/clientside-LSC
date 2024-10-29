import alt from 'alt-client';
import * as native from 'natives';

const drawDistance = 15;

export function drawNametags() {
    if (alt.getMeta("player:Nametag")) {
        return;
    }

    const streamedIn = alt.Player.streamedIn;

    for (let i = 0, n = streamedIn.length; i < n; i++) {
        const player = streamedIn[i];

        if (!player && !player.valid)
            continue;

        if (player.scriptID === alt.Player.local.scriptID)
            continue;

        const name = player.getStreamSyncedMeta("PlayerCharacterName").replace('_', ' ')

        if (!name) {
            continue;
        }

        const secondTag = player.getSyncedMeta("NameTag2");
        const thirdTag = player.getSyncedMeta("NameTag1");

        native.requestPedVisibilityTracking(player.scriptID);

        if (!native.isTrackedPedVisible(player.scriptID)) {
            continue;
        }

        const dist = alt.Player.local.pos.distanceTo(player.pos);
        if (dist > drawDistance) {
            continue;
        }

        const scale = 0.35 - dist * 0.01;
        const pos = native.getPedBoneCoords(player.scriptID, 31086, 0.0, 0.0, 0.0);

        drawText3d(name,
            pos.x, pos.y, pos.z + 0.55,
            scale, 255, 255, 255, 255, true, 0.038 * (-scale), true, player);


        if (secondTag) {
            drawText3d(turkishCharToEng(secondTag),
                pos.x, pos.y, pos.z + 0.70,
                scale, 255, 255, 255, 255, true, 0.038, true, player);
        }

        if (thirdTag) {
            drawText3d(turkishCharToEng(thirdTag),
                pos.x, pos.y, pos.z + 0.75,
                scale, 255, 255, 255, 255, true, 0.038, true, player);
        }
    }
}

function drawText3d(text, x, y, z, scale, r, g, b, a, outline, offset, lagcomp, lagcompEntity) {
    // If lagcomp is enabled and the lagcomp entity is in a vehicle.
    if (lagcomp === true && lagcompEntity.vehicle !== null) {
        const vector = native.getEntityVelocity(lagcompEntity.vehicle);
        const frameTime = native.getFrameTime();

        native.setDrawOrigin(x + (vector.x * frameTime), y + (vector.y * frameTime), z + (vector.z * frameTime), 0);
    } else native.setDrawOrigin(x, y, z, 0);

    const fontSize = 0.34;

    native.beginTextCommandDisplayText('STRING');
    native.setTextFont(4);
    native.setTextScale(fontSize, fontSize);
    native.setTextProportional(true);
    native.setTextCentre(true);
    native.setTextColour(255, 255, 255, 255);
    native.setTextOutline();
    native.addTextComponentSubstringPlayerName(`${text}`);
    native.endTextCommandDisplayText(0, 0, 0);

    native.clearDrawOrigin();
}

alt.on("connectionComplete", () => {
    alt.everyTick(drawNametags);
})


function turkishCharToEng(message) {
    return message.replace('Ğ', 'g')
        .replace('Ü', 'u')
        .replace('Ş', 's')
        //.replace('I', 'i')
        .replace('İ', 'I')
        //.replace('Ö', 'o')
        //.replace('Ç', 'c')
        .replace('ğ', 'g')
        .replace('ü', 'u')
        .replace('ş', 's')
        //.replace('ı', 'i')
        .replace('ö', 'o')
    //.replace('ç', 'c');
}