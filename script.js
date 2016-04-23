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

    $('nav span').removeClass('active');
    $("nav").find('[dest="'+ anchor +'"]').addClass('active');

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top
    }, 400);
  });

  // GALLERY
  $('#gallery').mixItUp({ });

  // MODAL
  var modalText = {
    roambi: {
      title: 'Roambi.com',
      tag: 'BUSINESS ANALYTICS.',
      detail: 'Roambi provides analytics, reporting, and business intelligence for companies to use on the go. A Wordpress hosted site written in PHP and Javascript with Hubspot Integration.'
    },
    walker: {
      title: 'WalkerTracker',
      tag: 'PERFORMANCE METRICS.',
      detail: 'Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use. A Ruby on Rails and Javascript companion site for the Walker Tracker App. Features visual metrics and gamified progression system.',
      bullets: ['Node w/Sails','Gamification','Mobile Integration']
    },
    powur: {
      title: 'Powur.com',
      tag: 'MULTI-LEVEL MARKETING.',
      detail: 'Powur is a multi-level marketing platform for lead generation, recruitment, and team building. Built with Ruby on Rails and Angular-UI. Makes use of Angular-material for front-end visuals. Features complex user tree heiarchy and commission system.',
      bullets: ['Rails App','Visual Analytics','Team Tree Management System']
    },
    mystand: {
      title: 'MyStand',
      tag: 'CROWD-FUNDED CHARITY',
      detail: 'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket. Single page App built with Node.js on Sails and Angular 2.0. Features social media sharing and large scale crowd-funding.',
      bullets: ['Node.js on Sails','Social Media & Networking','Crowd-funding']
    },
    never: {
      title: 'NeverSurrender',
      tag: 'ALS AWARENESS',
      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.',
      bullets: ['Pure Javascript','Parallax Effects','Fluid Design']
    },
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg')",
        backgroundSize: 'cover'
      });
              
    });
  }
});