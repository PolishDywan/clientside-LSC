Vue.config.devtools = false;
Vue.prototype.window = window;

Vue.use(Quasar)

const app = new Vue({
    el: '.app',
    data() {
        return {
            companys: undefined,
            selected: undefined,
        }        
    },
    computed: {
    },
    methods: {
        getPercentToBuy(id){
            let comp = this.companys.find(x => x.ID == id);
            if(comp){
                return 100 + (2 * comp.Percent);
            }
            else return 0;
        },
        selectCompany(id){
            this.selected = id;
        },
        getColor(id){
            if(id == this.selected)
                return "red"
            else return "primary"
        },
        loadBourseData(data){
            this.companys = JSON.parse(data);
        },
        buyShare(){
            let comp = this.companys.find(x => x.ID == this.selected);
            if(comp){
                alt.emit('buyShare', comp.ID);
            }
        },
        sellShare(){
            let comp = this.companys.find(x => x.ID == this.selected);
            if(comp){
                alt.emit('sellShare', comp.ID);
            }
        },
        exitApp(){
            alt.emit('exitApp');
        },
        getShareColor(){
            let comp = this.companys.find(x => x.ID == this.selected);
            if(comp){
                if(this.getPercentToBuy(comp.ID) < comp.LastShareBuyPrice)
                    return true;
                else return false;
            }
            else return false;
        }
    },
    components:{
    },
    mounted() {
        if('alt' in window){
            alt.on('Bourse:Data',this.loadBourseData);
        }
    }
});