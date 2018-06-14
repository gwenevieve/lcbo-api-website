$(document).ready(function() {
id = []; // empty array... for our data!
productName = [];

products = {}
productArray = [];
storeName = name;


  var resultData = function(data) {
    //looping through the data returned on the first call to the API
    $.each(data.result, function(i, data) {
      if (data.image_url === null || data.tasting_note === null || data.tags.includes('lug tread')) {
      } else {
        // we don't want any beer that has no image, no description, or if the tags include 'lug tread'
        var image = data.image_url;
        var name = data.name;
        var tasting_note = data.tasting_note;
        //let's append our data to the page
        $('#beauData').append("<div class='beau--child'><img class='beau--img' src=" + image + "><p>" + name + "</p><div><button class='beau--desc__button'>Click here to see more +</button><div class='beau--desc hidden'><p>" + tasting_note + "</p><p>Stores with stock:</p><ul>" + "</ul></div></div></div>")
      }
    })
// description button, displays data.tasting_note and the list of stores that have the current product
    $('button').click(function() {
      //using this because we only want to open the current item
      $(this).next().toggleClass('hidden open');
      if ($(this).hasClass('open')) {
        console.log($(this).prev('button'))
      }
    })
  }
  jQuery.ajax({
    //we only want the first 30 items - '&per_page=30'
    url: 'https://lcboapi.com/products?q=beaus/&per_page=30',
    //async because we're completing calls synchronously
    async: false,
    headers: {
      // auth token header for API
      'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
    },
    success: function(data) {
      resultData(data)
      //looping through data that's been returned so we can grab the values we need
          $.each(data.result, function(i, data) {
            if (data.image_url === null || data.tasting_note === null || data.tags.includes('lug tread')) {
            } else {
              //if we're storing the data, push it to the empty array
              id.push(data.id)
    }
    })
    }
    //after this call is completed, let's do the next call to the api
  }).then(function() {
    //for each id, run this ajax call
      $.each(id, function(index, id) {
    jQuery.ajax({
      // check what stores carry this product
      url: 'https://lcboapi.com/stores?product_id=' + id,
      headers: {
        'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
      },
      success: function(data) {
        //two separate arrays so that we can make key value pair
        console.log(data.product.name)
        productArray.push(data.product.name);
        $.each(data.result, function(i, data) {
          //console.log(data.name)
            productArray.push(data.name);
            })
  }
})
})
})
});
