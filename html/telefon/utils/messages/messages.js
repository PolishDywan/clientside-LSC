Vue.component('tab-messages', {
    props: [
        'data'
    ],
    data () {
        return {};
    },
    methods: {
        selectMessage (i) {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:SelectMessage', this.data.messageList[i].Number);
            this.data.currentMessaging = this.data.messageList[i].Number;
        },
        deleteMessage (i) {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:DeleteMessage', this.data.messageList[i].Number);
        },
        newMessage () {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', 12);
        },
        getContactName (number) {
            let name = this.data.contactList.find((x)=>x.Number == number);
            if (name) return name.Name;
            else return number;
        }
    },
    mounted () {
        alt.emit('pCef:GetMessageList');
    },
    computed: {},
    template: `
    <div class="messages-content">
        <div class="message-header">
            <h4>Mesajlar</h4>
            <div v-on:click="newMessage" class="add_messages"><span><i class='bx bx-plus' ></i> Yeni Mesaj</span></div>
        </div>

        <div class="message-list" v-if="data.messageList"> 
            <div class="message-list-item"  v-for="(m,i) of data.messageList" v-on:click="selectMessage(i)" v-on:click.right="deleteMessage(i)">
                <img class="messimg" src="./img/user.png" v-on:click="selectMessage(i)">
                <div class="messname" v-on:click="selectMessage(i)">{{ getContactName(m.Number) }}</div>         
            </div>
            
                    

        </div>
    </div>
    `
});
