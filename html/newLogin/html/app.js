Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: '.content',
    data () {
        return {
            username: '',
            password: '',
            updates: [
                {
                    header: "v1.3.9",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quibusdam, dignissimos, beatae inventore distinctio aut modi iure molestiae sunt libero facilis nemo debitis porro dolorum voluptate quidem molestias quam nisi?"
                },
                {
                    header: "v1.3.8",
                    text: "Deneme Dede"
                }
            ]
        };
    },
    computed: {},
    methods: {
        loadUpdateList (data) {
            this.updates = JSON.parse(data);
        }
    },
    components: {},
    mounted () {
        if ('alt' in window) {
            alt.on('LoadUpdates', this.loadUpdateList);
        }
    }
});
