Vue.component('tab-factionsettings', {
    props: [
        'data'
    ],
    data () {
        return {
            id: -1,
            rankName: "Rütbe",
            Payday: 0,
            canUseCar: false,
            canUseVault: false,
            canUsePayday: false,
            canUseInvite: false,
            canUseKick: false,
            canUseRank: false
        };
    },
    methods: {
        editRank (rankID) {
            $('#newRank').hide();
            let d = this.data.fData.rank.find((x)=>x.Rank === rankID);
            this.id = d.Rank;
            this.canUseCar = d.permission.canUseCar;
            this.canUseVault = d.permission.canUseVault;
            this.canUsePayday = d.permission.canUsePayday;
            this.canUseInvite = d.permission.canUseInvite;
            this.canUseKick = d.permission.canUseKick;
            this.canUseRank = d.permission.canUseRank;
            this.rankName = d.RankName;
            this.Payday = d.Payday;
            $('#oldRank').show();
        },
        addRank () {
            $('#oldRank').hide();
            this.id = 0;
            this.canUseCar = false;
            this.canUseVault = false;
            this.canUsePayday = false;
            this.canUseInvite = false;
            this.canUseKick = false;
            this.canUseRank = false;
            this.rankName = "Yeni Rütbe";
            this.Payday = 0;
            $('#newRank').show();
        },
        saveOrAdd () {
            if (this.id >= 0) {
                //console.log("HTML:" + this.id + " " + this.rankName + " " + this.Payday + " " + this.canUsePayday + " " + this.canUseVault + " " + this.canUsePayday + " " + this.canUseInvite + " " + this.canUseKick + " " + this.canUseRank);
                alt.emit('FactionBrowser:EditRank', this.id, this.rankName, this.Payday, this.canUseCar, this.canUseVault, this.canUsePayday, this.canUseInvite, this.canUseKick, this.canUseRank);
            }
        },
        removeRank (id) {
            alt.emit('FactionBrowser:RemoveRank', id);
        }
    },
    mounted () {
        $('#oldRank').hide();
        $('#newRank').hide();
    },
    computed: {
        test: function() {
            alt.emit('FactionBrowser:OOCChat', this.data.fData.settings.OOCChat);
        }
    },
    template: `    
    <div class="factionSettings">
        <div class="factionSettingsHeader">
            <span>Oluşum Ayarları</span>
        </div>

        <div class="factionGenerals">
            <div class="standartSettings">
                <div class="factionChat">
                    <label for="factionChat">Oluşum OOC sohbet</label>
                    <input type="checkbox" id="factionChat" v-model="data.fData.settings.OOCChat" v-bind="test"><br>
                    <button @click="addRank">Yeni Rütbe Ekle</button>
                </div>
            </div>

            <div class="addRank" id="oldRank">
                <div>
                <label for="newRankinput">Rütbeyi Düzenle</label>
                <input id="newRankinput" type="text" placeholder="Rütbe adı" v-model=rankName>
                </div><div>
                <label for="newRankPayday">Rütbe Maaşı</label>
                <input id="newRankPayday" type="number" placeholder="Maaş" v-model=Payday>
                </div><div>
                <label for="canUseCar">Araçları Kullanabilir</label>
                <input type="checkbox" id="canUseCar" v-model=canUseCar>
                </div><div>
                <label for="canUseVault">Kasayı Kullanabilir</label>
                <input type="checkbox" id="canUseVault" v-model=canUseVault>
                </div><div>
                <label for="canUsePayday">Maaş Alabilir</label>
                <input type="checkbox" id="canUsePayday" v-model=canUsePayday>
                </div><div>
                <label for="canUseInvite">Yeni Kişi Alabilir</label>
                <input type="checkbox" id="canUseInvite" v-model=canUseInvite>
                </div><div>
                <label for="canUseKick">Oluşumdan Atabilir</label>
                <input type="checkbox" id="canUseKick" v-model=canUseKick>
                </div><div>
                <label for="canUseRank">Rütbe Verebilir</label>
                <input type="checkbox" id="canUseRank" v-model=canUseRank>
                </div><div>
                    <button @click="saveOrAdd">Kaydet</button>
                </div>
            </div>

            <div class="addRank" id="newRank">
                <div>
                <label for="newRankinput">Yeni Rütbe Ekle</label>
                <input id="newRankinput" type="text" placeholder="Rütbe adı" v-model=rankName>
                </div><div>
                <label for="newRankPayday">Rütbe Maaşı</label>
                <input id="newRankPayday" type="number" placeholder="Maaş" v-model=Payday>
                </div><div>
                <label for="canUseCar">Araçları Kullanabilir</label>
                <input type="checkbox" id="canUseCar" v-model=canUseCar>
                </div><div>
                <label for="canUseVault">Kasayı Kullanabilir</label>
                <input type="checkbox" id="canUseVault" v-model=canUseVault>
                </div><div>
                <label for="canUsePayday">Maaş Alabilir</label>
                <input type="checkbox" id="canUsePayday" v-model=canUsePayday>
                </div><div>
                <label for="canUseInvite">Yeni Kişi Alabilir</label>
                <input type="checkbox" id="canUseInvite" v-model=canUseInvite>
                </div><div>
                <label for="canUseKick">Oluşumdan Atabilir</label>
                <input type="checkbox" id="canUseKick" v-model=canUseKick>
                </div><div>
                <label for="canUseRank">Rütbe Verebilir</label>
                <input type="checkbox" id="canUseRank" v-model=canUseRank>
                </div><div>
                    <button @click="saveOrAdd(true)">Ekle</button>
                </div>
            </div>

            <table class="factionRanks">
                <thead>
                    <tr>
                        <th class="rankNumber">Rütbe No</th>
                        <th>Rütbe Adı</th>
                        <th class="rankSettings">Ayarlar</th>
                    </tr>
                </thead>
                <tbody v-for="i of data.fData.rank">
                    <tr>
                        <td>{{ i.Rank }}</td>
                        <td>{{ i.RankName }}</td>
                        <td>
                            <button @click="editRank(i.Rank)">Düzenle</button>
                            <button @click="removeRank(i.Rank)">Kaldır</button>
                        </td>
                    </tr>



                </tbody>
            </table>
        </div>
    </div>    
    `
});
