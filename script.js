$(document).ready(function() {

  // NAV POSITION
  var navPos = $('nav').position().top;
  var lastPos = 0;

  $(window).on('scroll', function () {
    var pos = $(window).scrollTop();

    if (pos >= navPos + $('nav').height() && lastPos < pos) {
      $('nav').addClass('fixed');
    }
    if (pos < navPos && lastPos > pos) {
      $('nav').removeClass('fixed');
    }
    lastPos = pos;
  });

  // PAGE ANCHORS
  $('nav span').click(function(){
    var anchor = $(this).text();
    $('nav span').removeClass('active');
    $(this).addClass('active');

    $('html, body').animate({
        scrollTop: $('#' + anchor).offset().top
    }, 300);
  });

  //GALLERY
  $('#gallery').mixItUp({
    // load: {
    //   filter: '.websites'
    // }
  });
});
