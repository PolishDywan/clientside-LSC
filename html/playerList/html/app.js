Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".general",
    data () {
        return {
            show: false,
            data: [
                {
                    ID: 1,
                    name: "lelor test",
                    level: 3,
                    ping: 10
                }, 
            ],
            numbers: {
                RecordPlayer: 273,
                Admin: 3,
                Helper: 2,
                Lspd: 5,
                Lsmd: 4,
                News: 2,
                Avukat: 4,
                Taxi: 7
            }
        };
    },
    mounted () {
        if ('alt' in window) {
            alt.on('playerlistshow', this.plistLoad);
            alt.on('Close', this.close);
        }
    },
    methods: {
        close () {
            this.show = false;
        },
        plistLoad (cD, record, admin, helper, lspd, lsmd, news, avukat, taxi) {
            this.show = true;
            this.data = cD;
            this.numbers.RecordPlayer = record;
            this.numbers.Admin = admin;
            this.numbers.Helper = helper;
            this.numbers.Lspd = lspd;
            this.numbers.Lsmd = lsmd;
            this.numbers.News = news;
            this.numbers.Avukat = avukat;
            this.numbers.Taxi = taxi;
        },
        ordData: function() {
            return _.orderBy(this.data, 'ID');
        }
    }
});
