function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: '#app',
    data () {
        return {
            show: false,
            showA: false,
            showB: false,
            selection: 0,
            data: {
                sex: 0,
                faceFather: 33,
                faceMother: 45,
                skinFather: 45,
                skinMother: 45,
                faceMix: 0.5,
                skinMix: 0.5,
                structure: new Array(20).fill(0),
                hair: 11,
                hairColor1: 5,
                hairColor2: 2,
                hairOverlay: '',
                facialHair: 29,
                facialHairColor1: 62,
                facialHairOpacity: 0,
                eyebrows: 0,
                eyebrowsOpacity: 1,
                eyebrowsColor1: 0,
                eyes: 0,
                opacityOverlays: [],
                colorOverlays: []
            },
            navOptions: [
                'Sex',
                'Structure',
                'Hair',
                'Overlays',
                'Decor',
                'Done'
            ]
        };
    },
    computed: {
        isInactiveNext () {
            if (this.selection >= this.navOptions.length - 1) {
                return {
                    inactive: true
                };
            }
            return {
                inactive: false
            };
        },
        isInactiveBack () {
            if (this.selection <= 0) {
                return {
                    inactive: true
                };
            }
            return {
                inactive: false
            };
        },
        getTabComponent: function() {
            return `tab-${this.navOptions[this.selection].toLowerCase()}`;
        }
    },
    methods: {
        setReady () {
            if (this.show) {
                return;
            }
            this.show = true;
            if ('alt' in window) {
                alt.emit('character:ReadyDone');
            }
        },
        setData (oldData) {
            if (!oldData) {
                this.updateCharacter();
                return;
            }
            this.data = oldData;
            this.updateCharacter();
        },
        goNext () {
            if (this.selection >= this.navOptions.length - 1) {
                return;
            }
            this.selection += 1;
        },
        goBack () {
            if (this.selection <= 0) {
                return;
            }
            this.selection -= 1;
        },
        goCancel () {
            alt.emit('character:Cancel');
        },
        goConfirm () {
            alt.emit('character:Done', this.data);
        },
        updateCharacter () {
            const isFemale = this.data.sex === 0;
            this.data.hairOverlay = isFemale ? femaleHairOverlays[this.data.hair] : maleHairOverlays[this.data.hair];
            if (isFemale) {
                this.data.facialHair = 30;
                this.data.facialHairOpacity = 0;
            }
            // Update Floats
            this.data.skinMix = parseFloat(this.data.skinMix);
            this.data.faceMix = parseFloat(this.data.faceMix);
            if ('alt' in window) {
                alt.emit('character:Sync', this.data);
            }
        },
        resetSelection () {
            this.selection = 0;
        }
    },
    mounted () {
        this.$root.$on('updateCharacter', this.updateCharacter);
        this.$root.$on('resetSelection', this.resetSelection);
        opacityOverlays.forEach((overlay)=>{
            const overlayData = _objectSpread({}, overlay);
            overlayData.value = 0;
            delete overlayData.key;
            delete overlayData.max;
            delete overlayData.min;
            delete overlayData.label;
            delete overlayData.increment;
            this.data.opacityOverlays.push(overlayData);
        });
        colorOverlays.forEach((overlay)=>{
            const overlayData = _objectSpread({}, overlay);
            overlayData.value = 0;
            delete overlayData.key;
            delete overlayData.max;
            delete overlayData.min;
            delete overlayData.label;
            delete overlayData.increment;
            this.data.colorOverlays.push(overlayData);
        });
        //  if(this.showA) this.selection = 2;
        if ('alt' in window) {
            alt.on('character:Ready', this.setReady);
            alt.on('character:Hair', ()=>{
                this.selection = 2;
                this.showA = true;
            });
            alt.on('character:SetData', this.setData);
            alt.on('character:Decor', ()=>{
                this.selection = 4;
                this.showB = true;
            });
        } else {
            this.show = true;
        }
    }
});
