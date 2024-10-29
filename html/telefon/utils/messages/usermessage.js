Vue.component('tab-usermessage', {
    props: [
        'data'
    ],
    data () {
        return {
            password: 'Password',
            show: false,
            message: '',
            marker: true,
            iconIndex: 0,
            icons: [
                'mdi-emoticon',
                'mdi-emoticon-cool',
                'mdi-emoticon-dead',
                'mdi-emoticon-excited',
                'mdi-emoticon-happy',
                'mdi-emoticon-neutral',
                'mdi-emoticon-sad',
                'mdi-emoticon-tongue', 
            ],
            active: false,
            rules: [
                (v)=>v.length <= 150 || 'Maximum 150 karakter'
            ],
            img: ""
        };
    },
    methods: {
        selectPage (id) {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', id);
        },
        toggleMarker () {
            this.marker = !this.marker;
        },
        clearMessage () {
            this.message = '';
        },
        resetIcon () {
            this.iconIndex = 0;
        },
        changeIcon () {
            this.iconIndex === this.icons.length - 1 ? this.iconIndex = 0 : this.iconIndex++;
        },
        sendMessage () {
            if (this.message.length >= 1 && this.message.length <= 150) {
                this.$root.$emit('playSound', 6);
                alt.emit('pCef:SendMessage', this.data.currentMessaging, this.message);
                this.message = '';
            } else {
                const noti = this.$vs.notification({
                    icon: "",
                    color: "danger",
                    position: "top-right",
                    title: "HATA",
                    text: "Mesaj Uzunluğu en fazla 150 karakter olabilir."
                });
            }
        },
        deleteMessage (number) {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:DeleteMessage', number);
            this.$root.$emit('selectPage', 4);
        },
        goBack () {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:GetMessageList');
            this.$root.$emit('selectPage', 4);
        },
        sendGPS () {
            alt.emit('pCef:SendGPS', this.data.currentMessaging);
            this.$root.$emit('playSound', 6);
        },
        setGPS (pos) {
            alt.emit('pCef:SetGPS', pos);
        },
        lookPhoto (link) {
            this.img = link;
            this.active = true;
        },
        PressEnter: function(e) {
            if (e.keyCode === 13) {
                console.log("Basıldı");
                this.sendMessage();
            } else if (e.keyCode === 50) {
                alert('@ was pressed');
            }
            this.log += e.key;
        },
        scrollToEnd () {
            var container = this.$el.querySelector("#Scroll_Message");
            container.scrollTop = container.scrollHeight;
        }
    },
    computed: {
        icon () {
            return this.icons[this.iconIndex];
        }
    },
    mounted () {
        var container = this.$el.querySelector("#Scroll_Message");
        container.scrollTop = container.scrollHeight;
    },
    template: `
    <div class="usermessage-content">

        <vs-dialog dark overflow-hidden v-model="active">
            <template #header>
            <h4 class="not-margin">
                Medya
            </h4>
            </template>


            <div class="con-content">
                <img :src="img" width="650px">
            </div>
        </vs-dialog>


        <div class="message-header">
            <div class="usermes goback" v-on:click="goBack">
            <img src="./img/backar.svg">
            </div>


               <div class="usermes name">{{ data.contactList.find(x => x.Number == data.currentMessaging) ? data.contactList.find(x => x.Number == data.currentMessaging).Name : data.currentMessaging }}</div>
                <div class="usermes delete" v-on:click="deleteMessage(data.currentMessaging)">
                      <i class='bx bxs-trash-alt' style="color:red;font-size:18px;"></i>
                </div>
        
        </div>

        <div id="Scroll_Message" class="usermessage-content" v-if="data.currentMessage" >
            <div class="m1" v-for="(m,i) of data.currentMessage.message" v-if="m.isOwner">
                <span v-if="m.type == 1">{{ m.text }}<br><span style="font-size: 8px; padding-top: 2px;">{{ m.DateTime.split('T')[0] + ' ' + m.DateTime.split('T')[1].split(':')[0] + ':' + m.DateTime.split('T')[1].split(':')[1] }}</span></span>
                <img :src="m.text" v-else-if="m.type == 2" width="150px" v-on:click="lookPhoto(m.text)">
                <vs-button icon color="facebook" v-else v-on:click="setGPS(m.text)">
                <i class='bx bx-map' style='pointer-events: none'></i>GPS
                </vs-button>                
            </div>

            <div class="m2" v-else>
                <span v-if="m.type == 1">{{ m.text }}<br><span style="font-size: 8px; padding-top: 2px;">{{ m.DateTime.split('T')[0] + ' ' + m.DateTime.split('T')[1].split(':')[0] + ':' + m.DateTime.split('T')[1].split(':')[1] }}</span></span>
                <img :src="m.text" v-else-if="m.type == 2" width="150px" v-on:click="lookPhoto(m.text)">
                <vs-button icon color="facebook" v-else v-on:click="setGPS(m.text)">
                <i class='bx bx-map' style='pointer-events: none'></i>GPS
                </vs-button>                
            </div>

        </div>

        <div class="usermessage-input">
        <img v-on:click="sendGPS" src="./img/gps.svg">
        <img v-on:click="selectPage(13)" src="./img/gallery.svg">
        <div class="input_area">
        <input class="send_mess" placeholder="Mesaj" maxlength="150" v-on:keyup="PressEnter" v-model="message">
        <button class="send_message" v-on:click="sendMessage"><img src="./img/gonder.svg"></button>
        </div>
        </div>

    </div>
    `
});
