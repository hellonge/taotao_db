// JavaScript Document
jQuery('#logout').click(function (){
		jQuery.ajax({
				type:'get',
				url:'/api/user/logout',
				success: function(result){
						if(!result.code)
						{
							window.location.reload();
						}
					}
			})
	})
	
