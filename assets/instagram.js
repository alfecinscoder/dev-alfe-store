  var User_Id = $("#instafeed").data("user_id");
  var Access_Token = $("#instafeed").data("access_token");
  var limit = $("#instafeed").data("limit");



  var userFeed = new Instafeed({
    get: 'user',
    userId: User_Id,
    limit: limit,
    accessToken: Access_Token,
    resolution:'low_resolution',
    template: '<div class="grid__item two-twelfths"><a href="{{link}}" target="_blank"><div class="insta_img"><img src="{{image}}" /></div><div class="likes"><i class="fa fa-instagram"></i></div></a></div>'

  });
  userFeed.run();