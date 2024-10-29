Vue.component('tab-bourse', {
    data () {
        return {
            bourse: undefined,
            actions: [
                'test',
                'a'
            ],
            sheetVisible: true
        };
    },
    methods: {
        updateBourse (data) {
            this.bourse = JSON.parse(data);
        }
    },
    mounted () {
        if ('alt' in window) {
            alt.on("Phone:UpdateBourse", this.updateBourse);
        }
    },
    computed: {},
    template: `
    <div class="bourse-main">
        
    </div>
    `
});
