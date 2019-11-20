function showLogin() {
  $("#loginContent")
    .removeClass("hide")
    .addClass("show");
  $("#registerContent")
    .removeClass("show")
    .addClass("hide");
}

function showRegister() {
  $("#loginContent")
    .removeClass("show")
    .addClass("hide");
  $("#registerContent")
    .removeClass("hide")
    .addClass("show");
}

$(document).ready(function() {
  var myIndexSlideShowIndex = 0;
  var allPic = document.getElementsByClassName("mySlideShowIndex");
  slideShowIndex();

  function slideShowIndex() {
    for (let index = 0; index < allPic.length; index++) {
      allPic[index].style.display = "none";
    }

    allPic[myIndexSlideShowIndex].style.display = "block";
    //allPic[myIndexSlideShowIndex].style.display="block";
    myIndexSlideShowIndex++;
    if (myIndexSlideShowIndex === allPic.length) myIndexSlideShowIndex = 0;

    setTimeout(slideShowIndex, 3000);
  }

  $("#filterAlbum").click(function() {
    if ($("#resultFilterAlbum").hasClass("hide"))
      $("#resultFilterAlbum").removeClass("hide");
    else $("#resultFilterAlbum").addClass("hide");
    return false;
  });
});

$('#login').click(()=>{
  var url = "/TrangDangNhap.html";
  newwindow=window.open(url,'name','height=500,width=500, location=0');
    if (window.focus) {newwindow.focus()}
  return false;
})