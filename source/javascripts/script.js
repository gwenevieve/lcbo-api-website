$(document).ready(function() {

  $('#submit').click(function(e) {
    e.preventDefault();
    searchFunction();
  })

  $(document).on('click', '.product--desc__button', function() {
    console.log('test');
    $(this.nextSibling).toggleClass('hidden open');
});


  function searchFunction() {
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
          products.push({
            name: data.name,
            id: data.id,
            image: data.image_url,
            description: data.tasting_note,
            stores: []
          })
        })
      }
    }).then(function() {
      $.each(products, function(i, products) {
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
        $.each(products, function(i, products) {
            $('#productData').append("<div class='product--child'><img class='product--img' src=" + products.image + "><p>" + products.name + "</p><div><button class='product--desc__button'>Click here to see more +</button><div class='product--desc hidden'><p>" + products.description + "</p><p>Stores with stock:</p><ul>" + products.stores + "</ul></div></div></div>");
        })
      })();
    })
  }
})
