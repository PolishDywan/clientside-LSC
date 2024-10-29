Vue.config.devtools = false;
Vue.prototype.window = window;
Vue.use(BootstrapVue);
const app = new Vue({
    el: '.content',
    data () {
        return {
            selection: 0,
            test: true,
            Pages: [
                'General'
            ],
            data: {
                test: "test"
            }
        };
    },
    computed: {
        getTabComponent: function() {
            return `tab-${this.Pages[this.selection].toLowerCase()}`;
        }
    },
    methods: {},
    components: {},
    mounted () {}
});
