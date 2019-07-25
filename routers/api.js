
var express=require('express');

var router=express.Router();

var User=require('../models/user');

var responseData
router.use(function (req,res,next){
		responseData={
			message:'',
			code:0
		}
		next();
	})
//用户注册
router.post('/user/register',function (req,res){
	
	
		var username=req.body.username;
		var password=req.body.password;
		var repassword=req.body.repassword;
		
		if(username=='')
		{
			responseData.message='用户名不能为空';
			responseData.code=1;
			res.json(responseData);
			return;	
		}
		if(password=='')
		{
			responseData.message='密码不能为空';
			responseData.code=2;
			res.json(responseData);
			return;	
		}
		if(password!=repassword)
		{
			responseData.message='两次输入的密码不一致';
			responseData.code=3;
			res.json(responseData);
			return;	
		}
		
		User.findOne({
			username:username
		}).then(function (userInfo){
			if(userInfo)
			{
				responseData.message='用户名已经存在';
				responseData.code=4;
				res.json(responseData);
				return;		
			}
			
			var user=new User({
					username:username,
					password:password
				});
			return user.save();
			
		}).then(function(newUserInfo){
			responseData.message='注册成功';
			res.json(responseData);
			
		})
		
	})
//用户登录

router.post('/user/login',function (req,res){
		var username=req.body.username;
		var password=req.body.password;
		if(username==''||password=='')
		{
			responseData.message='用户名或密码不能为空';
			responseData.code=1;
			res.json(responseData);
			return;		
		}
		User.findOne({
				username:username,
				password:password
		}).then(function (userInfo){
			if(!userInfo)
			{
				responseData.message='用户名或密码错误';
				responseData.code=2;
				res.json(responseData);
				return;	
			}
			responseData.message='登录成功';
			responseData.userInfo={
					id:userInfo._id,
					username:userInfo.username
				}
			req.cookies.set('userInfo',JSON.stringify({
					_id:userInfo._id,
					username:userInfo.username
				}));
			
			res.json(responseData);
			
			return;	
		})
})
//退出
router.get('/user/logout',function (req,res){
		req.cookies.set('userInfo',null);
		responseData.message='退出成功';
		res.json(responseData);
	})
module.exports=router;



