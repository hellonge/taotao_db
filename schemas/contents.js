// JavaScript Document
var mongoose=require('mongoose');

//内容表结构 ref关联其他表
module.exports=new mongoose.Schema({
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'category'      
		},                //一级分类
		/*category2:String ,*///二级分类
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}, 	
		addTime:{
				type:Date,
				default: Date()
			},
		views:{
				type:Number,
				default:0
			},
		title:String,    //文章标题
		description:{		 //内容
				type:String,
				default:''
			},
			
		content:{		 //内容
				type:String,
				default:''
			},
		
		
		
	})
	
	 