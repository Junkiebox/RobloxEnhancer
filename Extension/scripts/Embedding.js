//Functions
var GetFunc = {
    getId: function(url) {
        var splited = url.split("/");
        return splited[splited.length - 1]
    },

    Profile: function(image, decal) {
        $.ajax({
            type: "get",
            cache: 'false',
			async:'false',
            url: decal + '/profile',
            error: function() {
                image.html('');
                image.append('<img src="http://t6.rbxcdn.com/70608418c648be7ac4e323e3294bb059" title="This user does not exist!" style="width:100px;height:100px;">')
            },
            success: function(data) {
                var link = $('.thumbnail-span>img', data).prop('src'),
                    blurb = $($('.profile-about-content', data).get(0)).text().replace(/Read {{layoutContent.linkName}}/g, '').replace(/^\s+/g, '').replace(/\s+$/g, '')
                if (link) {
                    image.html('');
                    image.append('<img class="embeddeduser" src="' + link + '" style="width:100px;height:100px;" title="' + blurb + '" ">')
                }
                if ($('.profile-avatar-status', data)) {
                    $('.embeddeduser').addClass('useractive')
                } else {
                    $('.embeddeduser').removeClass('useractive')
                }
            }
        })
    },
    OldProfile: function(image, decal) {
        $.get(decal, function(data) {
            //var username = $('#ctl00_cphRoblox_rbxUserPane_lUserRobloxURL',data).text().replace(/\'s profile/i,'');
            var link = $('.thumbnail-span>img', data).prop('src'),
                blurb = $($('.profile-about-content', data).get(0)).text().replace(/Read {{layoutContent.linkName}}/g, '').replace(/^\s+/g, '').replace(/\s+$/g, '')
            if (link) {
                image.html('');
                image.append('<img src="' + link + '" style="width:100px;height:100px;" title="' + blurb + '" ">')
            }
        }).fail(function() {
            image.html('');
            image.append('<img src="http://t6.rbxcdn.com/70608418c648be7ac4e323e3294bb059" title="This user does not exist!" style="width:100px;height:100px;">')
        });
    },
    Game: function(image, decal) {
        $.ajax({
            type: "get",
            cache: 'false',
			async:'false',
            url: '/games/' + decal + '/--',
            success: function(data) {
                var link = $('.carousel-thumb', data).prop('src'),
                    title = $('.game-name', data).attr('title')
                if (link) {
                    image.text('\n' + title);
                    image.css({
                        'float': 'right',
                        'align': 'center'
                    });
                    GetFunc.Load(image, link, title)
                }
            }
        })
    },
    Load: function(image, link2, name) {
        image.append('<img src="' + link2 + '" title="' + name + '" style="width:100px;height:100px;">')
    },
    Decal: function(image, decal) {
        $.ajax({
            url: '/item.aspx?&id=' + decal,
			cache:'false',
			async:'true',
            success: function(data) {
                var link2 = $('.thumbnail-span', data).find('img').prop('src'),
                    name = $($('.notranslate', data).data('se', 'item-name').get(0)).text().replace(/^\s+/g, '').replace(/\s+$/g, '');
                if (!link2) {
                    image.text($($('.notranslate', data).data('se', 'item-name').get(0)).text().replace(/\s+$/, '').replace(/^\s+/, ''))
                }else {
					image.text('');
					GetFunc.Load(image, link2, name)
                }
            }
        });
    },
    Forum: function(image, decal) {
        $.ajax({
            url: decal.replace(/https|http|httpss/g,'https'),
            type: 'get',
			cache:'false',
			async:'false',
            success: function(data) {
                var title = $('#ctl00_cphRoblox_PostView1_ctl00_PostTitle', data).text()
                if (title) {
                    image.html(title)
                } else {
                    image.html($('#ctl00_cphRoblox_Message1_ctl00_MessageBody', data).text())
                }
            },
            error: function() {
                image.html('[ Content Deleted ]')
            }
        })
    }
}

//Script
$(window).bind("load",function(){
$.ajaxSetup({ cache: false });
$('#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody').focus();$('#ctl00_cphRoblox_Createeditpost1_PostForm_NewPostSubject').focus();
//R+ embedding support
Storage.Get("decal",function(v){if(v.decal==true){$(".normalTextSmall").html(function(i, text) {return String(text).replace(/r\+\:\/\/(\d+)/gi,function(x,y){ return "<a href='https://roblox.com/item.aspx?id="+y+"' target='_blank' rel='nofollow'></a>"});});}});
//Youtube Embed
Storage.Get("youtube",function(m){function clicked(a,b){a.on("click",function(d){d.preventDefault();$("."+b).fadeToggle();});a.dblclick(function(c){c.preventDefault();window.open("https://youtu.be/"+b);});}if(m.youtube){$(".normalTextSmall a").each(function(){function frame(e,t,a,o){e.append('<iframe allowfullscreen="1" webkitallowfullscreen="1" src="'+t+a+o+'" class="'+a+' video" frameBorder="0" style="display:none;height:275px;width:550px;"></iframe>');}var link=$(this).text().match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature=related)?(?:[\w\-]{0})?/g);if(link){var urlID=GetFunc.getId(link[0]),n="https://www.youtube.com/embed/",c=urlID.replace(/watch\?v=/g,""),time="?version=3&start="+$(this).text().match(/(\?t=(\w+))/g);clicked($(this),c);frame($(this),n,c,time.replace(/\?t=/g,""));}});}});
//Archive link
Storage.Get("archive",function(v){if(v.archive==true){$("#forum-nav").append('<a id="EnhancerV2Archive"class="menuTextLink"> Archive this page?</a>');var location=window.location.href;$("#EnhancerV2Archive").on("click",function(e){e.preventDefault();if(confirm("Archive this page?")){window.open("https://archive.is/?run=1&url="+encodeURIComponent(location));}});}});
//Forum link shortener
Storage.Get("forum",function(v){if(v.forum==true){$(".normalTextSmall a").each(function(){var forumlink=$(this).text().match(/.+ShowPost\.aspx\?Postid=(\d+)/gi);if(forumlink!=undefined){GetFunc.Forum($(this),$(this).prop('href'));}});}});
//Decal
Storage.Get("decal",function(v){if(v.decal==true){$(".normalTextSmall a").each(function(){var decal=$(this).prop('href').match(/(item\.aspx|item)\?id=(\d+)|(item\.aspx.+\&id=)(\d+)/gi);if(decal!=undefined){var decal2=$(decal).get(0),decal3=decal2.substr(decal2.lastIndexOf("=")+1);GetFunc.Decal($(this),decal3);}});}});
//Profile
Storage.Get("profile",function(v){if(v.profile==true){$(".normalTextSmall  a").each(function(){var user=$(this).text().match(/.+user.aspx\?id=(\d+)/gi);if(user!=undefined){GetFunc.OldProfile($(this),user);}else{}var user2=$(this).text().match(/.+users\/(\d+)/gi);if(user2!=undefined){GetFunc.Profile($(this),user2);}else{}});}});
//Games
Storage.Get("games",function(v){if(v.games==true){$(".normalTextSmall a").each(function(){var game=$(this).text().match(/.+\/games\/(\d+)/gi);if(game!=undefined){var decal2=$(game).get(0),decal3=GetFunc.getId(decal2);GetFunc.Game($(this),decal3);}});}});
//Safe Link Protection
Storage.Get("protection",function(v){if(v.protection==true){$(".normalTextSmall a").each(function(){var safelinks=$(this).prop('href').match(/(rblxofftopic\.wikia|youtu.be|tumblr\.com|prntscr|google\.com|rbxcdn|twitch\.tv|roblox\.com|imgur|strawpoll|youtube\.com|twitter\.com|gyazo\.com|facebook\.com|pastebin\.com|bloxcity\.com)/gi);if(safelinks){}else{$(this).on("click",function(e){e.preventDefault();if(confirm("Are you sure you want to visit this link?")){window.open($(this).prop('href'));}else{}});}});}});
//Link preview
Storage.Get("advert",function(v){if(v.advert==true){$(function(){var ifr=document.createElement("iframe");ifr.height=275;ifr.width=550;ifr.id="tail";ifr.style.display="none";ifr.setAttribute("sandbox","allow-scripts allow-same-origin");$("body").append(ifr);$(".normalTextSmall a").bind("mouseover",function(e){if($(".normalTextSmall a").attr("href").match(/rbxcdn/)){$("#tail").attr("src",""+$(this).attr("href"));$("#tail").css({width:"auto",height:"auto","z-index":"50",position:"absolute",border:"0",left:e.pageX-50,top:e.pageY+20});$("#tail").fadeIn("slow");}}).mouseout(function(){$(document).on("click",function(){$("#tail").fadeOut();});});});}});
//Friends
function RHUnfollow(){$("#RHUnfollow").on("click",function(){if(confirm("Are you sure you want to unfollow all users?")){chrome.extension.sendRequest({action:'UnfollowAll'})}})}
$(function(){if(window.location.href.match(/\/friends/g)){$("#horizontal-tabs").on("click",function(){RHUnfollow();var active=$("#following").prop("class").match("active");if(active){$(".friends-content").prepend('<button id="RHUnfollow" class="btn-fixed-width btn-control-xs ignore-button">Unfollow All</button>');$("#RHUnfollow").show();RHUnfollow()}else{$("#RHUnfollow").hide();}});}if(window.location.href.match("/friends#!/following")){$(".friends-content").prepend('<button id="RHUnfollow" class="btn-fixed-width btn-control-xs ignore-button">Unfollow All</button>');RHUnfollow()}});
//End
})
