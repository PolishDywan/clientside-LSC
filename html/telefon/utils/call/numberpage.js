Vue.component('tab-numberpage', {
    props: [
        'data'
    ],
    data () {
        return {
            currentNumber: ""
        };
    },
    methods: {
        test () {
            setTimeout(()=>{
                console.log(this.$refs["myid"]);
            }, 1);
        },
        addNumber (num) {
            this.$root.$emit('playSound', 1);
            this.currentNumber += num;
        },
        removeNumber () {
            this.$root.$emit('playSound', 1);
            this.currentNumber = this.currentNumber.slice(0, -1);
        },
        callNumber () {
            alt.emit('pCef:Call', parseInt(this.currentNumber));
            this.data.currentCall.callTarget = parseInt(this.currentNumber);
            let callData = this.data.contactList.find((x)=>x.Number == parseInt(this.currentNumber));
            if (callData) {
                this.data.currentCall.callTargetName = callData.Name;
            } else {
                this.data.currentCall.callTargetName = "";
            }
            this.data.currentCall.Status = 0;
            this.$root.$emit('selectPage', 3);
            this.$root.$emit('playSound', 6);
        }
    },
    computed: {},
    template: `
    <div class="numberpage-content">

        <input type="number" min="0" placeholder="0" v-model="currentNumber" class="phoneNumberInput">    

        <div class="numberButtons">
             <div class="number_main">
                <div class="numbers">
                    <button v-on:click="addNumber(1)" style="color:white;">
                        <b style="    position: absolute;margin-left: -5px;margin-top: -7px;">1</b><br>
                    </button>
                </div>
                <div class="numbers">
                    <button  v-on:click="addNumber(2)" style="color:white;">
                        <b>2</b><br>
                        <b style="font-size:9px;">ABC</b>
                    </button>
                </div>
                <div class="numbers">
                    <button v-on:click="addNumber(3)" style="color:white;">
                        <b>3</b><br>
                        <b style="font-size:9px;">DEF</b>
                    </button>
                </div>
    

            
                <div class="numbers">
                    <button  v-on:click="addNumber(4)" style="color:white;">
                        <b>4</b><br>
                        <b style="font-size:9px;">GHE</b>
                    </button>
                </div>
                <div class="numbers">
                    <button  v-on:click="addNumber(5)" style="color:white;">
                        <b>5</b><br>
                        <b style="font-size:9px;">JKL</b>
                    </button>
                </div>
                <div class="numbers">
                    <button  v-on:click="addNumber(6)" style="color:white;">
                       <b>6</b><br>
                       <b style="font-size:9px;">MNO</b>
                    </button>
                </div>
            

            
                <div class="numbers">
                    <button  v-on:click="addNumber(7)" style="color:white;">
                        <b>7</b><br>
                        <b style="font-size:9px;">PQRS</b>
                    </button>
                </div>
                <div class="numbers">
                    <button  v-on:click="addNumber(8)" style="color:white;">
                        <b>8</b><br>
                        <b style="font-size:9px;">TUV</b>
                    </button>
                </div>
                <div class="numbers">
                    <button  v-on:click="addNumber(9)" style="color:white;">
                        <b>9</b><br>
                        <b style="font-size:9px;">WXYZ</b>
                    </button>
                </div>
                

            
                <div class="numbers">
                    <button style="background-color:#54ea82;" block icon success relief v-on:click="callNumber">
                        <i style="color:white; font-size:25px;" class="bx bxs-phone-call"></i>
                    </button>
                </div>
                <div class="numbers">
                    <button  v-on:click="addNumber(0)" style="color:white;">
                        <b>0</b>
                    </button>
                </div>
                <div class="numbers">
                    <button  style="background-color:#ea5454" block icon danger relief v-on:click="removeNumber()">
                        <i style="color:white; font-size:25px;" class="bx bx-arrow-back"></i>
                    </button>
                </div>
                </div>
            
        </div>
    </div>
    `
});
