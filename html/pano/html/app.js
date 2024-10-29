Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".boardContent",
    data () {
        return {
            data: {}
        };
    },
    mounted () {
        if ('alt' in window) {
            alt.emit('Phone:Ready');
            alt.on('Phone:SetupData', this.phoneSetupData);
            alt.on('Phone:IncomingCall', this.incomingCall);
            alt.on('Phone:TargetBusy', this.targetBusy);
            alt.on('Phone:SetActiveScreen', this.selectPage);
            alt.on('Phone:Toggle', this.showPhone);
        }
        this.showPhone(false);
    },
    methods: {},
    computed: {}
});
