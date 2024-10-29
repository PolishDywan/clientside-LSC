Vue.component('tab-reportpage', {
    data: function() {
        return {
            value: 0,
            showpage: 999,
            reportList: [],
            report: undefined
        };
    },
    methods: {
        loadReports (data) {
            this.reportList = JSON.parse(data);
        },
        loadReport (data) {
            this.report = JSON.parse(data);
            console.log(data);
        }
    },
    mounted () {
        if ('alt' in window) {
            alt.on('MDC:LoadReports', this.loadReports);
            alt.on('MDC:LoadReport', this.loadReport);
        }
    // Render BB CODE
    },
    computed: {},
    watch: {
        value: function(val) {
            alt.emit('MDC:GetReports', val);
        },
        showpage: function(val) {
            this.report = undefined;
            alt.emit('MDC:GetReport', val);
        }
    },
    template: `
    <div class="reportpage">
        <div class="center">
            <vs-select placeholder="Tür Seçin" v-model="value" label="Kategori">
                <vs-option label="Tutuklama Raporları" value="40">
                    Tutuklama Raporları
                </vs-option>
                <vs-option label="Gözaltı Kayıtları" value="43">
                    Gözaltı Kayıtları
                </vs-option>
                <vs-option label="Aranma Kayıtları" value="42">
                    Aranma Kayıtları
                </vs-option>
                <vs-option label="Araç Aranma Kayıtları" value="44">
                    Araç Aranma Kayıtları
                </vs-option>
                <vs-option label="Çekilen Araçlar" value="41">
                    Çekilen Araçlar
                </vs-option>
            </vs-select>
        </div>

        <div class="reportList" v-if="reportList">
            <vs-select placeholder="Rapor Seçin" v-model="showpage" label="Rapor">
                <vs-option v-for="rep in reportList" :label="rep.Name" :value="rep.id_topic">
                    {{rep.Name}}
                </vs-option>
            </vs-select>
        </div>

        <div class="reportContent" v-if="report">
            <div v-for="rr in report" v-html="rr.subject"></div>
        </div>

    </div>
    `
});
