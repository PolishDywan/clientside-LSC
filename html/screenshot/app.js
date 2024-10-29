Vue.config.devtools = false;
Vue.prototype.window = window;
Vue.use(Vuesax);
const app = new Vue({
    el: ".content",
    data () {
        return {};
    },
    mounted () {
        if ('alt' in window) {
            alt.on('showPhoto', this.showPhoto);
        }
    // Alt-V Listeners END
    //this.showPhoto("a");
    },
    methods: {
        showPhoto (string) {
            const noti = this.$vs.notification({
                color: "#7AB61F",
                position: "bottom-right",
                width: "25vh",
                title: 'Ekran Görüntüsü Alındı.',
                duration: "none",
                text: '<a href="data:image/png;base64,' + string + '">Resim Link</a><br><img src="data:image/png;base64,' + string + '" style="width: 20%; height: 100%;">'
            });
        }
    },
    computed: {}
});
