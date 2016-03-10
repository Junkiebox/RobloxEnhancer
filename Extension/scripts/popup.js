var msg = {
	success: function(){$('.success').fadeIn(500);window.setTimeout(function(){$(".success").fadeOut(500);},3000)},
	success2: function(){$('.success2').fadeIn(500);window.setTimeout(function(){$(".success2").fadeOut(500);},3000)},
	clear: function(){$('.clear').fadeIn(500);window.setTimeout(function(){$(".clear").fadeOut(500);},3000)},
	error: function(){$('.error').fadeIn(500);window.setTimeout(function(){$(".error").fadeOut(500);},3000)},
	error2: function(){$('.error2').fadeIn(500);window.setTimeout(function(){$(".error2").fadeOut(500);},3000)},
	owner: function(){$('.owner').fadeIn(500);window.setTimeout(function(){$(".owner").fadeOut(500);},3000)},
	log: function(v){console.log(v)},
	Storage: chrome.storage,	
}

/*
	function hover(){
		$('.button').mouseover(function(){
		$('.button span').text('Clear');
		$('.button').css({'background':'#E2231A','color':'white'})
		}).mouseleave(function() {
			$(this).find("span").text("Update");
			$(this).css({'background':'white','color':'black'})
			});	
		}
		
	msg.Storage.sync.get("mysiggy", function(obj) {
		if(obj.mysiggy !==''){
		hover();
		$('.button').on('click',function(e){
			 e.preventDefault()
			 $('#sig').val('');
			 msg.Storage.sync.set({'mysiggy':''})
			})
		}
	})
*/

$(function() {
	msg.Storage.sync.get("mysiggy", function(obj) {
		if(obj.mysiggy !=null){
			$('#sig').val("\n\n"+obj.mysiggy);
		}
	})
})

var banned=[];	
function banuser(){
	if($('.Username').val() !=""){
		if($('.Username').val().match(/randcomo26/gi)){
			msg.owner()
		}else{
			banned.push($('.Username').val().toLowerCase());msg.success2() 
			}
		}else{
			msg.error();
		}
	msg.Storage.local.set({'Banned':banned})
}

$(function(){
	msg.Storage.local.get('Banned',function(user){
	for(var a in user){
		$('.Ignored').fadeIn(500)
		$('.Ignored').text('Ignored user: '+user[a])
		}
	})
})
	
function save() {
if ($('#sig').val() != "") {
	msg.Storage.sync.set({"mysiggy": $('#sig').val()}, function() {
		msg.success()
		var save = function(){};
				});
} else {
	msg.Storage.sync.set({"mysiggy": ""}, function() {
		msg.error2();
		var save = function(){};
	});
}
}

$('#clear').on('click',function() {
	msg.Storage.local.remove('Banned')
	msg.clear();
})
$('#Ban').on('click',function() {
	banuser();
})
$('#update').on('click',function() {
	save();
});	
	