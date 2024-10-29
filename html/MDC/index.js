import * as alt from 'alt-client';
import * as native from 'natives';
let CEF = null;
let cursor = false;
alt.onServer('MDC:Open', (d1, d2)=>{
    CEF = new alt.WebView("http://resource/client/html/MDC/index.html");
    alt.showCursor(true);
    alt.toggleGameControls(false);
    CEF.focus();
    CEF.on("load", ()=>{
        alt.setTimeout(()=>{
            CEF.emit('MDC:ShowData:CallsList', d1);
            CEF.emit('MDC:ShowData:WantedList', d2);
        }, 500);
    });
    // Listener ON CEF
    CEF.on('MDC:DATA:Player', (name)=>{
        alt.emitServer("MDC:SearchPeople", name);
    });
    CEF.on('MDC:DATA:House', (hID)=>{
        alt.emitServer("MDC:SearchHouse", parseInt(hID));
    });
    CEF.on('MDC:DATA:Business', (bID)=>{
        alt.emitServer("MDC:SearchBusiness", parseInt(bID));
    });
    CEF.on('MDC:DATA:Plate', (plate)=>{
        alt.emitServer("MDC:VehicleSearch", plate);
    });
    CEF.on('MDC:DATA:Phone', (number)=>{
        alt.emitServer("MDC:SearchPhone", parseInt(number));
    });
    CEF.on('MDC:MarkPosition', (x, y)=>{
        native.setNewWaypoint(x, y);
    });
    CEF.on('MDC:WantedStatus', (id, newStatus)=>{
        alt.emitServer('MDC:WantedStatus', id, newStatus);
    });
    CEF.on('MDC:RemoveWanted', (id)=>{
        alt.emitServer('MDC:RemoveWanted', id);
    });
    CEF.on('MDC:JoinCall', (id, x, y)=>{
        native.setNewWaypoint(x, y);
        alt.emitServer('MDC:JoinCall', id);
    });
    CEF.on('MDC:RemoveCall', (id)=>{
        alt.emitServer('MDC:RemoveCall', id);
    });
    CEF.on('MDC:GetReports', (type)=>{
        alt.emitServer('MDC:GetReports', parseInt(type));
    });
    CEF.on('MDC:GetReport', (id_board)=>{
        alt.emitServer('MDC:GetReport', parseInt(id_board));
    });
    CEF.on('MDC:Close', closeMDC);
});
// Forum Events
alt.onServer('MDC:LoadReports', (data)=>{
    if (CEF) {
        CEF.emit('MDC:LoadReports', data);
    }
});
alt.onServer('MDC:LoadReport', (data)=>{
    if (CEF) {
        CEF.emit('MDC:LoadReport', data);
    }
});
// Forum Events End
alt.onServer('MDC:ShowData:Player', (data)=>{
    if (CEF) {
        CEF.emit('MDC:ShowData:Player', data);
    }
});
alt.onServer('MDC:ShowData:House', (data)=>{
    if (CEF) {
        CEF.emit('MDC:ShowData:House', data);
    }
});
alt.onServer('MDC:ShowData:Business', (data)=>{
    if (CEF) {
        CEF.emit('MDC:ShowData:Business', data);
    }
});
alt.onServer('MDC:ShowData:Phone', (data)=>{
    if (CEF) {
        CEF.emit('MDC:ShowData:Phone', data);
    }
});
alt.onServer('MDC:ShowVehicle', (data)=>{
    if (CEF) {
        CEF.emit('MDC:ShowData:Vehicle', data);
    }
});
// ARABA && WANTED LIST && 911 CALS
alt.onServer('MDC:ShowWantedList', (data)=>{
    if (CEF) {
        CEF.emit('MDC:ShowData:WantedList', data);
    }
});
alt.onServer('MDC:ShowCallList', (data)=>{
    CEF.emit('MDC:ShowData:CallsList', data);
});
function closeMDC() {
    CEF.destroy();
    CEF = null;
    alt.showCursor(false);
    alt.toggleGameControls(true);
    alt.emitServer('MDC:Close');
}
