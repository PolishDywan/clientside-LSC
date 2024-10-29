Vue.component('tab-wantedlist', {
    props: [
        'data'
    ],
    mounted () {
        $('.ui.dropdown').dropdown();
    },
    methods: {
        setWantedStatus (id, newStatus) {
            alt.emit('MDC:WantedStatus', id, newStatus);
        },
        removeWanted (id) {
            alt.emit('MDC:RemoveWanted', id);
        }
    },
    template: `

    <table class="ui padded table">
        <thead>
        <tr>
            <th>İşlemler</th>
            <th>isim</th>
            <th>Açıklama</th>
            <th>Durum</th>
            <th>Kaydı Açan Memur</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item of this.data.wantedList">
            <td>
                <div class="ui icon top left pointing dropdown button">
                    <i class="wrench icon"></i>
                    <div class="menu">
                    <div class="header">Genel işlemler</div>
                    <div class="item" @click="removeWanted(item.ID)">Kaldır</div>
                    <div class="ui divider"></div>
                    <div class="item">Durum</div>
                    <div class="item">
                        <i class="dropdown icon"></i>
                        <span class="text">Durum güncelle</span>
                        <div class="menu">
                        <div class="item" @click="setWantedStatus(item.ID, 'Göz Altında')">
                            <i class="check icon"></i>
                            Göz Altında
                        </div>
                        <div class="item" @click="setWantedStatus(item.ID, 'Tutuklu')">
                            <i class="check icon"></i>
                            Tutuklu
                        </div>
                        <div class="item" @click="setWantedStatus(item.ID, 'Aranıyor')">
                            <i class="check icon"></i>
                            Aranıyor
                        </div>
                        <div class="item" @click="setWantedStatus(item.ID, 'Süre Aşımı')">
                            <i class="check icon"></i>
                            Süre aşımı
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.reason }}</td>
            <td>{{ item.current }}</td>
            <td>{{ item.opener }}</td>
        </tr>
        </tbody>
    </table>
    `
});
