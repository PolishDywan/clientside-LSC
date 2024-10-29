Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".mainContent",
    data () {
        return {
            currentVeh: 0,
            carList: [
                {
                    ID: 1,
                    model: "rumpo3",
                    name: "Bravado Rumpo Custom",
                    price: 22000,
                    inventoryCapacity: 780,
                    defaultTax: 22,
                    petrolTank: 75,
                    fuelConsumption: 2
                },
                {
                    ID: 2,
                    model: "rumpo4",
                    name: "Bravado Rumpo",
                    price: 22000,
                    inventoryCapacity: 780,
                    defaultTax: 22,
                    petrolTank: 75,
                    fuelConsumption: 2
                },
                {
                    ID: 3,
                    model: "rumpo5",
                    name: "Bravado ",
                    price: 22000,
                    inventoryCapacity: 780,
                    defaultTax: 22,
                    petrolTank: 75,
                    fuelConsumption: 2
                },
                {
                    ID: 4,
                    model: "rumpo6",
                    name: "Bra",
                    price: 22000,
                    inventoryCapacity: 780,
                    defaultTax: 22,
                    petrolTank: 75,
                    fuelConsumption: 2
                }, 
            ],
            speed: 150,
            breake: 2,
            horsePower: 20,
            rpm: 0.5
        };
    },
    methods: {
        close () {
            alt.emit("carCEF:CloseShop");
        },
        loadCarList (data) {
            let obj = JSON.parse(data);
            this.carList = obj;
        },
        updateCarStats (spd, brk, hpower, rp) {
            this.speed = spd * 5.2;
            this.breake = brk;
            this.horsePower = hpower;
            this.rpm = rp;
            console.log(this.speed + " " + this.breake + " " + this.horsePower + " " + this.rpm);
        },
        changeSelection (number) {
            if (this.currentVeh + number > this.carList.length - 1) {
                this.currentVeh = 0;
            } else if (this.currentVeh + number < 0) {
                this.currentVeh = this.carList.length - 1;
            } else {
                this.currentVeh += number;
            }
            alt.emit('carCEF:ChangeCar', this.carList[this.currentVeh].model);
        },
        buyCar () {
            alt.emit('carCEF:WantBuyCar', this.carList[this.currentVeh].ID);
        }
    },
    computed: {},
    mounted () {
        if ('alt' in window) {
            alt.emit('carCEF:Ready');
            alt.on('CarShop:LoadCarList', this.loadCarList);
            alt.on('CarShop:ShowCarStats', this.updateCarStats);
        }
    /*document.addEventListener("keyup", event => {
            if (event.isComposing || event.keyCode === 27) {
                this.close();
              return;
            }
        });*/ //[Object.keys(fruitObject)[Object.keys(fruitObject).length - 1]]
    //console.log(Object.keys(this.clothingList[this.charactersex].clothes[this.clothingType])[Object.keys(this.clothingList[this.charactersex].clothes[this.clothingType]).length - 1])
    }
});
