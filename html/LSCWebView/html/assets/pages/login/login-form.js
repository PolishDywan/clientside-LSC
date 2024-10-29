Vue.component('login-form', {
    data () {
        return {};
    },
    methods: {},
    mounted () {},
    template: `
        <div class="login-form">
            <b-form class="login-form-form slide-in-fwd-center">            
                <center><img src="https://forum.lsc-rp.com/Themes/ninetynine/images/_style3/logo.png" /></center>
                <label class="sr-only" for="inline-form-input-username">Kullanıcı Adı</label>
                <b-input-group prepend="👤" class="mb-2 mr-sm-2 mb-sm-3 login-username">
                <b-form-input id="inline-form-input-username" placeholder="Kullanıcı Adı"></b-form-input>
                </b-input-group>

                <label class="sr-only" for="inline-form-input-password">Şifre</label>
                <b-input-group prepend="🔑" class="mb-2 mr-sm-2 mb-sm-2 login-password">
                <b-form-input id="inline-form-input-password" type="password" placeholder="Şifre"></b-form-input>
                </b-input-group>

                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-3" success>Beni Hatırla</b-form-checkbox>
            
                <b-button pill block variant="success">Giriş Yap</b-button>
            </b-form>
        </div> 
    `
});
