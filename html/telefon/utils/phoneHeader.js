Vue.component('tab-PhoneHeader', {
    props: [
        'data'
    ],
    methods: {
        selectPage (id) {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', id);
        }
    },
    computed: {
        getTabComponent () {
            let today = new Date();
            return (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
        }
    },
    template: `
    <div>
    <div class="header_area">
       <span style="color:white;margin-right:6px">{{ this.getTabComponent }}</span>
       <div class="header_go"></div> 
       <span><img style="height:13px;margin-right:5px; width:auto;" src="./img/status.png"></span>
       
       
       </div>
    </div>
    `
});
