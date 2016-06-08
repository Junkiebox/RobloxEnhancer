$(function(){
$(document).ready(function(){$(".rate").on("click",function(){chrome.tabs.create({url:$(this).attr("href")});return false;});});
$("input[type='checkbox']").change(function(){if($(this).is(":checked")){$(this).parent().addClass("GreenBackground");}else{$(this).parent().removeClass("GreenBackground");}});

//Set item on click
$(".youtube").on("click",function(){chrome.storage.sync.set({youtube:$(".youtube").prop("checked")});});
$(".decal").on("click",function(){chrome.storage.sync.set({decal:$(".decal").prop("checked")});});
$(".archive").on("click",function(){chrome.storage.sync.set({archive:$(".archive").prop("checked")});});
$(".profile").on("click",function(){chrome.storage.sync.set({profile:$(".profile").prop("checked")});});
$(".games").on("click",function(){chrome.storage.sync.set({games:$(".games").prop("checked")});});
$(".obc").on("click",function(){chrome.storage.sync.set({obc:$(".obc").prop("checked")});});
$(".forum").on("click",function(){chrome.storage.sync.set({forum:$(".forum").prop("checked")});});
$(".background").on("click",function(){chrome.storage.sync.set({background:$(".background").prop("checked")});});
$(".refresh").on("click",function(){chrome.storage.sync.set({refresh:$(".refresh").prop("checked")});});
$(".protection").on("click",function(){chrome.storage.sync.set({protection:$(".protection").prop("checked")});});
$(".advert").on("click",function(){chrome.storage.sync.set({advert:$(".advert").prop("checked")});});
$(".AutoComplete").on("click",function(){chrome.storage.sync.set({AutoComplete:$(".AutoComplete").prop("checked")});});
$(".Status").on("click",function(){chrome.storage.sync.set({Status:$(".Status").prop("checked")});});
$("input").on("click",function(){ $(".sign").fadeOut(800);$('.saved').fadeIn(800);window.setTimeout(function(){$(".saved").fadeOut(800);$(".sign").fadeIn(800);window.clearInterval()},3000)})

//Refresh
$('.ASeconds').on('click',function(){chrome.storage.sync.set({'ASeconds':$('.ASeconds').prop('checked')});chrome.storage.sync.set({'time':'10000'});chrome.storage.sync.set({'BSeconds':'false'});chrome.storage.sync.set({'CSeconds':'false'});})
$('.BSeconds').on('click',function(){chrome.storage.sync.set({'BSeconds':$('.BSeconds').prop('checked')});chrome.storage.sync.set({'time':'20000'});chrome.storage.sync.set({'ASeconds':'false'});chrome.storage.sync.set({'CSeconds':'false'});})
$('.CSeconds').on('click',function(){chrome.storage.sync.set({'CSeconds':$('.CSeconds').prop('checked')});chrome.storage.sync.set({'time':'30000'});chrome.storage.sync.set({'ASeconds':'false'});chrome.storage.sync.set({'BSeconds':'false'});})

//check if item is enabled
chrome.storage.sync.get("youtube",function(v){$(".youtube").prop("checked",v.youtube);if(v.youtube==true){$(".youtube").parent().addClass("GreenBackground");}else{$(".youtube").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("decal",function(v){$(".decal").prop("checked",v.decal);if(v.decal==true){$(".decal").parent().addClass("GreenBackground");}else{$(".decal").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("archive",function(v){$(".archive").prop("checked",v.archive);if(v.archive==true){$(".archive").parent().addClass("GreenBackground");}else{$(".archive").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("profile",function(v){$(".profile").prop("checked",v.profile);if(v.profile==true){$(".profile").parent().addClass("GreenBackground");}else{$(".profile").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("games",function(v){$(".games").prop("checked",v.games);if(v.games==true){$(".games").parent().addClass("GreenBackground");}else{$(".games").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("obc",function(v){$(".obc").prop("checked",v.obc);if(v.obc==true){$(".obc").parent().addClass("GreenBackground");}else{$(".obc").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("forum",function(v){$(".forum").prop("checked",v.forum);if(v.forum==true){$(".forum").parent().addClass("GreenBackground");}else{$(".forum").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("background",function(v){$(".background").prop("checked",v.background);if(v.background==true){$(".background").parent().addClass("GreenBackground");}else{$(".background").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("protection",function(v){$(".protection").prop("checked",v.protection);if(v.protection==true){$(".protection").parent().addClass("GreenBackground");}else{$(".protection").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("advert",function(v){$(".advert").prop("checked",v.advert);if(v.advert==true){$(".advert").parent().addClass("GreenBackground");}else{$(".advert").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("Status",function(v){$(".Status").prop("checked",v.Status);if(v.Status==true){$(".Status").parent().addClass("GreenBackground");}else{$(".Status").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("AutoComplete",function(v){$(".AutoComplete").prop("checked",v.AutoComplete);if(v.AutoComplete==true){$(".AutoComplete").parent().addClass("GreenBackground");}else{$(".AutoComplete").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("refresh",function(v){$(".refresh").prop("checked",v.refresh);if(v.refresh==true){$(".refresh").parent().addClass("GreenBackground");}else{$(".refresh").parent().removeClass("GreenBackground");}});
chrome.storage.sync.get("ASeconds",function(v){if(v.ASeconds==true){$(".ASeconds").prop("checked",v.ASeconds);}});
chrome.storage.sync.get("BSeconds",function(v){if(v.BSeconds==true){$(".BSeconds").prop("checked",v.BSeconds);}});
chrome.storage.sync.get("CSeconds",function(v){if(v.CSeconds==true){$(".CSeconds").prop("checked",v.CSeconds);}});
})

$(function(){

var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

	$("input[type='checkbox']").click(function(e) {
    $("body").append(appendthis);
    $(".modal-overlay").fadeTo(500, 0.7);
    //$(".js-modalbox").fadeIn(500);
		var modalBox = $(this).attr('data-modal-id');
		$('#'+modalBox).fadeIn($(this).data());
	});  
  
  
$(".js-modal-close, .modal-overlay").click(function() {
    $(".modal-box, .modal-overlay").fadeOut(500, function() {
        $(".modal-overlay").remove();
    });
 
});
 
$(window).resize(function() {
    $(".modal-box").css({
        top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
        left: ($(window).width() - $(".modal-box").outerWidth()) / 2
    });
});
 
$(window).resize();
 
});