/*
$(function(){
	$.get("http://www.roblox.com/mobileapi/userinfo").success(function(r){
	if(!localStorage.getItem('Tixs')){
	localStorage.setItem('Tixs',r.TicketsBalance);
	}else{
		$.get("http://www.roblox.com/mobileapi/userinfo").success(function(r){
			var newTix = r.TicketsBalance;
			var get = localStorage.getItem('Tixs');
			if(newTix>get || newTix<get){
				Notify(''+r.ThumbnailUrl,'Your Tickets have been updated: ' + r.TicketsBalance,'2')
				localStorage.clear();
						}
					})
				}
		})
	})
	*/