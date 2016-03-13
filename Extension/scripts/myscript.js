$(window).load(function(){
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

	setInterval(function(){$.get("http://api.roblox.com/incoming-items/counts").success(function(num){if(num.unreadMessageCount>0){$("#nav-message>.rbx-highlight").text(""+num.unreadMessageCount);}else{$("#nav-message>.rbx-highlight").text("");}});},15000);

	//Background color
	chrome.storage.sync.get('background',function(v){
	if(v.background==true){
	$('#ctl00_cphRoblox_ThreadView1_ctl00_Search').add('placeholder','Change background color!')
	$('#ctl00_cphRoblox_ThreadView1_ctl00_Search').colpick({
		onChange:function(hsb,hex,rgb,el,bySetColor) {
		$('body').css('background','#'+hex)
		$('.container-fluid').css('background','#'+hex)
		chrome.storage.sync.set({'color':'#'+hex})
		} })

	$('#ctl00_cphRoblox_ThreadView1_ctl00_SearchButton').val('Reset')
	$('#ctl00_cphRoblox_ThreadView1_ctl00_SearchButton').on('click',function(e){
	e.preventDefault();
	chrome.storage.sync.remove('color')
	window.location.reload()
	});}})

	//Auto Refresh
	chrome.storage.sync.get('refresh',function(v){ if(v.refresh==true){
		function Refresh(){
		if(window.location.href.match(/ShowForum.aspx/g)){
			$('body').fadeOut(1000, function(){location.reload(true);});};};
			chrome.storage.sync.get('time',function(v){(v.time)?setInterval(function(){Refresh()},v.time):setInterval(function(){Refresh()},30000)})
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
	var status = $('.profile-avatar-status').prop('title');
	if(!status){$('.header-title').append('<h3 style="font-size:20px;">Status: Offline</h3>')}else{$('.header-title').append('<h3 style="font-size:20px;">Status: '+status+'</h3>')}

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
		$(".QuickPost").parent().append('<div style="display:none;margin-top:10px;" class="mydiv"><textarea style="width:750px;height:150px;" class="txtbox" rows="4" cols="50"></textarea><br><p style="display:none;color:red;" class="error">Error Occurred!</p><button style="width:750px;outline:none;" class="postme btn-control btn-control-medium verified-email-act">Post</button></div>');
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
	}

//auto complete quotes.
//Do Not Steal!
chrome.storage.sync.get("AutoComplete",function(t){1==t.AutoComplete&&$(function(){document.onkeypress=function(t){t=t||window.event;var o=t.keyCode||t.which;if(location.href.match(/AddPost.aspx/)){if("34"==o){var e=$("#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody");e.insertAtCaret('"')}}else $(".txtbox")&&"34"==o&&$(".txtbox").insertAtCaret('"')}})});
  //End
});
console.log('Roblox Enhancer Loaded')
