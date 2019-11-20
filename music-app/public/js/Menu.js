

$(document).ready(function () {
    $('.menu li').hover(function () {
        // over
        $(this).find('ul:first').slideDown(300);
    }, function () {
        // out
        $(this).find('ul:first').slideUp(100);
    }
    );

    $('#userName').click(() => {
        var url = "/TrangDangNhap.html";
        newwindow = window.open(url, 'name', 'height=500,width=500, location=0');
        if (window.focus) { newwindow.focus() }
        return false;
    })

    $('#txtSearch').focus(() => {
        $('.menu').hide(0);
        $('.search').css({
            'margin-left':'82%',
            'width':'0'
        });
        $('.search').animate({
            
            'margin-left':'20%',
            'width': '40%',
            'right':'5%'

        }, 500);
        $('.search>a').css('width', '10%');
        $('.search>input').css('width', '80%');
        
     
    })
    $('#txtSearch').blur(function (e) { 
        $('.menu').show(500);
        $('.search').animate({
            'margin-left':'1%',
            'width': '15%',
            'right':'0%'
        }, 500);

        $('.search>a').css('width', '20%');
        $('.search>input').css('width', '80%');
        
   
    });
});