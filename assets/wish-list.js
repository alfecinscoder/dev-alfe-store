function postToWishlist() {
  $("#wish-list").submit(function(e) {
    e.preventDefault();
    var postData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    $.ajax({
      url : formURL,
      type: "POST",
      data : postData,
      success:function(data, textStatus) {
        console.log(textStatus);
        $('.js-wish-list').empty().html('<p>This product is in your <a href="/pages/wish-list">wishlist</a></p>');
      },
      error: function() {
        $(this).append("<p>I'm afraid that didn't work.</p>");
      }
    });
  });
}

function removeFromWishlist($this) { 
  
  // select parent li element
  var $elem = $this.closest(".product-item");
  // get the id which is the selected variant tag
  var tagID = $elem.attr("id");
  var $form = $("#remove");

  // set the value of the input in the form to the selected variant
  $("#remove-value").attr("value", tagID);
  var postData = $form.serializeArray();
  var formURL = $form.attr("action");
  $.ajax({
    url : formURL,
    type: "POST",
    data : postData,
    beforeSend: function() {
     $elem.css("opacity","0.4");
    },
    success:function(data, textStatus) {
      $elem.remove();
      if($(".cart-items .product-item").length == 0) {  
       
       $("#empty_wslt").show();
        $("#wishlist-header").hide();
        $("#share_via_mail").hide();
        $("#wishlist-email-link").html("<p>Your wish list is currently empty.</p>");
      } else {
        updateEmailList();
      }
    },
    error: function() {

      $(this).append("<p>I'm afraid that didn't work.</p>");
    }
  });
}

function updateEmailList() {
  var currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
  $.ajax({
    url : currentURL,
    type: "GET",
    success:function(data, textStatus) {
      console.log(textStatus);
      var newEmailLink = $(data).find("#wishlist-email-link a");
      $("#wishlist-email-link").html(newEmailLink);
    }
  });
}

function selectCallback(variant, selector) {

  // you will be using something like this if you are using Shopify's option_selection.js as a callback to update your images and stuff when the user chooses another variant from a product select element. Just add the bits below to what you already have in there. This will ensure when the customer picks another variant, the wish list form will update to the current variant.

  //Update wishlist form
  var $wishList = $(".js-wish-list");
  var currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
  var newURL = currentURL + "?variant=" + variant.id;

  $.ajax({
    type: 'GET',
    url: newURL,
    success:function(data){
      $wishList.empty();
      var newData = $(data).find(".js-wish-list").html();
      $wishList.html(newData);

      // reset event listener for posting to wish list
      postToWishlist();
    }
  });
}

// ======================================================
// remove from wishlist
// ======================================================
 $(".js-remove-button").on("click", function(e) {
  
  e.preventDefault();
  removeFromWishlist($(this));
}); 
  
  

// ======================================================
// add to cart from wishlist
// ======================================================
$(".js-add-to-cart").on("click", function(e) {
  e.preventDefault();
  variantID = $(this).attr("data-id");
  $('#product-select').attr("value", variantID);
  // uncomment next line if you want a product to be removed from the wish list when it is added to the cart
   removeFromWishlist($(this));
    $(this).parent().submit();
});

// ======================================================
// callback for option_selection.js
// ======================================================
// The following will have to be in your product template (without the comments wrapping it!) to initialize the option_selection.js
