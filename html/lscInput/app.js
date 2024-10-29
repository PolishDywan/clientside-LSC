Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".mainContent",
    data () {
        return {
            type: 0,
            headerText: "",
            textInput: ""
        };
    },
    mounted () {
        if ('alt' in window) {
            alt.emit('UI:Ready');
            alt.on('UI:Close', this.close);
            alt.on('UI:cInput', this.create);
        }
    },
    methods: {
        close () {
            this.show = false;
        },
        create (type, text) {
            this.type = type;
            this.headerText = text;
        },
        save () {
            alt.emit("UI:Save", this.textInput);
        },
        approve (event) {
            let tmp;
            if (targetId = event.currentTarget.id == "y") tmp = true;
            else tmp = false;
            alt.emit("UI:Save", tmp);
        }
    }
});
