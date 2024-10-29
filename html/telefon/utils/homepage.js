Vue.component('tab-homepage', {
    props: [
        'data'
    ],
    methods: {
        changePage (id) {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', id);
        },
        openCamera () {
            this.$root.$emit('display', false);
            alt.emit('pCef:OpenCamera');
        },
        openInvader() {
            alt.emit('pCef:OpenLifeInvader')
        },
        openDate() {
            alt.emit('pCef:OpenDate');
        }
    },
    computed: {
        getDate: function() {
            let today = new Date();
            return today.getDay() + "." + today.getMonth() + "." + today.getFullYear();
        }
    },
    template: `
    <div class="homepage-content" v-bind:style="{ 'background-image': 'url(' + this.data.settings.paper + ')' }">
    <div class="home_menu_icons">
        
        <div class="home_icon" v-on:click="changePage(6)"><img src="./img/contacts.svg">
        </div>
        <div class="home_icon" v-on:click="changePage(10)"><img src="./img/wallet.svg">
        </div>
        <div class="home_icon" v-on:click="changePage(8)"><img src="./img/bank.svg">
        </div>
        <div class="home_icon" v-on:click="openCamera()"><img src="./img/camera.svg">
        </div>
        <div class="home_icon" v-on:click="changePage(13)"><img src="./img/photos.svg">
        </div>
        <div class="home_icon" v-on:click="changePage(16)"><img src="./img/calculator.svg">
        </div>
        <div class="home_icon"><img src="./img/weather.svg">
        </div>
        <div class="home_icon" v-on:click="openDate()"><img src="./img/datelogo.png">
        </div>
        </div> 


    <div class="home_bottom">
    <div class="home_bottom_icon" v-on:click="changePage(1)"><img src="./img/phone.svg"></div> 
    <div class="home_bottom_icon" v-on:click="openInvader()"><img src="./img/social.svg"></div>
    <div class="home_bottom_icon" v-on:click="changePage(4)"><img src="./img/message.svg"></div>
    <div class="home_bottom_icon" v-on:click="changePage(17)"><img src="./img/settings.svg"></div>
    </div>
    </div>

    `
});
