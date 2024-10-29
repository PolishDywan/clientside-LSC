Vue.component('tab-bankmain', {
    props: [
        'data'
    ],
    data () {
        return {};
    },
    methods: {
        taxpay () {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', 18);
        },
        makePayment () {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', 11);
        },
        selectPage (id) {
            this.$root.$emit('selectPage', id);
        }
    },
    mounted () {
        alt.emit('pCef:getbankAccounts');
    },
    computed: {},
    template: `
    <div class="bank-main">
        <div class="contact-list-header">
        <h4>Bank</h4>
        </div>
        

        <div class="bank-content" v-if="data.bankAccount">
            <div class="bank-account"  v-for="ac of this.data.bankAccount"><div class="bankimg"><i class='bx bx-dollar'></i></div>
                <p>Hesap No: {{ ac.accountNo }}</h4></p>
                <p>Para: <b>$</b>{{ ac.accountMoney }}</p>
                <i class='bx bx-check-double' style="font-size:25px;position: absolute; margin-left:150px; margin-top:-31px;"></i>
            </div>
        </div>

        <div class="bank-buttons">
        
        <div class="bank_button" v-on:click="makePayment">Havale</div>
        <div class="bank_button" v-on:click="taxpay">Vergiler</div>
        </div>
    </div>
    `
});
