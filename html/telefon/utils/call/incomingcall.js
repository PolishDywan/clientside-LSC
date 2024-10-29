Vue.component('tab-incomingcall', {
    props: [
        'data'
    ],
    data () {
        return {};
    },
    methods: {
        answerCall (state) {
            alt.emit('pCef:AnswerCall', state);
            if (state) {
                this.$root.$emit('selectPage', 3);
                this.data.currentCall.Status = 1;
            } else {
                this.data.currentCall.callTarget = -1;
                this.data.currentCall.callTargetName = "";
                this.$root.$emit('selectPage', 0);
            }
        }
    },
    computed: {},
    template: `
    <div class="incomingcall-content">
        <div class="phoneCallingAvatar">
        <div class="phoneCallingInfo">
            <center>
            <span>{{ data.currentCall.callTargetName }}</span><br>
            <span>{{ data.currentCall.callTarget }}</span>
            </center>
        </div>

        <div class="phoneComingCall">
            <div class="incom_bottom">
                <div class="incom true"><button v-on:click="answerCall(true)"><i class='bx bxs-phone'></i></button></div>
                <div class="incom false"><button  v-on:click="answerCall(false)"><i style="transform: rotate(135deg);" class='bx bxs-phone' ></i></button></div>
            </div>
            
        </div>
    </div>
    </div>
    `
});
