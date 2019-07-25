// JavaScript Document
jQuery(function (){
	
	jQuery('#register').find('a').click(function (){
			jQuery('#login').show();
			jQuery('#register').hide();
		})
	jQuery('#login').find('a').click(function (){
			jQuery('#login').hide();
			jQuery('#register').show();
		})
	
	//注册
	jQuery('#register').find('.btn').click(function (){
			
			jQuery.ajax({
					type:'post',
					url:'/api/user/register',
					data:{
							username:jQuery('#register').find('[name="username"]').val(),
							password:jQuery('#register').find('[name="password"]').val(),
							repassword:jQuery('#register').find('[name="repassword"]').val()
						},
					dataType:'json',
					success:function (result){
						jQuery('#register').find('.txtMessage').html(result.message);
						if(!result.code)
						{
							setTimeout(function (){
									jQuery('#login').show();
									jQuery('#register').hide();	
								},1000)
							
						}
					}
				})
				
				
				
			
		})
	
	
	//登录
	
	jQuery('#login').find('.btn').click(function (){
			jQuery.ajax({
				type:'post',
				url:'/api/user/login',
				data:{
						username:jQuery('#login').find('[name="username"]').val(),
						password:jQuery('#login').find('[name="password"]').val()
					},
				dataType:"json",
				success:function (result){
					jQuery('#login').find('.txtMessage').html(result.message);
					if(!result.code)
					{
						window.location.reload()
						/*setTimeout(function (){
								jQuery('#userInfo').show();
								jQuery('#login').hide();	
							},1000)*/
					}
				}
			})
		})
		
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
		
})