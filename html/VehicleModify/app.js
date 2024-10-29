Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".mainContent",
    data () {
        return {
            tuningData: [
                {
                    id: 0,
                    name: "Spoiler",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 1,
                    name: "Front Bumper",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 2,
                    name: "Rear Bumper",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 3,
                    name: "Side skirt",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 4,
                    name: "Exhaust",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 5,
                    name: "Frame",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 6,
                    name: "Grille",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 7,
                    name: "Bonnet",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 8,
                    name: "Wing (Left wing)",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 9,
                    name: "Right wing",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 10,
                    name: "Roof",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 12,
                    name: "Brakes",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 13,
                    name: "Transmission",
                    maxTuning: 1,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 14,
                    name: "Horns",
                    maxTuning: 1,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 15,
                    name: "Suspension",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 16,
                    name: "Armor",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 18,
                    name: "Turbo",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 22,
                    name: "Xenon",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 23,
                    name: "Front Wheels",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 24,
                    name: "Back Wheels",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 25,
                    name: "Plate holders",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 26,
                    name: "Plate vanity",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 27,
                    name: "Trim Design",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 28,
                    name: "Ornaments",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 30,
                    name: "Dial Design",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 31,
                    name: "Door interior",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 32,
                    name: "Seats",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 33,
                    name: "Steering Wheel",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 34,
                    name: "Shift Lever",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 35,
                    name: "Plaques",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 36,
                    name: "Rear shelf",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 37,
                    name: "Trunk",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 38,
                    name: "Hydraulics",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 39,
                    name: "Engine block",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 40,
                    name: "Air filter",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 41,
                    name: "Strut bar",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 42,
                    name: "Arch Cover",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 43,
                    name: "Antenna",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 44,
                    name: "Exterior parts",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 45,
                    name: "Tank",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 46,
                    name: "Door",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                },
                {
                    id: 48,
                    name: "Livery",
                    maxTuning: 0,
                    currentTuning: 0,
                    oldTuning: 0
                }
            ],
            oldTuning: {
                windowTint: 0,
                standartModifiy: [
                    {
                        ID: 1,
                        Value: 1
                    }
                ],
                vehColors: {
                    dashBoard: 0,
                    headLight: 0,
                    interior: 0,
                    neon: {
                        R: 0,
                        G: 0,
                        B: 0,
                        A: 0
                    },
                    pearl: 0,
                    tire: {
                        R: 0,
                        G: 0,
                        B: 0,
                        A: 0
                    },
                    Wheel: 0
                }
            }
        };
    },
    methods: {
        close () {
            alt.emit("carCEF:CloseShop");
        },
        maxTuningSet (id, maxTuning, currentTuning) {
            let tuning = this.tuningData.find((x)=>x.id == id);
            if (tuning) {
                tuning.maxTuning = maxTuning;
                tuning.currentTuning = currentTuning;
                tuning.oldTuning = currentTuning;
            }
        },
        changeModify (id, number) {
            let tune = this.tuningData.find((x)=>x.id == id);
            if (tune) {
                if (tune.currentTuning + number > tune.maxTuning) {
                    tune.currentTuning = 0;
                } else if (tune.currentTuning + number < 0) {
                    tune.currentTuning = tune.maxTuning;
                } else {
                    tune.currentTuning += number;
                }
                alt.emit('Vehicle:TryModify', tune.id, tune.currentTuning);
            }
        },
        changeColorID (type, newColor) {
            switch(type){
                case 1:
                    this.oldTuning.windowTint += newColor;
                    alt.emit('Vehicle:WindowTint', this.oldTuning.windowTint);
                    break;
                case 2:
                    this.oldTuning.dashBoard += newColor;
                    alt.emit('Vehicle:Color:dashBoard', this.oldTuning.dashBoard);
                    break;
                case 3:
                    this.oldTuning.headLight += newColor;
                    alt.emit('Vehicle:Color:headLight', this.oldTuning.headLight);
                    break;
                case 4:
                    this.oldTuning.interior += newColor;
                    alt.emit('Vehicle:Color:interior', this.oldTuning.interior);
                    break;
                case 5:
                    break;
                case 6:
                    this.oldTuning.pearl += newColor;
                    alt.emit('Vehicle:Color:pearl', this.oldTuning.pearl);
                    break;
                case 7:
                    break;
                case 8:
                    this.oldTuning.Wheel += newColor;
                    alt.emit('Vehicle:Color:Wheel', this.oldTuning.Wheel);
                    break;
                default:
                    return;
            }
        }
    },
    computed: {},
    mounted () {
        if ('alt' in window) {
            alt.emit('Vehicle:TuningReady');
            alt.on('Tuning:SetMaxTuningValue', this.maxTuningSet);
        }
    /*document.addEventListener("keyup", event => {
            if (event.isComposing || event.keyCode === 27) {
                this.close();
              return;
            }
        });*/ }
});
