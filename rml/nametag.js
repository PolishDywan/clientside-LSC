function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function addPlayer(entity) {
    return _addPlayer.apply(this, arguments);
}
function _addPlayer() {
    _addPlayer = _asyncToGenerator(function*(entity) {
        if (entity) {
            let ent = {
                entity: entity,
                name: entity.hasStreamSyncedMeta("PlayerCharacterName") ? entity.getStreamSyncedMeta("PlayerCharacterName") : "",
                tag_1: entity.hasSyncedMeta("NameTag1") ? entity.getSyncedMeta("NameTag1") : "",
                tag_2: entity.hasSyncedMeta("NameTag2") ? entity.getSyncedMeta("NameTag2") : "",
                freecam: entity.hasSyncedMeta("FREECAM") ? entity.getSyncedMeta("FREECAM") : false,
                rml: rmlDocument.createElement('div')
            };
            ent.rml.addClass('label');
            ent.rml.addClass("hide");
            
            
            nameTags[entity.id] = ent;
        }
    });
    return _addPlayer.apply(this, arguments);
}
function removePlayer(entity) {
    return _removePlayer.apply(this, arguments);
}
function _removePlayer() {
    _removePlayer = _asyncToGenerator(function*(entity) {
        // let ent = nameTags.find(x => x.entity == entity);
        // if (ent) {
        //     rmlContainer.removeChild(ent.rml);
        //     nameTags.splice(nameTags.indexOf(ent), 1);
        // }
        if (nameTags[entity.id]) {
            rmlContainer.removeChild(nameTags[entity.id].rml);
            delete nameTags[entity.id];
        }
    });
    return _removePlayer.apply(this, arguments);
}
function update(entity) {
    return _update.apply(this, arguments);
}
function _update() {
    _update = _asyncToGenerator(function*(entity) {
        // let index = nameTags.findIndex(x => x.entity == entity);
        // if (index != -1) {
        //     nameTags[index].name = entity.hasStreamSyncedMeta("PlayerCharacterName") ? entity.getStreamSyncedMeta("PlayerCharacterName") : "";
        //     nameTags[index].tag_1 = entity.hasSyncedMeta("NameTag1") ? entity.getSyncedMeta("NameTag1") : "";
        //     nameTags[index].tag_2 = entity.hasSyncedMeta("NameTag2") ? entity.getSyncedMeta("NameTag2") : "";
        //     let name = textColorizer(nameTags[index].tag_1) + "<br />" + textColorizer(nameTags[index].tag_2) + "<br />" + textColorizer(nameTags[index].name).replaceAll('_', ' ');
        //     nameTags[index].rml.innerRML = name
        // }
        if (entity.hasSyncedMeta('isInSpec')) {
            let check = nameTags[entity.id];
            if (check) {
                removePlayer(entity);
            }
        } else {
            let check1 = nameTags[entity.id];
            if (!check1) {
                addPlayer(entity);
            } else {
                let ent = nameTags[entity.id];
                if (ent) {
                    ent.name = entity.hasStreamSyncedMeta("PlayerCharacterName") ? entity.getStreamSyncedMeta("PlayerCharacterName") : "";
                    ent.tag_1 = entity.hasSyncedMeta("NameTag1") ? entity.getSyncedMeta("NameTag1") : "";
                    ent.tag_2 = entity.hasSyncedMeta("NameTag2") ? entity.getSyncedMeta("NameTag2") : "";
                    ent.freecam = entity.hasSyncedMeta("FREECAM") ? entity.getSyncedMeta("FREECAM") : false;
                    let name = textColorizer(ent.tag_1) + "<br />" + textColorizer(ent.tag_2) + "<br />" + textColorizer(ent.name).replaceAll('_', ' ');
                    ent.rml.innerRML = name;
                }
            }
        }
    });
    return _update.apply(this, arguments);
}
function positionCalculator(ent) {
    return _positionCalculator.apply(this, arguments);
}
function _positionCalculator() {
    _positionCalculator = _asyncToGenerator(function*(ent) {
        if (distance(ent.entity.pos, alt.Player.local.pos) >= 20) {
            if (!ent.rml.hasClass('hide')) ent.rml.addClass("hide");
            return;
        } else {
            if (ent.entity) {
                //if (ent.entity.valid) { if(ent.rml.hasClass('hide')) ent.rml.removeClass("hide"); } else { ent.rml.addClass("hide"); return; }            
                if (ent.freecam) {
                    if (!ent.rml.hasClass('hide')) ent.rml.addClass("hide");
                    return;
                }
                if (!natives.hasEntityClearLosToEntity(ent.entity.scriptID, alt.Player.local.scriptID, 17)) {
                    if (!ent.rml.hasClass('hide')) ent.rml.addClass("hide");
                    return;
                }
                if (!natives.isSphereVisible(ent.entity.pos.x, ent.entity.pos.y, ent.entity.pos.z, 1)) {
                    if (!ent.rml.hasClass('hide')) ent.rml.addClass("hide");
                    return;
                }
                if (ent.rml.hasClass('hide')) ent.rml.removeClass("hide");
                const vector = natives.getEntityVelocity(ent.entity.vehicle ? ent.entity.vehicle.scriptID : ent.entity.scriptID);
                const frameTime = natives.getFrameTime();
                const xPos = [
                    ent.entity.pos.x + vector.x * frameTime,
                    ent.entity.pos.y + vector.y * frameTime,
                    ent.entity.pos.z + vector.z * frameTime
                ];
                const screen = alt.worldToScreen(xPos[0], xPos[1], xPos[2] + 1.2);
                if (screen) {
                    let left = screen.x - ent.rml.clientWidth / 2;
                    let top = screen.y - ent.rml.clientHeight / 2;
                    ent.rml.setProperty("left", `${left}px`);
                    ent.rml.setProperty("top", `${top}px`);
                }
            }
        }
    });
    return _positionCalculator.apply(this, arguments);
}
function hideAll() {
    return _hideAll.apply(this, arguments);
}
function _hideAll() {
    _hideAll = _asyncToGenerator(function*() {
        // nameTags.forEach(x => {
        //     if(!x.rml.hasClass('hide'))
        //         x.rml.addClass("hide")
        // });
        for(let x in nameTags){
            if (!nameTags[x].rml.hasClass('hide')) nameTags[x].rml.addClass("hide");
        }
    });
    return _hideAll.apply(this, arguments);
}
function textColorizer(text) {
    // like: ~r~ => red (in colorList), ~b~ => blue;
    // like: ~n~ new line;
    // regex text to colorize like <span style="color: colorList match">text</span>
    let colorList = {
        "r": "color-red",
        "b": "color-blue",
        "g": "color-green",
        "y": "coloryellow",
        "p": "color-purple",
        "q": "color-pink",
        "c": "color-gray",
        "o": "color-orange",
        "w": "color-white"
    };
    // Text: ~r~Naber canım ~b~nasılsın?
    // Result: <span class="color-red">Naber canım </span><span class="color-blue">nasılsın?</span>
    // Text: ~b~Se~r~LAM
    // Result: <span class="color-blue">Se</span><span class="color-red">LAM</span>
    // Text: ~b~selam~n~naber?
    // result: <span class="color-blue">selam</span><br /><span class="color-blue">naber?</span>
    // Algorithm: Split text by ~x~, then for each part, check if it's in colorList, if so, add color class to it. Then join the parts back together. and add </span> to the end.
    let parts = text.split("~");
    let result = "";
    let counter = 0;
    for(let i = 0; i < parts.length; i++){
        if (i % 2 == 0) {
            result += parts[i];
        } else {
            if (colorList[parts[i]]) {
                result += `<span class="${colorList[parts[i]]}">`;
                counter++;
            } else if (parts[i] == "n") {
                result += "<br />";
            } else {
                result += `${parts[i]}`;
            }
        }
    }
    for(let i1 = 0; i1 < counter; ++i1){
        result += "</span>";
    }
    // let colorRegex = /~([rbgypqc])~/g;
    // let colorReplace = (match, color) => {
    //     console.log(`<span class="${colorList[color]}">${match.replace('~' + color + '~', '')}</span>`);
    //     return `<span class="${colorList[color]}">${match.replace('~' + color + '~', '')}</span>`;
    // }
    // // ~n~ => <br>
    // let newLineRegex = /~n~/g;
    // let newLineReplace = (match) => {
    //     return `<br />`;
    // }
    // return result 
    return result;
}
function handle() {
    return _handle.apply(this, arguments);
}
function _handle() {
    _handle = _asyncToGenerator(function*() {
        //alt.setMeta("player:NameTag", false);
        if (!alt.getMeta('player:Nametag')) {
            //nameTags.forEach(x => positionCalculator(x));
            for(let x in nameTags){
                yield positionCalculator(nameTags[x]);
            }
        } else {
            hideAll();
        }
    });
    return _handle.apply(this, arguments);
}