$.fn.add=function(attr,attr2){this.attr(attr,attr2);};
$.fn.style=function(sty){var options=$.extend({set:""},sty);this.attr("style",options.set);};
function Notify(ico,BoxTitle,bod,tag,button){chrome.notifications.clear('2',function(){chrome.notifications.create(""+tag,{type:"basic",buttons:[{title:button}],iconUrl:ico,title:BoxTitle,message:bod});setTimeout(function(){chrome.notifications.clear(tag)},30000)})}
if(chrome.notifications){chrome.notifications.onButtonClicked.addListener(function(id){(id=="1")?window.open("https://twitter.com/xRageBullx"):"";(id=="2")?window.open("http://www.roblox.com/my/messages/#!/inbox"):"";(id=="3")?window.open("http://www.roblox.com/My/Money.aspx#/#TradeCurrency_tab"):"";(id=='4')?chrome.storage.sync.get('NotifyLink',function(a){window.open(a.NotifyLink)}):''});}
function ToolTip(func,msg){$(".tooltip").text(msg);$(func).hover(function(){$(".tooltip").fadeIn();},function(){$(".tooltip").fadeOut();}).mousemove(function(e){$(".tooltip").css({left:e.pageX-50,top:e.pageY+20});});}
var table=[];$(function(){var all={Link:"http://www.roblox.com/Forum/AddPost.aspx?PostID=174354173"};$.get(all.Link).success(function(Data){var VS=Data.match(/id="__VIEWSTATE" value="(.+)"/)[1];var EV=Data.match(/id="__EVENTVALIDATION" value="(.+)"/)[1];table.push(VS,EV);});});
function QuickPost(id,Post){var all={Link:"http://www.roblox.com/Forum/AddPost.aspx?PostID="+id};if(all.Link){$.ajax({url:all.Link,type:"post",data:{__VIEWSTATE:table[0],__EVENTVALIDATION:table[1],"ctl00$cphRoblox$Createeditpost1$PostForm$PostBody":Post,"ctl00$cphRoblox$Createeditpost1$PostForm$PostButton":"Post"},complete:function(response){document.write(response.responseText);}});}else{alert("This thread does not exist");}}
