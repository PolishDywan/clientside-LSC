Vue.component('tab-newmessage', {
    props: [
        'data'
    ],
    data () {
        return {
            number: 0
        };
    },
    methods: {
        sendMessageNumber (number) {
            this.$root.$emit('playSound', 6);
            this.data.currentMessaging = parseInt(number);
            alt.emit('pCef:SelectMessage', parseInt(number));
            this.$root.$emit('selectPage', 5);
        }
    },
    computed: {},
    template: `
    <div class="messages-content">
        <div class="message-header">
        <h4>Yeni Mesaj</h4>
        </div>

        <div class="newmessage">
        <input class="new_message_input" v-model="number"></input>
            <button class="new_message_button" v-on:click="sendMessageNumber(number)"><b v-on:click="sendMessageNumber(number)">Gönder</b></button>
            <h5>Rehber</h5>
            <div class="fastMessage" v-for="(m,i) of data.contactList">
                <div class="fastMessage-name" v-on:click="sendMessageNumber(m.Number)"><i class='bx bxs-user-detail' v-on:click="sendMessageNumber(m.Number)"></i>
                    <b>{{m.Name}}</b>
                </div>
            </div>
        </div>
    </div>
    `
});
