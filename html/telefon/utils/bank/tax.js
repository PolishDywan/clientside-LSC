Vue.component('tab-tax', {
    props: [
        'data'
    ],
    data () {
        return {
            carList: undefined,
            selectedCar: 0,
            selectedAccount: 0
        };
    },
    methods: {
        sendMoney () {
            if (this.selectedAccount === undefined) return;
            if (this.selectedCar === 0) return;
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:PayVehicleTax', this.selectedCar, this.selectedAccount);
            this.$root.$emit('selectPage', 0);
        },
        selectPage (id) {
            this.$root.$emit('selectPage', id);
        },
        updateCarList (data) {
            this.carList = JSON.parse(data);
        }
    },
    computed: {},
    mounted () {
        alt.emit('pCef:getCarList');
        if ('alt' in window) {
            alt.on('pCef:UpdateCarList', this.updateCarList);
        }
    },
    template: `
    <div class="bank-sendmoney">
        <div class="contact-list-header">
            <div class="bank_send_header">
            <div class="usermes goback" v-on:click="selectPage(10)">
            <img v-on:click="selectPage(10)" src="./img/backar.svg">
            </div>
            <h4>Vergi Öde</h4>
            </div>
        </div>
        
        <div class="sendmoney-content" justify="space-around" direction="column" v-if="this.data.bankAccount && this.carList">
            
            <vs-select placeholder="Ödeme Hesabı" v-model="selectedAccount" class="m1"  >
                <vs-option v-for="(ac,i) of this.data.bankAccount" :label="ac.accountNo" :value="ac.accountNo">
                    {{ac.accountNo}} <b>- $</b>{{ac.accountMoney}}
                </vs-option>
            </vs-select>

            <vs-select placeholder="Araç" v-model="selectedCar" class="m1"  >
                <vs-option v-for="(bv,i) of this.carList" :label="bv.Plate" :value="bv.ID">
                    P: {{bv.Plate}} | C: <b>- $</b>{{bv.Tax}}
                </vs-option>
            </vs-select>


            <vs-button success class="m4" v-on:click="sendMoney"><b v-on:click="sendMoney">Hepsini Öde</b></vs-button>
        </div>

    </div>
    `
});
