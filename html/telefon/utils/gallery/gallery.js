Vue.component('tab-gallery', {
    props: [
        'data'
    ],
    data () {
        return {
            selection: 0,
            shareLink: "",
            active: false,
            img: "",
            isPhoto: false
        };
    },
    methods: {
        deletePhoto (link) {
            alt.emit('pCef:DeletePhoto', link);
        },
        sharePhoto (link) {
            this.isPhoto = false;
            this.active = true;
            this.shareLink = link;
        },
        sharePhoto2 (number) {
            this.active = false;
            alt.emit('pCef:SharePhoto', number, this.shareLink);
        },
        inspectPhoto (link) {
            this.active = false;
            this.img = link;
            this.isPhoto = true;
        }
    },
    mounted () {
        alt.emit('pCef:GalleryOpened');
    },
    computed: {},
    template: `
    <div class="gallery-content" v-if="data.gallery">

    <vs-dialog overflow-hidden v-model="active">
        <template #header>
        <h4 class="not-margin">
            Gönderilecek Kişi
        </h4>
        </template>


        <div class="con-content">
                <div class="footer-dialog" v-for="(user,i) of data.contactList">
                    <vs-button flat @click="sharePhoto2(user.Number)">
                        {{ user.Name }}
                    </vs-button>
                </div>
        </div>
    </vs-dialog>

    <vs-dialog dark overflow-hidden v-model="isPhoto">
        <template #header>
        <h4 class="not-margin">
            Medya
        </h4>
        </template>


        <div class="con-content">
            <img :src="img" width="650px">
        </div>
    </vs-dialog>

                <div class="main_gallery">
                <div class="gallery_item" v-for="(item, i) in data.gallery" :key="i">
                    <div>
                        <img :src="item.link" height="80" class="text-right pa-2" >
                            <button class="button share" @click="sharePhoto(item.link)">
                             <i class='bx bx-share-alt' style="color:#00E8FF;"></i>
                            </button>
                            <button class="button delete" color="#FF0000" @click="deletePhoto(item.link)">
                                <i class='bx bxs-notification-off' style="color:#ff0000;"></i>
                            </button>
                            <button class="button scope" color="#F7FF00" @click="inspectPhoto(item.link)">
                                <i class='bx bx-search-alt-2' style="color:#F7FF00;"></i>
                            </button>
                    </div>
                </div>
            </div>
    </div>
    `
});
