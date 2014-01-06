require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';

    var header = $('#header'),
        page = $('.page'),
        win = $(window);

    page.each(function(page) {
        var self = $(this),
            before = self.prev();

        if(!before.length) return; // first .page

        var before_height = before.height(),
            before_top = before.position().top,
            before_zindex = before.css('z-index');

        self.css({
            top: before_height + before_top,
            'z-index': +before_zindex + 1
        });

        win.on('scroll', function(evt) {
            var thiz = $(this),
                scroll_top = thiz.scrollTop();
            if(scroll_top >= self.position().top - 106) {
                var page_data = self.data('page');
                $('.sticky .navlist')
                    .find('li[data-page="' + page_data + '"]')
                    .addClass('active')
                    .siblings().removeClass('active');
            }
        });

        console.log(self);
    });

    var last_scroll_top = 0,
        base_win_height = win.height();

    win.on('scroll', function(evt) {
        var self = $(this),
            scroll_top = self.scrollTop(),
            win_height = self.height(),
            next_el = header.next(),
            header_container = header.find('.container'),
            header_nav = header_container.find('.navlist'),
            container_position = header_container.position().top;

        var diff = base_win_height - scroll_top;

        //console.log(base_win_height, scroll_top);
        if(scroll_top + base_win_height > base_win_height) {
            var sticky_header = $('.header.sticky');

            if(header_nav.position().top + header_nav.height() + 205 <= scroll_top) {
                if(sticky_header.length) {
                    sticky_header.show();
                    return;
                }

                var sticky_html = $('<ul>').attr({
                        'class': 'head_nav navlist'
                    }).html(header_nav.html()),
                    new_div = $('<div>').attr({
                        'class': 'header sticky'
                    }).html(sticky_html).prependTo('body');
            } else {
                $('.header.sticky').hide();
            }
            
        }

        last_scroll_top = scroll_top;   
    });
    
    $('.navlist')
        .on('click', 'li', function(evt) {
            evt.preventDefault();
            var self = $(this),
                link = self.find('a'),
                href = link.attr('href');

            alert(href);
        });

});