$(()=>{
    // #region CONFIG
    let isCharging = false;
    let isFlightMode = false;
    let audioVolume = 0.25;
    let audioCharge = new Audio('./audio/charge.mp3');
    audioCharge.volume = audioVolume;
    let audioClick = new Audio('./audio/click.mp3');
    audioClick.volume = audioVolume;
    let phoneCalling = new Audio('./audio/phone-calling.mp3');
    phoneCalling.volume = 0.50;
    let phoneBusy = new Audio('./audio/phone-busy.mp3');
    phoneBusy.volume = 0.50;
    let phoneRing = new Audio('./audio/telephone-ring.mp3');
    phoneRing.volume = 0.50;
    let incallInterval;
    let incallTime;
    let phoneData;
    let noSound = [
        'appChargeButton',
        'appWeatherButton',
        'appCalenderButton'
    ];
    let noAppScreen = [
        'appChargeButton',
        'appAirplaneButton',
        'appWeatherButton',
        'appCalenderButton', 
    ];
    // #endregion
    // #region EVENTS
    if ('alt' in window) {
        alt.emit('smartphone:ready');
        alt.on('smartphone:hide', ()=>{
            $('#smartphone').animate({
                bottom: '-29vw',
                opacity: '0.5'
            }, 250);
        });
        alt.on('smartphone:show', ()=>{
            $('#smartphone').animate({
                bottom: '2vw',
                opacity: '1'
            }, 250);
        });
        alt.on('Phone:HomeScreen', toggleHomeScreen);
        alt.on('smartphone:Setup', setupPhoneData);
        alt.on('addSingleContact', addSingleContact);
        alt.on('extraContentEvent', extraContectSelect);
        alt.on('outGoingCall', outGoingCall);
        alt.on('outGoingCallSucces', outGoingCallSucces);
        alt.on('IncomingCall', IncomingCall);
        alt.on('InCall', inCall);
    }
    // #endregion
    // #region general
    function updateSmartphone(data) {
        let batteryIcon = 'battery-empty';
        if (data.batteryPercent >= 25) batteryIcon = 'battery-quarter';
        if (data.batteryPercent >= 50) batteryIcon = 'battery-half';
        if (data.batteryPercent >= 75) batteryIcon = 'battery-three-quarters';
        if (data.batteryPercent >= 90) batteryIcon = 'battery-full';
        $('#battery').removeClass().addClass('fas fa-' + batteryIcon);
        $('#clock').text(data.currentTime);
        $('#appWeatherButton > i').removeClass().addClass('fas fa-' + data.weather);
        $('#appCalenderButton').text(data.date);
    }
    function toggleHomeScreen(screen = null) {
        if ($('#homeScreen').is(':visible')) {
            $('#homeScreen').hide();
            $('#appScreen').show();
            $('#appScreen > div').hide();
            $('#homeButton').show();
            if (screen) $(showScreen = '#' + screen.replace('Button', '')).show();
        } else {
            $('#homeScreen').show();
            $('#appScreen').hide();
            $('#homeButton').hide();
        }
    }
    $('#appChargeButton').click(()=>{
        audioCharge.play();
        if (isCharging) {
            isCharging = false;
            $('#battery').css('color', '#FFF');
        } else {
            isCharging = true;
            $('#battery').css('color', 'rgb(110, 255, 128)');
        }
        if ('alt' in window) alt.emit('smartphone:charge', isCharging);
    });
    $('#appAirplaneButton').click(()=>{
        if (isFlightMode) {
            isFlightMode = false;
            $('#signal').removeClass('fa-plane').addClass('fa-signal');
        } else {
            isFlightMode = true;
            $('#signal').removeClass('fa-signal').addClass('fa-plane');
        }
        if ('alt' in window) alt.emit('smartphone:flightmode', isFlightMode);
    });
    $('#homeButton').click(()=>{
        audioClick.play();
        toggleHomeScreen();
    });
    $('.app').click(function() {
        if (!noSound.includes($(this).attr('id'))) audioClick.play();
        if (!noAppScreen.includes($(this).attr('id'))) toggleHomeScreen($(this).attr('id'));
    });
    // Set Up
    function setupPhoneData(data) {
        let obj = JSON.parse(data);
        phoneData = obj;
        $('.messageList').empty();
        $('.messageList').append('<br>');
        obj.MessageList.forEach((e)=>{
            let target = e.PhoneNumber;
            let targetName = obj.ContactList.find((x)=>x.PhoneNumber === target);
            if (targetName) {
                target = targetName.ID;
            }
            $('.messageList').append(`
			<div class="ui three column doubling stackable grid container" data-messages="${e.Messages}">
				<div class="column">
					<img class="ui avatar image" src="https://devshift.biz/wp-content/uploads/2017/04/profile-icon-png-898.png">	
				</div>
				<div class="column">
					<div class="item">
						<div class="content">
						<a class="header">${target}</a>
						</div>
					</div>
				</div>
				<div class="column">
					<button class="circular ui icon button tiny">
						<i class="trash icon red"></i>
					</button>
				</div>					
			</div>
			`);
        });
        $('.contacts_content').empty();
        obj.ContactList.forEach((e)=>{
            $('.contacts_content').append(`
			<div class="person" data-ID="${e.PhoneNumber}">
				<div class="statistic">
					<div class="value">
						<i class="phone small icon"></i><span>${e.PhoneNumber}</span>
					</div>
					<div class="label">
						${e.ID}
						<div class="personExtraContent" hidden>
							<button class="circular ui icon button" data-event="call" data-number="${e.PhoneNumber}">
								<i class="phone icon green"></i>
							</button>
							<button class="circular ui icon button" data-event="message" data-number="${e.PhoneNumber}">
								<i class="mail icon blue"></i>
							</button>
							<button class="circular ui icon button" data-event="delete" data-number="${e.PhoneNumber}">
								<i class="trash icon red"></i>
							</button>									
						</div>
					</div>								
				</div>
			</div>
			`);
        });
    }
    //
    // Add Contact
    $('#addContactButton').click(()=>{
        toggleHomeScreen($(this).attr('id'));
        toggleHomeScreen('addContact');
    });
    $('#addContactSave').click(function(event) {
        alt.emit('Phone:AddContact', $('#contactName').val(), $('#contactNumber').val());
    });
    function addSingleContact(data) {
        let obj = JSON.parse(data);
        $('.contacts_content').append(`
			<div class="person">
				<div class="statistic">
					<div class="value">
						<i class="phone small icon"></i><span>${obj.PhoneNumber}</span>
					</div>
					<div class="label">
						${obj.ID}
						<div class="personExtraContent" hidden>
							<button class="circular ui icon button">
								<i class="phone icon green"></i>
							</button>
							<button class="circular ui icon button">
								<i class="mail icon blue"></i>
							</button>
							<button class="circular ui icon button">
								<i class="pencil icon yellow"></i>
							</button>
							<button class="circular ui icon button">
								<i class="trash icon red"></i>
							</button>									
						</div>
					</div>								
				</div>
			</div>
		`);
    }
    //Contact List in Events
    function extraContectSelect(event, number) {
        switch(event){
            case "call":
                alt.emit('Phone:TryCall', number);
                break;
            case "message":
                break;
            case "delete":
                alt.emit('Phone:DeleteContact', number);
                break;
        }
    }
    //
    // Call Page 
    $('#appPhoneButton').click(()=>{
        $('#appCall').show();
    });
    function outGoingCallSucces(number) {
        phoneCalling.play();
        let targetName = phoneData.ContactList.find((x)=>x.PhoneNumber === number).ID;
        if (!targetName) {
            targetName = number;
        }
        toggleHomeScreen($(this).attr('id'));
        setTimeout(function() {
            toggleHomeScreen('outGoingCall');
        }, 200);
        //toggleHomeScreen('outGoingCall');
        $('#outgoingCallTargetName').text(targetName + " şuanda meşgul.");
    }
    function outGoingCall(number, reason) {
        toggleHomeScreen($(this).attr('id'));
        setTimeout(function() {
            toggleHomeScreen('outGoingCall');
        }, 500);
        //toggleHomeScreen('outGoingCall');
        let targetName = phoneData.ContactList.find((x)=>x.PhoneNumber === number).ID;
        if (!targetName) {
            targetName = number;
        }
        switch(reason){
            case "busy":
                phoneBusy.play();
                $('#outgoingCallTargetName').text(targetName + " şuanda meşgul.");
                break;
            case "notfound":
                phoneBusy.play();
                $('#outgoingCallTargetName').text(targetName + " şuanda meşgul.");
                break;
        }
    }
    $('#outGoingCallClose').click(function(event) {
        StopSounds();
        alt.emit('Phone:CloseCall');
    });
    function IncomingCall(number) {
        phoneRing.play();
        toggleHomeScreen($(this).attr('id'));
        setTimeout(function() {
            toggleHomeScreen('incomingCall');
        }, 500);
        let targetName = phoneData.ContactList.find((x)=>x.PhoneNumber === number).ID;
        if (!targetName) {
            targetName = number;
        }
        $('#InComingCallerName').text(targetName);
    }
    $('#InComingCallAccept').click(function(event) {
        alt.emit('Phone:CallAccept');
    });
    $('#InComingCallDecline').click(function(event) {
        alt.emit('Phone:CallDecline');
    });
    function inCall(number) {
        StopSounds();
        toggleHomeScreen($(this).attr('id'));
        setTimeout(function() {
            toggleHomeScreen('inCall');
        }, 500);
        //toggleHomeScreen('inCall');
        let targetName = phoneData.ContactList.find((x)=>x.PhoneNumber === number).ID;
        if (!targetName) {
            targetName = number;
        }
        $('#incallName').text(targetName);
        incallTime = 0;
        incallInterval = setInterval(()=>{
            $('#incallTime').text(secondsToHms(incallTime));
        }, 1000);
    }
    $('#incallClose').click(function(event) {
        if (incallInterval) {
            clearInterval(incallInterval);
        }
        alt.emit("Phone:CloseCall");
    });
    // Messages Page
    $('#appMessagesButton').click(()=>{
        $('#MessageMain').show();
    });
    $('#appContactsButton').click(()=>{
        $('#contacts').show();
    });
    $('#appTest3').click(()=>{
        $('#addContact').show();
    });
    $('#appTest4').click(()=>{
        $('#outGoingCall').show();
    });
    // HTML EVENTS
    $('.contacts_content').on('click', '.person', function(event) {
        if (!$(event.target).closest('.button').length) {
            $(this).find('.personExtraContent').toggle();
        } else {
            $('.contacts_content').find('.person .button').click(function(event) {
                let callingEvent = $(this).data('event');
                let eventCallNumber = $(this).data('number');
                extraContectSelect(callingEvent, eventCallNumber);
                if (callingEvent === "delete") {
                    $(this).parent().parent().parent().parent().remove();
                }
            });
        }
    });
    function StopSounds() {
        phoneRing.pause();
        phoneRing.currentTime = 0;
        phoneBusy.pause();
        phoneBusy.currentTime = 0;
        phoneCalling.pause();
        phoneCalling.currentTime = 0;
    }
    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
    }
});
