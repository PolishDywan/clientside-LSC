Vue.component('tab-sendmoney', {
    props: [
        'data'
    ],
    data() {
        return {
            value1: 0,
            value2: 0,
            value3: 0,
            connectionStatus: true
        };
    },
    methods: {
        sendMoney() {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:SendMoney', this.value1, this.value2, this.value3);
            this.$root.$emit('selectPage', 0);
        },
        selectPage(id) {
            this.$root.$emit('selectPage', id);
        }
    },
    computed: {},
    template: `
    <div class="bank-sendmoney">
        <div class="contact-list-header">
            <div class="bank_send_header">
            <div class="usermes goback" v-on:click="selectPage(10)">
            <img v-on:click="selectPage(10)" src="./img/backar.svg">
            </div>
            <h4>Para Gonder</h4>
            </div>
        </div>
        
        <div class="sendmoney-content" justify="space-around" direction="column">
            
            <vs-select placeholder="Hesabınızı seçin" v-model="value1" class="m1"  >
                <vs-option v-for="(ac,i) of this.data.bankAccount" :label="ac.accountNo" :value="ac.accountNo">
                    {{ac.accountNo}} <b>- $</b>{{ac.accountMoney}}
                </vs-option>
            </vs-select>

            <vs-input type="number" v-model="value2" placeholder="Alıcı H.No" class="m2" label="Alıcı H.No">
                <template #message-success>
                Alıcı Hesap Numarası
                </template>
            </vs-input>

            <vs-input type="number" v-model="value3" placeholder="Gönderilecek Miktar" class="m3" label="Gönderilecek Miktar">
            <template #message-success>
                Gönderilecek Miktar
                </template>
            </vs-input>


            <vs-button success class="m4" v-on:click="sendMoney"><b>Gönder</b></vs-button>
        </div>

    </div>
    `
});