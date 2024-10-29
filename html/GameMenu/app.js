$(document).ready(function() {
    //$('.ui.vertical.menu').transition('slide left');
    if ('alt' in window) {
        $('#gui').attr('class', 'ui vertical menu transition hidden');
    }
    alt.on('GUI:ClearAll', function() {
        $('.ui.vertical.menu').empty();
        $('#gui').attr('class', 'ui vertical menu transition hidden');
        $('.uimenu').hide();
    });
    alt.on('GUI:CreateMenu', function(data) {
        $('.uimenu').show();
        $('.ui.vertical.menu').empty();
        $('#gui').attr('class', 'ui vertical menu transition hidden');
        //$('.ui.vertical.menu').transition('slide left');
        let o = JSON.parse(data);
        //$('.ui.vertical.menu').css('background-color', o.color);
        $('.ui.vertical.menu').append(`
        <img class="disabled medium ui image" src="${o.image}">
        `);
        if (o.info) {
            $('.ui.vertical.menu').append(`
            <div class="ui attached message">
                ${o.info}

            </div>
            `);
        }
        o.guiMenu.forEach((e)=>{
            let toolTip = "";
            if (e.popup) toolTip = "data-content='" + e.popup.split("|")[0] + "' data-variation='basic' data-position='left center'";
            $('.ui.vertical.menu').append(`
            <a class="item" data-triger="${e.triger}" data-value="${e.value}" ${toolTip} style="background-color:${o.color}">
                ${e.name}                
            </a>
            `);
        });
        $('.ui.vertical.menu').transition('slide left');
        $('.item').popup();
        $('.item').click(function() {
            alt.emit('GUI:MenuSelect', $(this).data("triger"), $(this).data("value"));
            return;
        });
    });
});
