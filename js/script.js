$(document).ready(function(){

  // giving section full height of the browser

  $('.wrap-out').css('min-height', $(window).height()+'px');

  // operators pop up animation

  $('.circles').click(function(){

  	var that = $(this);
  	var id = $(this).attr('id');

  	if($('#circle').hasClass(id))
  	{
  		if($('#circle').hasClass('small')) {

        $('#circle').animate({
        'width'     :'340px',
        'height'    :'340px',
        'top'       :'30px',
        'left'      :'30px',
        'opacity'   :'1',
        'border-radius' : '50%',
        'padding' : '80px'
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
        'opacity'   :'0',
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
        'width'     :'340px',
        'height'    :'340px',
        'top'       :'30px',
        'left'      :'30px',
        'opacity'   :'1',
        'border-radius' : '50%',
        'padding' : '80px'
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
          'width'     :'340px',
          'height'    :'340px',
          'top'       :'30px',
          'left'      :'30px',
          'opacity'   :'1',
          'border-radius' : '50%',
          'padding' : '80px'
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
      'opacity'   :'0',
      'padding'   :'0px'
      },300,'easeOutCirc');
      $('#circle div').fadeOut('fast');
      $('#circle').addClass('small').css('text-indent','-9999px');
    });
  });
  });

  // graphs js

  var data_arr = [
  {date: "14 June, 2010", tele_penetration: 30.24, internet_penetration: 4.56, mobile_penetration: 25.75},
  {date: "15 December, 2010", tele_penetration: 36.37, internet_penetration: 10.02, mobile_penetration: 31.56 },
  {date: "15 June, 2011", tele_penetration: 44.9, internet_penetration: 10.28, mobile_penetration: 39.53},
  {date: "14 December, 2011", tele_penetration: 56.46, internet_penetration: 14.55, mobile_penetration: 50.16},
  {date: "14 June, 2012", tele_penetration: 63.76, internet_penetration: 18.75, mobile_penetration: 56.55},
  {date: "15 December, 2012", tele_penetration: 70.61, internet_penetration: 22.22, mobile_penetration: 62.68},
  {date: "14 April , 2013", tele_penetration: 75.46, internet_penetration: 25.67, mobile_penetration: 66.96 }
  ];
  var width = 920, height = 420;
  var gap = Math.round((width/data_arr.length));

  function stage_init(){

    window.stage = new Kinetic.Stage({
      container: 'canvas_telecom_glance',
      width: width,
      height: height,
      fill: "def"
    });

    window.layer = new Kinetic.Layer();

    var line = new Kinetic.Line({
      points: [0, height, width, height],
      stroke: "#fff",
      strokeWidth: 2,
    });
    layer.add(line);

    var quater = Math.round((height/4));
    var tmp = 0;
    for(var i=1; i<=4;i++){
      tmp += quater;
      var line = new Kinetic.Line({
        points: [0,height-tmp,width,height-tmp],
        stroke: "#fff",
        strokeWidth: 1
      });
      var per = new Kinetic.Text({x:4,y:height-tmp+4, text: 25*i+" %", fill: "#fff", fontFamily: "quicksandbook"});
      layer.add(per);
      layer.add(line);
    }
    stage.add(layer);
  }


	function telecom_at_glance_init(data_selector, color_pref){

    var layer = new Kinetic.Layer();
    var len = data_arr.length, k =0,x = 0;
    window.p_arr = [];

    window.handle = setInterval(function(){
      if( k == len-1)
        {
          clearInterval(handle);
          join_points();
          return false;
        }
      x = x + gap;
      var self = data_arr[k];
      var y = Math.round(((self[data_selector]/100)*height));

      // console.log(self[data_selector]);
      p_arr.push(x,height - y);

      var circ = new Kinetic.Circle({
        x: x, y: height - y,
        fill: '#fff',
        // strokeWidth: 4,
        // radius: 0,
        // stroke: "white",
      });

      layer.add(circ);

      var poly = new Kinetic.Polygon({
        points: [x-40, height-y-25, x-10, height-y-25, x, height-y-15, x+10, height-y-25, x+40, height-y-25, x+40, height-y-90, x-40, height-y-90],
        fill: '#fff'
      });

      layer.add(poly);

      var perce = new Kinetic.Text({
        x:x-35,
        y:height-y-69,
        text: self[data_selector]+"%" ,
        fontFamily: 'quicksandbook',
        fill: color_pref,
        stroke: color_pref,
        strokeWidth: 1,
        fontSize: '20',
        fontWeight: 'bold',
        'z-index': '11'
      });
      layer.add(perce);

      (new Kinetic.Tween({
        node: circ,
        radius: 8,
        duration: .5,
        easing : Kinetic.Easings.BounceEaseIn
      })).play();

      var date = new Kinetic.Text({x:x-40,y:height-15, text: self.date , fill: "#fff",fontFamily: 'quicksandbook', fontSize: '12'});
      layer.add(date);
      stage.add(layer);
      k++;
    },800);

    function join_points(){
      var line_join = new Kinetic.Line({
          points: p_arr,
          stroke: '#fff',
          strokeWidth: 4
        });
      layer.add(line_join);
      stage.add(layer);
    }

    return layer;

  }

  var tele_layer = null, internet_layer = null, mobile_layer = null;
  setTimeout(function(){
  	stage_init();
    tele_layer = telecom_at_glance_init("tele_penetration","#00b1e1");
  },2000);

  $('.legend').click(function(){
    var _this = $(this);
    _this.toggleClass('active').siblings().removeClass('active');
    if( _this.data("val") == "tele_penetration"){
      if (internet_layer != null)
        internet_layer.hide();
      if (mobile_layer != null)
        mobile_layer.hide();
      if (tele_layer === null)
        tele_layer = telecom_at_glance_init(_this.data("val"), _this.data("color"));
      else
        tele_layer.show();
    }else if(_this.data("val")=="mobile_penetration"){
      tele_layer.hide();
      if (internet_layer != null)
        internet_layer.hide();
      if (mobile_layer === null)
        mobile_layer = telecom_at_glance_init(_this.data("val"), _this.data("color"));
      else
        mobile_layer.show();
    }else{
      tele_layer.hide();
      if (mobile_layer != null)
        mobile_layer.hide();
      if (internet_layer === null)
        internet_layer = telecom_at_glance_init(_this.data("val"), _this.data("color"));
      else
        internet_layer.show();
    }
    $('section.graphs').css({background: _this.data("color")});
  });

// scroll navigation and scroll down button

$(document).ready(function ($) {
    var links = $('.navigation').find('li'),
      slide = $('.wrap-out'),
      button = $('.button'),
      mywindow = $(window),
      htmlbody = $('html,body'),
      scrolling = true,
      currIndex = 1,
      isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

    //Setup waypoints plugin
    slide.waypoint(function (event, direction) {
      //cache the variable of the data-slide attribute associated with each slide
    dataslide = $(this).attr('data-slide');
      currIndex = parseInt(dataslide);

      if (scrolling) {
        links.removeClass("active");
      if (direction === 'down') {
        $('.navigation li[data-slide="' + dataslide + '"]').addClass("active");
      } else {
        $('.navigation li[data-slide="' + dataslide + '"]').prev().addClass("active");
      }
      }

      //GESTISCO LE GIF VISIBILI
      if (direction == "down") {
        $("#slide" + (parseInt(dataslide) - 1)).css("backgroundImage","url('ui/img/anims/slide" + (parseInt(dataslide) - 1) + "_still.gif')");
        $("#slide" + (parseInt(dataslide) + 1)).css("backgroundImage","url('ui/img/anims/slide" + (parseInt(dataslide) + 1) + ".gif')");
      } else {
        $("#slide" + (parseInt(dataslide) + 1)).css("backgroundImage","url('ui/img/anims/slide" + (parseInt(dataslide) + 1) + "_still.gif')");
        $("#slide" + (parseInt(dataslide) - 1)).css("backgroundImage","url('ui/img/anims/slide" + (parseInt(dataslide) - 1) + ".gif')");
      }

      if ($("#slide" + dataslide).css("backgroundImage") == "url('ui/img/anims/slide" + dataslide + "_still.gif')")
        $("#slide" + dataslide).css("backgroundImage","url('ui/img/anims/slide" + dataslide + ".gif')");
  });

    //waypoints doesnt detect the first slide when user scrolls back up to the top so we add this little bit of code, that removes the class
    //from navigation link slide 2 and adds it to navigation link slide 1.
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
          links.removeClass("active");
          $('.navigation li[data-slide="1"]').addClass('active');
            currIndex = 1;
        }

        if (isMobile) {
        currIndex = Math.floor(mywindow.scrollTop() / $(".wrap-out").height()) + 1;
        }
    });

    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
    //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
      htmlbody.animate({
            scrollTop: $('.wrap-out[data-slide="' + dataslide + '"]').offset().top
      }, 1000, 'easeInOutExpo', function() { //era 600 easeOutQuint
        currIndex = parseInt(dataslide);
          scrolling = true;
        });
    }

    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');

        links.removeClass("active");
        $(this).addClass("active");

        scrolling = false;
        goToByScroll(dataslide);
    });

    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });
});

