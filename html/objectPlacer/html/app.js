const app = new Vue({
    el: '#app',
    data: ()=>({
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            screenPosition: {
                center: {},
                x: {},
                y: {},
                z: {}
            },
            positionEditor: {
                x: 0,
                y: 0,
                z: 0
            },
            lastSend: Date.now(),
            mouseDrag: {
                type: null,
                oldX: null,
                oldY: null
            },
            counter: 0.5
        }),
    mounted () {
        if ("alt" in window) {
            alt.on("view:interiorEditor:user:setData", this.placeData);
            alt.on("view:interiorEditor:user:setObjectList", this.placeObjectList);
            alt.on('view:interiorEditor:user:deselectObject', this.deSelectObject);
        }
    },
    methods: {
        createLine (p1, p2, color) {
            let x1 = p1.x - 0.2;
            let y1 = p1.y - 0.2;
            let x2 = p2.x - 0.2;
            let y2 = p2.y - 0.2;
            var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            var cy = y1 + length * Math.sin(angle * Math.PI / 180);
            var cx = x1 + length * Math.cos(angle * Math.PI / 180);
            return "padding:0px; margin:0px; height:7px; width: 7px; background-color:" + color + "; line-height:4px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg); z-index: 999";
        // return {
        //   length: length,
        //   angle: angle,
        //   cy: cy,
        //   cx: cx
        // };
        },
        slide (type, state) {
            this.mouseDrag.type = type;
            if (state) {
                window.addEventListener("mousemove", this.slideCalculte);
            } else {
                window.removeEventListener("mousemove", this.slideCalculte);
                this.mouseDrag.type = null;
                this.mouseDrag.oldX = null;
                this.mouseDrag.oldY = null;
            }
        },
        slideCalculte (e) {
            if (!this.mouseDrag.oldX || !this.mouseDrag.oldY) {
                this.mouseDrag.oldX = e.clientX;
                this.mouseDrag.oldY = e.clientY;
                return;
            }
            switch(this.mouseDrag.type){
                case 'x':
                    this.position.x = this.position.x + -(e.clientX - this.mouseDrag.oldX) / 100;
                    this.mouseDrag.oldX = e.clientX;
                    break;
                case 'y':
                    this.position.y = this.position.y + (e.clientY - this.mouseDrag.oldY) / 100;
                    this.mouseDrag.oldY = e.clientY;
                    break;
                case 'z':
                    this.position.z = this.position.z + -(e.clientY - this.mouseDrag.oldY) / 100;
                    this.mouseDrag.oldY = e.clientY;
                    break;
                default:
                    return;
            }
            this.setPosition();
        },
        scale (number) {
            return (number - 0.9) * (1 - 0) / (1 - 0.9);
        },
        placeData (data, screenCenter, screenX, screenY, screenZ) {
            this.model = data.model;
            this.scriptId = data.scriptId;
            this.position = data.position;
            this.rotation = data.rotation;
            this.screenPosition = {
                center: screenCenter,
                x: screenX,
                y: screenY,
                z: screenZ
            };
        },
        addObject () {
            if ("alt" in window) {
                alt.emit("view:interiorEditor:user:addObject", this.addModel);
            }
        },
        deleteObject (scriptId) {
            if ("alt" in window) alt.emit("view:interiorEditor:user:deleteObject", scriptId);
        },
        deSelectObject () {
            return;
        // this.model = null;
        // this.scriptId = null;
        // this.position = {
        //   x: 0,
        //   y: 0,
        //   z: 0,
        // };
        // this.rotation = {
        //   x: 0,
        //   y: 0,
        //   z: 0,
        // };
        // this.screenPosition = null;
        },
        setPosition () {
            if ('alt' in window) {
                alt.emit("view:interiorEditor:user:setPosition", this.scriptId, //this.position 
                {
                    x: this.position.x + this.positionEditor.x,
                    y: this.position.y + this.positionEditor.y,
                    z: this.position.z + this.positionEditor.z
                });
            }
        },
        sendPos (type, val) {
            console.log(val);
            switch(type){
                case 0:
                    if ('alt' in window) alt.emit('view:interiorEditor:user:calcPos', parseFloat(val), 0, 0);
                case 1:
                    if ('alt' in window) alt.emit('view:interiorEditor:user:calcPos', 0, parseFloat(val), 0);
                case 2:
                    if ('alt' in window) alt.emit('view:interiorEditor:user:calcPos', 0, 0, parseFloat(val));
                default:
                    return;
            }
        },
        setRotation () {
            if ('alt' in window) {
                alt.emit("view:interiorEditor:user:setRotation", this.scriptId, this.rotation);
            }
        },
        placeObjectList (data) {
            this.objectList = data;
        },
        clickAreaHandler () {
            if ("alt" in window) alt.emit("view:interiorEditor:user:clickHandler");
        },
        save () {
            if ("alt" in window) alt.emit("view:interiorEditor:user:save");
        },
        reset () {
            this.rotation.x = 0;
            this.rotation.y = 0;
            this.rotation.z = 0;
        },
        cancel () {
            if ("alt" in window) alt.emit("view:interiorEditor:user:cancel");
        }
    },
    watch: {
        "rotation.x": function() {
            this.setRotation();
        },
        "rotation.y": function() {
            this.setRotation();
        },
        "rotation.z": function() {
            this.setRotation();
        },
        "positionEditor.x": function() {
            this.setPosition();
        },
        "positionEditor.y": function() {
            this.setPosition();
        },
        "positionEditor.z": function() {
            this.setPosition();
        }
    }
});
