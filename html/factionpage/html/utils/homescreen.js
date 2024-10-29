Vue.component('tab-homescreen', {
    props: [
        'data'
    ],
    methods: {},
    mounted () {},
    template: `
    <div class="mainpage">
        <div class="users">
            <span>Üye sayısı: {{ Object.keys(this.data.mData).length  }}</span>
        </div>
        <div class="vehicles">
            <span>Araç sayısı: {{ this.data.cData }}</span>
        </div>
        <div class="vault">
            <span>Oluşum Kasası: {{ this.data.fData.cash }}$ </span>
        </div>
        <div class="exp">
            <span>Oluşum Seviyesi: {{ this.data.fData.factionLevel }}</span><br>
            <span>Tecrübe Puanı: {{ this.data.fData.factionExp }}</span>
        </div>
    </div>       
    `
});
