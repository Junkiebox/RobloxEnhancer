//OBC theme
(function(){
	chrome.storage.sync.get('BotFilter',function(c){
		(c.BotFilter ==true)?$('head').append('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL("css/BotFilter.css") + '" >') : null;
	})
	chrome.storage.sync.get('obc',function(c){
		(c.obc ==true)?$('head').append('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL("css/obc.css") + '" >') : null;
	})


	
chrome.storage.sync.get('background',function(v){
	if(v.background==true){
	chrome.storage.sync.get('color',function(col){
	$(function(){
	    $('body').css('background',col.color)
		$('.container-fluid').css('background',col.color)
			})
		})
	}
})
}(window))



