Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".apl_wrapper",
    data () {
        return {
            data: {
                speed: 0,
                plate: 'YOK'
            }
        };
    },
    mounted () {
        // Alt-V Listeners      
        if ('alt' in window) {
            alt.on('Update', this.update);
        }
    // Alt-V Listeners END
    },
    computed: {
        setSpeed () {
            return this.data.speed;
        },
        setPlate () {
            return this.data.plate;
        }
    },
    methods: {
        update (speed, plate) {
            this.data.speed = speed;
            this.data.plate = plate;
        }
    }
}); /*
{"backgroundImage":null,
"ContactList":
[{"ID":"Kişi 0","PhoneNumber":1000,"ProfilePhoto":"yoh"},
{"ID":"Kişi 1","PhoneNumber":1001,"ProfilePhoto":"yoh"},{"ID":"Kişi 2","PhoneNumber":1002,"ProfilePhoto":"yoh"},
{"ID":"Kişi 3","PhoneNumber":1003,"ProfilePhoto":"yoh"}],
"MessageList":
[{"PhoneNumber":999,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205756+03:00","isOwner":false}]},
{"PhoneNumber":1000,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205955+03:00","isOwner":false}]},
{"PhoneNumber":1001,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205961+03:00","isOwner":false}]},
{"PhoneNumber":1002,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205964+03:00","isOwner":false}]}]}

*/ 
