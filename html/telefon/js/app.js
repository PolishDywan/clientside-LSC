Vue.config.devtools = false;
Vue.prototype.window = window;
Vue.config.silent = true;
const app = new Vue({
    el: '#app',
    data() {
        return {
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0
            },
            selection: 15,
            data: {
                contactList: [{
                        Name: "Sarah",
                        Number: 99170
                    },
                    {
                        Name: "Verusha",
                        Number: 41507
                    }
                ],
                currentCall: {
                    callTarget: -1,
                    callTargetName: "",
                    Status: 0,
                    hoparlor: false
                },
                messageList: null,
                currentMessaging: 0,
                currentMessage: null,
                bankAccount: [{
                        AccountNo: 2133123123,
                        Money: 21111
                    },
                    {
                        AccountNo: 21212122,
                        Money: 32222
                    }
                ],
                currentSound: new Audio('./sounds/number.mp3'),
                gallery: null,
                notificati: [],
                advir: [],
                settings: {
                    paper: "https://fisoloji.com/wp-content/uploads/2020/07/colorful-spray-and-man-black-phone-wallpaper-11-576x1024.jpg",
                    quite: 0,
                    fly: 0
                }
            },
            navOptions: [
                'Homepage',
                'numberpage',
                'incomingcall',
                'incall',
                'messages',
                'usermessage',
                'contactlist',
                'addeditcontact',
                'advertisement',
                'lifeinvader',
                'bankmain',
                'sendmoney',
                'newmessage',
                'gallery',
                'bourse',
                'lockpage',
                'calculator',
                'settings',
                'tax'
            ]
        };
    },
    computed: {
        getTabComponent: function () {
            return `tab-${this.navOptions[this.selection].toLowerCase()}`;
        }
    },
    methods: {
        //#region DRAG EVENTS
        dragMouseDown: function (event) {
            event.preventDefault();
            // get the mouse cursor position at startup:
            this.positions.clientX = event.clientX;
            this.positions.clientY = event.clientY;
            document.onmousemove = this.elementDrag;
            document.onmouseup = this.closeDragElement;
        },
        elementDrag: function (event) {
            event.preventDefault();
            this.positions.movementX = this.positions.clientX - event.clientX;
            this.positions.movementY = this.positions.clientY - event.clientY;
            this.positions.clientX = event.clientX;
            this.positions.clientY = event.clientY;
            // set the element's new position:
            this.$refs.draggableContainer.style.top = this.$refs.draggableContainer.offsetTop - this.positions.movementY + 'px';
            this.$refs.draggableContainer.style.left = this.$refs.draggableContainer.offsetLeft - this.positions.movementX + 'px';
        },
        closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        },
        //#endregion
        selectPage(id) {
            this.selection = id;
            var getPhoneElement = document.querySelector('#app')
            var phoneContentElement = document.querySelector('.phoneContent')
            var phoneHeaderElement = document.querySelector('.header_area')
            var phoneBottomElement = document.querySelector('.phoneBottom-content')
            // eğer sayfa lifeInvader ise telefonu büyüt.
            if (id === 9) {
                getPhoneElement.style.width = "500px";
                getPhoneElement.style['background-size'] = '500px'
                phoneContentElement.style.width = "465px";
                phoneContentElement.style['border-radius'] = '50px 50px 0px 0px';
                phoneHeaderElement.style['margin-right'] = '20%';
                phoneBottomElement.style['margin-left'] = '10%';
            } else {
                getPhoneElement.style.width = "280px";
                getPhoneElement.style['background-size'] = '280px'
                phoneContentElement.style.width = "245px";
                phoneContentElement.style['border-radius'] = '20px';
                phoneHeaderElement.style['margin-right'] = '0';
                phoneBottomElement.style['margin-left'] = '0';
            }
        },
        updateContactList(data) {
            this.data.contactList = JSON.parse(data);
        },
        inComingCall(number1) {
            this.data.currentCall.callTarget = number1;
            let callData = this.data.contactList.find((x) => x.Number == number1);
            if (callData) {
                this.data.currentCall.callTargetName = callData.Name;
            } else {
                this.data.currentCall.callTargetName = "";
            }
            this.data.currentCall.Status = 0;
            this.selectPage(2);
            this.$root.$emit('playSound', 3);
        },
        forceCloseCall() {
            if (this.selection == 2) {
                this.selection = 0;
            }
            //this.data.currentCall.callTarget = -1;
            //this.data.currentCall.callTargetName = "";
            if (this.data.Status = 0) {
                let callData = this.data.contactList.find((x) => x.Number == number);
                let name = "";
                if (callData) {
                    name = callData.Name;
                } else {
                    name = this.data.currentCall;
                }
                this.NotifiaddNewCall(name, "1 Cevapsız arama.");
            }
            this.data.currentCall.Status = 2;
            //this.selection = 0;
            this.$root.$emit('playSound', 5);
        },
        phoneCallOpen() {
            this.data.currentCall.Status = 1;
            this.selection = 3;
            this.stopSound();
        },
        setCurrentMessage(data) {
            this.data.currentMessage = [];
            this.data.currentMessage = JSON.parse(data);
            this.selection = 5;
        },
        reloadCurrentMessage(data) {
            let obj = JSON.parse(data);
            if (this.selection == 5) {
                if (obj.Number == this.data.currentMessaging) {
                    this.$root.$emit('playSound', 7);
                    this.data.currentMessage = JSON.parse(data);
                    var container = this.$el.querySelector("#Scroll_Message");
                    container.scrollTop = container.scrollHeight;
                } else {
                    this.$root.$emit('playSound', 4);
                    let contact = this.data.contactList.find((x) => x.Number == obj.Number);
                    let name = "";
                    if (contact) {
                        name = contact.Name;
                    } else {
                        name = obj.Number;
                    }
                    this.notifi("1 Yeni Mesaj", name + " 'den bir yeni SMS geldi.", "<i class='bx bx-message-detail' ></i>", "success");
                    this.NotifiaddNewMessage(name, "1 Yeni Mesaj");
                }
            } else {
                this.$root.$emit('playSound', 4);
                let contact1 = this.data.contactList.find((x) => x.Number == obj.Number);
                let name1 = "";
                if (contact1) {
                    name1 = contact1.Name;
                } else {
                    name1 = obj.Number;
                }
                this.notifi("1 Yeni Mesaj", name1 + " 'den bir yeni SMS geldi.", "<i class='bx bx-message-detail' ></i>", "success");
                this.NotifiaddNewMessage(name1, "1 Yeni Mesaj");
            }
        },
        loadMessages(data) {
            this.data.messageList = null;
            this.data.messageList = JSON.parse(data);
        },
        setBankAccounts(data) {
            this.data.bankAccount = JSON.parse(data);
        },
        notifi(title, text, icon, color) {
            //console.log('notifi cefe geldi');
            const noti = this.$vs.notification({
                icon: icon,
                color: color,
                position: "top-right",
                title: title,
                text: text
            });
            //this.NotifiaddNewBank("Sistem", title);
        },
        playSound(id) {
            if (this.data.currentSound) {
                this.stopSound();
            }
            if (this.data.settings.quite === "1") {
                this.data.currentSound = new Audio('./sounds/vibration.mp3');
                //console.log("Ses");
            } else {
                if (id === 1) {
                    this.data.currentSound = new Audio('./sounds/number.mp3');
                } else if (id === 2) {
                    this.data.currentSound = new Audio('./sounds/number.mp3');
                } else if (id === 3) {
                    if (this.data.settings.ringtone == 0) {
                        this.data.currentSound = new Audio('./sounds/ringtone.mp3');
                    } else if (this.data.settings.ringtone == 1) {
                        this.data.currentSound = new Audio('./sounds/ringtone2.mp3');
                    } else if (this.data.settings.ringtone == 2) {
                        this.data.currentSound = new Audio('./sounds/ringtone3.mp3');
                    } else if (this.data.settings.ringtone == 3) {
                        this.data.currentSound = new Audio('./sounds/ringtone4.mp3');
                    }
                } else if (id === 4) {
                    this.data.currentSound = new Audio('./sounds/message.mp3');
                } else if (id === 5) {
                    this.data.currentSound = new Audio('./sounds/busy.mp3');
                } else if (id === 6) {
                    this.data.currentSound = new Audio('./sounds/key.mp3');
                } else if (id === 7) {
                    this.data.currentSound = new Audio('./sounds/message2.mp3');
                } else if (id === 8) {
                    this.data.currentSound = new Audio('./sounds/incall.acc');
                } else if (id === 9) {
                    this.data.currentSound = new Audio('./sounds/lock.mp3');
                }
            }
            playau = this.data.currentSound.play();
            if (playau) {
                playau.then(() => {
                    setTimeout(() => {
                        this.data.currentSound.play();
                    }, playau.duration * 1000);
                });
            }
        },
        stopSound() {
            pauseaudio = this.data.currentSound.pause();
            if (pauseaudio) {
                pauseaudio.then(() => {
                    setTimeout(() => {
                        this.data.currentSound.play();
                    }, pauseaudio.duration * 1000);
                });
            }
        },
        phoneDisplay(state) {
            if (state) {
                $('#app').show();
            } else {
                $('#app').hide();
                if (this.selection === 10 || this.selection === 11) {
                    this.selection = 15;
                }
            }
        },
        uploadPhoto(data) {
            /*axios.post("https://cors-anywhere.herokuapp.com/https://api.imgbb.com/1/upload?key=9ab5caba2a8b2bf27e112ef6121d826a&image=" + data) 
            .then((response) => {
                //console.log(JSON.stringify(response));
                console.log('bir sonuç geldi ama ne iş bir bak bakayım sen.');
                console.log(JSON.stringify(response));
            })
            .catch(function(error){
                console.log(error);
            })*/
            $.ajax({
                url: 'https://api.imgur.com/3/image',
                headers: {
                    'Authorization': 'Client-ID 84750f9a71e7c0a'
                },
                type: 'POST',
                data: {
                    'image': data
                },
                success: function (res) {
                    alt.emit('pCef:AddNewPhoto', res.data.link);
                    console.log("Resime ulaşabileceğiniz link: " + res.data.link);
                }
            });
        },
        updateAllPhotos(data) {
            this.data.gallery = JSON.parse(data);
        },
        NotifiaddNewMessage(owner1, title) {
            if (this.data.notificati === undefined) this.data.notificati = [];
            this.data.notificati.push({
                Title: title,
                Owner: "Gönderen: " + owner1
            });
        },
        NotifiaddNewCall() {
            if (this.data.notificati === undefined) this.data.notificati = [];
            this.data.notificati.push({
                Title: "Cevapsız Arama",
                Owner: "Arayan: " + owner
            });
        },
        NotifiaddNewBank(owner1, title) {
            if (this.data.notificati === undefined) this.data.notificati = [];
            this.data.notificati.push({
                Title: title,
                Owner: owner1
            });
        },
        SettingsUpdate(data) {
            if (data.length > 5) this.data.settings = JSON.parse(data);
        },
        AddAdvirsiment(text, number1) {
            this.data.advir.push({
                Title: text,
                Number: number1
            });
        },
        clearAdvirsiment() {
            this.data.advir = [];
        }
    },
    components: {},
    mounted() {
        this.$root.$on('selectPage', this.selectPage);
        this.$root.$on('getCurrentPage', this.currentPage);
        this.$root.$on('playSound', this.playSound);
        this.$root.$on('stopSound', this.stopSound);
        this.$root.$on('display', this.phoneDisplay);
        this.$root.$on('clearAdd', this.clearAdvirsiment);
        if ('alt' in window) {
            alt.on('display', this.phoneDisplay);
            alt.on('pCef:ContactList', this.updateContactList);
            alt.on('pCef:IncomingCall', this.inComingCall);
            alt.on('pCef:ForceCloseCall', this.forceCloseCall);
            alt.on('pCef:phoneCallOpen', this.phoneCallOpen);
            alt.on('pCef:LoadMessages', this.loadMessages);
            alt.on('pCef:setCurrentMessage', this.setCurrentMessage);
            alt.on('pCef:relodCurrentMessage', this.reloadCurrentMessage);
            alt.on('pCef:SetBankAccount', this.setBankAccounts);
            alt.on('pCef:SendNotifi', this.notifi);
            alt.on('pCef:Photo', this.uploadPhoto);
            alt.on('pCef:UpdateAllPhotos', this.updateAllPhotos);
            alt.on('pCef:UpdatePhoneSettings', this.SettingsUpdate);
            alt.on('pCef:AddAdvirsiment', this.AddAdvirsiment);
        }
        $('#app').hide();
    }
});