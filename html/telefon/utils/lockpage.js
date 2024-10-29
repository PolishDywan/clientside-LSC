function animations() {
    document.getElementById("Lockpage").style.transition = "0.5s";
    document.getElementById("Lockpage").style.marginTop = "-100px";
    document.getElementById("Lockpage").style.opacity = "0";
}
Vue.component('tab-lockpage', {
    props: [
        'data'
    ],
    methods: {
        selectPage (id) {
            this.$root.$emit('playSound', 9);
            setTimeout(()=>{
                this.$root.$emit('selectPage', id);
                this.data.notificati = [];
            }, 450);
        }
    },
    computed: {
        getTabComponent () {
            let today = new Date();
            return (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
        },
        getDate: function() {
            var today = new Date();
            return (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + "." + (today.setMonth(today.getMonth() + 1) < 10 ? "0" + today.getMonth() : today.getMonth()) + "." + today.getFullYear();
        }
    },
    template: `
    <div id="Lockpage" class="lockpage-content" v-bind:style="{ 'background-image': 'url(' + this.data.settings.paper + ')' }">
    <div class="lock_top_area">
        <div class="time">{{ this.getTabComponent }}</div>
        <div class="date">{{ this.getDate }}</div>
    </div>
    <div class="lock_notifi" >
        <div class="noitif_item" v-if="data.notificati" v-for="(ac,i) of data.notificati" :key="i">
        <h4><i style="color:green;"class='bx bx-message-square-detail'></i> {{ac.Title}}</h4>
        <h5>{{ac.Owner}}</h5>
        </div>
    </div>
    <div class="lock_bottom_area">
    <div class="lock_icon_area">
    <div class="icon_1"><img src="./img/icon1.png"></div>
    <div class="icon_2"><img src="./img/icon2.png"></div>
    <div class="lock_finger" onclick="animations()" v-on:click="selectPage(0)"><img src="./img/finger.svg"></div>
    </div>
    </div>
    </div>
    `
});
