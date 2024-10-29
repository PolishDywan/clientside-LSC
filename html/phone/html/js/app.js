var app = new Vue({
    el: '#app',
    data: {
        backgroundUrl: 'https://lifeinvader.allocarpe.com/api/background/back001.jpg',
        services: [{
                imageUrl: './img/contacts-photo/police.png',
                name: 'Police',
                phonenumber: 911
            },
            {
                imageUrl: './img/contacts-photo/lssd.png',
                name: 'LSSD',
                phonenumber: 910
            },
            {
                imageUrl: './img/contacts-photo/ems.png',
                name: 'EMS',
                phonenumber: 912
            },
            {
                imageUrl: './img/contacts-photo/ems.png',
                name: 'Pompier',
                phonenumber: 913
            },
            {
                imageUrl: './img/contacts-photo/garage.png',
                name: 'Bennys',
                phonenumber: 555
            },
            {
                imageUrl: './img/contacts-photo/garage.png',
                name: 'Garage GT',
                phonenumber: 666
            },
            {
                imageUrl: './img/contacts-photo/taxi.png',
                name: 'Taxi',
                phonenumber: 444
            },
            {
                imageUrl: './img/contacts-photo/wznews.png',
                name: 'Weazel News',
                phonenumber: 147
            }
        ],
        app: [{
                name: 'Galerie',
                imageUrl: './img/icons/photos.png',
                selectedApp: 'galerie'
            },
            {
                name: 'Camera',
                imageUrl: './img/icons/camera.png',
                selectedApp: 'camera'
            },
            {
                name: 'Réglages',
                imageUrl: './img/icons/settings.png',
                selectedApp: 'setting',
                selectedSubApp: 'main'
            },
            {
                name: 'Banque',
                imageUrl: './img/icons/wallet.png',
                selectedApp: 'bank',
                selectedSubApp: 'history'
            },
            {
                name: 'Contacts',
                imageUrl: './img/icons/contacts.png',
                selectedApp: 'call',
                selectedSubApp: 'contact'
            },
            {
                name: 'Police',
                imageUrl: './img/contacts-photo/police.png',
                selectedApp: 'lspd',
                selectedSubApp: 'main',
                faction: [
                    'lspd',
                    'lssd'
                ]
            },
            {
                name: 'LifeInvader',
                imageUrl: './img/icons/icon_invader.png',
                selectedApp: 'lifeinvader'
            },
            {
                name: 'Publicité',
                imageUrl: './img/contacts-photo/wznews.png',
                selectedApp: 'publicity'
            },
        ],
        subApp: [{
                name: 'Appel',
                imageUrl: './img/icons/call.png',
                selectedApp: 'call',
                selectedSubApp: 'keypad',
                badge: 0
            },
            {
                name: 'Messages',
                imageUrl: './img/icons/messages.png',
                selectedApp: 'message',
                selectedSubApp: 'allMessage',
                badge: 0
            },
            {
                name: 'Banque',
                imageUrl: './img/icons/wallet.png',
                selectedApp: 'bank',
                selectedSubApp: 'history'
            },
            {
                name: 'Réglages',
                imageUrl: './img/icons/settings.png',
                selectedApp: 'setting',
                selectedSubApp: 'main',
                badge: 0
            },
        ],
        background: [{
                link: 'https://lifeinvader.allocarpe.com/api/background/back001.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back002.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back003.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back004.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back005.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back006.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back007.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back008.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back009.png'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back010.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back011.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back012.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back013.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back014.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back015.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back016.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back017.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back018.png'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back019.jpg'
            },
            {
                link: 'https://lifeinvader.allocarpe.com/api/background/back022.jpg'
            },
        ],
        camera: '',
        linkApi: 'https://lifeinvader.allocarpe.com/api/images/',
        contacts: [],
        appSelected: '',
        subAppSelected: '',
        inputNumber: '',
        inputNumberContact: '',
        inputSearchContact: '',
        callService: false,
        showingContact: false,
        editingContact: false,
        blocMsg: [],
        listStackedMessages: [],
        intranetWanteds: [],
        intranetVehicles: [],
        pictures: [{
            content: '1611626786.jpeg'
        }],
        faction: '',
        myName: '',
        myAccountSolde: '3501235',
        myBankNumber: '57954458183',
        myPosition: '',
        myHistory: [],
        player: null,
        currentMessage: null,
        inputMessage: '',
        inputPhoneMessage: '',
        newInputPhoneMessage: null,
        load: true,
        notReadedMessages: 0,
        hours: 0,
        minutes: 0,
        canTakePicture: true,
        newContact: {
            name: '',
            phonenumber: '',
            note: '',
            banknumber: ''
        },
        newVirement: {
            numero: null,
            communication: null,
            nom: null,
            montant: null
        },
        inCalling: {
            name: '',
            phonenumber: '',
            displaytime: ''
        },
        runClock: null,
        counter: 0,
        selectedPicture: '',
        selfie: 0,
        pictureShowContact: null,
        searchVehicle: '',
        searchWanted: '',
        publicityTitle: '',
        publicityTexte: '',
        publicityPrice: 250,
        modalSmsMenu: false
    },
    computed: {
        moment: () => moment,
        filteredListContact: function () {
            return this.contacts.filter((item) => {
                return item.name.toLowerCase().includes(this.inputSearchContact.toLowerCase()) || item.phonenumber.toString().includes(this.inputSearchContact);
            });
        },
        stackMessagebyNumber: function () {
            let listStackedMessages = [];
            this.subApp[1].badge = 0;
            this.blocMsg.forEach((message) => {
                message.stacked = 0;
                if (!message.readed && this.player.phonenumber == message.to) {
                    this.subApp[1].badge++;
                }
                let bigestTimestamp = 0;
                let timeStamp = Math.round(new Date(message.dateAt).getTime() / 1000);
                if (timeStamp > bigestTimestamp) {
                    bigestTimestamp = timeStamp;
                }
                listStackedMessages.forEach((stackMsg) => {
                    if (!stackMsg) return;
                    if (message.to == this.player.phonenumber && message.from == stackMsg.phonenumber || message.from == this.player.phonenumber && message.to == stackMsg.phonenumber) {
                        stackMsg.messages.push(message);
                        message.stacked = 1;
                        stackMsg.bigestTimestamp = timeStamp;
                    }
                });
                if (message.stacked == 0) {
                    let contact = this.contacts.filter((contact) => contact && (contact.phonenumber == message.from || contact.phonenumber == message.to));
                    let name, phonenumber;
                    if (contact.length) {
                        name = contact[0].name;
                        phonenumber = contact[0].phonenumber;
                    } else {
                        name = phonenumber = message.from == this.player.phonenumber ? message.to : message.from;
                    }
                    let obj = {
                        name,
                        phonenumber: phonenumber,
                        messages: [
                            message
                        ],
                        bigestTimestamp
                    };
                    listStackedMessages.push(obj);
                }
            });
            listStackedMessages.sort((a, b) => b.bigestTimestamp - a.bigestTimestamp);
            if (this.currentMessage) {
                let message = listStackedMessages.find((e) => e.name === this.currentMessage.name);
                this.changeStateReadedMessage(message);
                this.currentMessage = message;
            }
            return listStackedMessages;
        },
        filteredListVehicles: function () {
            return this.intranetVehicles.filter((item) => {
                return item.plate.toLowerCase().includes(this.searchVehicle.toLowerCase()) || item.model.toLowerCase().includes(this.searchVehicle.toLowerCase());
            });
        },
        filteredListWanted: function () {
            return this.intranetWanteds.filter((item) => {
                return item.name.toLowerCase().includes(this.searchWanted.toLowerCase());
            });
        }
    },
    methods: {
        sendPublicity: function () {
            alt.emit('narcoPhone:SendAnnonce', 'CHAR_LIFEINVADER', this.publicityTitle, this.publicityTexte, this.publicityPrice);
            this.publicityTitle = '';
            this.publicityTexte = '';
            this.selectedApp('', '');
        },
        sendPictureShowContact: function (item) {
            this.pictureShowContact = item;
        },
        selectPicture: function (item) {
            this.selectedPicture = item;
        },
        changeBackground: function (item) {
            this.backgroundUrl = item.link;
            this.selectedApp('', '');
        },
        deleteScreen: function (id) {
            let pictureIndex = this.pictures.findIndex((e) => e.id == id);
            this.pictures.splice(pictureIndex, 1);
            this.selectPicture(null);
            alt.emit('myPhone:deletePicture', id);
        },
        deleteContact: function (id) {
            let contactIndex = this.contacts.findIndex((e) => e.id == id);
            this.contacts.splice(contactIndex, 1);
            this.showingContact = null;
            this.selectedApp('call', 'contact');
            alt.emit('myPhone:deleteContact', id);
        },
        setSelfie: function () {
            if (this.selfie) {
                this.selfie = 0;
                alt.emit('MyPhone:changeCameraMod', this.selfie);
            } else {
                this.selfie = 1;
                alt.emit('MyPhone:changeCameraMod', this.selfie);
            }
        },
        sendNewContact: function () {
            if (this.newContact.name.length && this.newContact.phonenumber.length) {
                if ('alt' in window) {
                    alt.emit('MyPhone:newContact', this.newContact.name, this.newContact.phonenumber, this.newContact.note, this.newContact.banknumber);
                } else {}
                this.contacts.push(this.newContact);
                this.newContact = {
                    name: '',
                    phonenumber: '',
                    note: '',
                    banknumber: ''
                };
                this.selectedApp('call', 'contact');
            }
        },
        sendToVirement: function (number) {
            // console.log(number);
            this.selectedApp('bank', 'virement');
            this.newVirement.numero = number;
        },
        modifyContact: function (oldcontact) {
            let indexContact;
            if ('alt' in window) {
                indexContact = this.contacts.findIndex((e) => e && e.id == oldcontact.id);
            } else {
                indexContact = this.contacts.findIndex((e) => e && e.name == oldcontact.name && e.ownernumber == this.player.phonenumber);
            }
            if (indexContact == -1) return;
            let data = {
                name: oldcontact.name,
                phonenumber: oldcontact.phonenumber,
                ownernumber: this.player.phonenumber,
                banknumber: oldcontact.banknumber,
                note: oldcontact.note
            };
            if (this.newContact.name.length) {
                this.contacts[indexContact].name = this.newContact.name;
                data.name = this.newContact.name;
            }
            if (this.newContact.phonenumber.length) {
                this.contacts[indexContact].phonenumber = this.newContact.phonenumber;
                data.phonenumber = this.newContact.phonenumber;
            }
            if (this.newContact.banknumber.length) {
                this.contacts[indexContact].banknumber = this.newContact.banknumber;
                data.banknumber = this.newContact.banknumber;
            }
            if (this.newContact.note.length) {
                this.contacts[indexContact].note = this.newContact.note;
                data.note = this.newContact.note;
            }
            this.showingContact = null;
            this.newContact = {
                name: '',
                phonenumber: '',
                note: ''
            };
            this.selectedApp('call', 'contact');
            if ('alt' in window) {
                alt.emit('myPhone:UpdateContact', data, oldcontact);
            }
        },
        takeScreenShot: function () {
            if (!this.canTakePicture) return;
            this.canTakePicture = false;
            alt.emit('myPhone:TakeScreenShot');
        },
        selectedApp: function (selectedApp, selectedSubApp = 0) {
            if (selectedApp != 'call' && (selectedSubApp != 'contact' || selectedSubApp != 'showingContact' || selectedSubApp != 'editContact')) {
                this.showingContact = null;
            }
            // if (selectedApp == 'camera'){
            //   if ('alt' in window) {
            //       alt.emit('myPhone:openSelfView')
            //   }
            // } else {
            //   if ('alt' in window) {
            //       alt.emit('myPhone:closeSelfView')
            //   }
            // }
            if (selectedApp == 'bank') {
                if (!this.myBankNumber) return;
            } else if (selectedApp == '' || selectedApp == 'setting') {} else {
                if (this.player.phonenumber == '' || this.player.phonenumber == 0) return;
            }
            this.appSelected = selectedApp;
            if (selectedSubApp) {
                this.subAppSelected = selectedSubApp;
            }
        },
        showContact: function (item) {
            this.showingContact = item;
        },
        removeSim: function () {
            alt.emit('Uphone:RemoveSim');
        },
        formatPrice: function (price) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            return formatter.format(price);
        },
        sendVirement: function () {
            let virementNumero = this.newVirement.numero;
            let virementMontant = Number(this.newVirement.montant);
            if (virementMontant > this.myAccountSolde) return;
            if (isNaN(virementNumero)) return console.log('virementnumer');
            if (String(virementNumero).length != 11) return console.log('virementnumero');
            if (this.newVirement.communication == '') return console.log('virementcom');
            if (Number.isInteger(virementMontant) == false) return console.log('montant');
            if ('alt' in window) {
                alt.emit('myPhone:requestVirement', virementNumero, this.newVirement.communication, this.newVirement.nom, virementMontant);
            }
            this.selectedApp('bank', 'history');
            this.myHistory.push({
                by: this.myBankNumber,
                to: virementNumero,
                content: this.newVirement.communication,
                amount: virementMontant,
                type: 2,
                dateAt: new Date().toISOString()
            });
            this.myAccountSolde = this.myAccountSolde - virementMontant;
            this.newVirement = {
                numero: null,
                communication: null,
                nom: null,
                montant: null
            };
        },
        addInputNumber: function (number) {
            if (this.inputNumber.length > 5) return;
            this.inputNumber += number;
            let name = this.contacts.filter((e) => e && e.phonenumber == this.inputNumber);
            if (name.length) {
                this.inputNumberContact = name[0].name;
            } else {
                this.inputNumberContact = '';
            }
        },
        removeInputNumber: function () {
            if (this.inputNumber.length == 0) return;
            this.inputNumber = this.inputNumber.slice(0, -1);
            let name = this.contacts.filter((e) => e && e.phonenumber == this.inputNumber);
            if (name.length) {
                this.inputNumberContact = name[0].name;
            } else {
                this.inputNumberContact = '';
            }
        },
        updateContact: function (item) {
            this.editingContact = true;
        },
        showCallingServices: function (item) {
            this.callService = item;
        },
        endCall: function (number) {
            this.selectedApp('', '');
            this.stopWatch();
            alt.emit('narcoPhone:endCall', this.player.phonenumber, number);
        },
        startWatch: function () {
            this.runClock = setInterval(this.displayTime, 1000);
        },
        stopWatch: function () {
            clearInterval(this.runClock);
            this.counter = 0;
        },
        displayTime: function () {
            this.inCalling.displaytime = moment().hour(0).minute(0).second(this.counter++).format('HH : mm : ss');
        },
        completeIncalling: function (number, text = '') {
            let haveNameContact = this.contacts.find((e) => e.phonenumber == number);
            this.inCalling = {
                name: haveNameContact ? haveNameContact.name : number,
                phonenumber: number,
                displaytime: text
            };
        },
        acceptCall: function (number) {
            this.startWatch();
            this.completeIncalling(number);
            this.selectedApp('call', 'inCalling');
            alt.emit('narcoPhone:answerCall', this.player.phonenumber, number);
        },
        callNumber: function (number) {
            if (number == 0) return false;
            if (number == '') return false;
            let services = this.services.find((e) => e.phonenumber == number);
            if (services) {
                alt.emit('narcoPhone:toWebview', number);
                alt.emit('Myphone:Close');
                this.load = false;
            } else {
                this.selectedApp('call', 'inCalling');
                this.completeIncalling(number, 'Sonnerie en cours..');
                alt.emit('narcoPhone:toWebview', number);
            }
        },
        getInitialName: function (name) {
            let editName = name;
            console.log(editName);
            let usedName;
            if (editName) {
                let compactedName = editName.split(' ');
                usedName = `${compactedName[0].split('')[0]}${compactedName[1].split('')[0]}`;
            } else {
                let compactedName1 = editName.split(' ');
                usedName = compactedName1[0].split('')[0];
            }
            return usedName;
        },
        isNotReaded: function (arrayItem) {
            let readed = arrayItem.filter((e) => e && e.readed == 0 && this.player.phonenumber == e.to);
            return readed.length ? true : false;
        },
        formatEmphasisText: function (text, maxCharacter) {
            let taille = text.length;
            if (taille > maxCharacter) {
                let replace = text.slice(maxCharacter, taille);
                text = text.replace(replace, '').replace(/(\r\n|\n|\r)/gm, '');
            }
            return text;
        },
        getTimeFromDate(timestamp) {
            var date = new Date(timestamp * 1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var days = date.getDay();
            var month = date.getMonth();
            var year = date.getFullYear();
            return year + month + days;
        },
        readingMessage: function (items) {
            if (items) {
                this.currentMessage = items;
                this.inputPhoneMessage = items.phonenumber;
                this.appSelected = 'message';
                this.subAppSelected = 'oneMessage';
                this.scrollToBottom();
                alt.emit('myPhone:changeReadStatus', items);
                this.changeStateReadedMessage(items);
            } else {
                this.currentMessage = null;
                this.inputPhoneMessage = null;
                this.appSelected = 'message';
                this.subAppSelected = 'newMessage';
            }
        },
        changeStateReadedMessage: function (items) {
            let newReadedMesage = false;
            items.messages.forEach((e, index) => {
                if (!e) return;
                if (e.readed) return;
                let messagesIndex = this.blocMsg.findIndex((i) => i && i.readed == 0 && i.id == e.id);
                if (messagesIndex == -1) return;
                this.blocMsg[messagesIndex].readed = 1;
                newReadedMesage = true;
            });
            if (newReadedMesage) {
                this.stackMessagebyNumber;
            }
        },
        scrollToBottom: function () {
            setTimeout(() => {
                if (!this.$el) return;
                var container = this.$el.querySelector('.messages-container');
                if (!container) return;
                container.scrollTop = container.scrollHeight;
            }, 150);
        },
        sendMessage: function () {
            if (!this.inputMessage.length) return;
            const regex = new RegExp('^\\d+$');
            if (!regex.test(this.inputPhoneMessage) && this.inputPhoneMessage.length <= 6) return;
            let message = {
                from: this.player.phonenumber,
                to: this.inputPhoneMessage,
                content: this.inputMessage,
                dateAt: new Date().toISOString(),
                readed: 0,
                visible: JSON.stringify({
                    from: 1,
                    to: 1
                })
            };
            this.inputMessage = '';
            if ('alt' in window) {
                alt.emit('MyPhone:newSms', message.from, message.to, message.content, message.dateAt, message.readed, message.visible);
            }
            this.blocMsg.push(message);
            this.stackMessagebyNumber;
            if (!this.currentMessage) {
                this.selectedApp('message', 'allMessage');
            }
            this.scrollToBottom();
        },
        sendMessageFromContact: function (number) {
            let currentMessage = this.stackMessagebyNumber.find((e) => e && e.phonenumber == number);
            this.readingMessage(currentMessage);
            this.inputPhoneMessage = number;
        },
        deleteMessages: function (msgs) {
            if ('alt' in window) {
                alt.emit('MyPhone:deleteMessage', JSON.stringify(msgs));
            }
            msgs.forEach((msg) => {
                msg.visible = JSON.parse(msg.visible);
                let source = this.player.phonenumber == msg.from ? 'from' : 'to';
                msg.visible[source] = 0;
            });
            this.currentMessage = null;
            this.spliceDeletedMessages();
            this.stackMessagebyNumber;
            this.selectedApp('message', 'allMessage');
        },
        spliceDeletedMessages: function () {
            let toBeDelet = [];
            this.blocMsg.forEach((msg, index) => {
                if (!msg) return;
                let visible;
                try {
                    visible = JSON.parse(msg.visible);
                } catch (error) {
                    visible = msg.visible;
                }
                if (!visible) return;
                if (msg.from == this.player.phonenumber) {
                    if (visible && visible.from == 0) {
                        toBeDelet.push(index);
                    }
                } else if (msg.to == this.player.phonenumber) {
                    if (visible && visible.to == 0) {
                        toBeDelet.push(index);
                    }
                }
            });
            for (let i = toBeDelet.length - 1; i >= 0; i--) this.blocMsg.splice(toBeDelet[i], 1);
        },
        giveMyPosition: function (position) {
            let text = position;
            alt.emit('phone:SendPosition', Number(text.split(' ')[3]), Number(text.split(' ')[5]), Number(text.split(' ')[7]));
        },
        sendPosition: function (number) {
            const regex = new RegExp('^\\d+$');
            if (!regex.test(number) && number.length <= 6) return;
            let from = this.player.phonenumber;
            let to = number;
            let dateAt = new Date().toISOString();
            let position = JSON.parse(this.myPosition);
            let content = `Ma position: X: ${position.x.toFixed(2)} Y: ${position.y.toFixed(2)} Z: ${position.z.toFixed(2)}`;
            let readed = 1;
            let visible = JSON.stringify({
                from: 1,
                to: 1
            });
            let message = {
                from,
                to,
                content,
                dateAt,
                readed,
                visible
            };
            if ('alt' in window) {
                alt.emit('MyPhone:newSms', from, to, content, dateAt, readed);
            } else {
                console.log(message);
            }
            this.blocMsg.push(message);
            this.stackMessagebyNumber;
            this.showingContact = null;
            this.selectedApp('call', 'contact');
        },
        sendPictureSms: function (picture, number) {
            const regex = new RegExp('^\\d+$');
            if (!regex.test(number) && number.length <= 6) return;
            let from = this.player.phonenumber;
            let to = number;
            let dateAt = new Date().toISOString();
            let content = `Image:${picture}`;
            let readed = 1;
            let visible = JSON.stringify({
                from: 1,
                to: 1
            });
            let message = {
                from,
                to,
                content,
                dateAt,
                readed,
                visible
            };
            if ('alt' in window) {
                alt.emit('MyPhone:newSms', from, to, content, dateAt, readed);
            } else {
                console.log(message);
            }
            this.blocMsg.push(message);
            this.stackMessagebyNumber;
            this.showingContact = null;
            this.selectPicture(null);
            this.sendPictureShowContact(null);
            this.selectedApp('message', 'allMessage');
        },
        openLifeInvader: function () {
           
        }
    },
    created: function () {
        moment.locale('fr');
        if ('alt' in window) {
            setTimeout(() => {
                alt.emit('MyPhone:setupComplete');
            }, 500);
            alt.on('Phone:SendInfo', (messagesArray, contactArray, id, name, phonenumber, bank, numerobank, position, historybank, intranet, vehicles, pictures, faction) => {
                this.myHistory.length = 0;
                historybank.forEach((item) => {
                    if (item.by == numerobank) {
                        this.myHistory.push(item);
                    }
                });
                this.player = {
                    id,
                    name,
                    phonenumber
                };
                this.blocMsg.length = 0;
                messagesArray.forEach((msg) => {
                    this.blocMsg.push(msg);
                });
                this.contacts.length = 0;
                contactArray.forEach((contact) => {
                    this.contacts.push(contact);
                });
                this.pictures = [];
                pictures.forEach((e) => {
                    this.pictures.push(e);
                });
                if (faction == 'lspd' || faction == 'lssd') {
                    this.faction = faction;
                    this.intranetWanteds.length = 0;
                    intranet.forEach((e) => {
                        this.intranetWanteds.push(e);
                    });
                    this.intranetVehicles.length = 0;
                    vehicles.forEach((e) => {
                        this.intranetVehicles.push({
                            model: e.model,
                            primaryColor: e.primary,
                            secondaryColor: e.secondary,
                            plate: e.plate,
                            proprio: e.proprio
                        });
                    });
                }
                this.spliceDeletedMessages();
                this.stackMessagebyNumber;
                this.myName = name.replace('_', ' ');
                this.myAccountSolde = bank;
                this.myBankNumber = numerobank;
                this.myPosition = `${position}`;
                if (this.appSelected == 'message' && this.subAppSelected == 'oneMessage') {
                    this.scrollToBottom();
                }
            });
            alt.on('myPhone:setScreen', (screen) => {
                this.canTakePicture = true;
                this.camera = `${this.linkApi}${screen}`;
            });
            alt.on('inApp:ProposeCall', (number) => {
                this.completeIncalling(number);
                this.selectedApp('call', 'proposeCall');
            });
            alt.on('myPhone:StartTimer', () => {
                this.startWatch();
            });
            alt.on('myPhone:setTime', (heure, minute) => {
                this.hours = heure;
                this.minutes = minute;
            });
            alt.on('Phone:Hide', () => {
                this.load = false;
                app.$forceUpdate();
            });
            alt.on('Phone:Show', () => {
                this.load = true;
                app.$forceUpdate();
            });
            alt.on('MyPhone:stopCall', () => {
                this.stopWatch();
                this.selectedApp('', '');
            });
            window.addEventListener('keyup', (e) => {
                if (e.keyCode === 27) {
                    alt.emit('Myphone:Close');
                    app.$data.load = false;
                }
            });
        } else {
            let fakeContact = [{
                    id: 1,
                    name: 'Nolyo Nolyo NolyoNolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'aM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 1,
                    name: 'Nolyo',
                    phonenumber: '555790',
                    ownerNumber: '555791',
                    note: 'test'
                },
                {
                    id: 2,
                    name: 'JM',
                    phonenumber: '555792',
                    ownerNumber: '555791',
                    note: 'test'
                },
            ];
            let fakeMessages = [{
                    id: 1,
                    from: '555790',
                    to: '555791',
                    content: 'Salut Narco, Salut Narco, Salut Narco, Salut Narco, Salut Narco, Salut Narco, Salut Narco, Salut Narco, Salut Narco,Salut Narco,',
                    dateAt: '2020-01-30T19:05:48.804Z',
                    readed: 0,
                    visible: JSON.stringify({
                        from: 1,
                        to: 1
                    })
                },
                {
                    id: 2,
                    from: '555791',
                    to: '555790',
                    content: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooool co, Salut Narco,',
                    dateAt: '2021-01-08T21:41:06.743Z',
                    readed: 1,
                    visible: JSON.stringify({
                        from: 1,
                        to: 1
                    })
                },
                {
                    id: 3,
                    from: '555792',
                    to: '555791',
                    content: 'Salut Narco,',
                    dateAt: '2020-01-30T19:05:48.804Z',
                    readed: 1,
                    visible: JSON.stringify({
                        from: 0,
                        to: 1
                    })
                },
                {
                    id: 4,
                    from: '555791',
                    to: '555792',
                    content: 'Yo mec',
                    dateAt: '2020-06-30T19:06:45.804Z',
                    readed: 0,
                    visible: JSON.stringify({
                        from: 1,
                        to: 1
                    })
                },
                {
                    id: 5,
                    from: '66666',
                    to: '555791',
                    content: 'Yo mec',
                    dateAt: '2020-06-30T19:06:45.804Z',
                    readed: 1,
                    visible: JSON.stringify({
                        from: 1,
                        to: 1
                    })
                },
                {
                    id: 5,
                    from: '555791',
                    to: '66666',
                    content: 'Yo mec',
                    dateAt: '2020-06-30T19:06:45.804Z',
                    readed: 1,
                    visible: JSON.stringify({
                        from: 1,
                        to: 1
                    })
                },
            ];
            let fakeHistory = [{
                    by: '57954458183',
                    to: '57954458183',
                    content: 'Salaire Chief',
                    ammount: 750,
                    type: 1,
                    dateAt: '2021-01-08T12:28:06.121Z'
                },
                {
                    by: '57954458183',
                    to: '57954458183',
                    content: 'Salaire Chief',
                    ammount: 750,
                    type: 2,
                    dateAt: '2021-01-08T12:28:06.121Z'
                },
                {
                    by: '57954458183',
                    to: '57954458183',
                    content: 'Salaire Chief',
                    ammount: 750,
                    type: 0,
                    dateAt: '2021-01-08T12:28:06.121Z'
                }
            ];
            let fakePicture = [{
                    id: 1,
                    content: '1611182670.jpeg',
                    ownernumber: '856919'
                },
                {
                    id: 2,
                    content: '1611182702.jpeg',
                    ownernumber: '856919'
                },
                {
                    id: 3,
                    content: '1611182702.jpeg',
                    ownernumber: '856919'
                },
                {
                    id: 4,
                    content: '1611182702.jpeg',
                    ownernumber: '856919'
                },
            ];
            fakePicture.forEach((e) => {
                this.pictures.push(e);
            });
            fakeHistory.forEach((e) => {
                this.myHistory.push(e);
            });
            this.player = {
                id: 1,
                name: 'Antonio_Ricardo',
                phonenumber: 147852
            };
            fakeContact.sort((a, b) => a.name.localeCompare(b.name));
            fakeContact.forEach((e) => {
                this.contacts.push(e);
            });
            fakeMessages.forEach((e) => {
                this.blocMsg.push(e);
            });
        }
    }
});