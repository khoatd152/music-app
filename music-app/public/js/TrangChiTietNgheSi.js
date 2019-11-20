$(document).ready(function () {
    $('#overviewBtn').css('color','orange');
    $('#overviewBtn').click(()=>{
        $('#overviewBtn').css('color','orange');
        $('#introBtn').css('color','white');
        $('#overviewBody').css('display','block');
        $('#introduceBody').css('display','none');
        return false;
    });

    $('#introBtn').click(()=>{
        $('#introBtn').css('color','orange');
        $('#overviewBtn').css('color','white');
        $('#introduceBody').css('display','block');
        $('#overviewBody').css('display','none');
        return false;
    })
});


