window.onscroll = function() {
  scrollTopFunction();
};
function scrollTopFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("headerweb_id").classList.add("gradient-back");
    document.getElementById("headerweb_id").classList.remove("transparency-navbar");
  } else {
    document.getElementById("headerweb_id").classList.add("transparency-navbar");
    document.getElementById("headerweb_id").classList.remove("gradient-back");
  }
}
//When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
