Vue.component('tab-settings', {
    props: [
        'data'
    ],
    methods: {
        sendMoney () {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:SettingsUpdate', JSON.stringify(this.data.settings));
            this.$root.$emit('selectPage', 0);
        },
        selectPage (id) {
            this.$root.$emit('selectPage', id);
        }
    },
    computed: {},
    template: `
    <div class="settings_main">
        <div class="settings_header">
        <h4>Ayarlar</h4>
        </div>
        <div class="settings_main">
        <div class="buttons">
        <button>Duvar Kağıdı <input id="paper" name="paper" v-model="data.settings.paper"></input></button>
        <button>Sessiz  <select id="quite" name="quite" v-model="data.settings.quite"><option value="0">Kapalı</option><option value="1">Açık</option></select></button>
        <button>Uçak modu <select id="fly" name="fly" v-model="data.settings.fly"><option value="0">Kapalı</option><option value="1">Açık</option></select></button>
        <button>Zil Sesi <select id="ringtone" name="ringtone" v-model="data.settings.ringtone"><option value="0" selected>Standart</option><option value="1">Zil Sesi 1</option><option value="2">Zil Sesi 2</option><option value="3">Zil Sesi 3</option></select></button>
        </div>
        <button class="save_but" v-on:click.stop="sendMoney">Kaydet</button>
        </div>
    </div>
    `
});
