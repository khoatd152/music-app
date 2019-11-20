/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//process slider bar
$(document).ready(() => {

    // $('#songSlider').on("change", function () {
    //     console.log($(this).val());
    //     var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    //     $(this).css('background-image',
    //         '-webkit-gradient(linear, left top, right top, '
    //         + 'color-stop(' + val + ', #815fdd), '
    //         + 'color-stop(' + val + ', white)'
    //         + ')'
    //     );
    // });


    $('input[type="range"][class="volumeSlider"]').on("change mousemove", function () {
        var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
        //console.log(val);
        $(this).css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + val + ', rgb(163, 26, 197)), '
            + 'color-stop(' + val + ', rgb(129, 112, 112))'
            + ')'
        );
    });

    $('.action .volume').click(() => {
        if ($('.volumeSlider').css('display') === 'none') {
            $('.volumeSlider').css('display', 'block');
        }
        else {
            $('.volumeSlider').css('display', 'none');
        }

    });


})
