import alt from 'alt-client';
import native from 'natives';

alt.everyTick(() => {
    native.disableControlAction(0, 288, true)
});