var $container = $('#port_container')
  // initialize Isotope
  $container.isotope({
    // options...
    resizable: true, // disable normal resizing
    // set columnWidth to a percentage of container width
    masonry: { columnWidth: $container.width() / 5 }
  });

  // update columnWidth on window resize
  $(window).smartresize(function(){
    $container.isotope({
      // update columnWidth to a percentage of container width
      masonry: { columnWidth: $container.width() / 5 }
    });
  });


  // cache container
  var $container = $('#container');
  // initialize isotope
  $container.isotope({
    // options...
  });

  // filter items when filter link is clicked
  $('#filters a').click(function(){
    console.log('clicked');
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    return false;
  });

    