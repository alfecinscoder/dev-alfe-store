//================ SIDEBAR MENU TRIGGER 

( function( $ ) {
$( document ).ready(function() {
$('#nav-menu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});

	$('#nav-menu>ul>li.has-sub>a').append('<span class="dwn-arrow"></span>');
	$('#nav-menu>ul>li>ul>li.has-sub>a').append('<span class="dwn-arrow"></span>');

	(function getColor() {
		var r, g, b;
		var textColor = $('#nav-menu').css('color');
		textColor = textColor.slice(4);
		r = textColor.slice(0, textColor.indexOf(','));
		textColor = textColor.slice(textColor.indexOf(' ') + 1);
		g = textColor.slice(0, textColor.indexOf(','));
		textColor = textColor.slice(textColor.indexOf(' ') + 1);
		b = textColor.slice(0, textColor.indexOf(')'));
	})();

});
} )( jQuery );