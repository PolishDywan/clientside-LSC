Vue.component('tab-peopleresults', {
    props: [
        'data'
    ],
    methods: {},
    mounted () {},
    template: `
    <div class="searchPeopleResult">
        <div class="ui big list">
            <div class="item">
                <i class="users icon"></i>
                <div class="content">
               {{ this.data.searchPeopleData.name }}
                </div>
            </div>
            <div class="item">
                <i class="marker icon"></i>
                <div class="content">
                Los Santos
                </div>
            </div>
            <div class="item">
                <i class="phone icon"></i>
                <div class="content">
                <a>{{ this.data.searchPeopleData.GSM }}</a>
                </div>
            </div>
            <div class="item">
                <i class="car icon"></i>
                <div class="content">
                <a>{{ this.data.searchPeopleData.isLicense ? 'Lisans Var' : 'Lisans Yok' }}</a>
                </div>
            </div>
        </div>

        <div class="ui mini statistics">
            <div class="statistic">
                <div class="value">
                Kesilen
                </div>
                <div class="label">
                Cezalar
                </div>
            </div>
        </div>

        <table class="ui padded table">
            <thead>
                <tr>
                <th>Miktar</th>
                <th>Açıklama</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(index, value) in data.searchPeopleData.fines" :key="index">
                <td>{{ index.value }}$</td>
                <td>{{ index.reason }}</td>
            </tr>

            </tbody>
        </table>

        <div class="ui mini statistics">
            <div class="statistic">
                <div class="value">
                Sicil
                </div>
                <div class="label">
                Kaydı
                </div>
            </div>
        </div>

        <table class="ui padded table">
            <thead>
                <tr>
                <th>Tarih</th>
                <th>Süre</th>
                <th>Açıklama</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(index, value) in data.searchPeopleData.lastJails" :key="index">
                <td>{{ index.date }}</td>
                <td>{{ index.time }}</td>
                <td>{{ index.reason }}</td>
            </tr>

            </tbody>
        </table>

        <div class="ui mini statistics">
            <div class="statistic">
                <div class="label">
                Evler
                </div>
            </div>
        </div>

        <table class="ui padded table">
            <thead>
                <tr>
                <th>ID</th>
                <th>İsim</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(index, value) in data.searchPeopleData.houses" :key="index">
                <td>{{ index.ID }}</td>
                <td>{{ index.Name }}</td>
            </tr>

            </tbody>
        </table>

        <div class="ui mini statistics">
            <div class="statistic">
                <div class="label">
                İşyerleri
                </div>
            </div>
        </div>

        <table class="ui padded table">
            <thead>
                <tr>
                <th>ID</th>
                <th>İsim</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(index, value) in data.searchPeopleData.business" :key="index">
                <td>{{ index.ID }}</td>
                <td>{{ index.Name }}</td>
            </tr>

            </tbody>
        </table>

        <div class="ui mini statistics">
            <div class="statistic">
                <div class="label">
                Araçlar
                </div>
            </div>
        </div>

        <table class="ui padded table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Plaka</th>
                <th>Ceza</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(index, value) in data.searchPeopleData.vehicles" :key="index">
                <td>{{ index.ID }}</td>
                <td>{{ index.Model }}</td>
                <td>{{ index.Plate }}</td>
                <td>{{ index.Fine }}</td>
            </tr>

            </tbody>
        </table>
    </div>
    `
});
