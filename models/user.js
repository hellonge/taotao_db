// JavaScript Document
var mongoose=require('mongoose');
var usersSchema=require('../schemas/users');
module.exports=mongoose.model('user',usersSchema);  //创建一个模型起个名叫User 使用usersSchema模型类