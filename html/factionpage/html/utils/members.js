Vue.component('tab-members', {
    props: [
        'data'
    ],
    methods: {
        editPlayerRank (ID, number) {
            alt.emit('FactionBrowser:UpdateMemberRank', ID, number);
        },
        kickPlayerFromFact (ID) {
            alt.emit('FactionBrowser:KickPlayer', ID);
        }
    },
    mounted () {},
    template: `
    <div class="memberList">
        <div class="memberListHeader">
            <span>Üye Listesi</span>
        </div>
        <table class="memberListTable">
            <thead>
                <tr>
                    <th>İsim</th>
                    <th>Rütbe</th>
                    <th>Ayarlar</th>
                </tr>
            </thead>

                <tbody v-for="i of this.data.mData">
                    <tr>
                        <td>{{ i.name }}</td>
                        <td v-if="data.fData.rank.find(x => x.Rank === i.rank)">{{ data.fData.rank.find(x => x.Rank === i.rank).RankName }}</td>
                        <td v-else> YOK </td>
                        <td class="memberSettingsButtons">
                            <div class="dropdown">
                                <button class="dropbtn" v-if="data.fData.rank.find(x => x.Rank === i.rank)">{{ data.fData.rank.find(x => x.Rank === i.rank).RankName }}</button>
                                <button class="dropbtn" v-else>YOK</button>
                                    <div class="dropdown-content" v-for="a of data.fData.rank">
                                    <a v-for="a of data.fData.rank" @click="editPlayerRank(i.ID ,a.Rank)">{{ a.RankName }}</a>
                                    </div>
                            </div>
                            <button class="dropbtn" @click="kickPlayerFromFact(i.ID)">Oluşumdan At</button>
                        </td>
                    </tr>

                </tbody>

            
        </table>
    </div>
    `
});
