$(document).ready(function() {

  var carousel = $('.carousel');
  var items = $('.carousel-item');

setInterval(function(){
    var currentItem;
    var lastItem = $('.last');

    lastItem.removeClass('last');
      currentItem = next(lastItem);
      carousel.removeClass('reversing');

    currentItem.addClass('last').css('order', 1);
    for (var i = 2; i <= items.length; i++) {
      currentItem = next(currentItem).css('order', i);
    }

    carousel.removeClass('current');
    return setTimeout(function() {
      return carousel.addClass('current');
    }, 50);

    function next(lastItem) {
      if (lastItem.next().length) {
        return lastItem.next();
      } else {
        return items.first();
      }
    }
  }, 3000);

  $(document).on('click', '.close', function() {
    $('.modal').css('display', 'none');
    console.log('click detected');
  })

  $('#submit').click(function(e) {
    e.preventDefault();
    searchFunction();
  })

  $(document).on('click', '.product-desc__button', function() {
    $(this.nextSibling).css('display', 'block');
  });

  function searchFunction() {
    $('#productData').html('<div class="loading-data"><h2>Loading results... </h2><i class="fas fa-2x fa-spinner"></i></div>');

    products = [];

    // I think I'll re-write this with async / await when I get a chance since callback hell is real

    var resultData = function(data) {};
    jQuery.ajax({
      url: 'https://lcboapi.com/products?q=' + $('input').val() + '/&per_page=30',
      async: true,
      headers: {
        'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
      },
      success: function(data) {
        console.log(data)
        if (data.result.length == 0) {
          products.push({
            suggestion: data.suggestion
          })
          console.log(products)
        } else {
          $.each(data.result, function(i, data) {
            console.log(data.result)
            // Filter because I don't want empty data
            if (data.image_url && data.name && data.tasting_note !== null) {
              // Push the data to our array for accessing later
              products.push({
                name: data.name,
                id: data.id,
                image: data.image_url,
                description: data.tasting_note,
                stores: []
              })
            }
          })
        }
      }
    }).then(function() {
      if (products[0].suggestion) {
        $('#productData').html('<div class="loading-data"><p>Sorry, your query returned no results. Did you mean..."' + products[0].suggestion + '"?</p></div>');
      } else if (products[0].id) {
        console.log('should nott run');
        $.each(products, function(i, products) {
          // Call the stores with product id
          jQuery.ajax({
            url: 'https://lcboapi.com/stores?product_id=' + products.id,
            headers: {
              'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
            },
            success: function(data) {
              $.each(data.result, function(i, data) {
                //console.log(data)
                products.stores.push(data.name)
              })
            }
          })
        })
        var displayResults = (function() {
          $('#productData').html('');
          $.each(products, function(i, products) {
            var stores = products.stores;

            $('#productData').append("<div class='product-child'><img class='product-img' src=" + products.image + "><p>" + products.name + "</p><button class='product-desc__button'>Click here for details +</button><div class='modal'><div class='modal-content'><span class='close'>&times;</span><div class='modal-picture'><img width='200' src=" + products.image + "></div><div class='modal-inner'><h3>" + products.name + "</h3>" + products.description + "</div><p>" + "</p></div></div>").fadeIn(5000);
          })
        })();
      } else {
        //quack
      }
    })
  }
})
// end doc
