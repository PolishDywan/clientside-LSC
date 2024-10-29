import * as alt from 'alt';
import * as native from 'natives';

/*

alt.onServer('text:playerAction', (player, msg) => {
    const interval = alt.setInterval(() => {
        drawText3d(
            `* ${msg} *`,
            player.pos.x,
            player.pos.y,
            player.pos.z + 0.4,
            0.4,
            4,
            255,
            255,
            255,
            255,
            true,
            false
        );
    }, 0);
    alt.setTimeout(() => {
        alt.clearInterval(interval);
    }, 5000);
});

alt.onServer('text:Animated', (text, duration) => {
    let pos = alt.Player.local.pos;
    let alpha = 255;
    const interval = alt.setInterval(() => {
        if (alpha <= 0) alpha = 0;
        alt.nextTick(() => {
            drawText3d(
                text,
                pos.x,
                pos.y,
                pos.z + 1,
                0.5,
                4,
                255,
                255,
                255,
                alpha,
                true,
                false
            );
        });
        pos.z += 0.0075;
        alpha -= 3;
    }, 0);
    alt.setTimeout(() => {
        alt.clearInterval(interval);
    }, duration);
});

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b];
}



export function drawText3d(
    msg,
    x,
    y,
    z,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    native.setDrawOrigin(x, y, z, 0);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);

    if (useOutline) native.setTextOutline();

    if (useDropShadow) native.setTextDropShadow();

    native.endTextCommandDisplayText(0, 0);
    native.clearDrawOrigin();
}

*/

export function draw3dText(x,y,z, name) {
    const [bol, _x, _y] = native.getScreenCoordFromWorldCoord(x,y,z);
    const camCord = native.getFinalRenderedCamCoord();
    const dist = native.getDistanceBetweenCoords(camCord.x,camCord.y,camCord.z, x, y, z, 1)


    if (dist > 20) return;

    let scale = (4.00001/dist) * 0.3
    if (scale > 0.2)
        scale = 0.2;


    const fov = (1/native.getGameplayCamFov())*100;
	scale = scale*fov;
  
    if (bol){
        native.setTextScale(scale, scale);
        native.setTextFont(0);
        native.setTextProportional(true);
        native.setTextColour(255, 255, 255, 255);
        native.setTextDropshadow(0, 0, 0, 0, 255);
        native.setTextEdge(2, 0, 0, 0, 150);
        native.setTextDropShadow();
        native.setTextOutline();
        native.setTextCentre(true);
        native.beginTextCommandDisplayText("STRING");
        native.addTextComponentSubstringPlayerName(`Item:\n ~w~${name} ~y~(2) `);
        native.endTextCommandDisplayText(_x,_y + 0.025);
    }

}

export function drawText2d(
    msg,
    x,
    y,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0,
    align = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    //native.setScriptGfxDrawOrder(layer);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);
    native.setTextJustification(align);

    if (useOutline) native.setTextOutline();

    if (useDropShadow) native.setTextDropShadow();

    native.endTextCommandDisplayText(x, y);
}
