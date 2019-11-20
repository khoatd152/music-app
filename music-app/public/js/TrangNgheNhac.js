$(document).ready(function () {
  var valueHover = 0;

  //set min max input range

  //init
  var audio = document.getElementById("player");
  var slider = $("#slider");


  //check nội dung lời bài hát và ẩn bớt
  $('#readMore').click(function () {
    var text = $('#readMore').text();
    if (text === 'Xem thêm') {
      $('#lyric').removeClass('contentLyric');
      $('#readMore').text('Rút gọn');
    }
    else {
      $('#lyric').addClass('contentLyric');
      $('#readMore').text('Xem thêm');
    }
    return false;
  })

  //xử lý file audio
  audio.load();
  audio.onloadedmetadata = function () {
    //get duration and set max input range
    var tam = audio.duration;
    var durationTime = parseInt(tam, 10);

    slider.attr("max", durationTime);

    var minutes = String(parseInt(durationTime / 60)).padStart(2, "0");
    var seconds = String(durationTime % 60).padStart(2, "0");

    $("#durationTime").html(minutes + ":" + seconds);

    $("#slider").on("change input", function () {
      audio.pause();
      audio.currentTime = $(this).val();
      audio.play();
      var val =
        ($(this).val() - $(this).attr("min")) /
        ($(this).attr("max") - $(this).attr("min"));

      $(this).css(
        "background-image",
        "-webkit-gradient(linear, left top, right top, " +
        "color-stop(" +
        val +
        ", #0ba14b), " +
        "color-stop(" +
        val +
        ", #C5C5C5)" +
        ")"
      );
    });

    // tí nhở mở lại
    var play = audio.play();
    if (play != undefined) {
      play
        .then(_ => { })
        .catch(err => {
          //alert(err);
          //alert(audio.paused);
          $("#play").attr('src','test/play.png');
        });
    }
  };

  //hover đổi ảnh



});

function changeValueVolume(slider) {
  
  var audio = document.getElementById("player");
  audio.volume = slider.value / 10;
  if(slider.value==0){
    $('#volume').attr('src','test/volume-mute.png');
  }
  else{
    $('#volume').attr('src','test/volume.png');
  }
  var val = slider.value;
  
 
}

function PlayTimeSlider() {
  $("#play").attr('src', 'test/pause.png');

}

$('#replay').click(function () {
  if ($(this).attr('src') == 'test/reload-off.png') {
    $(this).attr('src', 'test/reload-on.png');
    $('#replayValue').prop('checked', true);
  }
  else {
    $(this).attr('src', 'test/reload-off.png');
    $('#replayValue').prop('checked', false);
  }
})

function PauseTimeSlider() {
  $("#play").attr('src', 'test/play.png');
}

// auto play
function EndTimeSlider(audio) {

  if ($('#replayValue').is(':checked')){
 
    $("#play").click();
  }
    
  var myAudio = document.getElementById("player");
  myAudio.currentTime = 0;
}

//xử lý nút volume

$('#volume').click(function(){
  var slider = document.getElementById('valueVolume');
  var myAudio = document.getElementById("player");
  if(slider.value==0){
    slider.value=10;
    myAudio.volume = 1;
    $('#volume').attr('src','test/volume.png');
  }
  else{
    slider.value=0;
    myAudio.volume = 0;
    $('#volume').attr('src','test/volume-mute.png');
  }
})


//xử lý nút pause và play

// function play() {
//   var myAudio = document.getElementById("player");

//   $('#play').css('display', 'none');
//   $('#pause').css('display', 'block');
//   myAudio.play();
// }
// function pause() {
//   var myAudio = document.getElementById("player");

//   $('#play').css('display', 'block');
//   $('#pause').css('display', 'none');
//   myAudio.pause();
// }

function playorpause(img){
  var myAudio = document.getElementById('player');
  if(myAudio.paused ){
    myAudio.play();
    $(this).attr('src','test/pause.png');
  }
  else{
    myAudio.pause();
    $(this).attr('src','test/play.png');
  }
}

function UpdateTimeSlider(audio) {
  $("#slider").val(parseInt(audio.currentTime, 10));

  var slider = $("#slider");
  var val =
    (slider.val() - slider.attr("min")) /
    (slider.attr("max") - slider.attr("min"));

  slider.css(
    "background-image",
    "-webkit-gradient(linear, left top, right top, " +
    "color-stop(" +
    val +
    ", #0ba14b), " +
    "color-stop(" +
    val +
    ", #C5C5C5)" +
    ")"
  );

  var valueHover = slider.val();

  var minutes = String(parseInt(valueHover / 60)).padStart(2, "0");
  var seconds = String(valueHover % 60).padStart(2, "0");
  $("#currentTime").html(minutes + ":" + seconds);
}

//attach to slider and fire on mousemove
document.getElementById("slider").addEventListener("mousemove", function (e) {
  valueHover = parseInt(calcSliderPos(e).toFixed(2), 10);

  var minutes = String(parseInt(valueHover / 60)).padStart(2, "0");
  var seconds = String(valueHover % 60).padStart(2, "0");

  $(this).attr("title", minutes + ":" + seconds);
});

function calcSliderPos(e) {
  return (
    (e.offsetX / e.target.clientWidth) *
    parseInt(e.target.getAttribute("max"), 10)
  );
}
