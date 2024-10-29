Vue.component('tab-incall', {
    props: [
        'data'
    ],
    data () {
        return {};
    },
    methods: {
        closeCurrentCall () {
            alt.emit('pCef:CloseCurrentCall');
            this.data.currentCall.callTarget = -1;
            this.data.currentCall.callTargetName = "";
            this.data.currentCall.Status = 0;
            this.$root.$emit('selectPage', 0);
            this.$root.$emit('playSound', 6);
        },
        openCloseHop () {
            this.$root.$emit('playSound', 6);
            this.data.currentCall.hoparlor = !this.data.currentCall.hoparlor;
            alt.emit('pCef:Hoparlor', this.data.currentCall.hoparlor);
        }
    },
    computed: {},
    template: `
    <div class="incomingcall-content">

        <div class="phoneCallingInfo">
            <center>
            <span>{{ this.data.currentCall.callTargetName }}</span><br>
            <span v-if="this.data.currentCall.callTarget >0">{{ this.data.currentCall.callTarget }}</span><br>
            <span v-if="this.data.currentCall.Status == 0" style="color: white;font-size:14px !important;margin-top:-30px;">Çalıyor</span>
            <span v-else-if="this.data.currentCall.Status == 1" style="color: green;">Bağlandı</span>
            <span v-else-if="this.data.currentCall.Status == 2" style="color: red;">Hat Meşgul</span>
            </center>
        </div>

        <div class="phoneCallingButtons">

            <div class="incall">
                <div class="incall false"><button v-on:click="closeCurrentCall"><i style="transform: rotate(135deg);" class="bx bxs-phone" v-on:click="closeCurrentCall"></i></button></div>
                <div class="incall false"><button style="background-color:#5896e2fa;"><i class="bx bx-dialpad-alt"></i></button></div>
                <div class="incall true" v-on:click="openCloseHop" v-if="data.currentCall.hoparlor"><button><i class="bx bx-volume-mute" v-on:click="openCloseHop"></i></button></div>
                <div class="incall true" v-on:click="openCloseHop" v-else><button style="color:red;"> <i class="bx bx-volume-mute" v-on:click="openCloseHop"></i></button></div>
            </div>
            
        </div>
    </div>
    `
});
