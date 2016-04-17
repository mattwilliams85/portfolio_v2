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
      header: 'Roambi.com',
      detail: 'Roambi provides analytics, reporting, and business intelligence for companies to use on the go.',
      bullets: ['PHP & Javascript','Wordpress','Hubspot Integration'],
    },
    walker: {
      header: 'WalkerTracker',
      detail: 'Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use.',
      bullets: ['Node w/Sails','Gamification','Mobile Integration']
    },
    powur: {
      header: 'Powur.com',
      detail: 'Powur is a multi-level marketing platform for lead generation, recruitment, and team building.',
      bullets: ['Rails App','Visual Analytics','Team Tree Management System']
    },
    mystand: {
      header: 'MyStand',
      detail: 'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket.',
      bullets: ['Node.js on Sails','Social Media & Networking','Crowd-funding']
    },
    never: {
      header: 'NeverSurrender',
      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS.',
      bullets: ['Pure Javascript','Parallax Effects','Fluid Design']
    },
  };

  fillModal('roambi');

  $('#gallery .button').on('click', function(){
    $('.modal-wrap').addClass('visible');

    // fillModal('roambi');


    // setTimeout(function(){
      $('#modal-carousel').slick({
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<i class="fa fa-chevron-left"></i>',
        nextArrow: '<i class="fa fa-chevron-right"></i>'
      });
      $('#modal-carousel').css('height','100%');
    // }, 1)
    
    
  })

  $('.close').on('click', function(){
    $('.modal-wrap').removeClass('visible');
  })

  function fillModal(id) {
    if ($('#modal-carousel').is('.slick-initialized')) {
      $('#modal-carousel').slick('unslick');
    }
    $('#modal .header').text(modalText[id].header);
    $('#modal .detail').text(modalText[id].detail);

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).children('img').attr('src', 'img/slides/' + id + '-' + index + '.jpg');
    });
  }
});