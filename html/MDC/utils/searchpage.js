Vue.component('tab-searchpage', {
    data: function() {
        return {
            selection: 0,
            searchPlayerName: null,
            searchHouse: null,
            searchBusiness: null,
            searchPlate: null,
            searchPhone: null,
            HouseInfo: null,
            BusinessInfo: null,
            PhoneInfo: null,
            vehInfo: null
        };
    },
    methods: {
        changePage (selection) {
            this.selection = selection;
        },
        searchPlayer () {
            alt.emit("MDC:DATA:Player", this.searchPlayerName);
        },
        sHouse () {
            alt.emit("MDC:DATA:House", this.searchHouse);
        },
        sBusiness () {
            alt.emit("MDC:DATA:Business", this.searchBusiness);
        },
        cPlate () {
            alt.emit("MDC:DATA:Plate", this.searchPlate);
        },
        sPhone () {
            alt.emit("MDC:DATA:Phone", this.searchPhone);
        },
        // Loaders
        hInfoLoad (data) {
            this.HouseInfo = data;
        },
        bInfoLoad (data) {
            this.BusinessInfo = data;
        },
        phoneInfoLoad (data) {
            this.PhoneInfo = data;
        },
        vehLoad (data) {
            this.vehInfo = data;
        },
        markPosition (d) {
            console.log(JSON.stringify(this.HouseInfo));
            console.log(JSON.stringify(this.BusinessInfo));
            //let pos = JSON.parse(d.pos);
            alt.emit('MDC:MarkPosition', d.pos.X, d.pos.Y);
        }
    },
    mounted () {
        $('.ui.dropdown').dropdown();
        this.$root.$on('sPage:LoadHouseInfo', this.hInfoLoad);
        this.$root.$on('sPage:LoadBusinessInfo', this.bInfoLoad);
        this.$root.$on('sPage:LoadPhoneInfo', this.phoneInfoLoad);
        this.$root.$on('sPage:VehLoad', this.vehLoad);
    },
    computed: {
        showSearchBar () {
            return;
        }
    },
    template: `
    <div>
        <div class="ui menu">
            <a class="item" @click=changePage(1)>
            Kişi Sorgula
            </a>
            <a class="ui dropdown item">
            Mülk Sorgula
            <i class="dropdown icon"></i>
            <div class="menu">
                    <div class="item" @click=changePage(2)>Ev</div>
                    <div class="item" @click=changePage(3)>İşyeri</div>
                </div>
        
            </a>
            <a class="item" @click=changePage(4)>
            Araç Sorgulama
            </a>
            <a class="item" @click=changePage(5)>
            Telefon Takip Sistemi
            </a>
        </div>

        <div class="searchPage">
            <div class="searchContent" v-if="selection === 1">
                <div class="searchHeader">
                    <span>Kişi Sorgulama</span>
                </div>

                <div> 
                    <input v-model="searchPlayerName" type="text" class="searchPlayer" placeholder="Kişi Adı">
                </div>
                <div>
                    <button @click="searchPlayer">ARA</button>
                </div>
            </div>

            <div class="searchContent" v-if="selection === 2">
                <div class="searchHeader">
                    <span>Ev Sorgulama</span>
                </div>

                <div> 
                    <input v-model="searchHouse" type="number" class="searchPlayer" placeholder="Kapı No">
                </div>
                <div>
                    <button @click="sHouse">ARA</button>
                </div>
                <div v-if="this.HouseInfo">
                    <span>KapıNo: {{ this.HouseInfo.ID }} </span><br>
                    <span>Sahip: {{ this.HouseInfo.ownerName }} </span><br><br><br>                 
                    <button @click="markPosition(HouseInfo)">Adrese Git</button>
                </div>
            </div>

            <div class="searchContent" v-if="selection === 3">
                <div class="searchHeader">
                    <span>İşyeri Sorgulama</span>
                </div>

                <div> 
                    <input v-model="searchBusiness" type="number" class="searchPlayer" placeholder="Kapı No">
                </div>
                <div>
                    <button @click="sBusiness">ARA</button>
                </div>
                <div v-if="this.BusinessInfo">
                    <span>KapıNo: {{this.BusinessInfo.ID}}</span><br>
                    <span>Sahip: {{this.BusinessInfo.ownerName}}</span><br><br><br>
                    <button @click="markPosition(BusinessInfo)">Adrese Git</button>
                </div>
            </div>

            <div class="searchContent" v-if="selection === 4">
                <div class="searchHeader">
                    <span>Araç Plaka Sorgulama</span>
                </div>

                <div> 
                    <input v-model="searchPlate" type="text" class="searchPlayer" placeholder="Araç Plakası">
                </div>
                <div>
                    <button @click="cPlate">ARA</button>
                </div>
                <div v-if="this.vehInfo">
                <span style="font-style: italic;font-size: 1.5vw;">{{this.vehInfo.Model}} - {{this.searchPlate}}</span><br>
                <span>Kayıtlı Şahıs: {{this.vehInfo.OwnerName}}</span><br>
                <span>Ödenmemiş Vergi/Ceza: {{this.vehInfo.Fine}}</span><br><br>
                <span v-if="this.vehInfo.isWanted == false" style="font-size: 1.2vw;color: green;text-decoration: underline;">ARAÇ TEMİZ</span>
                <span v-if="this.vehInfo.isWanted == true" style="font-size: 1.2vw;color: red;text-decoration: underline;">ARAÇ ARANIYOR</span>
                <br>
            </div>
            </div>

            <div class="searchContent" v-if="selection === 5">
                <div class="searchHeader">
                    <span>Telefon Numarası</span>
                </div>

                <div> 
                    <input v-model="searchPhone" type="number" class="searchPlayer" placeholder="Telefon No">
                </div>
                <div>
                    <button @click="sPhone">ARA</button>
                </div>    
                <div v-if="this.PhoneInfo">
                    <span>Hattın kayıtlı olduğu kişi: {{ this.PhoneInfo.ownerName }}</span><br><br><br>
                    <button @click="markPosition(PhoneInfo)">Son veri alınan konuma git</button>
                </div>
            </div>


            <div class="space"></div>
        </div>
    </div>
    `
});
