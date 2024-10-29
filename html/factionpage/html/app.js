Vue.config.devtools = false;
Vue.prototype.window = window;
const app = new Vue({
    el: ".body",
    data () {
        return {
            userName: "-",
            userRank: "-",
            fData: {
                ID: 4,
                name: "Los Santos Police Department",
                type: 1,
                typeName: "Yarış",
                cash: 555,
                factionExp: 1,
                factionLevel: 1,
                isApproved: false,
                settings: {
                    OOCChat: true,
                    PayDay: false,
                    isServerFaction: false
                },
                rank: [],
                owner: 0
            },
            cData: 0,
            mData: [
                {
                    ID: 255,
                    name: "Morgan Fox",
                    rank: 1
                },
                {
                    ID: 256,
                    name: "Ogulcan Qua",
                    rank: 2
                }, 
            ],
            currentUser: 0,
            currEditing: {
                Rank: 0,
                RankName: "Yeni Rütbe",
                Payday: 500,
                permission: {
                    canUseCar: false,
                    canUseVault: false,
                    canUsePayday: false,
                    canUseInvite: false,
                    canUseKick: false,
                    canUseRank: false
                }
            }
        };
    },
    mounted () {
        if ('alt' in window) {
            alt.emit('FactionBrowser:Ready');
            alt.on('FCEF:Update', this.loadFactionData);
        }
    // Alt-V Listeners END
    //this.clearData;
    },
    methods: {
        selectPage (number) {
            this.selection = number;
        },
        loadFactionData (FData, CData, MData) {
            this.clearData;
            this.fData = JSON.parse(FData);
            this.cData = CData;
            this.mData = JSON.parse(MData);
        },
        closeFactionPage () {
            alt.emit('FactionBrowser:Close');
        },
        clearData () {
            this.fData = null;
            this.cData = null;
            this.mData = null;
        },
        editRank (id) {
            this.currEditing = this.fData.rank.find((x)=>x.Rank == id);
        },
        refreshRank () {
            this.currEditing.Rank = 0;
            this.currEditing.RankName = "Rütbe Adı";
            if (this.currEditing.Payday >= 0) {
                this.currEditing.Payday = 0;
            }
            this.currEditing.permission.canUseCar = false;
            this.currEditing.permission.canUseVault = false;
            this.currEditing.permission.canUsePayday = false;
            this.currEditing.permission.canUseInvite = false, this.currEditing.permission.canUseKick = false;
            this.currEditing.permission.canUseRank = false;
        },
        editPlayerRank (number) {
            alt.emit('FactionBrowser:UpdateMemberRank', this.currentUser, number);
        },
        kickPlayerFromFact (ID) {
            alt.emit('FactionBrowser:KickPlayer', ID);
        },
        selectUserId (id) {
            this.currentUser = id;
        },
        removeRank (id) {
            alt.emit('FactionBrowser:RemoveRank', id);
        },
        saveOrAdd () {
            if (this.currEditing.Payday >= 0) {
                alt.emit('FactionBrowser:EditRank', this.currEditing.Rank, this.currEditing.rankName, this.currEditing.Payday, this.currEditing.permission.canUseCar, this.currEditing.permission.canUseVault, this.currEditing.permission.canUsePayday, this.currEditing.permission.canUseInvite, this.currEditing.permission.canUseKick, this.currEditing.permission.canUseRank);
            }
        }
    },
    computed: {
        test: function() {
            alt.emit('FactionBrowser:OOCChat', this.fData.settings.OOCChat);
        }
    }
}); /*
{"backgroundImage":null,
"ContactList":
[{"ID":"Kişi 0","PhoneNumber":1000,"ProfilePhoto":"yoh"},
{"ID":"Kişi 1","PhoneNumber":1001,"ProfilePhoto":"yoh"},{"ID":"Kişi 2","PhoneNumber":1002,"ProfilePhoto":"yoh"},
{"ID":"Kişi 3","PhoneNumber":1003,"ProfilePhoto":"yoh"}],
"MessageList":
[{"PhoneNumber":999,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205756+03:00","isOwner":false}]},
{"PhoneNumber":1000,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205955+03:00","isOwner":false}]},
{"PhoneNumber":1001,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205961+03:00","isOwner":false}]},
{"PhoneNumber":1002,"Messages":[{"Text":"SELAAAAM","GPS":{"X":0.0,"Y":0.0,"Z":0.0},"Date":"2020-08-25T01:15:27.3205964+03:00","isOwner":false}]}]}

*/ 
