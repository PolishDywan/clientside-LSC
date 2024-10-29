Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".mdcContent",
    data () {
        return {
            pages: [
                'MainPage',
                'searchPage',
                'SearchCar',
                'WantedList',
                'Peopleresults',
                'callsList',
                'reportpage'
            ],
            selection: 0,
            data: {
                searchPeopleData: {},
                searchVehicleData: {},
                searchHouseData: {},
                searchBusinessData: {},
                searchPhoneData: {},
                wantedList: [],
                calls: [],
                wantedCar: {}
            }
        };
    },
    mounted () {
        this.$root.$on('selectPage', this.selectPage);
        if ('alt' in window) {
            alt.emit('MDC:Ready');
            alt.on('MDC:ShowData:Player', this.updatePeopleData);
            alt.on('MDC:ShowData:House', this.updateHouse);
            alt.on('MDC:ShowData:Business', this.updateBusiness);
            alt.on('MDC:ShowData:Phone', this.updatePhone);
            alt.on('MDC:ShowData:WantedList', this.updateWantedList);
            alt.on('MDC:ShowData:CallsList', this.updateCallsList);
            alt.on('MDC:ShowData:Vehicle', this.wantedCar);
        }
    },
    methods: {
        selectPage (selected) {
            this.selection = selected;
        },
        updatePeopleData (data) {
            this.data.searchPeopleData = JSON.parse(data);
            this.selectPage(4);
        },
        updateHouse (data) {
            this.data.searchHouseData = JSON.parse(data);
            this.$root.$emit('sPage:LoadHouseInfo', JSON.parse(data));
        },
        wantedCar (d) {
            if (d) {
                this.data.wantedCar = JSON.parse(d);
                this.$root.$emit('sPage:VehLoad', this.data.wantedCar);
            }
        },
        updateBusiness (data) {
            this.data.searchBusinessData = JSON.parse(data);
            this.$root.$emit('sPage:LoadBusinessInfo', JSON.parse(data));
        },
        updatePhone (data) {
            this.data.searchPhoneData = JSON.parse(data);
            this.$root.$emit('sPage:LoadPhoneInfo', JSON.parse(data));
        },
        updateWantedList (data) {
            this.data.wantedList = JSON.parse(data);
        },
        updateCallsList (data) {
            this.data.calls = JSON.parse(data);
        },
        closeMDC () {
            alt.emit("MDC:Close");
        }
    },
    computed: {
        getTabComponent: function() {
            return `tab-${this.pages[this.selection].toLowerCase()}`;
        }
    }
});
