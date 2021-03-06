$(document).ready(function(){

  // giving section full height of the browser

  $('.wrap-out').css('min-height', $(window).height()+'px');
  $('.milestones iframe').css('min-height', $(window).height()+'px');

  $("a[rel*=leanModal]").leanModal({closeButton: ".modal_close"});

  var slide_count = $('.navigation li').length;

  $('.tooltip').tipsy({gravity: function() { return this.getAttribute('data-placement') == undefined ? 'n' : this.getAttribute('data-placement') } });

  // $(document).keyup(function(e){
  //   if( e.keyCode == 37 || e.keyCode == 39){
  //     e.preventDefault();
  //     var _timeline_frame = document.getElementById('timeline_frame');
  //     if( $(_timeline_frame).isOnScreen() ){
  //       var cw = _timeline_frame.contentWindow;
  //       if ( e.keyCode == 37 ){
  //         cw.VMM.fireEvent(".nav-previous","click", this.onPrevClick);
  //       }else if(e.keyCode == 39){
  //         cw.VMM.fireEvent(".nav-next","click", this.onNextClick);
  //       }else{
  //         return;
  //       }
  //     }else{
  //       return;
  //     }

  //   }else if(e.keyCode == 38 || e.keyCode == 40){
  //     var curr = $('.navigation li.active').data('slide');
  //     if( (slide_count == curr && e.keyCode == 40) || (curr == 1 && e.keyCode == 38) )
  //       return;
  //     e.preventDefault();
  //     var point = e.keyCode == 38 ? (curr-1) : (curr+1);
  //     console.log(point);
  //     goToByScroll(point);
  //   }
  //   else{
  //     return;
  //   }
  // });

});
  // operators circular charts

  function rand(){ return Math.floor((Math.random()*(360-0))+0); }

  function value_to_angle(value){
    return (360/100)*parseFloat(value);
  }

  function circular_chart_init(el, data_array, title,h,w){
    var stage = new Kinetic.Stage({
      container: el,
      width: w,
      height: h,
      fill: "def"
    });

    var x = w/2, y = h/2;
    data_array.reverse();
    var layer = new Kinetic.Layer();
    var radius = (data_array.length * 32);
    var startAngle = 0;

    for(var i = 0; i < data_array.length; i++){
      do_chart(i);
    }
    function do_chart(i){
    var data_value = data_array[i].value;

    var endAngle = startAngle + value_to_angle(data_value);

    var arc = new Kinetic.Shape({
      drawFunc: function(canvas) {
          var context = canvas.getContext('2d');
          context.beginPath();
          context.arc(x, y, this.getAttrs().radius, this.getAttrs().startAngle, this.getAttrs().endAngle, false);
          canvas.stroke(this);
      },
      fill: data_array[i].color,
      stroke: data_array[i].color,
      radius: radius,
      startAngle: startAngle*0.0174532925,
      endAngle: endAngle*0.0174532925,
      strokeWidth: 9
      });


    startAngle = endAngle;

    var circle_outer = new Kinetic.Circle({
        x: x,
        y: y,
        radius: radius,
        stroke: 'rgba(17, 134, 152,1)',
        strokeWidth: 7
      });

    layer.add(circle_outer);
    layer.add(arc);

    arc.on('mouseover', function(e) {
        (new Kinetic.Tween({
        node: this,
        strokeWidth: 18,
        easing: Kinetic.Easings['ElasticEaseInOut']
        })).play();
      });
      arc.on('mouseout', function(e) {
        (new Kinetic.Tween({
        node: this,
        strokeWidth: 9,
        easing: Kinetic.Easings['ElasticEaseInOut']
        })).play();
      });

    radius -= 15;
    }

    stage.add(layer);
  }


  var telephone_penetration_data = [
  {data: "Mobile (GSM, CDMA)", color: "rgb(195, 133, 236)", value: 68.45},
  {data: "Fixed (Pstn, WLL)", color: "rgb(133, 218, 113)", value: 5.52},
  {data: "Others (LM, GMPCS)", color: "#FE9F8B", value: 3.14}
  ];

  var telephony_market_share = [
  {data: "NCell", color: "rgb(195, 133, 236)", value: 49},
  {data: "NTC", color: "rgb(133, 218, 113)", value: 43},
  {data: "UTL", color: "#FE9F8B", value: 4},
  {data: "STPL", color: "rgb(37, 220, 228)", value: 3},
  {data: "NSTPL", color: "#DEC628", value: 1}
  ];

  var internet_market_share =[
  {data: "NCell", color: "rgb(195, 133, 236)", value: 52},
  {data: "NTC", color: "rgb(133, 218, 113)", value: 46},
  {data: "UTL", color: "#FE9F8B", value: 1},
  {data: "STPL", color: "rgb(37, 220, 228)", value: 1}
  ];

  circular_chart_init("tele_penetration",telephone_penetration_data,"TELEPHONE PENETRATION",300,300);
  circular_chart_init("tele_market_share",telephony_market_share,"TELEPHONE MARKET SHARE",380,380);
  circular_chart_init("internet_share",internet_market_share,"INTERNET MARKET SHARE",350,350);

  // graphs js

  var data_arr = [
  {date: "Dec, 2010", tele_penetration: 36.37, internet_penetration: 5.79, mobile_penetration: 31.56 },
  {date: "Jun, 2011", tele_penetration: 44.9, internet_penetration: 10.28, mobile_penetration: 39.53},
  {date: "Dec, 2011", tele_penetration: 56.46, internet_penetration: 14.55, mobile_penetration: 50.16},
  {date: "Jun, 2012", tele_penetration: 63.76, internet_penetration: 18.57, mobile_penetration: 56.55},
  {date: "Dec, 2012", tele_penetration: 70.61, internet_penetration: 21.49, mobile_penetration: 62.68},
  {date: "Jun, 2013", tele_penetration: 78.85, internet_penetration: 25.82, mobile_penetration: 70.04 }
  ];
  var width = 920, height = 440;
  var gap = 140;

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
      var per = new Kinetic.Text({x:4,y:height-tmp+4, text: 25*i+" %", fill: "#fff", fontFamily: "ubuntu",textAlign:"center"});
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
      if( k == len)
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
        fontFamily: 'ubuntu',
        fill: color_pref,
        strokeWidth: 0,
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

      var date = new Kinetic.Text({x:x-40,y:height-15, text: self.date , fill: "#fff",fontFamily: 'ubuntu', fontSize: '12'});
      layer.add(date);
      stage.add(layer);
      k++;
    },800);

    function join_points(){
      var line_join = new Kinetic.Line({
          points: p_arr,
          stroke: '#fff',
          strokeWidth: 3
        });
      layer.add(line_join);
      stage.add(layer);
    }

    return layer;

  }

  var tele_layer = null, internet_layer = null, mobile_layer = null;
  setTimeout(function(){
  	stage_init();
    tele_layer = telecom_at_glance_init("tele_penetration","#e2674a");
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
    window.goToByScroll = function(dataslide) {
      console.log(dataslide);
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

