/*
App-o-Mat jQuery Mobile Cordova starter template
https://github.com/app-o-mat/jqm-cordova-template-project
http://app-o-mat.com

MIT License
https://github.com/app-o-mat/jqm-cordova-template-project/LICENSE.md
*/
var url= "192.168.123.5";
//var url="localhost"
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
        this.userProfileTemplate = Handlebars.compile($("#user-profile-template").html());
        var app=this;
        $("#loginbutton").click(function(){
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
          app.change();
                   // 
        });
    },
    change:function(){
      console.log("ok");
      $.mobile.changePage("#post",{transition: 'slide'});
    },
    postBeforeShow:function(event,args){
      $("#post-content").html("");
    	var post=this.blogData[args[1]];
       // $("#profile-name").html(post.title);

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
    		$.get('http://'+url+'/pine1/arenasapihere',function(data){
    			
                var json = JSON.parse(data);
    			app.blogData=json;
    			//console.log(app.blogData);
    			$("#home-content").html(app.blogListTemplate(app.blogData));
    			$("#home-content").enhanceWithin();
    		});
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
            type: "GET",
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
				'#post[?](\\d+)$':{handler:'postBeforeShow',events:"bc"},
				'#home$':{handler:'homeBeforeCreate',events:"bs"},
                '#home[?](\\d+)$':{handler:'loginBeforeCreate',events:"bc"},

			},

			appomat.app

	);
