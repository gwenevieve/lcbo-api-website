$(document).ready(function() {

  $(document).on('click', '.close', function() {
$('.modal').css('display','none');
console.log('click detected');
})

  $('#submit').click(function(e) {
    e.preventDefault();
    searchFunction();
  })

  $(document).on('click', '.product--desc__button', function() {
    $(this.nextSibling).css('display','block');
});

  function searchFunction() {
    $('#productData').html('<div class="loading--data"><h2>Loading results... </h2><i class="fas fa-2x fa-spinner"></i></div>');

    products = [];
    var resultData = function(data) {};
    jQuery.ajax({
      url: 'https://lcboapi.com/products?q=' + $('input').val() + '/&per_page=30',
      async: true,
      headers: {
        'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
      },
      success: function(data) {
        $.each(data.result, function(i, data) {
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
    }).then(function() {
      $.each(products, function(i, products) {
        // Call the stores with product id
        jQuery.ajax({
          url: 'https://lcboapi.com/stores?product_id=' + products.id,
          headers: {
            'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
          },
          success: function(data) {
            $.each(data.result, function(i, data) {
              products.stores.push({
                name: data.name
              })
            })
          }
        })
      })
      var displayResults = (function() {
        $('#productData').html('');
        $.each(products, function(i, products) {
  console.log(products.stores);
          $.each(stores, function(i, stores ) {
            console.log('derp')
          });
            $('#productData').append("<div class='product--child'><img class='product--img' src=" + products.image + "><p>" + products.name + "</p><button class='product--desc__button'>Click here to see more +</button><div class='modal'><div class='modal--content'><span class='close'>&times;</span><div class='modal--picture'><img width='200' src=" + products.image + "></div><div class='modal--inner'><h3>" + products.name + "</h3>" + products.description + "</div><p>" + products.stores + "</p></div></div>");
        })
      })();
    })
  }

})
