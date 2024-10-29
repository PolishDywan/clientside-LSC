Vue.config.devtools = false;
Vue.prototype.window = window;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
const app = new Vue({
    el: ".app",
    data () {
        return {
            test: ''
        };
    },
    mounted () {},
    methods: {},
    computed: {
        getTabComponent: function() {
            return `tab-${this.pages[this.selection].toLowerCase()}`;
        }
    }
});
