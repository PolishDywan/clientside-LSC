Vue.component('tab-callslist', {
    props: [
        'data'
    ],
    mounted () {
        $('.ui.dropdown').dropdown();
    },
    methods: {
        joinCall (id, posx, posy) {
            alt.emit('MDC:JoinCall', id, posx, posy);
        },
        removeCall (id) {
            alt.emit('MDC:RemoveCall', id);
        }
    },
    template: `

    <table class="ui padded table">
        <thead>
        <tr>
            <th>İşlemler</th>
            <th>Numara</th>
            <th>İsim</th>
            <th>Yönlenen Ekip</th>
            <th>İhbar içeriği</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item of this.data.calls">
            <td>
                <div class="ui icon top left pointing dropdown button">
                    <i class="wrench icon"></i>
                    <div class="menu">
                    <div class="header">Genel</div>
                    <div class="item" @click="removeCall(item.ID)">Kaldır</div>
                    <div class="ui divider"></div>
                    <div class="item" @click="joinCall(item.ID, item.pos.X, item.pos.Y)">İhbara Git</div>                    
                    </div>
                </div>
            </td>
            <td>{{ item.callNumber }}</td>
            <td>{{ item.callerName }}</td>
            <td>{{ item.pdTeam }}</td>
            <td>{{ item.reason }}</td>
        </tr>
        </tbody>
    </table>
    `
});
