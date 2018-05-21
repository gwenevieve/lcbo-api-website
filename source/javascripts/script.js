$(document).ready(function() {

  var resultData = function(data) {
    $.each(data.result, function(i, data) {
      if (data.image_url === null || data.tasting_note === null || data.tags.includes('lug tread')) {
      } else {
        var storeData = function(data) {
          $.each(data.result, function(i, data) {
            var store = data.name;
          })
        }
        var image = data.image_url;
        var name = data.name;
        var id = data.id;
        var tasting_note = data.tasting_note;
        $('#beauData').append("<div class='beau--child'><img class='beau--img' src=" + image + "><p>" + name + "</p><div><button class='beau--desc__button'>Click here to see more</button><div class='beau--desc hidden'><p>" + tasting_note + "</p><p>Stores with stock:</p><ul><li></li></ul></div></div></div>")
      }
    })

    $('button').click(function() {
      $(this).next().toggleClass('hidden open');
      if ($(this).hasClass('open')) {
        console.log($(this).prev('button'))
      }
    })
  }

  jQuery.ajax({
    url: 'https://lcboapi.com/products?q=beaus/&per_page=30',
    headers: {
      'Authorization': 'Token MDo0YmEyZTA4Mi00YmUyLTExZTgtYjE5MC1jZmRmNTI4ZTVjNTQ6NVJEWnR4Y0FwV3pYdERMTVdCZTNxcWdBVnVvU1czWTEyS1FQ'
    },
    success: function(data) {
      resultData(data);
    }
  })
});
