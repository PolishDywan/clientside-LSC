Vue.component('tab-PhoneBottom', {
    props: [
        'data'
    ],
    methods: {
        Lockpage () {
            this.$root.$emit('playsound', 9);
            this.$root.$emit('selectPage', 15);
        },
        changePage (id) {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', id);
        }
    },
    computed: {},
    template: `
 
    <div class="phoneBottom-content">
    <div class="lockreal" style="position: absolute;margin-left: 250px;width: 25px;height: 55px;margin-top: -410px;color: #f5f5dc00;" v-on:click="Lockpage">123123123</div>
        <div class="main_menu" v-on:click="changePage(0)"></div>
        
    </div>
    
    `
});
