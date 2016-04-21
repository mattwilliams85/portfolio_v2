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

  // GALLERY
  $('#gallery').mixItUp({ });

  // MODAL
  var modalText = {
    roambi: {
      title: 'Roambi.com',
      detail: 'Roambi provides analytics, reporting, and business intelligence for companies to use on the go.',
      bullets: ['PHP & Javascript','Wordpress','Hubspot Integration'],
    },
    walker: {
      title: 'WalkerTracker',
      detail: 'Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use.',
      bullets: ['Node w/Sails','Gamification','Mobile Integration']
    },
    powur: {
      title: 'Powur.com',
      detail: 'Powur is a multi-level marketing platform for lead generation, recruitment, and team building.',
      bullets: ['Rails App','Visual Analytics','Team Tree Management System']
    },
    mystand: {
      title: 'MyStand',
      detail: 'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket.',
      bullets: ['Node.js on Sails','Social Media & Networking','Crowd-funding']
    },
    never: {
      title: 'NeverSurrender',
      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS.',
      bullets: ['Pure Javascript','Parallax Effects','Fluid Design']
    },
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  })

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
      $(this).css('transform','translateX('+ dragPos() +'px)')
    })
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    })
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