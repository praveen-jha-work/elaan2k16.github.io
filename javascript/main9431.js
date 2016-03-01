	 // JavaScript Document
	var essentials = [];
	var img = new Image();
	img.src = "resources/bg-mark6.jpg";
	var img2 = new Image();
	img2.src = "resources/side-text.png";
	var img3 = new Image();
	img3.src = "resources/logo.png";
	essentials[0] = img;
	var pageLoaded = false;
	var essential_srcs = ["resources/logo.png","resources/grand%20arcanum.jpg","resources/colloquia-bg.jpg","resources/ibox.png","resources/ingenium-bg.jpg","resources/matricks-bg.png","resources/yanthrix.jpg","resources/circles.png"];
	var bursting = false, burst_count=0, burst_speed = 0.0001, burst_dist = 0;
	var current_page, prev_page = "";
	var signed_in = false;
	var signed_in_callback = function(){};
	var all_events_state = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var access_token = "";

	$(document).ready(function(e) {
	    $("body").css("height", $(window).innerHeight());
	    $("body").css("width", $(window).innerWidth());
		$(".page").css("height", 660);
	    $(".page").css("width", 1360);
		$(".spinner_cover").css("height", $(window).innerHeight());
	    $(".spinner_cover").css("width", $(window).innerWidth());
		if($(window).innerWidth()>1300)
		$(".envelope").css("overflow", "hidden");
		
		$(window).on("resize", function(){
				$("body").css("height", $(window).innerHeight());
			    $("body").css("width", $(window).innerWidth());
				/*$(".page").css("height", $(window).innerHeight()*0.98);
			    $(".page").css("width", $(window).innerWidth()*0.98);*/
				$(".spinner_cover").css("height", $(window).innerHeight());
			    $(".spinner_cover").css("width", $(window).innerWidth());
				if($(window).innerWidth()>1300)
				$(".envelope").css("overflow", "hidden");
				else
				$(".envelope").css("overflow", "auto");
			});

		img.onload = function(){
			if(!pageLoaded){
				$(".spinner_cover").fadeOut(700);
				pageLoaded = true;
			}
			};
		setTimeout(function() {
			if(!pageLoaded && img.complete){
				$(".spinner_cover").fadeOut(700);
				pageLoaded = true;		
			}
			}, 250);
			
		$(".themep").on("click", function(){
		$(".theme").css("z-index", 14);
		$(".theme").css("opacity", 1);
		$(".exitway").css("z-index", 13);
		});
		
	$(".exitway").on("click", function(){
		$(".theme").css("z-index", 0);
		$(".theme").css("opacity", 0);
		$(".exitway").css("z-index", 0);
		});
		

		/**
		var musicPlay = true;
		var audio1 = document.getElementById("audioplayer1");
		var audio2 = document.getElementById("audioplayer2");
		audio1.playbackRate = 1.1;
		audio2.playbackRate = 0.7;
		audio2.onload = function(){
			audio2.currentTime = Math.floor(Math.random()*15);
		}
		$(".audio").on("click", function(){
			if(musicPlay){
				audio1.pause();
				audio2.pause();
				musicPlay = false;
				$(this).attr("src","resources/mute.png");
			}
			else{
				audio1.play();
				audio2.play();
				musicPlay = true;
				$(this).attr("src","resources/audio.png");
			}
		});**/
		
		var eventsback = function(){
			super_eventi = 0, eventi = 0;
			$(".events_thumbs_env").css({transform: "scale(4,4)"});
			$(".events_details").css({transform: "rotate(0deg) scale(0.1,0.1)"});
			$(".events_quickmenu").fadeOut(200);
			$("#pointer").fadeOut(300);
			$(".events_content, .events_details, .events_menu").fadeOut(300, function(){
				 $(".events_menu").css({transform: "translate(0px, 0px)"});
		 		$(".events_thumbs_env").css({transform: "scale(1,1)"});
				 $(".events_thumbs").fadeIn(200);
				 //$(".events_details").css({transform: "rotate(0deg) scale(0.1,0.1)"});
				});
		};
		
		var gotocategory = function(index){
			if(index<0)
			return;
			super_eventi = index;
			eventi = 0;
			$(".events_content").fadeOut(250);
			$(".tab").fadeOut(250);
			var event_names_html = "";
			$(".events_menu_env").fadeOut(250, function(){
				for(var i=0; i<event_names[super_eventi].length;i++)
				event_names_html += "<div class='events_menu'><p>"+event_names[super_eventi][i]+"</p></div>";
				$(".events_menu_env").html(event_names_html);
				$(".events_menu_env").fadeIn(250);
				$(".events_menu").each(function(index, element) {
					$(".events_menu").eq(index).css("transition-delay", index*0.3+"s");
					//$(".events_menu").eq(index).fadeIn(500);
					$(".events_menu").eq(index).css("opacity",1);
	                $(".events_menu").eq(index).css({transform: "translate(0px, "+index*50+"px)"});
					$(".events_quickmenu").fadeIn(300);
	    	    });
				setTimeout(function(){
						$(".events_menu").css("transition-delay", "0s");
						}, 650);	
			});
		};
		
		var quickmenu_anim = function(index){
			for(var i=0; i<10; i++){
				if(i!=index && $(".events_quickmenu p").eq(i).hasClass("events_curcategory"))
				$(".events_quickmenu p").eq(i).removeClass("events_curcategory");
			}
			$(".events_quickmenu p").css({transform: "translateY(0px)"});
			if(index==0){
				gohome();
				return;
			}
			$(this).addClass("events_curcategory");
			for(var i=0; i<10; i++){
				if(i<index)
				$(".events_quickmenu p").eq(i).css({transform: "translateY(25px)"});
				else if(i>index)
				$(".events_quickmenu p").eq(i).css({transform: "translateY(-25px)"});
				else
				$(".events_quickmenu p").eq(i).addClass("events_curcategory");
			}
		};
		
		var page = "";
		$(".main_menu p").on("click", function(){
			page = $(this).attr("class");
			page = page.substring(5,page.length);
			if(page === "magna")
			page="lecture";
			if(page === prev_page && !(page==="events"))
			return;
			bursting = true;
			burst_count=0, burst_speed = 0.0001, burst_dist = 0;
			current_page = page;
			$(".wiss_logo").css("opacity", 0);
			$(".shy").css("visibility", "hidden");
			$(".wiss_logo").css("z-index", 0);
			$(".themep").css("opacity", 0);
			$(".themep").css("z-index", 0);
			$(".wiss_corner").css("opacity", 1)
			$(".wiss_corner").css("z-index", 5);
			if(prev_page.length>0)
			$("."+prev_page).fadeOut(350, function(){$("."+prev_page).css("opacity",0);});
			/*setTimeout(function(){
				$("."+page).css("opacity", 1);
				$("."+page).css({transform: "scale(1,1)"});
				if(prev_page.length>0)
				$("."+prev_page).css({transform: "scale(0.05,0.05)"});
				prev_page = page;
			}, 300);*/
			if(prev_page === "events")
			eventsback();
			prev_page = page;
			});
			
		var gohome = function(){
			if(prev_page.length>0){
				$("."+prev_page).fadeOut(350, function(){
					$("."+prev_page).css("opacity",0);
					if(prev_page === "events")
					eventsback();
					prev_page = "";page = "";
					$(".wiss_logo").css("opacity", 1);
					$(".shy").css("visibility", "visible");
					$(".wiss_logo").css("z-index", 5);
					$(".themep").css("opacity", 1);
					$(".themep").css("z-index", 5);
					$(".wiss_corner").css("opacity", 0)
					$(".wiss_corner").css("z-index", 0);
				});
			}
		}
		
		$(".home").on("click", function(){
			gohome();
		});
		/*events*/
		
		var event_names = [];
		var event_details = [];
		
		event_names[0] = ["Fashion Show","Solo Singing","Battle of Bands","Dance","Nukkad Natak","Face Painting","Poetry out Loud","Mishmash","Design Solution","Clash of DJ","AD MAD"];
		
	/**For Tech "combine them"**/

		event_names[1] = ["Project Display","Pick & Design","BOT-Dash","Green Idea","Hack-A-Thon","Weave the WEB","Find the Glitch"];
		event_names[2] = ["Game ON!","Constructo","Simudesign","Superstructure","Health Checkup","Treequation","Blueprint","I.N.S.","TRUSS Bridge"]
		

		event_details[0] = [];
		event_details[1] = [];
		event_details[2] = [];
		event_details[3] = [];
		event_details[4] = [];
		event_details[5] = [];
		event_details[6] = [];
		event_details[7] = [];
		event_details[8] = [];
		event_details[9] = [];
		event_details[10] = [];

		event_details[0][0] = [["Introduction",'<p> Many designers of Apeejay Stya University and students from outside and other colleges showcase their beautiful dresses in this event. Students participate to show their talent of designing dresses and showing their catwalk on ramp.</p> '],["Rules",'<p> <ul><li>All participants must bring their ID cards.</li><li> No. of models per team 8 to 10. </li><li> Accompanist per team-maximum 5 (including of designers, makeup artist and back stage help)</li><li> Time -15 minutes including 4 minutes for setup.</li><li> Participants should bring their own song if they have any specification theme else default song will be played.</li></ul></p>'],["Student Coordinator",'<p><li>Shikha Singh</li><li>Kratika Mehrotra</li></p>'],["Faculty Coordinator",'<p> <ul><li>Mrs. Chetna Patiyal</li><li>Ms Ashima Arora</li></p>'],["Contact Details",'<p></p><p><li>Kratika Mehrotra- 7027806706</li></p><p>kratika.mehrotra@asu.apeejay.edu</p><p><li>Shikha Singh- 9760878068</li></p><p>shikha.singh@asu.apeejay.edu</p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		event_details[0][1] = [["Introduction",'<p> It is said that “Singing is the best feeling in the world”. Students from Apeejay Stya University and from other colleges express their feelings through their melodious voice.</p>'],["Rules",'<p> <ul><li> Time limit for singing is minimum 3 minutes and maximum 4 minutes. After 4 minutes the participants will have negative markings.</li><li> Participants must bring their own instrument or instrumental (karaoke) music to perform.</li></ul></p>'],["Student Coordinator",'<p><li>Anushka Singh</li></p><p><li>Arghya Bhattacharya</li></p>'],["Faculty Coordinator",'<p> <ul><li> Mr. Uma Shankar </li></p><p><li> Mrs Satakshi Srivastav</li></p>'],["Contact Details",'<p></p><p><li>Anushka Singh - 9992649474 </li><p>anushka.singh@asu.apeejay.edu</p></p><p><li> Arghya Bhattacharya - 9996635710</li><p>arghya.bhattacharya@asu.apeejay.edu</p></p><p></p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		event_details[0][2] = [["Introduction",'<p> In this event more than two bands compete each other in order to get the title of best band. Bands from different colleges and from Apeejay Stya University compete.</p>'],["Rules",'<p> <ul><li> Every band must play 2 songs, out of which one must be their original work.</li><li> Each band will be allotted 15 minutes for their both performance.</li><li> Each band should bring their own musical cords, aux wires in case of emergency.</li><li>Apeejay Stya University will not be responsible for any broken equipment. Injuries or any other negative occurrences.</li><li> The winner of battel of bands may be asked to play a song of their own collection for 10-15 minutes (which must be different from the previous one.)</li></ul></p>'],["Student Coordinator",'<p> <li>Ravi Kumar</li></p><p><li>Vaibhav Kapoor</li></p>'],["Faculty Coordinator",'<p> <ul><li> Tr. Vijay Kumar</li></p>'],["Contact Details",'<p></p><p><li>Ravi Kumar - 9729033630</li>ravi.kumar@asu.apeejay.edu</p><p><li>Vaibahv Kapoor - 9953218406</li>vaibhav.kapoor@asu.apeejay.edu</p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		event_details[0][3] = [["Introduction",'<p> Dance is the hidden language of the Soul. Apeejay Stya university providing platform for the students of Apeejay and from outside to perform their talent on the stage.”</p>'],["Rules",'<p> <ul><li> Participant can participate in all the categories.</li><li> Time limit is minimum 3 minutes for solo, 3 minutes for duet and maximum 4 minutes for the same. And for the group dance 6-7 minutes will be provided. </li><li> Participants are required to bring their own music CDs (in .dat/.wma/.mp3)and props.</li><li> The minimum number of participants in group dancing will be 6 and maximum can be 8.</li></ul></p>'],["Student coordinator",'<p><li> Ankita Singh</li></p> </p><p><li> Shilpa Saharan</li></p>'],["Faculty coordinator",'<p><li>Mrs. Ekta Bhayana</li></p><p><li>Mrs. Deepti Juneja</li></p><li>Mrs. Preeti Rathore</li></p>'],["Contact Details",'<p><li>Ankita Singh-9905905267</li> ankita.kumar@asu.apeejay.edu</p><p><li>Shilpa Saharan-9728619558</li>shilpa.saharan@asu.apeejay.edu</p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		event_details[0][4] = [["Introduction",'<p> Nukkad Natak is the combination of spirit-plot-audience-drama-themes-crowd-cause</p>'],["Rules",'<p> <ul><li> This is an individual on the spot competition. There is no limit of entries from a college.</li><li> Time limit is 45 minutes.</li><li> The participants shall bring their own material.</li><li> Primary printed area should be there. However neck, chest, shoulders may also be painted.</li><li> Profane or offensive painting will be disqualified.</li><li> Sponges, brushes or air brush techniques maybe used.</li></ul></p>'],["Student Coordinator",'<p> <li> Ekansh Sethi</li></p>'],["Faculty Coordinator",'<p> <ul><li> Amit Salathia</li><li> Abdul Khan</li></p>'],["Contact Details",'<p></p><p><li>Ekansh Sethi - 9992589358</li>ekansh.sethi@asu.apeejay.edu</p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		﻿﻿event_details[0][5] = [["Introduction",'<p> “Art is not what you see but what you make others”. So Apeejay Stya University heartly welcomes all the artists to express their talent.</p>'],["Rules",'<p> <ul><li> This is an individual on the spot competition. There is no limit of entries from a college. </li><li> Time limit is 45 minutes.</li><li> The participants shall bring their own material.</li><li> Primary printed area should be there. However neck, chest, shoulders may also be painted.</li><li> Profane or offensive painting will be disqualified.</li><li> Sponges, brushes or air brush techniques maybe used.</li></ul></p>'],["Student coordinator",'<p></p>'],["Faculty coordinator",'<p><li> Amit Salathia</li></p>'],["Contact Details",'<p> - </p>'],["Registration",'<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		﻿event_details[0][6] = [["Introduction",'<p> Poetry recitation with a little twist. Test your aptitude for recitation against others and show your love for poetry in this stirring competition of poetry!<br><br>Registration – Pre-registrations only. Individual participation.</p>'],["Rules",'<p> <ul><li> There would be two rounds–</li><li>Recite poetry of your choice.</li><li>Recite poetry of our choice.</li><li> There will be elimination in round 1. Only selected students will proceed to round 2.</li><li> 2-3 minutes would be given for recitation.</li><li> Poems must be recited from memory, use of sheets or phones will not be allowed.</li><li> Poems can be modern or classic – but should be from well-known poets.</li><li> Medium of poetry – Hindi or English.</li></ul></p>'],["Student coordinator",'<p><li>Vanshika Singh</li></p>'],["Faculty coordinator",'<p><li> Malvika Singh</li><li> A.D. Gurunathan</li></p>'],["Contact Details",'<p><li>Vanshika Singh - 9971427055</li></p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];
	
		event_details[0][7] = [["Introduction",'<p> Quizzes have never been more exciting! Match your wits against others in this crazy maze of letters, words, phrases and puzzles! A fun event comprising of questions from a multitude of word games such as spell bee, hangman, scrabble and baffling riddles!<br><br>Registration – On the spot registrations allowed. Individual participation.</p>'],["Rules",'<p> <ul><li> Total 30 questions. Three rounds. 10 questions per round.</li><li> 1 min per question.</li><li> Each round will have elimination. Top 10 scorers will proceed to round 2. Top 5 to round 3.</li></ul></p>'],["Student Coordinator",'<p><li> Poojita Suri</li></p>'],["Faculty Coordinator",'<p> <ul><li>Malvika Kaul</li><li> AD Gurunathan</li></p>'],["Contact Details",'<p></p><p><li>Poojita Suri - 9930710795</li>poojita.suri@asu.apeejay.edu</p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		event_details[0][8] = [["Introduction",'<p>School of design and visual art in collaboration with other streams of Apeejay Stya University will exhibit models, 2d posters, and movie and prototype products to answer our problems. These problems are based in two broad categories of INTERIOR & GRAPHICS. And this will be named as design n solution exhibition.</p>'],["Rules",'<p><li> - </li>'],["Student Coordinator",'<p><li>Lipika Agarwal</li><li>Milind</li></p>'],["Faculty Coordinator",'<p> <ul><li> Ms.Nupur Jha </li><li>Ms.Ashima Arora</li></p>'],["Contact Details",'<p><li>Lipika Agarwal - 9818880725</li><li>Milind - 9992882301</li></p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		event_details[0][9] = [["Introduction",'<p> Its DJ mixing competition in which you have the freedom to entertain the crowd for 30 mins with your own innovative beats and music.</p>'],["Rules",'<p> <ul><li>Teams of maximum 2 are allowed. </li><li>One pioneer mixer will be provided.</li><li> Teams can bring their own mixers.</li><li>Normal mashup of songs are not allowed.</li><li>Judging will be based on innovative music, beats throughout the music performance.</li>'],["Student Coordinator",'<p><li> Aryan Kumar </li></p>'],["Faculty Coordinator",'<p> <ul><li> Sonam Raheja </li></p>'],["Contact Details",'<p><li>Aryan Kumar - 8295211042</li></p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];

		event_details[0][10] = [["Introduction",'<p> “The Ad Mad Show where creativity meets. Show your skills to sell given products.”</p>'],["Rules",'<p><li>Number of participants per team – 4.</li><li>Topic will be provided on the spot.</li><li>30 minutes for preparation will be provided and stationary shall also be provided to the teams.</li><li>Every ad should not be for more than 2 minutes beyond that negative marking shall be observed.</li><li>Any team indulging in defamation, violence, Obscenity and prejudice shall be immediately disqualified.</li><li>Use of pre-existing brands is prohibited.</li></p>'],["students Coordinator",'<p><li>Lokesh Singh</li><li>Ankit Singh</li></p>'],["Faculty Coordinator",'<p><li>Prof. Deepak Halan</li></p>'],["Contact Details",'<p><li>Lokesh Singh - 9996635265</li></p>'],["Registration", '<a href="http://goo.gl/forms/rF2NT2VPiy">Register</a>']];


/**TECH Shield**/

event_details[1][0] = [["Introduction",'<p> In this fast modernising world and even faster modernising technologies, a need of innovating ideas as well as people to implement those ideas has increased beyond imagination. It is the creation and implementation of these ideas that has allowed us to develop many of the equipments and gadgets that has made this world a lot smaller and within the reach of a common man.<br>PROJECT DISPLAY is not only a competition but an opportunity for all the budding engineers to showcase their brilliant implemented ideas to other people and to encourage them to develop more such ideas and to keep engineering. </p><p>Registration – Pre-registrations only. Individual participation.<li>Time - 10:00AM – 12:00PM</li><li>Venue - Library Corridor</li></p>'],["Rules",'<p> <ul><li> This is an individual as well as a team event.</li><li> Each team should have not more than 2 members.</li><li> Each team will be allotted max.10 minutes (including time for cross questioning by judges) to explain their projects.</li><li> Participation can be done on spot also.</li><li> Projects from any branch of engineering are acceptable.</li><li> Laptops should be brought by the participants(if required especially by CSE)</li></ul></p>'],["Student coordinator",'<p><li>Dhruv Yadav</li><li>Poojita Suri</li><li>Chinmaye Agarwal</li><li> Kona Biswas</li><li> Neelanja Chaturvedi</li><li> Saurabh Singh Raghav</li></p>'],["Faculty coordinator",'<p><li>Mrs. Ekta Bhayana</li><li>Mrs. Arti Nagpal</li><li> Mr. Sudhakar Ranjan</li></p>'],["Contact Details",'<p><li>Dhruv Yadav (EECE) - 9999474297</li><li>Poojita Suri (CSE) - 9930710795</li><li>Chinmaye Agarwal (MEPD) - 9958020822</li><li> Kona Biswas - 9729885299</li><li> Neelanja Chaturvedi - 9729233776</li><li> Sorabh Singh Raghav - 9990798984</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿event_details[1][1] = [["Introduction",'<p>In today’s world, everybody is associated with wanting to have an easy life, by the use of so called ‘hacks’, which makes daily life a lot easier by simple DIY projects. The main domain in these ‘hacks’ are electronics, which play a massive role in improving the nitty-gritties of our lives.<br>Therefore, PICK & DESIGN competition is an event in which engineering students have an opportunity to showcase their skills by successfully implementing the given select circuits which form a very important part of our lives. Students will surely learn from this event and appreciate the ability to be innovative.</p><p>Registration – Pre-registrations only. Individual participation.<li>Time - 02:00PM - 04:00PM</li><li>Venue - AG10</li></p>'],["Rules",'<p><li> TIME LIMIT is of 2 hours.</li><li> Each team can consist of maximum of 3 members.</li><li> Project circuits will be provided at the time of competition.</li><li> All components will be provided on the spot.</li><li> Each team can select any one given circuit (out of 5) and successfully execute it.</li><li> Participants must bring their own laptops for components’ reference.</li></p>'],["Student coordinator",'<p><li>Mutumba Maliro</li><li>Bukasa Tshibangu</li><li> S.Shreyas</li></p>'],["Faculty coordinator",'<p><li>Mrs. Kavita Jindal</li><li>Mrs. Manju Aggarwal</li></p>'],["Contact Details",'<p><li> Mutumba Maliro - 9971769791 </li><li> Bukasa Tshibangu - 8377881302</li><li> S.Shreyas - 9968262696</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿event_details[1][2] = [["Introduction",'<p>Speed!! Speed!! Speed!! In this world of everlasting competition, speed is the word. Blasting through your way at an awe inspiring pace, indulge your robust bots in the exciting race. "One, who falls behind, is left behind." So pack your bags and pump your bots because its get, set and GO!!!<br>The motive is to design a wired/wireless robot being autonomous or manually controlled machine that is capable of completing the ALL TERRAIN Arena successfully in minimum time.<li> Time - 09:00AM - 09:00PM</li><li>Venue - AG10-A </li></p>'],["Rules",'<p><li>Maximum team members – 3</li><li>Any team not reporting in time will be disqualified.</li><li>24 hrs. includes the time for assembling, testing and racing the bots.(i.e. participants won’t be having less than 24 hrs. to assemble their bot or robots)</li><li>Line follower should be microcontroller based.</li><li>Battery must be on board (bot or robot).</li><li>Battery must be on board (bot or robot).</li><li>Any part of the kit whatsoever should not be damaged while making the bots.</li><li>The potential difference between any two points should not exceed a limit of 12V. A tolerance of 5% shall be provided.</li><li>The potential difference between any two points should not exceed a limit of 12V. A tolerance of 5% shall be provided.</li><li>The robot will be judged on basis of (in priority):-<br>i. Time to complete the track.<br>ii. Number of checkpoints cleared.<br></li><li>Team members will be allowed only three times to touch or reset their robots position during the run.</li><li>Timer will start when robot starts from the starting point.</li><li>There will be a time penalty if the robot touches any obstacle or the boundary of the track.</li><li>Organiser’s decision will be FINAL.</li></p>'],["Student coordinator",'<p><li> Shivam Singh</li><li> William Russel</li></p>'],["Faculty coordinator",'<p><li> Mr. Manish Yadav</li></p>'],["Contact Details",'<p><li> Shivam Singh - 8130337021</li><li>William Russel - 9958490337</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿event_details[1][3] = [["Introduction",'<p>Sustainable development is maintaining a delicate balance between the human need to improve lifestyles and feeling of well being on one hand, preserving natural resources and ecosystems, on which we and future generation depend.<br>GREEN IDEA PRESENTATION is an idea generating platform on principle of design thinking that aims at spurring creativity and fostering innovation on environmental issues. So it’s a wonderful opportunity to express your idea, thinking about green energy.<li>Time - 12:00PM - 01:00PM</li><li>Venue - AF06</li></p>'],["Rules",'<p> <ul><li> TIME LIMIT is of 1 hour.</li><li> It is an individual event.</li><li> All materials will be provided on spot.</li></ul></p>'],["Student coordinator",'<p><li> Shubham Chauhan</li><li> Rupin Sahota</li></p>'],["Faculty coordinator",'<p><li> Mrs. Manju Aggarwal</li></p>'],["Contact Details",'<p><li> Shubham Chauhan - 8447390646</li><li> Rupin Sahota - 9711932554</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];

﻿event_details[1][4] = [["Introduction",'<p>It is an event in which computer programmers team have to collaborate intensively to develop software projects. Each team have to show case their software development skills including graphic designing, interface designing and project management in form of a full stack application.<li>Time - 10:00AM - 10:00AM(next day)</li><li>Venue - BS-09</li></p>'],["Rules",'<p><li> This is a 24 hour Team event.</li><li> Each team should have maximum 3 members.</li><li> Participants can take part in other event also simultaneously but they have to submit their projects next day before 10 AM.</li><li> No plagiarism of code will be accepted.</li></p>'],["Student coordinator",'<p><li>Sahil Aggarwal</li><li> Prateek Aggarwal</li><li>Chetan Anand Thakur</li></p>'],["Faculty coordinator",'<pr><li> Mr. Sudhakar Ranjan</li></p>'],["Contact Details",'<p><li> Sahil Aggarwal - 9818308563</li><li> Prateek Aggarwal - 9717890326</li><li> Chetan Anand Thakur - 9996014716</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];

﻿event_details[1][5] = [["Introduction",'<p>The internet or the World Wide Web is a very important part of modern day life. We are just a click away from the rest of the world and this is all possible because of the presence of the internet applications that we have on our computer systems.<br>Internet chatting, emails, Online Editors and other Custom application developments are also employed in case of blog and social networking sites where individual users can contribute their written material on their own from their computers that are placed in various locations around the world. Therefore for developers and Programmers it’s a playground to bring something new and innovative to the world.<br>WEAVE THE WEB is not only a competition but an opportunity for all the budding programmers to showcase their brilliant programming skills and develop more such applications that would change the world.<li>Time - 01:30PM -  04:30PM</li>'],["Rules",'<p><li> This is  individual participation event.</li><li> Each will be allotted maximum 3 hours to complete their projects.</li><li> Participation can only do on spot.</li><li> Laptops should be brought by the participants(if required, especially by CSE).</li></p>'],["Student coordinator",'<p><li> Prateek Verma</li><li> Remi Goel</li><li> Samarpit Nasa</li></p>'],["Faculty coordinator",'<p><li> Mr. Manpreet Singh Sehgal</li></p>'],["Contact Details",'<p><li>  Prateek Verma - 9873551198</li><li> Remi Goel - 8447781225</li><li> Samarpit Nasa - 9953510970</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿event_details[1][6] = [["Introduction",'<p>A computer Programmer should be able to handle all kinds of bugs and errors his/her system encounters. In this event Programmer should find and fix any Syntax errors, Semantic errors, Logical errors and Runtime errors.<li> Time - 11:00AM - 01:00PM</li><li>Venue - BG-15</li></p>'],["Rules",'<p><li> his is an individual event.</li><li> Contest will be conducted online on HackerEarth platform (link).</li><li> Participation can be done on spot also.</li><li> Laptops should be brought by the participants.</li><li> The participant should fix the bug in minimum time will be the winner</li><li> In case of tie, the compilation time would be given priority.</li><li> Problems of different level would be given to solve.</li></p>'],["Student coordinator",'<p><li> Gaurav Chauhan</li><li> Praveen Kumar Jha</li><li> Chetan Gupta</li></p>'],["Faculty coordinator",'<p><li> Mrs. Harsimran Kaur</li></p>'],["Contact Details",'<p><li> Gaurav Chauhan - 9650836949</li><li> Praveen Kumar Jha - 8826509533</li><li> Chetan Gupta - 8802351055</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];

﻿﻿event_details[2][0] = [["Introduction",'<p><li>In this fast and busy world, a need of way to enjoy and relax is required and computer gaming is one of those ways. Various genres of games make people apply their mind in different ways rather than only in studies. In today’s world everyone plays games on their PCs, so this event is just for that game lover to play and compete among all others.</li>  </p><p><li> Time - 10:00 AM - 04:30 PM</li><li> Venue : BG15</li></p>'],["Rules",'<p> <ul><li> This is an individual event.  </li><li>Each participant is required to bring headphone with him.</li><li>Laptops are not required.</li><li>Any misbehaviour will lead to disqualification from event.</li><li>No late entry will be entertained once event is started.</li><li>The participant securing highest mark will be the winner</li></ul></p>'],["Student coordinator",'<p><li>Praveen Jha</li><li> Gaurav Chauhan</li><li>Archit</li></p>'],["Faculty coordinator",'<p><li> Mrs. Deepti Thakral</li></p>'],["Contact Details",'<p><li> Praveen Jha - 8826509533 </li><li> Gaurav Chauhan - 9650836949</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];

event_details[2][1] = [["Introduction",'<p><li>This event is about fabrication and development of engineering tool box which is to be well organized with given dimensions and aesthetics.</li></p><p><li> Time - 05:00 PM - 09:00 PM <li><li> Venue : Mechanical Workshop</li></p>'],["Rules",'<p> <ul><li> Only group of max three participants </li><li>Time allowed is 6 hours</li><li> All the discretion will be done by the coordinator</li><li>Participants will be entertained half an hour before the start of event.</li></ul></p>'],["Student coordinator",'<p><li>Mihir</li><li> Manish</li></p>'],["Faculty coordinator",'<p><li> Mr. Chetan Bhardwaj</li></p>'],["Contact Details",'<p><li> Mihir - 9996014693 </li><li> Manish - 9996015184</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿event_details[2][2] = [["Introduction",'<p> <li>The task is all about using your technical knowledge and Basics of Engineering Drawing & Graphics to do the Part Modelling of the given Model, Assemble and simulate it using Solid Works Software in the given time span. </li></p><p><li> Time - 12:00 PM - 07:00PM</li><li> Venue : AF02 -CAD LAB</li></p>'],["Rules",'<p> <ul><li> Two members in a team are compulsory. </li><li>The task must be completed in given time interval.</li><li>Candidates may bring their own laptop for their ease of access.</li><li>No unethical act will be entertained and the participants will be strictly penalized for the same.</li><li>Use of Mobile & Data Connection/Wi-Fi is strictly prohibited. If participants are found using any other device during the event they may be disqualified. </li></ul></p>'],["Student coordinator",'<p><li>Rishabh Mahajan</li><li> Abhishek Maitra</li></p>'],["Faculty coordinator",'<p><li> Ms. Smita Gupta</li></p>'],["Contact Details",'<p><li> Rishabh Mahajan - 9718287199 </li><li> Abhishek Maitra - 9654466106</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿﻿event_details[2][3] = [["Introduction",'<p> <li>Competitors are required to make the largest possible structure (Optimum) using the resources provided which can with stand the maximum possible weight. Groups with two largest structures and could withstand the given load, will be declared as the winner of this competition.</li> </p><p><li> Time - 10:00 AM - 12:00 PM</li><li> Venue : CNC Lab</li></p>'],["Rules",'<p> <ul><li>Students will be required to form a team of two members.</li><li>Each team will be given a chance to select three coupons from the bunch of coupons. The resources will be given to respective team according to the coupons they selected.</li><li>Teams will be judged based on the quality of Structure produced with the given resources.</li> </ul></p>'],["Student coordinator",'<p><li>Ashish Anand</li><li> Kanishk Dubey</li></p>'],["Faculty coordinator",'<p><li> Mr.Vijay Kumar</li></p>'],["Contact Details",'<p><li> Ashish Dubey - 7838228759 </li><li> Kanishk Dubey - 9896319572 </li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿﻿event_details[2][4] = [["Introduction",'<p><li> It is quite popular that “HEALTH IS WEALTH”. A person with a good health always has an upperhand in living a healthy life in this environment. So, a health check-up camp is being set up with the aim of providing health check-ups for all. The health check-up will include thyroid test, BMI check, B.P checkup, Blood Group test etc. Overall, it is an wonderful opportunity to get a basic health check-up.</li> </p><p><li> Time - 10:00 AM - 05:00 PM</li><li> Venue : Bioscience Lab</li></p>'],["Rules",'<p> <ul><li> TIME DURATION- 7 hrs</li><li>It is open for all i.e it is a walk-in check-up camp.</li></ul></p>'],["Student coordinator",'<p><li>Nikku Yadav</li><li> Snehalata Tandi</li></p>'],["Faculty coordinator",'<p><li>Dr. Atul Kathait</li></p>'],["Contact Details",'<p><li>  Ms. Nikku Yadav - 9711197679</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];


﻿event_details[2][5] = [["Introduction",'<p><li> TreeQuation is a unique platform for students from all walks and trades to develop a sustainable solution for various real time problems. Bring out the creative problem solver in you and solve the problem given.</li> </p><p><li>Time  - 10:30 AM - 01:00 PM </li><li> Venue : AG08 </li></p>'],["Rules",'<p> <ul><li> A functional prototype of the solution has to be presented along with presentation slides. The number of presentation slides should not exceed 10 (excluding thank you and opening intro slide). </li><li>The prototype has to cater to the domain of BioDesign or Biomedical Engineering.</li><li> The presentation has to be developed as per the given format.</li><li>Use of profane, offensive or any sort of illegitimate practice, language, material or content is strictly prohibited and will lead to disqualification.</li><li>All presentations are mandatory to address any one of the given areas (more than one can also be included) and should also have a component of entrepreneurship involved.</li><li>Every team is given 10 minutes in total out of which 7 minutes are reserved for presenting the idea, strategy or proposal and the rest 3 minutes are to defend the presentation against the deliberations by the jury.</li><li>The decision of the jury is final and all participants are to abide by the same.</li><li>The number of members per team should not be more than 2 members each.</li><li>All team numbers shall be provided team number so as to keep anonymity and avoid any confusion.</li></ul></p>'],["Student coordinator",'<p><li>Aishwarya Khadanga</li><li> Deepikka Sharma</li></p>'],["Faculty coordinator",'<p><li>Dr.Vineet Sharma</li></p>'],["Contact Details",'<p><li> Aishwarya Khadanga - 8800949296 </li><li> Deepikka Sharma - 8447228977 </li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];

﻿event_details[2][6] = [["Introduction",'<p><li> “BLUEPRINTS(B-Plan Competition)"- It basically deal with Business plan competition. The main purpose of the event is to let the participants come up with their start up plans.</li> </p><p><li>Time  - 02:00 PM - 04:00 PM </li><li> Venue : AG08 </li></p>'],["Rules",'<p> <ul><li>Business plans may be submitted by individual or by a team.</li><li>There must not be more than 3 in a team.</li><li>Participant(s) should bring the soft copy in pen drive and a hard copy with them.</li><li>Final-round submission will be judged according to the following criteria: </li><p><li>Is the business financially feasible?</li><li>How innovative is the idea?</li><li>Quality of products, services and/or solutions</li><li>Market opportunities and competition</li><li>Team qualifications</li><li>Overall attractiveness of the venture</li></p></ul></p>'],["Student coordinator",'<p><li>Harita Bansal</li></p>'],["Faculty coordinator",'<p><li> Mrs. Ridhi Bhatia</li></p>'],["Contact Details",'<p><li> Harita Bansal - 9896319579</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];

﻿event_details[2][7] = [["Introduction",'<p><li> Innovative Design Solution for product ( commercial, social cause, Decorative, any cause). </li> </p><p><li> Registration Fees : Rs. 100 Only</li><li> Last date of registration : 5th March 2016</li><li> Submission Date : 10th March 2016</li><li> Venue : BF03 </li></p>'],["Rules",'<p> <ul><li>The Presentation should have :- </li><p><li>Prototype submission to the scale.</li><li>Design development : VISUAL & WRITTEN</li><li>Aim & objective (Max. 200 words)</li><li>Product Specification (All dimensions material & other details)</li><li>Design should be ORIGINAL.</li></p><p><li>All design should have student complete details.</li><li>Decision by jury will be final, no changes will be entertained.</li><li>Atleast 5 entries should be there for the competition.</li></p></ul></p>'],["Student coordinator",'<p><li>Ekansh Sethi</li></p>'],["Faculty coordinator",'<p><li>Mr.Dibyendu Tripathi</li><li>Mrs.Noopur Jha</li></p>'],["Contact Details",'<p><li> Ekansh Sethi - 9992589358</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];

﻿event_details[2][8] = [["Introduction",'<p><li> In this Event you have to make a bridge with the use of popsicles or craft sticks which can bear more load with the use of less material.</li> </p><p><li> Time - 10:00 AM - 01:00 PM<li> Venue : AS08-B </li></p>'],["Rules",'<p> <ul><li>Time limit of event is 3 hrs. 1.5 hrs for making bridge and other 1.5 hrs for load test.</li><li>Each team can consist of maximum 3 member.</li><li>Project material will be provided at the time of competition.</li><li>Organiser decision will be final.</li></p></ul></p>'],["Student coordinator",'<p><li>Shivam Sharma</li><li>Vaibhav Kapoor</li></p>'],["Faculty coordinator",'<p><li> Dr. S C Sharma</li><li>Mr. A K Zalpuri</li></p>'],["Contact Details",'<p><li> Shivam Sharma - 9560258109</li><li> Vaibhav Kapoor - 9953218406</li></p>'],["Registration", '<a href="http://goo.gl/forms/smrZLb6jcZ">Register</a>']];



﻿﻿


		$(".events_content").mCustomScrollbar({
			keyboard:{ enable: true },
			advanced:{ updateOnSelectorChange: "p" }
			});
			
			
		var infocus = 5, trans = -1, infocus_elm = $(".events_thumbs"+infocus);
		var trans_values = [0,0,0,0,0,0,0,0,0,0];
		$(".events_thumbs"+infocus).css({transform: "scale(2.2,2.2)"});
		function moveleft(){
			//$(".events_thumbs"+infocus).removeClass("scale");
			if(infocus>=9){
				infocus=9;
				return
			}
			trans_values[infocus]-=80;
			$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(1,1)"});
			$(".events_thumbs"+infocus+" div").css("background-color", "rgba(255,255,255,0.3)");
			$(".events_thumbs"+infocus+" div").css("color", "#000");
			infocus++;
			//$(".events_thumbs"+infocus).addClass("scale");
			//trans = (3-infocus)*80;
			trans_values[infocus]-=80;
			$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(2.2,2.2)"});
			$(".events_thumbs"+infocus+" div").css("background-color", "rgba(0,20,50,0.9)");
			$(".events_thumbs"+infocus+" div").css("color", "#CCC");
			infocus_elm = $(".events_thumbs"+infocus);
		}
		function moveright(){
			if(infocus<=1){
				infocus=1;
				return
			}
			trans_values[infocus]+=80;
			$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(1,1)"});
			$(".events_thumbs"+infocus+" div").css("background-color", "rgba(255,255,255,0.3)");
			$(".events_thumbs"+infocus+" div").css("color", "#000");
			infocus--;
			trans_values[infocus]+=80;	
			$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(2.2,2.2)"});
			$(".events_thumbs"+infocus+" div").css("background-color", "rgba(0,20,50,0.9)");
			$(".events_thumbs"+infocus+" div").css("color", "#CCC");
			infocus_elm = $(".events_thumbs"+infocus);
		}
		
		$(".events_thumbs").on("mouseenter", function(){
			var to = $(this).attr("class").charAt(27);
			while(infocus<to)
			moveleft();
			while(infocus>to)
			moveright();
		});
		/*var leftmost = 0;
		function moveleft(){
			if(leftmost>2)
			return;
			for(var eq=leftmost; eq<leftmost+8; eq++){
				if(eq<0 || eq>7)
				continue;
				$(".events_thumbs").eq(eq).addClass("events_thumbs"+(eq-leftmost));
				$(".events_thumbs").eq(eq).removeClass("events_thumbs"+(eq-leftmost+1));
			}
			leftmost++;
		}
		function moveright(){
			if(leftmost<-2)
			return;
			for(var eq=leftmost+6; eq>=leftmost-1; eq--){
				if(eq<0 || eq>7)
				continue;
				$(".events_thumbs").eq(eq).addClass("events_thumbs"+(eq-leftmost+2));
				$(".events_thumbs").eq(eq).removeClass("events_thumbs"+(eq-leftmost+1));
			}
			leftmost--;
		}*/
		$(".events_leftarrow").on("click", moveright);
		$(".events_rightarrow").on("click", moveleft);
		/*$(document).on("keydown", function(e){
			if(e.keyCode==37)
			moveright();
			else if(e.keyCode==39)
			moveleft();
		})*/
		
		var super_eventi = 0, eventi = 0;
			
		$(".events_thumbs").on("click", function(){
			$(".events_content").css("display", "none");
			$(".tab").css("display", "none");
			super_eventi = $(this).index();
			quickmenu_anim(super_eventi+1);
			var event_names_html = "";
			for(var i=0; i<event_names[super_eventi].length;i++)
			event_names_html += "<div class='events_menu'><p>"+event_names[super_eventi][i]+"</p></div>";
			$(".events_menu_env").html(event_names_html);
			$(".events_thumbs").fadeOut(400);
			$(".events_thumbs_env").css({transform: "scale(4,4)"});
			$(".events_details").fadeIn(500,function(){
					$(".events_details").css({
				 transform: 'rotate('+deg+'deg) scale(1.2,1.2)',
				 WebkitTransform: 'rotate('+deg+'deg) scale(1.2,1.2)'
				})
				});	
				setTimeout(function(){
					$(".events_thumbs_env").css({transform: "scale(1,1)"});
					//$(".events_content").fadeIn(500);
					$("#pointer").fadeIn(500);
					$(".events_menu").each(function(index, element) {
						$(".events_menu").eq(index).css("transition-delay", index*0.3+"s");
						//$(".events_menu").eq(index).fadeIn(500);
						$(".events_menu").eq(index).css("opacity",1);
	                    $(".events_menu").eq(index).css({transform: "translate(0px, "+index*50+"px)"});
						$(".events_quickmenu").fadeIn(300);
	                });
					setTimeout(function(){
						$(".events_menu").css("transition-delay", "0s");
						}, 650);
				},650);
		});
		
		var event_details_deg = 0;
		$(".events_menu_env").on("click", "div.events_menu", function(){
			$(".events_menu").eq(eventi).css("background-color", "rgba(0,0,0,0.55)");
			eventi = $(this).index();
			$(".events_menu").eq(eventi).css("background-color", "rgba(0,0,0,0.85)");
			if($(".tab").css("display")==="none"){
				for(var i=0; i<6; i++){
							$(".tab"+i).html("<p>"+event_details[super_eventi][eventi][i][0]+"</p>");
						}
					//$(".tab").fadeIn(300);
			}
			else {
				$(".tab").fadeOut(300, function(){
					for(var i=0; i<6; i++){
							$(".tab"+i).html("<p>"+event_details[super_eventi][eventi][i][0]+"</p>");
						}
					//$(".tab").fadeIn(300);
					});
			}
			$("#pointer").fadeOut(300);
			$(".events_content").fadeOut(300, function(){
				//$(".events_content").html("");			
				var tab = 0;
				$("#mCSB_1_container").html("<p style='text-align:center;'><h2>"+event_names[super_eventi][eventi]+"</h2></p><br/>"+event_details[super_eventi][eventi][tab][1]);
				//$(".events_content").mCustomScrollbar("update");
				//alert(event_details[super_eventi][eventi][tab][1]);
				$(".tab").fadeIn(300);
				$(".events_content").fadeIn(300);
				$("#pointer").fadeIn(300);
				
				
				var deg_p = 330;
				var diff = Math.abs(deg-deg_p);
				while(diff>180){
					if(deg_p>deg)
					deg_p-=360;
					else
					deg_p+=360;
					diff = Math.abs(deg-deg_p);
				}
				deg=deg_p;
				event_details_deg = deg;
				$(".events_details").css({
					 transform: 'rotate('+deg+'deg) scale(1.2,1.2)',
					 WebkitTransform: 'rotate('+deg+'deg) scale(1.2,1.2)'
					});
				});
			});
			
		var deg = 0;
		var degrees = [330,270,210,150,90,30];
		$(".tab").on("click", function(){		
			var tab = $(this).index();
			$("#pointer").fadeOut(300);
			$(".events_content").fadeOut(300, function(){
					$("#mCSB_1_container").html("<h2  style='text-align:center;'>"+event_names[super_eventi][eventi]+"</h2><br/>"+event_details[super_eventi][eventi][tab][1]);
					$(".events_content").mCustomScrollbar("update");
					//alert(event_details[super_eventi][eventi][tab][1]);
					$(".events_content").fadeIn(300);
					$("#pointer").fadeIn(300);
			});
			var deg_p = degrees[$(this).index()];
			var diff = Math.abs(deg-deg_p);
			while(diff>180){
				if(deg_p>deg)
				deg_p-=360;
				else
				deg_p+=360;
				diff = Math.abs(deg-deg_p);
			}
			deg=deg_p;
			$(".events_details").css({
				 transform: 'rotate('+deg+'deg) scale(1.2,1.2)',
				 WebkitTransform: 'rotate('+deg+'deg) scale(1.2,1.2)'
				})
			});
			
		$(".events_quickmenu p").on("click", function(){
			//$(this).addClass("events_curcategory");
			var index = $(this).index();
			quickmenu_anim(index);
			gotocategory(index-1);
			});
		
		/*events*/

		

		
		/*gallery*/
		var images = ["pica1.png","pica2.png","pica3.png","pica4.png","pica5.png","pica6.png","pica7.png","pica8.png"];
		var gallery_prev = -1;
	        $(".gallery_photo").on("click", function(){
				if(gallery_prev>-1){
					if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
					$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
				}
				$(this).addClass("gallery_display");
				gallery_prev = $(this).index()-1;
				$(".close").fadeIn(300);
			});
			$(".close").on("click", function(){
					if(gallery_prev>-1){
					if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
					$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
					$(".close").fadeOut(300);
				}
				gallery_prev=-1;
				});
			$(".gallery_back").on("click", function(){
					if(gallery_prev>-1){
					if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
					$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
					$(".close").fadeOut(300);
				}
				gallery_prev=-1;
				});
			$(document).on("keydown", function(e){
				var key = e.keyCode;
				var next = gallery_prev;
				if(key==39)
				next = gallery_prev+1;
				else if(key==37)
				next = gallery_prev-1;
				else
				return;
				
				next = (next+9)%9;
				
				if(gallery_prev>-1){
					if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
					$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
				}
				$(".gallery_photo_"+next).addClass("gallery_display");
				gallery_prev = next;
				$(".close").fadeIn(300);
			});
		/*gallery*/

	/*campus*/
		var ca_names = ["<u>TARANG</u>","Manpreet Singh Saigal","Mrs.Chetna Patiyal","Ms.Ashima Arora","Ms.Garima Sharma","Mrs.Manju Agarwal","Mrs.Satakshi Srivastav","Tr.Vijay Kumar","Mrs.Preeti Rathore","Mrs.Ekta Bhayana","Mrs.Deepti Juneja","Dr.Vineet Sharma","Mr.Amit Salathia","Ms.Malvika Kaul","Mr. A.D. Gnanagurunathan","Ms.Nupur Jha","Ms.Ashima Arora","Mr.Deepak Halan","Ms.Malvika Kaul","Mr. A.D. Gnangurunathan","<u>TECHSHIELD</u>","Dr. Sudhakar Ranjan","Mrs.Arti Nagpla","Mrs. Ekta Bhayana","Mrs. Kavita Jindal","Mrs. Manju Agarwal","Mr. Manish Yadav","Mrs. Manju Agarwal","Dr.Sudhakar Ranjan","Mrs. Harsimran Kaur","Mr. Manpreet Singh Saigal","Mrs. Deepti Thakral","Ms. Smita Gupta","Mr. Chetan Bharadwaj","Mr. Vijay Kumar","Dr. Vineet Sharma","Mrs. Ridhi Bhatia","Mr. Dibyendu Thripathi","Ms. Nupur Jha","Dr. S.C. Sharma","Mr. A.K. Zalpuri","EVENT MANAGEMENT(TECHSHIELD)","Mr. Parikshit","Mr. Manish Yadav","Mr. Vineet Sharma","Mrs. Smita Gupta","Mr. Sudhakar Ranjan","EVENT MANAGEMENT(TARANG)","Mr. Snehashish Ghoshal","Mr. Dibyendu Tripathi","Mr.Amit Salathia","HOSPITALITY TEAM(TECHSHIELD)","Mrs. Arti Nagpla","Mrs. Ranjana Gujrati","Mrs. Preeti","Mr. Vikas Basmnia","HOSPITALITY TEAM","Dr. Subhash Diyundi","Mrs. Meenu","Mr. Sanjay","REGISTRATION COMMITEE(TARANG)","Dr. Subhavrata Kar","Mr. Praveen Verma","Mr. Naresh Sharma","OUTREACH(TARANG & TECHSHIELD)","Mr. Thyagarajan Velanur","Mr. Deepshika Sharma","PRIZING(TECHSIELD)","Mrs. Anshul Khatter","Mrs. Harsimran Kaur","PRIZING(TARANG)","Mr. Manoj Sharma","Ms. Kalpana Nagpal","EVENT INCHARGE(TARANG)","Mrs. Sonam Raheja","EVENT INCHARGE(TECHSHIELD)","Mr. Parikshit Vasisht","MEDIA INCHARGE","Mr. Swapnil Kumar","ANCHORING(TECHSHIELD)","Mrs. Ekta Bhayana","ANCHORING(TARANG)","Ms. Garima Sharma"];
	
		var ca_colleges = ["","School of Engineering and technology","School of design and visual arts","School of design and visual arts","school of engineering and technology","school of engineering and technology","school of engineering and technology","school of engineering and technology","librarian","school of engineering and technology","school of engineering and technology","school of biosciences","school of design and visual arts","school of journalism and mass communication","school of journalism and mass communication","school of design and visual arts","school of design and visual arts","school of management sciences","school of journalism and mass communication","school of journalism and mass communication"," ","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Engineering and technology","School of Biosciences","School of Management sciences","school of design and visual arts","School of design and visual arts","School of Engineering and technology","School of Engineering and technology"," ","School of Engineering and technology","School of Engineering and technology","School of biosciences","School of Engineering and technology","School of Engineering and technology"," ","School of Engineering and technology","School of design and visual arts","School of design and viual arts"," ","School of Engineering and technology","School of management sciences","librarian","School of Engineering and technology"," ","School of biosciences","receptionist","Lab. Tech"," ","School of biosciences","IDK","Chem. Lab"," ","CRC","CRC"," ","School of Engineering and technology","School of Engineering and technology"," ","School of education","School of pharmaceutical sciences"," ","School of Engineering and technology"," ","School of Engineering and technology"," ","school of journalism and mass communication"," ","School of Engineering and technology"," ","School of Engineering and technology"];
		
		var ca_ides = ["","WEB Development","Fashion Show","Fashion Show","Fashion Show","Solo Singing","Solo Singing","Battle of Bands","Dance","Dance","Dance","Nukkad Natak","Face Painting","Missmash","Missmash","Design Solution","Design Solution","AD MAD","Poetry Out Loud","Poetry Out Loud"," ","Project Display","Project Display","Project Display","Pick and Design","Pick and Design","BOT DASH","Green Idea Presentation","Hack-A-Thon","Find the Glitch","Weave the WEB","Game On!!","Simudesign-Solidworks","Constructo","Super Structure","Treequation","Blueprints - B Plans","Innovative Design Solution","Innovative Design Solution","Design of TRUSS Bridge","Design of TRUSS Bridge"," ","EM Team","EM Team","EM Team","EM Team","EM Team"," ","EM Team","EM Team","EM Team"," ","Hospitality Team","Hospitality Team","Hospitality Team","Hospitality Team"," ","Hospitality Team","Hospitality Team","Hospitality Team"," ","Registration Team","Registration Team","Registration"," ","Outreach Team","Outreach Team"," ","Certification Team","Certification Team"," ","Certification Team","Certification Team"," ","Overall Incharge"," ","Overall Incharge"," ","Media Incharge"," ","Anchoring"," ","Anchoring"];
		
	    var campus_content = "";
		
		var padding = function(num){
			var pnum = num.toString();
			if(pnum.length == 1)
			pnum = "00"+num;
			else if(pnum.length == 2)
			pnum = "0"+num;
			return pnum;
		}
		
		for(var i=0; i<ca_names.length; i++){
			campus_content += "<li><div style='position:relative; top:85px; left:0; height:60px; width:100%;'><p style='position:relative; top:0px; left:0; height:60px; width:25%;'>"+ca_ides[i]+"</p><p style='position:relative; top:-75px; left:30%; height:60px; width:25%;'>"+ca_names[i]+"</p><p style='position:relative; top:-155px; left:58%; height:60px; width:42%;'>"+ca_colleges[i].toUpperCase()+"</p></div></li>";		
		}
		$(".campus_content ul").html(campus_content);
	/*campus*/

	/*workshops
	var workshop_cont = ['<div style="position:absolute; top:0; height:100%; width:100%; left:0px; overflow:scroll !important; overflow-x:hidden !important;"><img src="resources/etrix.png" height="85" width="200" style="position:absolute; top:30px; right:20px"/> <p style="font-size:25px; text-align:center; font-weight:700;">Mobile Application Development</p><p style=" padding-left:20px;"><strong>INTRODUCTION</strong></p><p style=" padding-left:20px;">Software development is going mobile, bringing applications to phones, laptops and tablets everywhere. Gartner predicts that by 2015 mobile application development projects will outnumber PC application projects by 4 to 1. Mobile application developers are reaping the benefits of 45 percent year over year employment growth, according to Bloomberg BusinessWeek. Dice.com reported a 100 percent increase in job posting for mobile app developers between 2010 and 2011.</p><p style=" padding-left:20px;">Developers with the right mix of skills can find boundless opportunity as a tech-savvy business entrepreneur or a web designer set to rule the multi-billion dollar mobile application industry. In this world of mobility it has become imperative to learn what it takes to create the next top-selling apps. So why wait..A well-known workshop will be conducted at Wissenaire, IIT Bhubaneswar. Come and experience.</p><div style="position:absolute; top:340px; height:130%; width:50%; left:0px; overflow:hidden; overflow-x:hidden !important; padding:15px;"><p><strong style="font-weight:700; font-size:21px;">Last Date for Online Registration:</strong><br/> 23rd Jan, 2015<br/>Confirm your seat by paying INR 100 only. (Rest payment will be collected at the venue on day of workshop)<br/><a href="https://in.explara.com/e/workshop-on-multiple-platform-mobile-application-development" target="_blank"><u>Click for Online Payment</u></a></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Learning Outcomes</strong><br/><ul style="font-weight:700;font-size:16px;"><li>Using Geo-Location API</li><li>Using Camera and Gallery</li><li>Creating remote srever connection</li><li>Local storage</li><li>Push Notification</li><li>App Store</li><li>Other device capabilities</li></ul><br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Course Highlights</strong><br/><ul style="font-weight:700;font-size:16px;"><li>HTML 5/CSS/JS based hybrid app development</li><li>Publishing and Monetising App</li><li>Single code base for multiple platform</li><li>Mobile App creation</li></ul><br/></p></div><div style="position:absolute; top:340px; height:150%; width:50%; left:51%; overflow:hidden; overflow-x:hidden !important; padding:15px;"> <p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Fee</strong><br/><br/>Rs. 1600 (students)<br/>Rs. 5000 (others)<br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;"></strong><br/><br/><br/>Internship/Job Opportunitiesfor Top Performers</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Date</strong><br/><br/>24th-25th Jan, 2015, starting at 9:00 am</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Contact</strong><br/><br/>Srinesh Vyd (8093427859)</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Helpline</strong><br/><br/>Satish K. Singh<br/>8093531607<br/>9338681607</p></div></div>','<div style="position:absolute; top:0; height:100%; width:100%; left:0px; overflow:scroll !important; overflow-x:hidden !important;"><img src="resources/robotech.jpg" height="85" width="200" style="position:absolute; top:30px; right:20px"/><p style="font-size:25px; text-align:center; font-weight:700;">STAAD.Pro</p><p style="padding-left:20px;"><strong>INTRODUCTION</strong></p><p style="padding-left:20px;">STAAD Pro is a structural analysis and design software which is used to model and design the structures virtually. It has been developed by Bentley\'s Systems. This course covers the essential tools and commands of STAAD Pro. Students are introduced to the concepts of structure modelling, analysis, design and documentation. This course offers hands-on exercises representing real-world structural design scenarios.This course is designed for fresher’s and experienced and covers the basics of STAAD Pro, from structural design through construction documentation. No previous CAD experience is necessary.</p><div style="position:absolute; top:300px; height:120%; width:50%; left:0px; overflow-x:hidden !important; padding:15px;"><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Learning Outcomes</strong><br/><ul style="font-weight:700;font-size:16px;"><li>STAAD or STAAD.Pro is a structural analysis and design computer program</li><li>It is one of the best civil and structural engineering software so far concerned</li><li>STAAD.Pro is widely used software for structural analysis and design</li><li>Course covers the essential tools and commands of STAAD.Pro</li><li>STAAD.Pro features a state-of-the-art user interface, visualization tools</li></ul><br/></p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Program Details</strong><br/><ul style="font-weight:700;font-size:16px;"><li>Attend workshop at IIT Bhubaneswar campus</li><li>After workshop competition shall be conducted</li><li>Winner will get chance of internship and job opportunities</li></ul><br/></p></div><div style="position:absolute; top:300px; height:100%; width:50%; left:51%; overflow:hidden; overflow-x:hidden !important; padding:15px;"><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Fee</strong><br/><br/>Rs. 1200 /per participant<br/></p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;"></strong><br/><br/></p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Date</strong><br/><br/>24th-25th January, 2015 starting at 9:00 am</p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Contact</strong><br/><br/>Srinesh Vyd (8093427859)</p></div></div>','<div style="position:absolute; top:0; height:100%; width:100%; left:0px; overflow:scroll !important; overflow-x:hidden !important;"><img src="resources/robotech.jpg" height="85" width="200" style="position:absolute; top:30px; right:20px"/> <p style="font-size:25px; text-align:center; font-weight:700;">Engine Automation</p><div style="position:absolute; top:55px; height:135%; width:50%; left:0px; overflow:hidden; overflow-x:hidden !important; padding:15px;"> <p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Learning Outcomes</strong><br/><ul style="font-weight:700;font-size:16px;"><li>Learn basics of Vehicle Dynamics, Suspension, Geometry, Braking Unit, Steering Mechanism, Transmission, IC Engine working and various other automobile engineering aspects</li><li>Introduction to Automobiles</li><li>Chassis Suspension Unit</li><li>Power transmission controlling of automobile</li><li>Introduction to braking system</li><li>Working of IC Engine</li><li>Complete dismantling and assembling of IC Engine vehicle</li><li>Maintenance and Diagnostics</li><li>Live demonstration of IC Engine dismantling and assembling</li></ul><br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Program Details</strong><br/><ul style="font-weight:700;font-size:16px;"><li>Attend workshop at IIT Bhubaneswar campus</li><li>After workshop competition shall be conducted</li><li>Winner will get chance of internship and job opportunities</li></ul><br/></p></div><div style="position:absolute; top:55px; height:100%; width:50%; left:51%; overflow:hidden; overflow-x:hidden !important; padding:15px;"> <p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Fee</strong><br/><br/>Rs. 1200 /per participant<br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;"></strong><br/><br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Date</strong><br/><br/>24th-25th January, 2015 starting t 9:00 am</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Contact</strong><br/><br/>Srinesh Vyd (8093427859)</p></div></div>','<div style="position:absolute; top:0; height:100%; width:100%; left:0px; overflow:scroll !important; overflow-x:hidden !important;"><img src="resources/batoi.jpg" height="45" width="190" style="position:absolute; top:30px; right:20px"/> <p style="font-size:25px; text-align:center; font-weight:700;">Technology Workshop<br/>Develop Apps with PHP on Cloud</p><div style="position:absolute; top:75px; height:135%; width:50%; left:0px; overflow:hidden; overflow-x:hidden !important; padding:15px;"> <p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Course Highlights</strong><br/><ul style="font-weight:700;font-size:16px;"><li>What is an App on Cloud?<br/>(A technology refresher on Cloud Computing, Big Data & Cross Device Computing)</li><li>Tutorial on PHP and MySql</li><li>A review of web hosting technologies from user perspective</li><li>Develop your first App with PHP</li><li>Role-based Access Privilege and Application Security</li><li>Scaling your App on Cloud</li><li>Practical examples ander usage scenarios</li></ul><br/></p></div><div style="position:absolute; top:75px; height:100%; width:50%; left:51%; overflow:hidden; overflow-x:hidden !important; padding:15px;"> <p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Fee</strong><br/><br/>Rs. 2000 for Students<br/>Rs. 2500 for Others</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;"></strong><br/><br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Date</strong><br/><br/>24th-25th January, 2015<br/> 10:00 am to 5:00 pm</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Enquiry</strong><br/><br/>Srinesh Vyd (8093427859)<br/> Akarsh (7873370941)</p></div></div>','<div style="position:absolute; top:0; height:100%; width:100%; left:0px; overflow:scroll !important; overflow-x:hidden !important;"><img src="resources/etrix.png" height="85" width="200" style="position:absolute; top:30px; right:20px"/> <p style="font-size:25px; text-align:center; font-weight:700;">Workshop on Humanoid Robot<br/><span style="font-size:18px;">biped walking robot using Arduino</span></p><div style="position:absolute; top:85px; height:135%; width:50%; left:0px; overflow:hidden; overflow-x:hidden !important; padding:15px;"><p><strong style="font-weight:700; font-size:21px;">Last Date for Online Registration:</strong><br/> 22nd Jan, 2015<br/>Confirm your seat by paying INR 500 (per team) only. (Rest payment will be collected at the venue on day of workshop)<br/><a href="https://in.explara.com/e/workshop-on-human-o-bot-biped-walking-robot--iit-bhubaneswar" target="_blank"><u>Click for Online Payment</u></a></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Learning Outcomes</strong><br/><ul style="font-weight:700;font-size:16px;"><li>Learn from the best embedded experts</li><li>Learn to design 6-degree of freedom biped walking humanoid robot</li><li>Learn to control servo motor</li><li>Learn how to program a six servo powered walking robot in Arduino IDE</li><li>Learn to interface ultrasonic sensor</li></ul><br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Course Highlights</strong><br/><ul style="font-weight:700;font-size:16px;"><li>Get certified from FABLAB</li><li>Get the best biped walking humanoid kit with 6 degrees of freedom</li><li>Build up your concepts of Embedded Systems, Servo, Ultrasonic, Sensor development and interface, Arduino board and many more</li></ul><br/></p></div><div style="position:absolute; top:85px; height:200%; width:50%; left:51%; overflow:hidden; overflow-x:hidden !important; padding:15px;"><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Workshop Kit Features</strong><br/><ul style="font-weight:700;font-size:16px;"><li>6 servo robot capable of walking, taking sharp turns</li><li>Arduion Uno board, high quality laser cut body</li><li>Fast programming using Arduino IDE</li><li>Ultrasonic sensor enabled</li><li>Obstacle sensing and avoiding</li></ul><br/></p> <p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Fee</strong><br/><br/>Rs. 1250 /per participant<br/>Rs. 3000 for Take Away Kit<br/>(Per team max. 4 participants)<br/>(Total workshop fee Rs. 8000)</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;"></strong><br/><br/></p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Date</strong><br/><br/>24th-25th January, 2015 starting at 9:00 am</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Contact</strong><br/><br/>Srinesh Vyd (8093427859)</p><p style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Helpline</strong><br/><br/>Satish K. Singh<br/>8093531607<br/>9338681607<br/><br/><br/>Internship/Job Opportunities for top performers<br/>Opportunity to win exciting gifts by being the best participant ofthe workshop/post workshop competition</p></div></div>','<div style="position:absolute; top:0; height:100%; width:100%; left:0px; overflow:scroll !important; overflow-x:hidden !important;"><img src="resources/adlabs.jpg" height="100" width="220" style="position:absolute; top:30px; right:20px"/><p style="font-size:25px; text-align:center; font-weight:700;">Embedded Systems</p><p style="padding-left:20px;"><strong>INTRODUCTION</strong></p><p style="padding-left:20px;">Msys-Mobile is all about designing a mobile phone. In the workshop, student learns to design and develop a mobile phone with basic functions like Call Dialing, Call Receiving, SMS Sending, and SMS receiving using GSM technology. GSM (Global System for Mobile communication) is a digital mobile telephony system that uses a variation of Time Division Multiple Accesses (TDMA) and most widely uses the three digital wireless telephony technologies i.e., TDMA, CDMA & FDMA. The Workshop begins with a brief overview on basic & digital electronics to help you recall the fundamentals and attain conceptualization about the stepping tools of embedded systems. It includes a detailed study structure, delivered & demonstrated live by our experts on “How to build a Mobile Phone???”</p><div style="position:absolute; top:300px; height:180%; width:50%; left:0px; overflow-x:hidden !important; padding:15px;"><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Learning Outcomes</strong><br/><ul style="font-weight:700;font-size:16px;"><li>How to use different embedded software tools</li><li>How to write program for ATmega16</li><li>How to interface LED with AT mega 16</li><li>How to generate different patterns in LED array</li><li>How to interface 16X2 Alphanumeric LCD with ATmega16</li><li>How to interface 4X4 Keypad with ATmega16</li><li>How to interface SIM 300 GSM/GPRS Modem with ATmega16</li><li>How to detect SIM Card in SIM 300 GSM/GPRS Modem</li><li>How to activate Calling Line Identification</li><li>How to make a mobile phone</li></ul><br/></p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Program Benefits</strong><br/><ul style="font-weight:700;font-size:16px;"><li>Clear your fundamentals on Embedded System.</li><li>Build & develop your own Mobile phone</li><li>Gain conceptual knowledge on embedded systems, embedded C, ATmega16, GSM etc.</li><li>Get trained by experts</li><li>Awarded certificate on “MSYS-Mobile”</li><li>Live Demos and Interactive Question & Answer sessions</li><li>Get useful Materials</li></ul><br/></p></div><div style="position:absolute; top:300px; height:100%; width:50%; left:51%; overflow:hidden; overflow-x:hidden !important; padding:15px;"><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Fee</strong><br/><br/>Rs. 1400 /per participant<br/>Kit: Rs. 3000 (optional purchase)</p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;"></strong><br/><br/></p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Date</strong><br/><br/>24th-25th January, 2015 starting at 9:00 am</p><p  style="font-weight:700;"><strong style="font-weight:700; font-size:21px;">Contact</strong><br/><br/>Srinesh Vyd (8093427859)</p></div></div>','<div style="position:absolute; top:0; height:100%; width:100%; left:0px; overflow:scroll !important; overflow-x:hidden !important;"><p style="font-size:25px; text-align:center; font-weight:700;">Memory Enhancement and Creative Thinking</p><p style="padding-left:20px;"><strong>INTRODUCTION</strong></p><p style="padding-left:20px;">Memory Enhancement and Creative Thinking<br/><br/>Much like a muscle, the mind requires the proper training in order to get the most from it. Roy Zaltsman provides this valuable mental exercise with his unforgettable memory enhancement seminars.<br/><br/>Most people find themselves frustrated at their lack of ability to remember simple details such as names, faces and appointments, therefore they are not using their minds to its fullest potential. Fortunately, Roy Zaltsman’s expertise in the workings of the human mind gives him insight on effective ways to retain information. His teachings can enhance anyone’s professional and personal life by ensuring they take more and deeper insights from every moment of their day.<br/><br/>Memory enhancement training with Roy Zaltsman is an investment in the potential of your mind. Training from Roy Zaltsman can give new perspective on how your memory works and the best way to use it, making anything from remembering a phone number or study material to learning a new language an easier task than ever before.<br/><br/>Roy’s memory enhancement techniques can also boost creativity by allowing you to make novel associations using knowledge you already possess. His workshops are designed to increase both the capacity and accessibility of your memory, shaping your mind into the sharp, efficient tool it was always meant to be.<br/><br/>Realize your full potential with memory enhancement training from Roy Zaltsman.<br/><br/><br/>Contact: Aravind Bandaru<br/>7504261617<br/>Fees: Rs.250 (students) and Rs. 500 (non-students) for 3 hour workshop</p></div>','<p style="position:absolute; top:10px; left:25px; height:20px; width:200px;">Name</p><input type="text" maxlength="50" placeholder="" size="35" style="position:absolute; top:60px; left:25px; border-radius:10px;"/> <p style="position:absolute; top:70px; left:25px; height:20px; width:200px">E-mail</p><input type="text" maxlength="50" placeholder=""size="35" style="position:absolute; top:120px; left:25px; border-radius:10px;"/> <p style="position:absolute; top:130px; left:25px; height:20px; width:200px">Gender</p><input type="radio" name="gender" value="male" style="position:absolute; top:180px; left:25px; border-radius:10px;"><p style="position:absolute; top:155px; left:50px; height:20px; width:200px"> Male</p><input type="radio" name="gender" value="female" style="position:absolute; top:180px; left:150px; border-radius:10px;"><p style="position:absolute; top:155px; left:175px; height:20px; width:200px"> Female</p><p style="position:absolute; top:190px; left:25px; height:20px; width:200px">Branch</p><input type="text" maxlength="50" placeholder=""size="35" style="position:absolute; top:240px; left:25px; border-radius:10px;"/> <p style="position:absolute; top:250px; left:25px; height:20px; width:200px">College</p><input type="text" maxlength="50" placeholder=""size="35" style="position:absolute; top:300px; left:25px; border-radius:10px;"/> <p style="position:absolute; top:10px; left:345px; height:20px; width:200px;">Phone</p><input type="text" maxlength="50" placeholder="" size="35" style="position:absolute; top:60px; left:345px; border-radius:10px;"/> <p style="position:absolute; top:70px; left:345px; height:20px; width:200px">Address</p><input type="text" maxlength="50" placeholder="" size="35" style="position:absolute; top:120px; left:345px; border-radius:10px;"/> <p style="position:absolute; top:130px; left:345px; height:20px; width:200px">City</p><input type="text" maxlength="50" placeholder="" size="35" style="position:absolute; top:180px; left:345px; border-radius:10px;"> <p style="position:absolute; top:190px; left:345px; height:20px; width:200px">State</p><input type="text" maxlength="50" placeholder="" size="35" style="position:absolute; top:240px; left:345px; border-radius:10px;"/> <p style="position:absolute; top:250px; left:345px; height:20px; width:200px">Accomodation Required</p><input type="checkbox" maxlength="50" placeholder="" size="35" style="position:absolute; top:275px; left:545px; border-radius:10px;"/> <p style="position:absolute; top:280px; left:345px; height:20px; width:200px">Campus Ambassador</p><input type="checkbox" maxlength="50" placeholder="" size="35" style="position:absolute; top:305px; left:545px; border-radius:10px;"/> <p style="position:absolute; top:320px; left:80px; height:20px; width:200px">Mobile Application Development</p><input type="checkbox" maxlength="50" placeholder="" size="135" style="position:absolute; top:345px; left:45px; border-radius:10px;"/> <p style="position:absolute; top:320px; left:280px; height:20px; width:200px">STAAD.Pro</p><input type="checkbox" maxlength="50" placeholder="" size="135" style="position:absolute; top:345px; left:245px; border-radius:10px;"/> <p style="position:absolute; top:320px; left:400px; height:20px; width:200px">Automobile Automation</p><input type="checkbox" maxlength="50" placeholder="" size="135" style="position:absolute; top:345px; left:380px; border-radius:10px;"/><p style="position:absolute; top:385px; left:80px; height:20px; width:200px">Develop Apps with PHP on Cloud</p><input type="checkbox" maxlength="50" placeholder="" size="135" style="position:absolute; top:405px; left:45px; border-radius:10px;"/> <p style="position:absolute; top:385px; left:325px; height:20px; width:200px">Humanoid Robot</p><input type="checkbox" maxlength="50" placeholder="" size="135" style="position:absolute; top:405px; left:290px; border-radius:10px;"/><p style="position:absolute; top:385px; left:480px; height:20px; width:200px">Embedded Systems</p><input type="checkbox" maxlength="50" placeholder="" size="135" style="position:absolute; top:405px; left:445px; border-radius:10px;"/> <p style="position:absolute; top:320px; left:630px; height:20px; width:200px">Roy Zaltsman</p><input type="checkbox" maxlength="50" placeholder="" size="135" style="position:absolute; top:345px; left:605px; border-radius:10px;"/> <div class="workshops_reg_submit" style="position:absolute; top:470px; left:235px; border-radius:10px; height:20px; width:100px; border:solid #CCC 1px"><p style="position:relative; width:100%; height:100%; top:-20px; text-align:center; font-weight:800; cursor:pointer;">Submit</p></div>'];
	$(".workshops_menu").on("click", function(){
		var index = $(this).index();
		$(".workshops_content").html(workshop_cont[index]);
		});
		
	$(".workshops_content").on("click", ".workshops_reg_submit", function(){
		if(!confirm("Are you sure?"))
		return;
		$(".workshops_reg_submit").css("display", "none");
		var name = $("input").eq(13).val();
		var email = $("input").eq(14).val();
		var gender = $("input").eq(15).is(':checked')?"Male":$("input").eq(16).is(':checked')?"Female":"";
		var branch = $("input").eq(17).val();
		var college = $("input").eq(18).val();
		var phone = $("input").eq(19).val();
		var address = $("input").eq(20).val();
		var city = $("input").eq(21).val();
		var state = $("input").eq(22).val();
		var accomodation = $("input").eq(23).is(':checked')?"1":"0";
		var ca = $("input").eq(24).is(':checked')?"1":"0";

		var wp_app = $("input").eq(25).is(':checked')?"Mobile Application Development<br/>":"";
		var wp_staad = $("input").eq(26).is(':checked')?"STAAD.Pro<br/>":"";
		var wp_auto = $("input").eq(27).is(':checked')?"Automobile Automation<br/>":"";
		var wp_php = $("input").eq(28).is(':checked')?"Develop Apps with PHP on Cloud<br/>":"";
		var wp_human = $("input").eq(29).is(':checked')?"Human-O-Bot<br/>":"";
		var wp_embed = $("input").eq(30).is(':checked')?"Embedded Systems<br/>":"";
		var wp_embed = $("input").eq(31).is(':checked')?"Memory Enhancement and Creative Thinking<br/>":"";
		var	worksops = wp_app + wp_staad + wp_auto + wp_php + wp_human + wp_embed;
		
		$.post("",  {name:name, email:email, gender:gender, branch:branch, college:college, phone:phone, address:address, city:city, state:state, accomodation:accomodation, ca:ca, worksops:worksops}, function(){	$(".workshops_ref_submit").css("display", "block"); alert("Registration successful, Check your email"); gohome(); $(".workshops_content").html(""); location.reload();});
		});
	workshops*/
	var events ="", events_code ="";

	/*registration*/
	$(".register_button").on("click", function(){
	$(".registration").fadeIn(400);
	});


	var all_categories = ["event_categori"];
	var j=0;
	var all_events = ["event-name"];

	var reg_events = '<br/><div style="position:relative; top:5px; left:10px; margin-right:15px; border-radius:10px; height:20px; width:160px; display:inline-block; cursor:pointer"><p style="position:relative; width:100%; height:100%; top:-20px; text-align:center; font-weight:800;">'+all_categories[j++]+'</p></div></div><br/>';
	for(var i=0; i<all_events.length; i++){
		reg_events += '<div class="buttoon" style="position:relative; top:-5px; left:10px; margin-right:15px; border-radius:10px; height:20px; width:160px; border:solid #CCC 1px; display:inline-block; cursor:pointer"><p style="position:relative; width:100%; height:100%; top:-20px; text-align:center; font-weight:800;">'+all_events[i]+'</p></div></div>';
		if(i==6 || i==12 || i==14 || i==18 || i==21 || i==23 || i==28)
		reg_events += '<br/><div style="position:relative; top:-5px; left:10px; margin-right:15px; border-radius:10px; height:10px; width:160px; display:inline-block; cursor:pointer"><p style="position:relative; width:100%; height:100%; top:-20px; text-align:center; font-weight:800;">'+all_categories[j++]+'</p></div></div><br/>';
	}

		$(".register_events").html(reg_events);
		
		$(".register_profile_button").on("click", function(){
			$(".register_profile").css("display","block");
			$(".register_events").css("display","none");
	                $("#hint").css("display","none");
			});
		$(".register_events_button").on("click", function(){
			$(".register_profile").css("display","none");
			$(".register_events").css("display","block");
	                $("#hint").css("display","block");
			});

	$(".register_events").on("click", "div.buttoon", function(){
		 	var index = $(this).index(".buttoon");
			if(all_events_state[index]==0)
			all_events_state[index]=1;
			else
			all_events_state[index]=0;
			$(this).toggleClass("clicked_buttoon");
	                $(".save_button p").html("Save");
	                console.log(all_events_state+", "+index);
		});

	$("input").on('change keyup paste', function() {
	$(".save_button p").html("Save");
	});

	$("#reg_close").on("click", function(){
		$(".registration").css("display", "none");
		});

	$("input").css("padding-left", "10px");

	var reg_save = function(){
	        $(".register_hide").css("display", "block");
	        $(".save_button").addClass("clicked_buttoon");
	        $(".save_button p").html("Saving...");
		var name = $("input").eq(0).val();
		var email = $("input").eq(1).val();
		var gender = $("input").eq(2).is(':checked')?"Male":$("input").eq(3).is(':checked')?"Female":"";
		var branch = $("input").eq(4).val();
		var college = $("input").eq(5).val();
		var phone = $("input").eq(6).val();
		var address = $("input").eq(7).val();
		var city = $("input").eq(8).val();
		var state = $("input").eq(9).val();
		var events ="", events_code ="";
		for(var i=0; i<all_events.length;i++){
			events_code+=all_events_state[i].toString();
			if(all_events_state[i]==1)
			events += all_events[i]+", ";

		}
		console.log(events);

		$.post("phpfile",  {name:name, email:email, gender:gender, branch:branch, college:college, phone:phone, address:address, city:city, state:state,  events: events, events_code: events_code}, function(){
	        $(".register_hide").css("display", "none");
	        $(".save_button").removeClass("clicked_buttoon");
	        $(".save_button p").html("Saved");
	});
	}
	$(".save_button").on("click", reg_save);
	signed_in_callback = function(name,email){
	        //console.log(name+"\n"+email);
	        $("input").eq(1).val(email);
		$(".register_fng").css("display", "none");	
	        $(".register_profile").css("display", "block");
	        $(".register_profile_button").css("display", "block");
	        $(".register_events_button").css("display", "block");
	        $(".save_button").css("display", "block");
	        $(".logout_button").css("display", "block");
	        $.post("php",  {name:name, email:email}, function(data){
			var response = jQuery.parseJSON(data.trim());
	                var code = response.events_code.trim();
	                //console.log(code);
			for(var i=0; i<code.length; i++){
				if(code.charAt(i)=='1'){
					all_events_state[i]=1;
					$(".buttoon").eq(i).toggleClass("clicked_buttoon");
				}
			}
	                $("input").eq(0).val(response.name);
		if(response.gender==="Male")
		$("input").eq(2).attr("checked",true);
	        else if(response.gender==="Female")
	        $("input").eq(3).attr("checked",true);
		$("input").eq(4).val(response.branch);
	console.log(response);
		$("input").eq(5).val(response.college);
		$("input").eq(6).val(response.phone);
		$("input").eq(7).val(response.address);
		$("input").eq(8).val(response.city);
		$("input").eq(9).val(response.state);
	        if(response.accommodation==="1"){
		$("input").eq(10).attr("checked",true);
	}
		if(response.ca==="1")
		$("input").eq(11).attr("checked",true);
	        $("input").eq(12).val(response.submitted);
		});
	};

	function disconnectUser() {
	  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
	      access_token;

	  // Perform an asynchronous GET request.
	  $.ajax({
	    type: 'GET',
	    url: revokeUrl,
	    async: false,
	    contentType: "application/json",
	    dataType: 'jsonp',
	    success: function(nullResponse) {
	      // Do something now that user is disconnected
	      // The response is always undefined.
	      location.reload();
	    },
	    error: function(e) {
	      // Handle the error
	      // console.log(e);
	      // You could point users to manually disconnect if unsuccessful
	      // https://plus.google.com/apps
	      location.reload();
	    }
	  });
	}
	// Could trigger the disconnect on a button click
	$('.logout_button').click(function(){
	$(".register_hide").css("display", "block");
	$(".logout_button").addClass("clicked_buttoon");
	if(access_token!="")
	disconnectUser();
	});
	/*registration*/

	$(".workshop_register").on("click", function(){
		$(".menu_workshops").trigger("click");
		$(".workshops_menu").eq(7).trigger("click");
		});
	}); 
	                            
	                            
	                            
	                            
	                            
