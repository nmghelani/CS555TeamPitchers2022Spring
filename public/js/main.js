(function ($) {
  $(this).css("cursor", "url(/public/images/hammer.png), auto");
})(jQuery);
var myMusic=document.getElementById('music');
function play() { 
  myMusic.muted=false;
  myMusic.play();
}
window.onload = (event) => {
  Swal.fire({
    title: "Enable Audio",
    icon: "error",
  }).then((result) => {
    if (result.isConfirmed) {
      play();
    } else {
    }
  });
};