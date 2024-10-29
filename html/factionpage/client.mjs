import alt from 'alt';
import * as game from 'natives';



let CEF = null;

alt.onServer('FactionBrowser:Show', (_fData, _fCars, _fMembers) => {
    CEF = new alt.WebView('http://resource/client/html/factionpage/html/index2.html');

    CEF.focus();
    alt.showCursor(true);
    alt.toggleGameControls(false);
    CEF.on('FactionBrowser:Ready', () => {
        alt.setTimeout(() => { 
            CEF.emit('FCEF:Update', _fData, _fCars, _fMembers);
         }, 500);
    })

    CEF.on('FactionBrowser:UpdateMemberRank', (member, rank) => {
        alt.emitServer('FactionBrowser:UpdateMemberRank', member, rank);
    })

    CEF.on('FactionBrowser:KickPlayer', (member) => {
        alt.emitServer('FactionBrowser:KickPlayer', member);
    })

    CEF.on('FactionBrowser:EditRank', (id, name, payday, usecar, usevault, usepayday, useinvite, usekick, userank) => {
        let _s = {};
        _s.Rank = id;
        _s.RankName = name;
        _s.Payday = payday;
        _s.permission = {};
        let perm = {};
        perm.canUseCar = usecar;
        perm.canUseVault = usevault;
        perm.canUsePayday = usepayday;
        perm.canUseInvite = useinvite;
        perm.canUseKick = usekick;
        perm.canUseRank = userank;   
        _s.permission = perm;
        
        let sData = JSON.stringify(_s);
        alt.log(sData);
        alt.emitServer('FactionBrowser:EditRank', sData);
    })

    CEF.on('FactionBrowser:RemoveRank', (id) => {
        alt.emitServer('FactionBrowser:RemoveRank', parseInt(id));
    })

    CEF.on('FactionBrowser:OOCChat', (state) => {
        alt.emitServer('FactionBrowser:OOCChat', state);
    })

    CEF.on('FactionBrowser:Close', () => {
        CEF.destroy();
        CEF = null;
        alt.showCursor(false);
        alt.toggleGameControls(true);
    })
})


alt.onServer('FactionBrowser:Update', (_fData, _fCars, _fMembers) => {    
    if(_fData === null)
        _fData= {};

    if(_fCars === null)
        _fData = {};

    if(_fMembers === null)
        _fMembers = {};
        
    CEF.emit('FCEF:Update', _fData, _fCars, _fMembers);
})
