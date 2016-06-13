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

setInterval(function() {
    $.get('https://api.roblox.com/incoming-items/counts').success(function(num) {
        if (num.unreadMessageCount > 50) {
            chrome.browserAction.setBadgeText({
                text: '50+'
            })
        } else
        if (num.unreadMessageCount > 0) {
            chrome.browserAction.setBadgeText({
                text: '' + num.unreadMessageCount
            })
        } else {
            chrome.browserAction.setBadgeText({
                text: ''
            })
        }
    })
}, 15000)

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


var recent="";
setInterval(function(){
	$.get('https://github.com/Junkiebox/RobloxEnhancer/wiki/Updates-And-Features').success(function(r){
		if(recent!=$('.gh-header-meta > relative-time',r).text()){
			recent=$('.gh-header-meta > relative-time',r).text()
			Notify('images/github.png','New updates!','Wiki was updated on '+$('.gh-header-meta > relative-time',r).text(), '5' ,'Click here for more info!')
		}
	})
},60000)

$(function() {
    localStorage.setItem('alerted', 'no')
    if (localStorage.getItem('alerted', 'no')) {
		$.get('https://github.com/Junkiebox/RobloxEnhancer/wiki/Updates-And-Features').success(function(update){
        $.get('http://www.roblox.com/mobileapi/userinfo').success(function(r) {
            localStorage.getItem('alerted', 'yes');
            window.localStorage.clear();
            if (r.UserName) {
                Notify('images/icon.png', 'Roblox Enhancer', 'Welcome ' + r.UserName + '\n Version: ' + getVersion(), '1', 'Read the latest updates/features | Last Updated: '+$('.gh-header-meta > relative-time',update).text())
            } else {
                Notify('images/icon.png', 'Roblox Enhancer', 'Login Required' + '\n Version: ' + getVersion(), '1', 'Read the latest updates/features | Last Updated: '+$('.gh-header-meta > relative-time',update).text())
				}
			})
		})
    }
})

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
GetNew();
setInterval(function(){
	GetNew();
},5000)







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

var done = false;
$(function poll() {
    $.ajax({
        url: "https://api.roblox.com/incoming-items/counts",
        type: 'GET',
        context: document.body,
        success: function(num) {
            if (!done) {
                if (num.unreadMessageCount > 30) {} else {
                    num.unreadMessageCount > 0 ? Notify('images/HvmE2Fa.png', 'Message Notifier', 'You have ' + num.unreadMessageCount + ' new message(s)!', '2', 'Click to view messages!') : null;
                }
                done = true;
            }
            if (num.unreadMessageCount == 0) {
                done = false;
            };
            setTimeout(function() {
                poll()
            }, 30000)
        },
        error: function() {
            console.error("Cannot reach server")
        }
    })
})





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
