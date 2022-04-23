(function ($) {
  $(this).css("cursor", "url(/public/images/hammer.png), auto");
  Swal.fire({
    title: "Are you frustrated",
    text: "We have got everything to get rid of that fustration.",
    confirmButtonText: "Let's go",
  }).then(() => {
    play();
  });

  var myMusic = document.getElementById("music");
  function play() {
    try {
      myMusic.muted = false;
      myMusic.play();
    } catch (error) {
      console.log(error);
    }
  }
})(jQuery);
