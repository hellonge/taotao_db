// JavaScript Document
var express=require('express');



var Category=require('../models/category');
var Content=require('../models/content');
var router=express.Router();
var data={};
router.use(function (req,res,next){
	data={
			userInfo:req.userInfo,
			categorys:[]
	}
	Category.find().then(function (categorys){ 
			data.categorys=categorys;
			next();
	})
	
	
})

// router.get('/',function (req,res,next){
		
		
// 		data.category=req.query.category||'';
		
// 		data.contents='';
				
		
		
// 		var where={};
// 		if(data.category)
// 		{
// 			where.category=data.category;	
// 		}
		
// 		Content.find().where(where).populate(['category']).then(function (contents){
// 			data.contents=contents;
// 			res.render('main/index',data);
// 		})
	
		
// 	})
	
router.get('/view',function (req,res){
		var contentId=req.query.contentid||'';
		Content.findOne({
				_id:contentId
		}).then(function (content){
				data.content=content;
			
				content.views++;
				content.save();
				res.render('main/view',data);	
		})
	})
	
var data={};

router.use(function (req,res,next){

		data={
				userInfo:req.userInfo
			}
			next()
	})


// router.get('/home/menuList',function (req,res){
// 	Category.find().then(function (categorys){ 
// 			data.categorys=categorys;
// 			res.send( data)
// 	})
// })

// router.get('/home/getContent',function (req,res){
		
// 		var where={
// 			 	category: { $in: [ '5938b4ea9f08a96b8d5bd8a7','5948c261811c5c655558feda' ] } 
// 		};

// 		Content.find().where(where).populate(['category','user']).sort({addTime:-1}).then(function (contents){
				
// 			data.contents=contents
// 			res.send( data)

// 		})
// })

// router.get('/getContent',function (req,res){
// 	var contentId=req.query.category||'';

// 	Content.where({category:contentId}).populate(['category','user']).sort({addTime:-1}).then(function (contents){
// 		data.contents=contents
// 		res.send(data)
// 	})
// })

// router.get('/view',function (req,res){
		
// 	var contentId=req.query.contentid||'';
	
// 			Content.findOne({
// 				_id:contentId
// 			}).then(function (contents){
// 				data.content=contents;
// 				contents.views++;
// 				contents.save();
				
			
				
// 				res.send(data)
// 			})
	
// })
router.get('/',function (req,res){
		
	data.categoryId=req.query.category;
	
	var where={
		 category: { $in: [ '5938b4ea9f08a96b8d5bd8a7','5948c261811c5c655558feda' ] } 
		};
	if(data.categoryId)
	{
		where.category=data.categoryId;	
	}
	Content.find().where(where).populate(['category','user']).sort({addTime:-1}).then(function (contents){
			
			data.contents=contents;
			
			if(data.categoryId)
			{
				Category.findOne({
					_id:data.categoryId
				}).then(function (categorys){ 
					res.render('main/'+categorys.name , data);	
				})
			}
			else
			{
				res.render('main/index' , data);
			}
			
	})
})


	




router.get('/view/name',function (req,res){
		var nameId=req.query.name||'';
		var ri=req.query.ri||'';
		var chong=req.query.chong||'';
		var sha=req.query.sha||'';
		var xiangchong1=req.query.xiangchong1||'';
		var xiangchong2=req.query.xiangchong2||'';
		data.ri=ri;
		data.sha=sha;
		data.chong=chong;
		data.xiangchong1=xiangchong1;
		data.xiangchong2=xiangchong2;
		
		//res.render('main/index' , data);
		res.render('main/'+nameId , data);
	})
	
router.get('/login',function (req,res){
		res.render('main/login',{
			userInfo:req.userInfo
		});
	})
module.exports=router;