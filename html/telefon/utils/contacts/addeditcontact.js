Vue.component('tab-addeditcontact', {
    data () {
        return {
            name: "",
            number: 0
        };
    },
    methods: {
        addContact () {
            this.$root.$emit('playSound', 6);
            alt.emit('pCef:AddContact', this.number, this.name);
            this.goBack();
        },
        goBack () {
            this.$root.$emit('playSound', 6);
            this.$root.$emit('selectPage', 6);
        }
    },
    computed: {},
    template: `
    <div class="contact-addoredit">

        <div class="contact-addoredit-info">
            <h4>Kisi Ekle</h4>
                <div class="add_avatar">
                    <vs-avatar size="30" dark>
                        <template #text>
                        {{ name }}
                        </template>
                    </vs-avatar>
                </div>
            <div class="add_input_1">
                <input  type="text"  v-model="name" placeholder="İsim">
            </div>
            <div class="add_input_2">
                    <input id="add_contact_input" type="number" label="Numara" v-model="number"/>
            </div>
           
            
            <div class="contact-addoredit-buttons">
                <div class="add_buttons">
                <div class="save_button"  v-on:click="addContact"><img src="./img/save.svg"></div>
                <div class="save_button" v-on:click="goBack"><img src="./img/undo.svg"></div>
                </div>
            </div>

        </div>
    </div>
    `
});
