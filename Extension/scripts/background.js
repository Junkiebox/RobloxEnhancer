//default settings
chrome.storage.sync.set({'youtube':true})
chrome.storage.sync.set({'decal':true})
chrome.storage.sync.set({'profile':true})
chrome.storage.sync.set({'games':true})
chrome.storage.sync.set({'forum':true})
chrome.storage.sync.set({'background':true})
chrome.storage.sync.set({'protection':true})

setInterval(function(){
$.get('http://api.roblox.com/incoming-items/counts').success(function(num){
	if(num.unreadMessageCount>50){
		chrome.browserAction.setBadgeText ( { text: '50+'} )
	}else
	if(num.unreadMessageCount>0){
		chrome.browserAction.setBadgeText ( { text: ''+num.unreadMessageCount} )
		}else{
		chrome.browserAction.setBadgeText ( { text: ''} )
		}
	})
},15000)

function getVersion() {
    var version = 'NaN';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
    xhr.send(null);
    var manifest = JSON.parse(xhr.responseText);
    return manifest.version;
  }

function speak(text) {
	var msg = new SpeechSynthesisUtterance(text);
	window.speechSynthesis.speak(msg);
}

$(function(){
		localStorage.setItem('alerted','no')
		if(localStorage.getItem('alerted','no')){
			$.get("http://www.roblox.com/mobileapi/userinfo").success(function(r){
			localStorage.getItem('alerted','yes');window.localStorage.clear();
			Notify('images/icon.png','Roblox Enhancer','Welcome '+r.UserName+'\n Version: '+getVersion(),'1','Report a problem?')
		})
}})

var id = 0
function CheckNew() {
	$.get("http://roblox.com/asset/?id=261522650").success(function(r) {
		r = decodeURIComponent(r);
		r = JSON.parse(r.substring(r.indexOf("{"), r.lastIndexOf("}") + 1));
		var items=r
		for(var i in items) {
			chrome.storage.sync.set({'NotifyLink':items[i]['url']})
			var recentid = items[i]["id"]
			if(recentid > id) {
				id = recentid
				Notify(items[i]['icon'],items[i].header,items[i]['lite'],'4','Click to view item!')
			}
		}
	})
}

setInterval(function(){
	CheckNew()
},30000)

setInterval(function(){
	$.get('http://api.roblox.com/incoming-items/counts').success(function(num){
		if(num.unreadMessageCount>30){}else{
		num.unreadMessageCount>0?Notify('images/HvmE2Fa.png','Message Notifier','You have '+num.unreadMessageCount+' new message/s!','2','Click to view messages!'):null;
		}
	})

$.get("http://roblox.com/mobileapi/userinfo",function(r){
	if(!localStorage.getItem('Tixs')){
		localStorage.setItem('Tixs',r.TicketsBalance);
	}else{
		$.get("http://roblox.com/mobileapi/userinfo",function(r){
			var newTix = r.TicketsBalance;
			var get = localStorage.getItem('Tixs');
			if(newTix>get || newTix<get){
				Notify('images/icon.png','Tickets Notifier','Your Tickets have been updated: ' + r.TicketsBalance,'3','Would you like to trade?')
				localStorage.clear();
						}
					})
				}
		})
},100000)

function searchimgur(info){ var searchstring = info.selectionText; chrome.tabs.create({url: "http://imgur.com/" + searchstring})}
chrome.contextMenus.create({title: "Search Imgur", contexts:["selection"], onclick: searchimgur});

setInterval(function(){
	chrome.runtime.requestUpdateCheck(function(x){
		if(x=="update_available"){
			chrome.runtime.reload();
			speak('Installing, latest, updates')
		}else {
			console.log('No updates available!')
		}
	});
},60000);