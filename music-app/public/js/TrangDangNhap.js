$(document).ready(function () {
    $('#Signin').click(()=>{
        $('.content').css('display','block');
        $('#Signup').removeClass('currentTab');
        $('.contentSignup').css('display','none');
        $('#Signin').addClass('currentTab');   
        return false;
    });

    $('#Signup').click(()=>{
        $('.content').css('display','none');
        $('#Signup').addClass('currentTab');
        $('.contentSignup').css('display','block');
        $('#Signin').removeClass('currentTab');   
        return false;
    })
});