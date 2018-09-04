$(document).ready(function() {
  products = [];
  var resultData = function(data) {};
  jQuery.ajax({
    url: 'https://lcboapi.com/products?q=beaus/&per_page=30',
    async: true,
    headers: {
      'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
    },
    success: function(data) {
      resultData(data)
      $.each(data.result, function(i, data) {
        products.push({
          title: data.name,
          id: data.id,
          image: data.image_url,
          description: data.tasting_note
        })
      })
    }
  })
          console.log(products);
})
