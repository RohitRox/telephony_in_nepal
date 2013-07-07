
$(document).ready(function(){

$('.circles').click(function(){

	var that = $(this);
	var id = $(this).attr('id');

	if($('#circle').hasClass(id))
	{
		if($('#circle').hasClass('small')) {

			$('#circle').animate({
                        'width'     :'420px',
                        'height'    :'420px',
                        'top'       :'40px',
                        'left'      :'40px',
                        'opacity'   :'1.0',
                        'border-radius' : '50%',
                        'padding' : '40px'
                       },300,'easeInCirc', function(){
                       	$('#circle div').fadeIn('slow');
                       });

			$('#circle').removeClass('small').css('text-indent','0px');
		}
		else
		{
			$('#circle').animate({
                        'width'     :'32px',
                        'height'    :'32px',
                        'top'       :'270px',
                        'left'      :'270px',
                        'opacity'   :'1',
                        'padding'   :'0px'
                        },300,'easeInCirc');
			$('#circle div').fadeOut();
			$('#circle').addClass('small').css('text-indent','-9999px');
		}

	}
	else
	{

		$('#circle div').hide();
		var abc = $(that).find('.text').html();
		$('#circle div').html(abc);

		if($('#circle').hasClass('small')) {

					$('#circle').animate({
                        'width'     :'420px',
                        'height'    :'420px',
                        'top'       :'32px',
                        'left'      :'32px',
                        'opacity'   :'1.0',
                        'border-radius' : '50%',
                        'padding' : '40px'
	                    },300,'easeInCirc', function(){ $('#circle div').fadeIn('slow'); });
		}
		else{
			$('#circle').animate({
						'width'     :'32px',
                        'height'    :'32px',
                        'top'       :'270px',
                        'left'      :'270px',
                        'opacity'   :'1',
                        'padding'   :'0px'
			}).animate({
	                        'width'     :'420px',
	                        'height'    :'420px',
	                        'top'       :'32px',
	                        'left'      :'32px',
	                        'opacity'   :'1.0',
	                        'border-radius' : '50%',
	                        'padding' : '40px'
	                       },300,'easeInCirc', function(){ $('#circle div').fadeIn('slow'); });
		}
		$('#circle').attr('class', id);

	}


});


$('.circles').click(function(){
 $('#circle span').click(function(){
    $('#circle').animate({
                        'width'     :'32px',
                        'height'    :'32px',
                        'top'       :'270px',
                        'left'      :'270px',
                        'opacity'   :'1',
                        'padding'   :'0px'
                        },300,'easeOutCirc');
            $('#circle div').fadeOut('fast');
            $('#circle').addClass('small').css('text-indent','-9999px');
 });
});

});