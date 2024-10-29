Vue.config.devtools = false;
const app = new Vue({
    el: '#app',
    data () {
        return {
            Display: true,
            userID: "10",
            name: "Baldsomero Eliazar (10)"
        };
    },
    computed: {
        time () {
            const today = new Date();
            const time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ":" + today.getSeconds();
            return time;
        }
    },
    mounted () {
        if ('alt' in window) {
            alt.on('char:name', this.setName);
            alt.on('char:ID', this.setId);
            alt.on('Display', this.setDisplay);
        }
    },
    methods: {
        currentDate () {
            const current = new Date();
            const date = `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`;
            return date;
        },
        currentTime () {
            const today = new Date();
            const time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
            return time;
        },
        setName (name) {
            this.name = name;
        },
        setId (id) {
            this.userID = id;
        },
        setDisplay (state) {
            this.Display = state;
        }
    },
    watch: {
        currentTime (yeni, eski) {
            this.time();
        }
    }
});
