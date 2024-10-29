Vue.component('tab-calculator', {
    props: [
        'data'
    ],
    data () {
        return {
            prev: "",
            total: "0",
            method: "",
            methods: {
                "plus": "+",
                "minus": "-",
                "divide": "%",
                "times": "x"
            },
            classNames: "calc"
        };
    },
    methods: {
        reset () {
            this.total = "0";
            this.method = "";
            this.prev = "";
            if (this.total == "58008") {
                this.classNames += " calc--rotate";
            } else {
                this.classNames = "calc";
            }
        },
        number (value) {
            if (this.total == "0") {
                this.total = "";
            }
            this.total = "" + this.total + value;
            if (this.total == "58008") {
                this.classNames += " calc--rotate";
            } else {
                this.classNames = "calc";
            }
        },
        plus () {
            if (this.prev != "" && this.method != "") {
                this.calc();
            }
            this.method = "plus";
            this.prev = this.total;
            this.total = "0";
        },
        minus () {
            if (this.prev != "" && this.method != "") {
                this.calc();
            }
            this.method = "minus";
            this.prev = this.total;
            this.total = "0";
        },
        times () {
            if (this.prev != "" && this.method != "") {
                this.calc();
            }
            this.method = "times";
            this.prev = this.total;
            this.total = "0";
        },
        divide () {
            if (this.prev != "" && this.method != "") {
                this.calc();
            }
            this.method = "divide";
            this.prev = this.total;
            this.total = "0";
        },
        calc () {
            if (this.prev != "" && this.method != "" && this.total == "0") {
                this.total = this.prev;
                this.method = "";
                this.prev = "";
            }
            if (this.method == "plus") {
                this.total = parseInt(this.prev) + parseInt(this.total);
            } else if (this.method == "minus") {
                this.total = parseInt(this.prev) - parseInt(this.total);
            } else if (this.method == "times") {
                this.total = parseInt(this.prev) * parseInt(this.total);
            } else if (this.method == "divide") {
                if (this.total == "0") {
                    warn("You can't divide by 0!");
                } else {
                    this.total = parseInt(this.prev) / parseInt(this.total);
                }
            }
            this.prev = "";
            this.method = "";
            if (this.total == "58008") {
                this.classNames += " calc--rotate";
            } else {
                this.classNames = "calc";
            }
        }
    },
    template: `
    <div class="container" id="appe">
    <div class="classNames">
      <div class="calc-top">
        <div class="calc-equation">{{ prev }} {{ methods[method] }}</div>
        <div class="calc-input">{{ total }}</div>
      </div>
      <div class="calc-buttons">
        <div class="row">
          <div class="col-3 col-button col-red" v-on:click="reset"><button style="background-color:#b5b5b5;">C</button></div>
          <div class="col-3 col-button" v-on:click="divide"><button style="background-color:#b5b5b5;">%</button></div>
          <div class="col-3 col-button" v-on:click="times"><button style="background-color:#b5b5b5;">x</button></div>
          <div class="col-3 col-button" v-on:click="minus"><button style="background-color:#fe9d12;">-</button></div>
        </div>
        <div class="row">
          <div class="col-9">
            <div class="row">
              <div class="col-4 col-button" v-on:click="number(7)"><button>7</button></div>
              <div class="col-4 col-button" v-on:click="number(8)"><button>8</button></div>
              <div class="col-4 col-button" v-on:click="number(9)"><button>9</button></div>
            </div>
            <div class="row">
              <div class="col-4 col-button" v-on:click="number(4)"><button>4</button></div>
              <div class="col-4 col-button" v-on:click="number(5)"><button>5</button></div>
              <div class="col-4 col-button" v-on:click="number(6)"><button>6</button></div>
            </div>
          </div>
          <div class="col-3 col-button col-down" v-on:click="plus"><button style="height: 114px;border-radius: 15px;background-color:#fe9d12;">+</button></div>
        </div>
        <div class="row">
          <div class="col-9">
            <div class="row">
              <div class="col-4 col-button" v-on:click="number(1)"><button>1</button></div>
              <div class="col-4 col-button" v-on:click="number(2)"><button>2</button></div>
              <div class="col-4 col-button" v-on:click="number(3)"><button>3</button></div>
            </div>
            <div class="row">
              <div class="col-8 col-button col-left" v-on:click="number(0)"><button style="width: 111px;border-radius: 10px;">0</button></div>
              <div class="col-4 col-button" v-on:click="number('.')"><button>,</button></div>
            </div>
          </div>
          <div class="col-3 col-button col-down" v-on:click="calc"><button style="height: 110px;border-radius: 10px;background-color:#fe9d12;">=</button></div>
        </div>
      </div>
    </div>
  </div>
    `
});
