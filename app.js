 
// JavaScript Document
/*var express=require('express');
var swig=require('swig');
var mongoose=require('mongoose'); //加载数据库模块
var app=express();

var bodyParser=require('body-parser'); //获取post提交数据

app.engine('html',swig.renderFile);  //定义模板
app.set('views','./views');			 //设置存放路径第一个参数必须是views
app.set('view engine','html');		//注册使用模板
swig.setDefaults({cache:false});     //禁止缓存

app.use(bodyParser.urlencoded({extended:true}));  //获取post提交数据*/

var express=require('express');
var swig=require('swig');
var mongoose=require('mongoose'); //加载数据库模块
var app=express();
var User=require('./models/user');   //引入数据库模
var cors=require('cors');

var bodyParser=require('body-parser'); //获取post提交数据
var Cookies=require('cookies'); //加载cookies模块

app.engine('html',swig.renderFile);  //定义模板
app.set('views','./views');			 //设置存放路径
app.set('view engine','html');		//注册使用模板

swig.setDefaults({cache:false});     //禁止缓存

app.use(cors({
	origin:['http://localhost:8080'],
	methods:['GET','POST'],
	alloweHeaders:['Conten-Type','Authorization']
}))

app.use(bodyParser.urlencoded({extended:true}));  //获取post提交数据

app.use(function (req,res,next){
		
		req.cookies=new Cookies(req,res);
		
		req.userInfo={};
		if(req.cookies.get('userInfo'))
		{
			try{
				
				req.userInfo=JSON.parse(req.cookies.get('userInfo'));
				
				User.findById(req.userInfo._id).then(function (userInfo){
						req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
						next();
					})
				
				
			}catch(e){
				next()	
			}
		}
		else
		{
			next()
		}
		
	})


//app.use( '/public', express.static(__dirname  + '/public') );
//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use( '/public', express.static( __dirname + '/public') );

app.use('/', require('./routers/main'));
                                                           
app.use('/api', require('./routers/api'));

app.use('/admin', require('./routers/admin'));

//链接数据库
mongoose.connect('mongodb://localhost:27019/taotao',function (err){
		if(err)
		{
			console.log('数据库连接失败');	
		}
		else
		{
			console.log('数据库连接成功');	
			app.listen(9091);
			
		}
	})


