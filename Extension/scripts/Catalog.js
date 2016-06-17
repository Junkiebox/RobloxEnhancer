function CreateBadge(icon,header,content,url){
var Badge = '<li class="list-item game-card">'+
'<div class="game-card-container">'+
'<a href='+url+' class="game-card-link">'+
'<div class="game-card-thumb-container">'+
'<img class="game-card-thumb" src='+icon+' alt="Catalog Notifier" image-retry="">'+
'</div>'+
'<div class="text-overflow game-card-name" title="Catalog Notifier" ng-non-bindable="">'+header+'</div>'+
'<div class="game-card-name-secondary">'+content+'</div>'+
'</a>'+
'<span class="game-card-footer">'+
'<span class="text-label xsmall">By </span>'+
'<a class="text-link xsmall text-overflow" href="https://chrome.google.com/webstore/detail/roblox-enhancer/gmnpgjlgjedlhfnphihaimmimdmmgiim">Roblox Enhancer</a>'+
'</span>'+
'</div>'+
'</li>'

var NewBadge = '<li class="list-item game-card">'+
'<div class="game-card-container">'+
'<a href='+url+' class="game-card-link">'+
'<div class="game-card-thumb-container">'+
'<img class="game-card-thumb" src='+icon+' alt="Catalog Notifier" image-retry="">'+
'<img src="https://images.rbxcdn.com/8a25ded7fa07d098dac7f234e7b34cfd.png" id="ctl00_cphRoblox_ItemNewOverlay" class="thumbnail-overlay" alt="New" style="width:70px;height:70px;position: absolute; top: 0px; right: 0px;">'+
'</div>'+
'<div class="text-overflow game-card-name" title="Catalog Notifier" ng-non-bindable="">'+header+'</div>'+
'<div class="game-card-name-secondary">'+content+'</div>'+
'</a>'+
'<span class="game-card-footer">'+
'<span class="text-label xsmall">By </span>'+
'<a class="text-link xsmall text-overflow" href="https://chrome.google.com/webstore/detail/roblox-enhancer/gmnpgjlgjedlhfnphihaimmimdmmgiim">Roblox Enhancer</a>'+
'</span>'+
'</div>'+
'</li>'
  
  if($('#loading')){$('#loading').remove();}
  if(header.match(/New/)){
	$('#GamesPageLeftColumn > .hlist').append(NewBadge)
	$('.hlist').css({'white-space':'pre-line'})
  }else{
	$('#GamesPageLeftColumn > .hlist').append(Badge)
  }
}

		
$(function(){
	if(window.location.href.match(/https:\/\/www.roblox.com\/games\/\?Keyword=CatalogNotification/)){		
		//chrome.storage.sync.set({'Items':''})
		
		$('#ResponsiveWrapper').css({'display':'none'})
		$('#ResponsiveWrapper').after('<div id="ResponsiveWrapper" class="games-responsive-wrapper ads-in-game-search games-lists-single" data-gamessearchonpage="true" data-adsingamesearchresultsenabled="true"><div id="GamesPageLeftColumn" class="games-page-left " data-searchstate="off"><ul class="hlist games game-cards"><center id="loading"><h1>Loading....</h1></center></ul></div></div>')
		
		chrome.extension.sendRequest({action: 'GetBadges'})
		
		chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
			CreateBadge(msg.action[0],msg.action[1],msg.action[2],msg.action[3])
		});
	}
})
