$(document).ready(function () {
    
    $("#filterAlbum").click(function() {
        if ($("#resultFilterAlbum").hasClass("hide"))
          $("#resultFilterAlbum").removeClass("hide");
        else $("#resultFilterAlbum").addClass("hide");
        return false;
      });
});