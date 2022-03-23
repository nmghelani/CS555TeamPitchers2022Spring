(function ($) {
  $("body").css({ "background-image": "none" });

  $('.glass').click(function(){
    $('.water').animate({
      height: '90%'
  }, 1000)
  })

  var cursor = $(".cursor");

    $(window)
      .mouseleave(function () {
        cursor.css({
          opacity: "0",
        });
      })
      .mouseenter(function () {
        cursor.css({
          opacity: "1",
        });
      });

    $(window)
      .mousedown(function () {
        rotate(cursor, 90);
      })
      .mouseup(function () {
        rotate(cursor, 0);
      });

    function rotate(elem, degree) {
      // For webkit browsers: e.g. Chrome
      elem.css({ WebkitTransform: "rotate(" + degree + "deg)" });
      // For Mozilla browser: e.g. Firefox
      elem.css({ "-moz-transform": "rotate(" + degree + "deg)" });
    }

    $(window).mousemove(function (e) {
      cursor.css({
        top: e.clientY - cursor.height() * 0.42,
        left: e.clientX - cursor.width() * 0.12,
      });
    });
})(jQuery);
