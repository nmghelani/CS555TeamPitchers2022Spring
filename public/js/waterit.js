var cursor = $("#glassOfWater");
var sndFillGlass = new Audio("public/audio/fill_glass.mp3");
var sndPourWater = new Audio("public/audio/pour_water.mp3");

document.addEventListener("contextmenu", (event) => event.preventDefault());

(function ($) {
  $(window).mousemove(function (e) {
    cursor.css({
      top: e.clientY,
      left: e.clientX,
    });
  });

  $("#turbulence").attr("x", "10%");
  $("#turbulence").attr("y", "10%");
  $("#turbulence").attr("width", "80%");
  $("#turbulence").attr("height", "50%");

  Swal.fire({
    title: "Instructions",
    text: "Click enter to fill the glass with water and Use any key to spill water from glass",
    confirmButtonText: "Let's go",
  }).then(() => {});
})(jQuery);

$("body").css("background-image", `url(/public/images/waterit.jpg)`);
$(".toggle_theme").change(function (e) {
  e.preventDefault();
  if (this.checked) {
    $("body").css(
      "background",
      "url(/public/images/waterit.jpg) no-repeat center center fixed"
    );
  } else {
    $("body").css(
      "background",
      "url(/public/images/nature3.jpg) no-repeat center center fixed"
    );
  }
  $("body").css("background-size", "cover");
});
$(window).mousedown(function (e) {
  if (Swal.isVisible()) {
    return;
  }
  if (e.which == 3) {
    sndFillGlass.play();
    setTimeout(() => {
      sndFillGlass.pause();
      sndFillGlass.currentTime = 0;
    }, 1000);
    $(".water").animate(
      {
        height: "90%",
      },
      1000
    );
    cursor.css({ WebkitTransform: "rotate(0deg)" });
    cursor.css({ "-moz-transform": "rotate(0deg)" });
  } else {
    if ($(".water").height() == 0) {
      return Swal.fire({
        title: "No water",
        text: "Right click to fill the glass",
        icon: "info",
      });
    }
    sndPourWater.play();

    const scale = $("feDisplacementMap").attr("scale");
    $("feDisplacementMap").attr("scale", parseInt(scale) + 5);

    if ($("feDisplacementMap").attr("scale") >= 40) {
      return Swal.fire({
        title: "Game Over",
        text: "You watered the monitor!!!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          counter = 1;
          window.location.href = "/";
        } else {
        }
      });
    }

    setTimeout(() => {
      sndPourWater.pause();
      sndPourWater.currentTime = 0;
    }, 500);
    rotate(cursor, -55);
    setTimeout(() => {
      rotate(cursor, 0);
    }, 100);
  }
});

function rotate(elem, degree) {
  // For webkit browsers: e.g. Chrome
  elem.css({ WebkitTransform: "rotate(" + degree + "deg)" });
  // For Mozilla browser: e.g. Firefox
  elem.css({ "-moz-transform": "rotate(" + degree + "deg)" });
  var h = Math.max(0, document.querySelector(".water").clientHeight - 30);
  $(".water").animate(
    {
      height: h,
    },
    500
  );
  // if (h > 0) {
  //   $(".screenwater").animate(
  //     {
  //       height: document.querySelector(".screenwater").clientHeight + 50,
  //     },
  //     500
  //   );
  // }

  // document.querySelector('.water').style.height=document.querySelector('.water').offsetHeight-20;
}
