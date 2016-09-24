$(function(){
//$(document).ready(function(){$(".rate").on("click",function(){chrome.tabs.create({url:$(this).attr("href")});return false;});});
$("input[type='checkbox']").change(function(){if($(this).is(":checked")){$(this).parent().parent().addClass("GreenBackground");}else{$(this).parent().parent().removeClass("GreenBackground");}});

//Set item on click
$(".youtube").on("click",function(){Storage.Set({youtube:$(".youtube").prop("checked")});});
$(".decal").on("click",function(){Storage.Set({decal:$(".decal").prop("checked")});});
$(".BotFilter").on("click",function(){Storage.Set({BotFilter:$(".BotFilter").prop("checked")});});
$(".archive").on("click",function(){Storage.Set({archive:$(".archive").prop("checked")});});
$(".profile").on("click",function(){Storage.Set({profile:$(".profile").prop("checked")});});
$(".games").on("click",function(){Storage.Set({games:$(".games").prop("checked")});});
$(".obc").on("click",function(){Storage.Set({obc:$(".obc").prop("checked")});});
$(".forum").on("click",function(){Storage.Set({forum:$(".forum").prop("checked")});});
$(".background").on("click",function(){Storage.Set({background:$(".background").prop("checked")});});
$(".refresh").on("click",function(){Storage.Set({refresh:$(".refresh").prop("checked")});});
$(".protection").on("click",function(){Storage.Set({protection:$(".protection").prop("checked")});});
$(".advert").on("click",function(){Storage.Set({advert:$(".advert").prop("checked")});});
$(".AutoComplete").on("click",function(){Storage.Set({AutoComplete:$(".AutoComplete").prop("checked")});});
$(".Status").on("click",function(){Storage.Set({Status:$(".Status").prop("checked")});});
$(".TrackThread").on("click",function(){Storage.Set({TrackThread:$(".TrackThread").prop("checked")});});
$(".ItemNotifier").on("click",function(){Storage.Set({ItemNotifier:$(".ItemNotifier").prop("checked")});});
//$("input").click(function(){$('.saved').filter(':not(:animated)').animate({width:'toggle'},800);window.setTimeout(function(){$(".saved").fadeOut(800);},3000)})

//Refresh
$('.ASeconds').on('click',function(){Storage.Set({'ASeconds':$('.ASeconds').prop('checked')});Storage.Set({'time':'10000'});Storage.Set({'BSeconds':'false'});Storage.Set({'CSeconds':'false'});})
$('.BSeconds').on('click',function(){Storage.Set({'BSeconds':$('.BSeconds').prop('checked')});Storage.Set({'time':'20000'});Storage.Set({'ASeconds':'false'});Storage.Set({'CSeconds':'false'});})
$('.CSeconds').on('click',function(){Storage.Set({'CSeconds':$('.CSeconds').prop('checked')});Storage.Set({'time':'30000'});Storage.Set({'ASeconds':'false'});Storage.Set({'BSeconds':'false'});})

//check if item is enabled
Storage.Get("youtube",function(v){$(".youtube").prop("checked",v.youtube);if(v.youtube==true){$(".youtube").parent().parent().addClass("GreenBackground");}else{$(".youtube").parent().parent().removeClass("GreenBackground");}});
Storage.Get("decal",function(v){$(".decal").prop("checked",v.decal);if(v.decal==true){$(".decal").parent().parent().addClass("GreenBackground");}else{$(".decal").parent().parent().removeClass("GreenBackground");}});
Storage.Get("archive",function(v){$(".archive").prop("checked",v.archive);if(v.archive==true){$(".archive").parent().parent().addClass("GreenBackground");}else{$(".archive").parent().parent().removeClass("GreenBackground");}});
Storage.Get("profile",function(v){$(".profile").prop("checked",v.profile);if(v.profile==true){$(".profile").parent().parent().addClass("GreenBackground");}else{$(".profile").parent().parent().removeClass("GreenBackground");}});
Storage.Get("games",function(v){$(".games").prop("checked",v.games);if(v.games==true){$(".games").parent().parent().addClass("GreenBackground");}else{$(".games").parent().parent().removeClass("GreenBackground");}});
Storage.Get("obc",function(v){$(".obc").prop("checked",v.obc);if(v.obc==true){$(".obc").parent().parent().addClass("GreenBackground");}else{$(".obc").parent().parent().removeClass("GreenBackground");}});
Storage.Get("forum",function(v){$(".forum").prop("checked",v.forum);if(v.forum==true){$(".forum").parent().parent().addClass("GreenBackground");}else{$(".forum").parent().parent().removeClass("GreenBackground");}});
Storage.Get("background",function(v){$(".background").prop("checked",v.background);if(v.background==true){$(".background").parent().parent().addClass("GreenBackground");}else{$(".background").parent().parent().removeClass("GreenBackground");}});
Storage.Get("protection",function(v){$(".protection").prop("checked",v.protection);if(v.protection==true){$(".protection").parent().parent().addClass("GreenBackground");}else{$(".protection").parent().parent().removeClass("GreenBackground");}});
Storage.Get("advert",function(v){$(".advert").prop("checked",v.advert);if(v.advert==true){$(".advert").parent().parent().addClass("GreenBackground");}else{$(".advert").parent().parent().removeClass("GreenBackground");}});
Storage.Get("BotFilter",function(v){$(".BotFilter").prop("checked",v.BotFilter);if(v.BotFilter==true){$(".BotFilter").parent().parent().addClass("GreenBackground");}else{$(".BotFilter").parent().parent().removeClass("GreenBackground");}});
Storage.Get("Status",function(v){$(".Status").prop("checked",v.Status);if(v.Status==true){$(".Status").parent().parent().addClass("GreenBackground");}else{$(".Status").parent().parent().removeClass("GreenBackground");}});
Storage.Get("AutoComplete",function(v){$(".AutoComplete").prop("checked",v.AutoComplete);if(v.AutoComplete==true){$(".AutoComplete").parent().parent().addClass("GreenBackground");}else{$(".AutoComplete").parent().parent().removeClass("GreenBackground");}});
Storage.Get("refresh",function(v){$(".refresh").prop("checked",v.refresh);if(v.refresh==true){$(".refresh").parent().parent().addClass("GreenBackground");}else{$(".refresh").parent().parent().removeClass("GreenBackground");}});
Storage.Get("TrackThread",function(v){$(".TrackThread").prop("checked",v.TrackThread);if(v.TrackThread==true){$(".TrackThread").parent().parent().addClass("GreenBackground");}else{$(".TrackThread").parent().parent().removeClass("GreenBackground");}});
Storage.Get("ItemNotifier",function(v){$(".ItemNotifier").prop("checked",v.ItemNotifier);if(v.ItemNotifier==true){$(".ItemNotifier").parent().parent().addClass("GreenBackground");}else{$(".ItemNotifier").parent().parent().removeClass("GreenBackground");}});
Storage.Get("ASeconds",function(v){if(v.ASeconds==true){$(".ASeconds").prop("checked",v.ASeconds);}});
Storage.Get("BSeconds",function(v){if(v.BSeconds==true){$(".BSeconds").prop("checked",v.BSeconds);}});
Storage.Get("CSeconds",function(v){if(v.CSeconds==true){$(".CSeconds").prop("checked",v.CSeconds);}});
$('#Catalog').on('click',function(){chrome.tabs.create({url: 'https://www.roblox.com/games/?Keyword=CatalogNotification'})});
})

/*
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
*/