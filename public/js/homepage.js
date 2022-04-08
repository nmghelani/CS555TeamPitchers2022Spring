(function ($) {
  $("#title").html("Hello, Welcome to the Stressless world!");
  $(".card").hover(
    function () {
      $(this).animate({ zoom: "103%" }, 300);
      $(this).find(".active").attr("src", $(this).find(".active").attr("src"));
    },
    function () {
      $(this).animate({ zoom: "100%" }, 0);
    }
  );

  $(".toggle_theme").change(function (e) { 
    e.preventDefault();
    if(this.checked){
      $("body").css("background","url(/public/images/home-background.jpeg) no-repeat center center fixed")
    }else{
      $("body").css("background","url(/public/images/nature1.jpg) no-repeat center center fixed")
    }
    $("body").css("background-size","cover")
  });
})(jQuery);