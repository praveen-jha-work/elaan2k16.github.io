// JavaScript Document
$(document).ready(function(e) {
    var canvas = document.getElementById("universe");                            //getting canvas, context, setting dimensions and position
	var ctx = canvas.getContext("2d");
	var gcanvas = document.getElementById("glow");
	var gctx = gcanvas.getContext("2d");
	var ncanvas = document.getElementById("nebulae");
	var nctx = ncanvas.getContext("2d");
	
	var screen_height = screen.height;
	var screen_width = screen.width;
	
	var map, mapcenter;
	function initialize() {
  		var myLatlng = new google.maps.LatLng(28.213527,77.173785);
		var mapOptions = {
	    zoom: 15,
	    center: myLatlng,
		zoomControl: true,
		zoomControlOptions: {
		    style: google.maps.ZoomControlStyle.LARGE
		  }
	  }
	  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title: 'Apeejay Stya University'
	  });
	  mapcenter = map.getCenter();
	}
	
	try{
		google.maps.event.addDomListener(window, 'load', initialize);
	}
	catch(e){}
	
	
	function size(){
		canvas.height = screen_height*1.04;
		canvas.style.top = screen_height*-0.02+"px";
		canvas.width = screen_width*1.05;
		canvas.style.left = screen_width*-0.03+"px";
		
		gcanvas.height = screen_height*1.04;
		gcanvas.style.top = screen_height*-0.02+"px";
		gcanvas.width = screen_width*1.05;
		gcanvas.style.left = screen_width*-0.03+"px";
		
		ncanvas.height = screen_height*1.04;
		ncanvas.style.top = screen_height*-0.02+"px";
		ncanvas.width = screen_width*1.05;
		ncanvas.style.left = screen_width*-0.03+"px";
	}
	size();

	canvas.style.backgroundColor = "rgba(0,0,0,0)";
	ctx.fillStyle = "rgba(200,200,255,1)";
	gcanvas.style.backgroundColor = "rgba(0,0,0,0)";
	gctx.fillStyle = "rgba(255,255,255,0.05)";
	
	function drawStar(x, y, r1, r2){        //draws star at specified position
		ctx.beginPath();
		ctx.moveTo(x+r1,y);
		ctx.arc(x,y,r1,0,6.28,false);		
		ctx.fill();
		gctx.beginPath();
		gctx.moveTo(x+r2,y);
		gctx.arc(x,y,r2,0,6.28,false);		
		gctx.fill();
	}
	function clearStar(x,y,r2){            
		x = (x+canvas.width*10)%canvas.width;
		y = (y+canvas.height*15)%canvas.height;
		ctx.clearRect(x-r2,y-r2,x+r2,2*r2,2*r2);
		gctx.clearRect(x-r2,y-r2,x+r2,2*r2,2*r2);
	}
	 
	function star(x, y, layer){     //star constructor
		this.positionx = x;
		this.positiony = y;
		this.layer = layer;
		this.radius = Math.max(Math.random()*0.2 + this.layer/3 + 0.3, 1);
	}
	function comet(x, y){
	}
	
	var stars = [];
	function init(){
		stars = [];	
		for(var layer=0; layer<10; layer++){                   //creating stars
				//stars[layer]=[];
				for(var i=1; i<=(10 - layer)*5.2; i++){
				var x = Math.random()*canvas.width;
				var y = Math.random()*canvas.height;
				stars.push(new star(x,y,layer));
			}
		}
	}
	init();
	
	var cursorout = false;
	var slowx = false;
	var slowy = false;
	var mousex=0, mousey=0;
	var speedx=0, speedy =0;
	$(document).on("mouseleave",function(){cursorout=true;});
	$(document).on("mouseenter",function(){cursorout=false;});
	$(".main_menu").on("mouseenter",function(){cursorout=true;});
	$(".main_menu").on("mouseleave",function(){cursorout=false;});

	$(document).on("mousemove", function(e){
		mousex = e.clientX - canvas.width*0.5;
		mousey = e.clientY - canvas.height*0.5;
		if(cursorout)
		return;
		if(!slowx)
		speedx = 0.8*(mousex)/canvas.width;
		if(!slowy)
		speedy = 0.8*(mousey)/canvas.height;
	})
	
	/*bursting = false; var burst_speed = 0.0001, burst_dist = 0,*/var accl = 0.18, final_burst_dist = 0;    //drawing each frame
	var imgx =-300;
	var imgy =-250;
	var coord = 0;
	function drawStars(){
		//console.log(mousey+","+imgy+", "+speedy+", "+slowy);
		if((mousex<0 && imgx>-25) || (mousex>0 && imgx<(canvas.width - img.width + 25)))
		slowx = true;
		else
		slowx = false;
		
		if((mousey<0 && imgy>-25) || (mousey>0 && imgy<(canvas.height - img.height + 25)))
		slowy = true;
		else
		slowy = false;
		
		if((mousex<0 && imgx>-5) || (mousex>0 && imgx<(canvas.width - img.width + 5)))
		speedx=0;
		if((mousey<0 && imgy>-5) || (mousey>0 && imgy<(canvas.height - img.height + 5)))
		speedy=0
		
		if(cursorout){
			speedx *= 0.99;
			speedy *= 0.99;
		}
		if(slowx)
		speedx *= 0.99;
		if(slowy)
		speedy *= 0.99;
		
		if(bursting){
			burst_count++;
			
			ctx.clearRect(0,0,canvas.width,canvas.height);
			gctx.clearRect(0,0,canvas.width,canvas.height);
			imgx -= speedx*0.5;
			imgy -= speedy*0.5;
			//imgx = (imgx+canvas.width)%canvas.width;
			//imgy = (imgy+canvas.height)%canvas.height;
	
			var startx = imgx;
			var starty = imgy;
			
			nctx.drawImage(img, 0, 0, (canvas.width - startx), (canvas.height - starty), startx, starty, (canvas.width - startx), (canvas.height - starty));
			if(burst_count>=30 && burst_count<=70){
				if(burst_count==31)
				$("."+current_page).css("display","block");
				var opacity = Math.min(1, (burst_count-30)/15);
				var scale = Math.min(1, (burst_count-30)/35);
				//alert(opacity+", "+scale);
				$("."+current_page).css("opacity", opacity);
				$("."+current_page).css({transform: "scale("+scale+","+scale+")"});
			}
			
			if(burst_count>=17 && burst_count<=50){
				var opacity = Math.max(0, 1 - (burst_count - 17)/20); 
				/*Math.min(1, (burst_count)/35);*/
				var scale = Math.min(1.5,(burst_count - 17)*0.04 + 1);
				//alert(opacity+", "+scale);
				$("#nebulae").css("opacity", opacity);
				$("#nebulae").css({transform: "scale("+scale+","+scale+")"});
			}
			if(burst_count==51){	
				coord = Math.floor((Math.random()*8 + 1 + coord)%9);
				imgx = Math.floor(coord/3)*(canvas.width - img.width)/2;	
				imgy = (coord%3)*(canvas.height - img.height)/2;			
				nctx.drawImage(img, 0, 0, (canvas.width - imgx), (canvas.height - imgy), startx, starty, (canvas.width - imgx), (canvas.height - imgy));
			}
			
			if(burst_count>=50 && burst_count<=75){
				var opacity = Math.min(1, (burst_count - 50)/24); 
				/*Math.min(1, (burst_count)/35);*/
				var scale = Math.max(1, 1.5 - (burst_count - 50)*0.04);
				//alert(opacity+", "+scale);
				$("#nebulae").css("opacity", opacity);
				$("#nebulae").css({transform: "scale("+scale+","+scale+")"});
			}
			
			if(burst_count<=45){
				burst_dist += burst_speed;
				burst_speed += burst_speed*accl;
				final_burst_dist = burst_dist; 
			}
			else
			{
				//alert(burst_dist+", "+burst_speed+", "+burst_count);
				burst_speed -= burst_speed*0.15;
				burst_dist -= burst_speed;
			}
			for(var i=0; i<stars.length;i++){
					stars[i].positionx += (stars[i].positionx - canvas.width*0.5)*burst_dist;
					stars[i].positiony += (stars[i].positiony - canvas.height*0.5)*burst_dist;	
					if(stars[i].positionx<0 || stars[i].positionx>canvas.width || stars[i].positiony < 0 || stars[i].positiony > canvas.height){
						stars[i].positionx = Math.random()*canvas.width;//canvas.width*0.5 + 300*Math.random() - 150; //Math.random()*canvas.width;
						stars[i].positiony = Math.random()*canvas.height;
					}
					drawStar(stars[i].positionx, stars[i].positiony, stars[i].radius, stars[i].radius*3*Math.random()+2);
			}
			if(burst_count>75){
				bursting=false;
				/*for(var i=0; i<stars.length;i++){
					stars[i].positionx += (stars[i].positionx - canvas.width*0.5)*final_burst_dist;
					stars[i].positiony += (stars[i].positiony - canvas.height*0.5)*final_burst_dist;					
					//drawStar(stars[i].positionx, stars[i].positiony, stars[i].radius, stars[i].radius*4*Math.random()+3);
				}
			ctx.clearRect(0,0,canvas.width,canvas.height);
			gctx.clearRect(0,0,canvas.width,canvas.height);*/
			try{
				if(current_page === "faq")
				google.maps.event.trigger(map, "resize");
				map.setCenter(mapcenter);
			}
			catch(e){}
			speedx=0, speedy = 0;
			}
			setTimeout(requestAnimationFrame(drawStars), 16);
			return;
		}
		for(var i=0; i<stars.length;i++){
				clearStar(stars[i].positionx, stars[i].positiony, stars[i].radius*4+3);
		}
		imgx -= speedx;
		imgy -= speedy;
		//imgx = (imgx+canvas.width)%canvas.width;
		//imgy = (imgy+canvas.height)%canvas.height;

		var startx = imgx;
		var starty = imgy;
		
		nctx.drawImage(img, 0, 0, (canvas.width - startx), (canvas.height - starty), startx, starty, (canvas.width - startx), (canvas.height - starty));
		//gctx.drawImage(img, (img.width - startx - 5), (img.height - starty - 5), startx, starty, 0, 0, startx, starty);
		/*var clippedWidth = Math.min(img.width - startx, canvas.width);
		
		// fill left part of canvas with (clipped) image.
		gctx.drawImage(img, startx, 0, clippedWidth, img.height,	0, 0, clippedWidth, img.height);
		
		if (clippedWidth < canvas.width) {
		    // if we do not fill the canvas
		    var remaining = canvas.width - clippedWidth;
		    gctx.drawImage(img, 0, 0, remaining, img.height, clippedWidth, 0, remaining, img.height);
		}*/
		for(var i=0; i<stars.length;i++){
			var layer = stars[i].layer;
			stars[i].positionx -= speedx*(layer+1)/1.8;
			stars[i].positionx = (stars[i].positionx +canvas.width)%canvas.width;
			stars[i].positiony -= speedy*(layer+1)/1.8;
			stars[i].positiony = (stars[i].positiony + canvas.height)%canvas.height;
			drawStar(stars[i].positionx, stars[i].positiony, stars[i].radius, stars[i].radius*3*Math.random()+2);
		}
		setTimeout(requestAnimationFrame(drawStars), 16);
	}
	setTimeout(requestAnimationFrame(drawStars), 16);
});