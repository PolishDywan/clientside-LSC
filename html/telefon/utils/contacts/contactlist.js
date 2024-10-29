Vue.component('tab-contactlist', {
    props: [
        'data'
    ],
    data () {
        return {};
    },
    methods: {
        addNewContact () {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', 7);
        },
        callNumber (number) {
            alt.emit('pCef:Call', parseInt(number));
            this.data.currentCall.callTarget = parseInt(number);
            let callData = this.data.contactList.find((x)=>x.Number == parseInt(number));
            if (callData) {
                this.data.currentCall.callTargetName = callData.Name;
            } else {
                this.data.currentCall.callTargetName = "";
            }
            this.data.currentCall.Status = 0;
            this.$root.$emit('selectPage', 3);
            this.$root.$emit('playSound', 6);
        },
        messageNumber (number) {
            this.data.currentMessaging = parseInt(number);
            alt.emit('pCef:SelectMessage', parseInt(number));
            this.$root.$emit('selectPage', 5);
            this.$root.$emit('playSound', 6);
        },
        selectPage (id) {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', id);
        },
        removeContact (number) {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:RemoveContact', number);
        }
    },
    computed: {},
    template: `
    <div class="contact-content">
        <div class="contact-list-header">
                <h4>Rehber</h4>
                <div class="add_new_cont" v-on:click="addNewContact">
                <span><i class='bx bx-plus' ></i> Kisi Ekle</span>
            </div>
        </div>

        <div class="contact-list" v-if="data.contactList">
            <div class="list_area">
            <div class="contact-list-item" v-for="(c,i) of data.contactList" v-on:click.middle="removeContact(c.Number)">
                <div class="textroom" style="width:20%;"><img src="./img/user.png"class="contactlogo"></div>
               <div class="textroom" style="width:30%;">{{ c.Name }}</div>
               <div class="textroom" style="color: rgb(255, 255, 255);margin-top: 9%;font-size: 14px;position: relative;margin-left: -30%;">{{ c.Number }}</div>
               <div class="textroom" style="width:30%;float:right;"><img v-on:click="callNumber(c.Number)" style="width:28px;margin-left:5px;" src="./img/con1.svg"><img  v-on:click="messageNumber(c.Number)" style="width:24px;margin-left:5px;" src="./img/con2.svg"></div>
            </div>
            </div>            
        </div>

    </div>
    `
});
