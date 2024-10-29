let button_cooldown_interval = 1000, button_cooldown = Date.now() - button_cooldown_interval, isLocked = false;
let notifications = [], notificationTimeout, activePanel;
let textbox;
$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        if (canClickButton()) {
            alt.emit('HelpPage:Close');
        }
    }
});
$(document).ready(function() {
    textbox = {
        main: $('#textbox'),
        title: $('#title-text'),
        header: $('#header-text'),
        content: $('#box-content')
    };
    activePanel = $('.panel').filter(function() {
        return $(this).css('display') !== 'none';
    }).first();
    $(document).on('click', '.section', function(e) {
        if (getLocked() === false) {
            let section = $(this);
            onSectionClick(section);
        }
    });
    $(document).on('click', '.checkbox', function(e) {
        let checkbox = $(this);
        onCheckboxClick(checkbox);
    });
    alt.emit('HelpPage:Ready');
    alt.on('HelpPage:ShowAdmin', (lvl)=>{
        if (lvl >= 1) {
            $('#a1').show();
            $('#admins').show();
            if (lvl >= 2) {
                $('#a2').show();
            }
            if (lvl >= 3) {
                $('#a3').show();
            }
            if (lvl >= 4) {
                $('#a4').show();
            }
            if (lvl >= 5) {
                $('#a5').show();
            }
            if (lvl >= 6) {
                $('#a6').show();
            }
        }
    });
});
// Function determines whether the user is allowed to click a button.
function canClickButton() {
    if (Date.now() - button_cooldown_interval < button_cooldown) {
        return false;
    }
    button_cooldown = Date.now();
    return true;
}
// Function is called to set the locked state.
function setLocked(locked) {
    $('.section > input').prop('disabled', isLocked = locked);
}
// Function is called to get the locked state.
function getLocked() {
    return isLocked;
}
// Function is called when the user triggers a panel switch.
function onSectionClick(section) {
    if (doesAttributeExist(section, 'target-panel')) {
        let panel = $(section.attr('target-panel'));
        switchToPanel(panel);
    }
}
// Function is called when the user clicks a checkbox.
function onCheckboxClick(checkbox) {
    if (checkbox.hasClass('radio')) {
        let parent = checkbox.parents('.checkbox-group').first();
        parent.find('.radio').removeClass('checked');
        parent.find('.radio').children('.fa').removeClass('fa-check-square-o').addClass('fa-square-o');
        checkbox.addClass('checked');
        checkbox.children('.fa').removeClass('fa-square-o').addClass('fa-check-square-o');
    } else if (checkbox.hasClass('checked')) {
        checkbox.removeClass('checked');
        checkbox.children('.fa').removeClass('fa-check-square-o').addClass('fa-square-o');
    } else {
        checkbox.addClass('checked');
        checkbox.children('.fa').removeClass('fa-square-o').addClass('fa-check-square-o');
    }
}
// Function controls the transition between two panels.
function switchToPanel(panel, locked = false) {
    if (activePanel.is(panel) === false) {
        if (activePanel.length == 0) {
            panel.fadeIn(200);
            activePanel = panel;
        } else {
            activePanel.hide(0, ()=>{
                panel.fadeIn(200);
                activePanel = panel;
            });
        }
        $('.section').each((index, section)=>{
            section = $(section);
            if (doesAttributeExist(section, 'target-panel') && panel.attr('id') === section.attr('target-panel').slice(1)) {
                section.find('input').first().prop('checked', true);
                return;
            }
        });
        setTimeout(()=>setLocked(locked), 250);
    }
}
// Function checks if an attribute exist within an element and returns a boolean.
function doesAttributeExist(element, attribute) {
    let input = element.attr(attribute);
    return typeof input !== typeof undefined;
}
// Function is called to update the textbox text and display it.
function updateTextbox(header, title, content, pattern) {
    textbox.main.fadeOut(400, ()=>{
        if (pattern) {
            let replacement = '<span style="background: red;">$&</span>';
            content = content.replace(new RegExp(pattern, 'ig'), replacement);
        }
        textbox.header.text(header);
        textbox.title.html(title);
        textbox.content.html(content);
        textbox.main.fadeIn(400);
        mp.trigger('SHOW_CURSOR', true);
    });
}