var cursor = $("#glassOfWater");
$("body").css("background-image", `url(/public/images/office-desk.jpeg)`);
  $(".toggle_theme").change(function (e) { 
    e.preventDefault();
    if(this.checked){
      $("body").css("background","url(/public/images/office-desk.jpeg) no-repeat center center fixed")
    }else{
      $("body").css("background","url(/public/images/nature3.jpg) no-repeat center center fixed")
    }
    $("body").css("background-size","cover")
  });
$(document).keyup(function (event) {
  if (event.which === 13 && document.querySelector('.water').clientHeight == 0) {
    $('.water').animate({
      height: '90%'
    }, 1000)
    cursor.css({ WebkitTransform: "rotate(0deg)" });
    cursor.css({ "-moz-transform": "rotate(0deg)" });
  } else {
    rotate(cursor, 0);
  }
});

$(document).keydown(function (event) {
  if (document.querySelector('.water').offsetHeight <= 178 && document.querySelector('.water').offsetHeight > 0) {
    rotate(cursor, 90);
  }
});

function rotate(elem, degree) {
  // For webkit browsers: e.g. Chrome
  elem.css({ WebkitTransform: "rotate(" + degree + "deg)" });
  // For Mozilla browser: e.g. Firefox
  elem.css({ "-moz-transform": "rotate(" + degree + "deg)" });
  var h;
  if (document.querySelector('.water').clientHeight >= 20) {
    h = document.querySelector('.water').clientHeight - 20;
  } else {
    h = 0;
  } 
  if (document.querySelector('.screenwater').clientHeight + 5 >= 370) {
    Swal.fire({
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
  $('.water').animate({
    height: h
  }, 500)
  if(h>0){
    $('.screenwater').animate({
      height: document.querySelector('.screenwater').clientHeight + 5
    }, 500)
  }
  
  // document.querySelector('.water').style.height=document.querySelector('.water').offsetHeight-20;
}