// JavaScript Document
var mongoose=require('mongoose');  //加载mongoose模块

var categoriesSchema=require('../schemas/categories');  //模型类加载进来

module.exports=mongoose.model('category',categoriesSchema);  //创建一个模型起个名叫Category 使用usersSchema模型类
	