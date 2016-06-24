//default settings
Storage.Set({'youtube':true})
Storage.Set({'decal':true})
Storage.Set({'profile':true})
Storage.Set({'games':true})
Storage.Set({'forum':true})
Storage.Set({'protection':true})
Storage.Set({'AutoComplete':true})
Storage.Set({'Status':true})
Storage.Set({'TrackThread':true})
chrome.storage.local.set({'WelcomeMessage':'off'})


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

$(function() {
    chrome.storage.local.get('WelcomeMessage',function(a){
		if(a.WelcomeMessage == 'off'){
			$.get('https://github.com/Junkiebox/RobloxEnhancer/wiki/Updates-And-Features').success(function(update){
			$.get('http://www.roblox.com/mobileapi/userinfo').success(function(r) {
				chrome.storage.local.set({'WelcomeMessage':'on'})
				if (r.UserName) {
					Notify('images/icon.png', 'Roblox Enhancer', 'Welcome ' + r.UserName + '\n Version: ' + getVersion(), '1', 'Read the latest updates/features | Last Updated: '+$('.gh-header-meta > relative-time',update).text())
				} else {
					Notify('images/icon.png', 'Roblox Enhancer', 'Login Required' + '\n Version: ' + getVersion(), '1', 'Read the latest updates/features | Last Updated: '+$('.gh-header-meta > relative-time',update).text())
					}
				})
			})
		}
    })
})

//Catalog notifications
var Showed = [];
function Exists(item,icon,header,content,url){
	 var exists = ($.inArray(item, Showed) != -1);
	if(!exists){
		Showed.push(item)
		Notify(icon,header,content, '4' , 'Click to view item!',{'go':Storage.Set({'link':url})})
		(chrome.notifications)?chrome.notifications.onButtonClicked.addListener():''
		
	}
}
		
function GetNew(){
	 $.get("http://assetgame.roblox.com/asset/?id=311113132").success(function(r) {
		 var a = r.replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&#039;/g,"'").replace(/&amp;/g,"&")
		 var b = $('[name="Value"]',a).html()
		 var c = JSON.parse(b.substring(b.indexOf("["), b.lastIndexOf("]") + 1));
		 for(var n in c){
				Exists(c[n].id,c[n].icon,c[n].header,c[n].content,c[n].url.replace(/\&amp;rbxp\=\d*/g, '') )
			}
	 })
}


setInterval(function(){
	chrome.storage.sync.get('ItemNotifier',function(a){
		if(a.ItemNotifier){
				GetNew();
				}
			});
},10000);


function CollectBadges(item,icon,header,content,url){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {action: [icon,header,content,url] }, function(response) {});  
		});
}

function GetBadges(){
	 $.get("http://assetgame.roblox.com/asset/?id=311113132").success(function(r) {
		 var a = r.replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&#039;/g,"'").replace(/&amp;/g,"&")
		 var b = $('[name="Value"]',a).html()
		 var c = JSON.parse(b.substring(b.indexOf("["), b.lastIndexOf("]") + 1));
		 for(var n in c){
				CollectBadges(c[n].id,c[n].icon,c[n].header,c[n].content,c[n].url.replace(/\&amp;rbxp\=\d*/g, '') )
			}
	 })
}

chrome.extension.onRequest.addListener(function(message,sender){
  if(message.action === "GetBadges"){
    GetBadges();
  }
});

/*
$.get("http://roblox.com/mobileapi/userinfo", function(r) {
    if (!localStorage.getItem('Tixs')) {
        localStorage.setItem('Tixs', r.TicketsBalance);
    } else {
        $.get("http://roblox.com/mobileapi/userinfo", function(r) {
            var newTix = r.TicketsBalance;
            var get = localStorage.getItem('Tixs');
            if (newTix > get || newTix < get) {
                Notify('images/icon.png', 'Tickets Changed', 'New balance: ' + r.TicketsBalance, '3', 'Would you like to trade?')
                localStorage.clear();
            }
        })
    }
})
*/


//Polling requests
$.ajaxSetup({
    timeout: 5000
});
$(function poll(){$.get('https://github.com/Junkiebox/RobloxEnhancer/wiki/Updates-And-Features').success(function(r){chrome.storage.sync.set({'Wiki':$('.gh-header-meta > relative-time',r).text()});chrome.storage.sync.get('Wiki',function(recent){if(recent.Wiki!=$('.gh-header-meta > relative-time',r).text()){Notify('images/github.png','Wiki Updates!','Wiki was updated on: '+$('.gh-header-meta > relative-time',r).text(),'5','Click here for more info!')}})})
setTimeout(function(){poll();},60000)})
$(function poll(){$.get("https://www.roblox.com/messages/api/get-my-unread-messages-count").success(function(num){if(num.count>0){chrome.tabs.query({active:true,currentWindow:true},function(tabs){chrome.tabs.sendMessage(tabs[0].id,{unreadMessageCount:num.count},function(response){});});}else{chrome.tabs.query({active:true,currentWindow:true},function(tabs){chrome.tabs.sendMessage(tabs[0].id,{unreadMessageCount:'NoMsgs'},function(response){});});}});setTimeout(function(){poll();},30000)})
var done=false;$(function poll(){$.ajax({url:"https://www.roblox.com/messages/api/get-my-unread-messages-count",type:'GET',context:document.body,success:function(num){if(!done){if(num.count>30){}else{(num.count>0)?Notify('images/HvmE2Fa.png','Message Notifier','You have '+num.count+' new message(s)!','2','Click to view messages!'):null;}
done=true;}
(num.count==0)?done=false:'';},error:function(){console.error("Cannot reach server")}})
setTimeout(function(){poll()},60000)})
$(function poll(){$.get('https://www.roblox.com/messages/api/get-my-unread-messages-count').success(function(num){if(num.count>50){chrome.browserAction.setBadgeText({text:'50+'})}else
if(num.count>0){chrome.browserAction.setBadgeText({text:''+num.count})}else{chrome.browserAction.setBadgeText({text:''})}})
setTimeout(function(){poll();},60000)})


//Imgur link
function searchimgur(info){ var searchstring = info.selectionText; chrome.tabs.create({url: "http://imgur.com/" + searchstring})}
chrome.contextMenus.create({title: "Search Imgur", contexts:["selection"], onclick: searchimgur});

//Auto update
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
