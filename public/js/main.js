(function ($) {
  $(this).css("cursor", "url(/public/images/hammer.png), auto");
  Swal.fire({
    title: "Are you frustrated",
    text: "We have got everything to get rid of that fustration.",
    confirmButtonText: "Let's go",
  });
})(jQuery);

window.onbeforeunload = (event) => {
  if (
    !window.confirm(
      "Getting back to work? I hope we helped you relieving your stress"
    )
  ) {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  }
};
