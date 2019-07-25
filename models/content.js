// JavaScript Document
var mongoose=require('mongoose');  //加载mongoose模块

var contentsSchema=require('../schemas/contents');  //模型类加载进来

module.exports=mongoose.model('content',contentsSchema);  //创建一个模型起个名叫Content 使用usersSchema模型类

