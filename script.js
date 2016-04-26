$(document).ready(function() {

  // NAV POSITION
  var navPos = $('nav').position().top;
  var lastPos = 0;

  $(window).on('scroll', function () {
    var pos = $(window).scrollTop();
    var pos2 = pos + 50;

    if (pos >= navPos + $('nav').height() && lastPos < pos) {
      $('nav').addClass('fixed');
    }
    if (pos < navPos && lastPos > pos) {
      $('nav').removeClass('fixed');
    }
    lastPos = pos;

    if (pos2 > $('#home').offset().top)       { highlightLink('home'); }
    if (pos2 > $('#about').offset().top)      { highlightLink('about'); }
    if (pos2 > $('#portfolio').offset().top)  { highlightLink('portfolio'); }
    if (pos2 > $('#blog').offset().top)       { highlightLink('blog'); }
    if (pos2 > $('#contact').offset().top || 
        pos + $(window).height() === $(document).height()) { 
          highlightLink('contact');
    }
  });

  function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $("nav").find('[dest="' + anchor + '"]').addClass('active');
  }

  $('.page-link').click(function() {
    var anchor = $(this).attr("dest");
    $('.link-wrap').removeClass('visible');

    $('nav span').removeClass('active');
    $("nav").find('[dest="'+ anchor +'"]').addClass('active');

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top
    }, 400);
  });

  $('.mdi-menu').click(function() {
    $('.link-wrap').toggleClass('visible');
  })

  $('.blog-wrap').hover(  function() {
    $('.blog-wrap').addClass('fade');
    $( this ).addClass( "hover" ).removeClass('fade');
  }, function() {
    $( this ).removeClass( "hover" );
    $('.blog-wrap').removeClass('fade');
  });

  // GALLERY
  $('#gallery').mixItUp({ });
});