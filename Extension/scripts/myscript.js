$(function(){
	var _gt = {
		_nts: $('.normalTextSmall'),
		_n:$('#ctl00_cphRoblox_Createeditpost1_PostForm_NewPostSubject'),
		_v:$('#ctl00_cphRoblox_Createeditpost1_PostForm_ForumSubjectRequiredValidator'),
		_po: $('#ctl00_cphRoblox_Createeditpost1_PostForm_PostButton'),
		_tb:$('#ctl00_cphRoblox_Createeditpost1_PostForm_NewPostSubject'),
		_sub:$('#ctl00_cphRoblox_Createeditpost1_PostForm_NewPostSubject').parent().parent().find("td:first span"),
		 _tlc:$('.thread-link-container'),
		_pvt:$('#ctl00_cphRoblox_PostView1_ctl00_PostTitle'),
		_pl:$('#ctl00_cphRoblox_PostView1_ctl00_PostList')
};

/*
$('.post-list-subject').each(function(){ 
	var bots = $(this).find('.thread-link-container').text().match(/ipad/);
	if(bots){
		$(this).find('.thread-link-container').parent().parent().parent().parent().remove();
	}
})
*/

// Aetricity Script

/*
var buttons = {
	'PostButton': $("#ctl00_cphRoblox_Createeditpost1_PostForm_PostButton")
}

//Update function
function updateThis() {
	//Subtract seconds
	var current_seconds = 0;
	chrome.storage.local.get("seconds", function(a) {
		current_seconds = a.seconds;
		if (current_seconds != 0) {
			current_seconds = current_seconds - 1;
			chrome.storage.local.set({"seconds": current_seconds});
		}
	});
	
	//Post button countdown/disabled
	if (buttons.PostButton != null) {
		chrome.storage.local.get("seconds", function(a) {
			if (a.seconds > 0) {
				buttons.PostButton.val("Post (" + a.seconds + ")");
				buttons.PostButton.prop('disabled',true);
			}else{
				buttons.PostButton.val(" Post ");
				buttons.PostButton.prop('disabled',false);
			}
		})
	}
}

//Page loaded
$(function(){
	//Check if user has posted
	chrome.storage.local.get("hasposted", function(a) {
		if (a.hasposted == false) {
			console.log("not posted");
		}else{
			console.log("posted:");
			var PostInterval=setInterval(updateThis, 1000);
			chrome.storage.local.get("seconds", function(a) {
				if(a.seconds==0){
					chrome.storage.local.set({"hasposted": false});
					clearInterval(PostInterval);
				};
			})
		}
	});
	//Set seconds after button has been clicked
	if (buttons.PostButton != null) {
		console.log("present!");
		buttons.PostButton.on("click", function() {
			chrome.storage.local.set({"seconds": 30})
			chrome.storage.local.set({"hasposted": true});
			console.log("posted");
		})
	}
})
*/
// Aetricity Script

	//Message icon update.
	chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
		if(msg.unreadMessageCount){
			$("#nav-message>.notification-blue").removeClass('hide');
			$("#nav-message>.notification-blue").text("" + msg.unreadMessageCount);
			if(msg.unreadMessageCount == 'NoMsgs'){
				$("#nav-message>.notification-blue").addClass('hide');
			}
		}
	});
	
	//Background color
	Storage.Get('background',function(v){
	if(v.background==true){
	$('#ctl00_cphRoblox_ThreadView1_ctl00_Search').add('placeholder','Change background color!')
	$('#ctl00_cphRoblox_ThreadView1_ctl00_Search').colpick({
		onChange:function(hsb,hex,rgb,el,bySetColor) {
		$('.container-fluid').css('background','#'+hex)
		$('body').css('background','#'+hex)
		Storage.Set({'color':'#'+hex})
		} })

	$('#ctl00_cphRoblox_ThreadView1_ctl00_SearchButton').val('Reset')
	$('#ctl00_cphRoblox_ThreadView1_ctl00_SearchButton').on('click',function(e){
	e.preventDefault();
	chrome.storage.sync.remove('color')
	window.location.reload()
	});}})
	
	//Track Thread
	Storage.Get("TrackThread",function(v){if(v.TrackThread==true){
		function mark(){
			if($('#ctl00_cphRoblox_PostView1_ctl00_TrackThread').is(':checked')){
				$('#RobloxEnhancer').check();
				$('#RobloxEnhancerText').text('Untrack thread')
			}else{
				$('#RobloxEnhancer').uncheck();
			}
		}

		$('#ctl00_cphRoblox_PostView1_ctl00_TrackThread').after('<input id="RobloxEnhancer" type="checkbox">')
		$('[for="ctl00_cphRoblox_PostView1_ctl00_TrackThread"]').replaceWith('<label id="RobloxEnhancerText" for="RobloxEnhancer">Track Thread</label>')
		$('#ctl00_cphRoblox_PostView1_ctl00_TrackThread').css({'display':'none'})
		mark()
		
		function TrackThread(Track,check){
			error = setTimeout(function(){
				mark();
				$('#RobloxEnhancerText').text('Error occured. Please try again!');
			},8000);
			$.ajaxSetup({'async':'true'});
			var loc=window.location;
			$.get(loc).success(function(r){
				$.post(loc,{
					__VIEWSTATE:r.match(/[name="__VIEWSTATE"] value="(.+?)"/)[1],
					__EVENTVALIDATION:r.match(/[name="__EVENTVALIDATION"] id="__EVENTVALIDATION" value="(.+?)"/)[1],
					ctl00$cphRoblox$PostView1$ctl00$TrackThread:Track
				}).done(function(){
					if(check){
						$('#RobloxEnhancerText').text('Untrack thread')
					}else{
						$('#RobloxEnhancerText').text('Track thread')
						}
					clearTimeout(error);
					}).fail(function(){
						$('#RobloxEnhancerText').text('Error occured. Please try again!')
					})
			})
		}
		
		$('#RobloxEnhancer').on('click',function(){
			$('#RobloxEnhancerText').text('Loading...');
			if($('#RobloxEnhancer').is(':checked')){
				TrackThread('on',true)
				$('#RobloxEnhancerText').text('Tracking...');
			}else{
				TrackThread('',false)
				$('#RobloxEnhancerText').text('Untracking...');
			}
		})
	}})

	//Auto Refresh
	Storage.Get('refresh',function(v){ if(v.refresh==true){
		function Refresh(){
		if(window.location.href.match(/ShowForum.aspx/g)){
			$('body').fadeOut(1000, function(){location.reload(true);});};};
			Storage.Get('time',function(v){(v.time)?setInterval(function(){Refresh()},v.time):setInterval(function(){Refresh()},30000)})
	}})

	//Ban script
	$(document).ready(function(){chrome.storage.local.get("Banned",function(b){for(var c in b){if(b[c]==""){}else{$(".forum-table-row  .post-list-author").each(function(){if($(this).text().toLowerCase().match(b[c])){$(this).parent().parent().remove();}});}}});chrome.storage.local.get("Banned",function(b){for(var c in b){if(b[c]==""){}else{$(".normalTextSmallBold").each(function(){var a=b[c].toString().replace(/,/g,"\n");if(a.toString().toLowerCase().match($(this).text().toLowerCase())){$(this).parents('tr[class="forum-post"]').next("tr").remove();$(this).parents('tr[class="forum-post"]').remove();}});}}});});

	//linkify
	$('.normalTextSmall').html(function(i,text) {
		return text.replace(/script/gi,'<span>script</span>')
	});
	_gt['_nts'].removeClass('linkify');
	_gt['_nts'].linkify({target:'_blank'});
	$('blockquote').linkify({target:'_blank'});
	_gt['_nts'].linkify2({target:'_blank'});
	$('#ctl00_cphRoblox_Createeditpost1_PostForm_ReplyBody').removeClass('linkify');
	$('#ctl00_cphRoblox_Createeditpost1_PostForm_ReplyBody').linkify({target:'_blank'});
	
	//Online Status
	Storage.Get("Status",function(v){if(v.Status==true){
		var status2 = $('.profile-avatar-status').prop('title');
		var status = " "+$('.profile-avatar-status').prop('title');
		var UserGame = $('.avatar-status').prop('href')
		$('.profile-avatar-status').css({'display':'none'})
		//$('.avatar-headshot-lg').after('<h2 style="font-size:20px;color:red;">Offline</h2>')
		if(UserGame){
			if(!status){}else{$('.profile-about').before('<h2 class="section-content" style="margin-top:10px;z-index:1000;position:relative;font-size:20px;color:green;"><a target="_blank" href='+UserGame+'><span class="icon-game"></span>'+status+'</a></h2>')}
		}else{
		   if(status.match(' In Game')){
		    	$('.profile-about').before('<h2 class="section-content" style="margin-top:10px;position:relative;font-size:20px;color:green;"><span class="icon-game"></span>'+status+'</h2>')
		   }else{
			if(status.match(' In Studio')){}else{if(!status2){}else{$('.profile-about').before('<h2 class="section-content" style="margin-top:10px;position:relative;font-size:20px;color:green;"><span class="icon-online"></span>'+status+'</h2>')}}
			}
			if(status.match(' In Studio')){
					$('.profile-about').before('<h2 class="section-content" style="margin-top:10px;position:relative;font-size:20px;color:green;"><span class="icon-studio"></span>'+status+'</h2>')
			}
		}
	}
})

	//validate
	_gt['_n'].add('maxlength','60');
	_gt['_v'].remove()

	//Character count
	_gt['_sub'].text('Max(60c) Subject:');
	_gt['_tb'].add('required','require');_gt['_tb'].add('placeholder','Max 60 Characters');
	_gt['_tb'].keyup(function(){
		var u = 60-_gt['_tb'].val().length;
		_gt['_sub'].text('Max('+u+') Subject:');
	})

	//cancel button/Posting
	$("#ctl00_cphRoblox_Createeditpost1_PostForm_Cancel").click(function(e){e.preventDefault();history.back()});_gt['_po'].on("click",function(){_gt['_po'].val("Posting...")});
	
	if (window.location.href.match(/ShowPost\.aspx\?PostID/)) {
		$(".btn-control").last().parent().append('<button style="outline:none;" class="QuickPost btn-control btn-control-medium verified-email-act">Quick Post</button>');
		$(".QuickPost").parent().append('<div style="display:none;margin-top:10px;" class="mydiv"><textarea style="width:750px;height:150px;" class="txtbox form-control input-field rbx-comment-input blur" rows="4" cols="50"></textarea><br><p style="display:none;color:red;" class="error">Error Occurred!</p><button style="width:780px;outline:none;margin-top:-13px;" class="postme btn-secondary-md">Post</button></div>');
		$(".QuickPost").on("click", function(a) {
			a.preventDefault();
			$(".mydiv").fadeToggle();
			$(".txtbox").focus();
			$(".txtbox").get(0).setSelectionRange(0, 0);
		});
		$(".postme").on("click", function(b) {
			b.preventDefault();
			var a = location.href.match(/(\d+)/)[1];
			QuickPost(a, $(".txtbox").val());
			$(".postme").attr("disabled", "disabled");
			$(".postme").text("Posting...");
		});
		/*
		window.onbeforeunload = function(){
		$(".postme").click(function() {
			return false;
		});
			if($('.txtbox').val().length > 1){
			  return "You haven't posted yet.";
			};
		}
		*/
	}

//auto complete quotes.
//Do Not Steal!
Storage.Get("AutoComplete",function(t){1==t.AutoComplete&&$(function(){document.onkeypress=function(t){t=t||window.event;var o=t.keyCode||t.which;if(location.href.match(/AddPost.aspx/)){if("34"==o){var e=$("#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody");e.insertAtCaret('"')}}else $(".txtbox")&&"34"==o&&$(".txtbox").insertAtCaret('"')}})});
  //End
});
console.log('Roblox Enhancer Loaded')
