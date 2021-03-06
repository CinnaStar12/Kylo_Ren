
$(document).ready(function () {

  $("#inv-submit").on("click", function(e) {
    e.preventDefault();

    var product = $("#product").val();
    var stock = $("#stock").val();
    var saleprice = $("#price").val()

    var newInv = {
      productName: product,
      onHand: stock,
      price: saleprice
    }

    $.ajax({
      url: "/api/inventory",
      method: "POST",
      data: newInv
    }).then(function(res) {
      console.log(newInv)
    })
  });

  
  
  
  $("#location-submit").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    var address = $("#inputAddress").val();
    var city = $("#inputCity").val();
    var state = $("#inputState").val();
    var payment = $("#payment").val();
    var time = $("#time").val();
    var name = $("#name").val();

    console.log(address + city + state)
    var queryUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${state}&key=AIzaSyBrWOit0v-QYF9j_8TSM7S6wyLCyAZalJI`
    console.log(queryUrl)
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function(data) {
      var coord = data.results[0].geometry.location;
      var addressLine = `${address}, ${city}, ${state}`

      var newStorefront = {
        name: name,
        latitude: coord.lat,
        longitude: coord.lng,
        address: addressLine,
        paymentTypes: payment,
        time: time
      }
      $.ajax({
        url: "/api/storefronts",
        method: "POST",
        data: newStorefront
      }).then((result) => {
        console.log(newStorefront);
        document.refresh();
      })
      
    }
  )})
});
