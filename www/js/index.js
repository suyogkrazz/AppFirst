/*
App-o-Mat jQuery Mobile Cordova starter template
https://github.com/app-o-mat/jqm-cordova-template-project
http://app-o-mat.com

MIT License
https://github.com/app-o-mat/jqm-cordova-template-project/LICENSE.md
*/
//var url= "192.168.123.4";
var url="localhost"
var appomat = {};

appomat.app = {
	blogData:[{title:"kasbdkabsdkabsd",body:"jabsbakbabkbkabkabkabakbak"},
{
title:"i am ",body:"lorem ipsun del more"
}],
postTemplate:{

},blogListTemplate:{

},userProfileTemplate:{

},
    initialize: function() {

		document.addEventListener('deviceready', this.onDeviceReady, false);
		this.checkLogin();
		this.postTemplate= Handlebars.compile($("#post-template").html());
		this.blogListTemplate= Handlebars.compile($("#blog-list-template").html());
        this.geoListTemplate= Handlebars.compile($("#geo-list-template").html());
        this.userProfileTemplate = Handlebars.compile($("#user-profile-template").html());
        var app=this;
        $("#loginbutton").click(function(){
          localStorage["log"]="set";
            app.loginBeforeCreate();
        });
        $("#home-refresh-btn").click(function(){
            app.get_blog_data();
        });
          $("#logout").click(function(){
            app.logOut();
        });

        $("#view-my-profile").click(function(){
            app.getProfile();
        });

        $(document).on("click",".ll",function() {
             var phoneno=$(this).attr("val");
             window.open('tel:'+phoneno, '_blank', 'location=no,closebuttoncaption=Home,disallowoverscroll=yes');

    });

      $(document).on("swipeleft",".slide",function(){
         if (localStorage["recentarena"]>0) {
          

                  $.ajax({
                  type: "GET",
                  url: 'http://'+url+'/pine1/arenasdetailapihereleft',
                  data: {
                   
                      id:localStorage["recentarena"],

                      date:$("#datehere").val(),

                  },

              dataType: 'json',
                  success:function(data){
        //$.mobile.loading('hide');
       // console.log(data.date);
                  var jsonObj = [];
                    var  item = {}
              item ["title"] = data.title;
              item ["contact"] = data.contact;
              item ["body"] = data.body;
               item ["date"] = data.date;
              jsonObj.push(item);
              $("#post-content").html(app.postTemplate(jsonObj[0]));
              $("#post-content").enhanceWithin();
                  },
                        beforeSend : function (){
                      //  $.mobile.loading('show');
                    }
              });
                     };
       $.mobile.changePage("#post",{transition: 'slide',allowSamePageTransition:true, reverse: false });
      
        });
  $(document).on("swiperight",".slide",function(){
         if (localStorage["recentarena"]>0) {
          

                  $.ajax({
                  type: "GET",
                  url: 'http://'+url+'/pine1/arenasdetailapihereright',
                  data: {
                   
                      id:localStorage["recentarena"],

                      date:$("#datehere").val(),

                  },

              dataType: 'json',
                  success:function(data){
        //$.mobile.loading('hide');
       // console.log(data.date);
                  var jsonObj = [];
                    var  item = {}
              item ["title"] = data.title;
              item ["contact"] = data.contact;
              item ["body"] = data.body;
               item ["date"] = data.date;
              jsonObj.push(item);
              $("#post-content").html(app.postTemplate(jsonObj[0]));
              $("#post-content").enhanceWithin();
                  },
                        beforeSend : function (){
                      //  $.mobile.loading('show');
                    }
              });
                     };
       $.mobile.changePage("#post",{transition: 'slide',allowSamePageTransition:true, reverse: true });
      
        });
          
    },
   
    postBeforeShow:function(event,args){
      $("#post-content").html("");
    	var post=this.blogData[args[1]];
       // $("#profile-name").html(post.title);

         localStorage["recentarena"] = post.id;

     //  console.log(args[1]);
        var app=this;
       // console.log(post);
          $.ajax({
            type: "GET",
            url: 'http://'+url+'/pine1/arenasdetailapihere',
            data: {
             
                id:post.id

            },

        dataType: 'json',
            success:function(data){
  //$.mobile.loading('hide');
 // console.log(data.date);
            var jsonObj = [];
              var  item = {}
        item ["title"] = post.title;
        item ["contact"] = post.contact;
        item ["body"] = data.body;
         item ["date"] = data.date;
        jsonObj.push(item);
           console.log(  localStorage["username"]);
        $("#post-content").html(app.postTemplate(jsonObj[0]));
        $("#post-content").enhanceWithin();
            },
                  beforeSend : function (){
                //  $.mobile.loading('show');
              }
        });
    },
     getProfile:function(){
        var app=this;
        $.ajax({
            type: "GET",
            url: 'http://'+url+'/pine1/myProfile',
            data: {
             
                user:localStorage["username"]

            },
            success:function(data){
                $("#user-profile").html(app.userProfileTemplate(JSON.parse(data)));
                $("#user-profile").enhanceWithin();
            }
        });
    },
    get_blog_data:function(){
     	var app=this;
    //    if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition);
    // }
    // else{
      $.get('http://'+url+'/pine1/arenasapihere',function(data){
          
                var json = JSON.parse(data);
          app.blogData=json;
          //console.log(app.blogData);
          $("#home-content").html(app.blogListTemplate(app.blogData));
          $("#home-content").enhanceWithin();
        });
    // }
    function onError(error) {
    // alert('code: '    + error.code    + '\n' +
    //       'message: ' + error.message + '\n');
}

    		function showPosition(position) {
    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    //       'Longitude: '         + position.coords.longitude         + '\n' +
    //       'Altitude: '          + position.coords.altitude          + '\n' +
    //       'Accuracy: '          + position.coords.accuracy          + '\n' +
    //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //       'Heading: '           + position.coords.heading           + '\n' +
    //       'Speed: '             + position.coords.speed             + '\n' +
    //       'Timestamp: '         + position.timestamp                + '\n');

        $.ajax({
            type: "GET",
            url:  'http://'+url+'/pine1/geoarenasapihere',
            data: {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              radius:1200

            },
            success:function(data){ 
              console.log(data);
               var json = JSON.parse(data);
          app.blogData=json;
          //console.log(app.blogData);
          $("#home-content").html(app.geoListTemplate(app.blogData));
          $("#home-content").enhanceWithin();
                }
              });
    }
    },
    homeBeforeCreate:function(event,args){

    	this.get_blog_data();
    	// $("#blog-list").html(this.blogListTemplate(this.blogData));
    	// $("#blog-list").enhanceWithin();
    
    },
    onDeviceReady: function() {
		FastClick.attach(document.body);
    },
    checkLogin: function() {
                  $.ajax({
            type: "POST",
            url: 'http://'+url+'/pine1/apiloginhere',
            data: {
             
                user:localStorage["username"],
                pass:localStorage["password"]

            },
            success:function(data){
              //  console.log(data);

                if (data=="no") {
                    $.mobile.changePage("#login",{transition: 'pop'});
                   // return false;
                   $(".error").html("Incorrect password and username combination!!TRY AGAIN");
                }else{
                    $(".error").html("");
                    $.mobile.changePage("#home",{transition: 'pop'});
                }
                  if (localStorage["log"]=="set") {
                  
                       localStorage["log"]="";

                    }else{
                      $(".error").html("");  
                   }

            }
        });
    }
    ,loginBeforeCreate:function(event,args){

      //  console.log($("#textinput-1").val());
       //  console.log($("#textinput-2").val());
         localStorage["username"] = $("#textinput-1").val();
           localStorage["password"] = $("#textinput-2").val();
           this.checkLogin();
           
        this.get_blog_data();
        // $("#blog-list").html(this.blogListTemplate(this.blogData));
        // $("#blog-list").enhanceWithin();
    
    },logOut:function(){

         localStorage["username"] = "";
           localStorage["password"] = "";
           this.checkLogin();
          
    },
   

};


appomat.router= new $.mobile.Router(
			{
				'#post[?](\\d+)$':{handler:'postBeforeShow',events:"bs"},
				'#home$':{handler:'homeBeforeCreate',events:"bs"},
                '#home[?](\\d+)$':{handler:'loginBeforeCreate',events:"bs"},

			},

			appomat.app

	);

  function bookgame(id){
          alert(id);

        }