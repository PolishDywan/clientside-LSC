import alt from 'alt-client';
import native from 'natives';
alt.onServer('TaxiMeter:Calc', (price)=>{
    if (native.isWaypointActive()) {
        let waypoint = native.getFirstBlipInfoId(8);
        let coords = native.getBlipInfoIdCoord(waypoint);
        alt.emitServer('TaxiMeter:CallBackCalc', coords, price);
    } else {
        alt.emitServer('TaxiMeter:CallBackErr');
    }
});
