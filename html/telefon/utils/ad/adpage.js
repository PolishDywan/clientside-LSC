Vue.component('tab-advertisement', {
    props: [
        "data"
    ],
    data () {
        return {
            selection: 0,
            active: false,
            title: "",
            isAdver: false
        };
    },
    methods: {
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
        clearAdd () {
            this.$root.$emit('clearAdd');
        },
        inspectPhoto (Title) {
            this.active = false;
            this.title = Title;
            this.isAdver = true;
        }
    },
    computed: {},
    template: `
    <div class="advertisement-main">
            <vs-dialog dark overflow-hidden v-model="isAdver">
            <template #header>
            <h4 class="not-margin">
                İçerik
            </h4>
            </template>


            <div class="con-content" style="width:100%;">
                <p style="word-wrap: break-word;"><i style="color:green;" class='bx bxs-diamond'></i>{{title}}</p>
            </div>
        </vs-dialog>
        <div class="advertisement-list-header">
        <h4>Reklamlar</h4>
        <div class="clear_ad"><button class="ad_clear_button" v-on:click="clearAdd">Temizle</button></div>
        </div>

        <div class="advertisement-list">
            <div class="item_main" v-if="data.advir" v-for="(ad,i) of data.advir" :key="i">
                <div class="ad_item_title" @click="inspectPhoto(ad.Title)"><p><i style="color:green;" class='bx bxs-diamond'></i>{{ad.Title}}</p></div>
                <div class="ad_item_button"><button class="ad_phone_button" v-on:click="callNumber(ad.Number)">{{ad.Number}}</button></div>
            </div>
        </div>

        
    </div>
    `
});
