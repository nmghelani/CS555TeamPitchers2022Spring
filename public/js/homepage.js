(function ($) {
  $("#title").html("Hello, Welcome to the Stressless world!");
  $(".card").hover(
    function () {
      console.log("hover");
      $(this).animate({ zoom: "103%" }, 300);
      $(this).find(".active").attr("src", $(this).find(".active").attr("src"));
    },
    function () {
      console.log("hover");
      $(this).animate({ zoom: "100%" }, 0);
    }
  );
})(jQuery);
