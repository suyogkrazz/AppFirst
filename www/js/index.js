/*
App-o-Mat jQuery Mobile Cordova starter template
https://github.com/app-o-mat/jqm-cordova-template-project
http://app-o-mat.com

MIT License
https://github.com/app-o-mat/jqm-cordova-template-project/LICENSE.md
*/

var appomat = {};

appomat.app = {
	blogData:[{title:"kasbdkabsdkabsd",body:"jabsbakbabkbkabkabkabakbak"},
{
title:"i am ",body:"lorem ipsun del more"
}],
postTemplate:{

},blogListTemplate:{

},
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		
		this.postTemplate= Handlebars.compile($("#post-template").html());
		this.blogListTemplate= Handlebars.compile($("#blog-list-template").html());
    },
    postBeforeShow:function(event,args){
    	var post=this.blogData[args[1]];
        var app=this;
      //  console.log(post);
          $.ajax({
            type: "GET",
            url: 'http://localhost/pine1/arenasdetailapihere',
            data: {
             
                id:post.id

            },
            success:function(data){
  //$.mobile.loading('hide');
            var jsonObj = [];
              var  item = {}
        item ["title"] = post.title;
        item ["body"] = JSON.parse(data);

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
    get_blog_data:function(){
    	var app=this;
    		$.get('http://localhost/pine1/arenasapihere',function(data){
    			
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
            url: 'http://localhost/pine1/apiloginhere',
            data: {
             
                user:localStorage["username"],
                pass:localStorage["password"]

            },
            success:function(data){
                console.log(data);
                if (data=="no") {
                   // return false;
                };
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
    
    },

};


appomat.router= new $.mobile.Router(
			{
				'#post[?](\\d+)$':{handler:'postBeforeShow',events:"bs"},
				'#home$':{handler:'homeBeforeCreate',events:"bc"},
                '#home[?](\\d+)$':{handler:'loginBeforeCreate',events:"bc"},
			},

			appomat.app

	);
