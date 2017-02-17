
var express = require('express');
var app = express();
var  session = require('express-session');
var cookieParser = require('cookie-parser');
//var testDatas={tests:{report_id:1,tester:"jiaheng", operator:"jiaheng",report_name:"测试1", start_time:"2017-2-6",
//plan_time:"2017-2-9",actual_time:"2017-2-8",job_progress:1,type:"web",is_cgi:"ture",cgi_name:[],producter:"none",developer:"none"},num:1
//}

app.set('title',"My Site");
//console.log(app.get('title'));
var fs=require("fs");

var bodyParser = require('body-parser');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({            
  extended: false
}));


//模板引擎
app.use(express.static(__dirname+"/views"));
app.set("views","./views");
app.set('view engine','ejs');
var selectmytest=require("./views/cgi-js/selectmytest");
app.get("/",function(req,res){

	res.render("tmpl/login");

	//res.render("ejs1",{testDatas:testDatas});
});

app.use(cookieParser());
app.use(session({
  secret: 'secret', //为了安全性的考虑设置secret属性
  cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
  resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
  saveUninitialized: false, //
}));
app.post('/login', function(req,res){
  if (req.body.password != "1234"||req.body.rtxname!="jiahengyang") {
  	console.log("登录账号密码错误");
  	res.writeHead(200,{"Content-Type":"text/json"});
  	var resdata={"ret":-1,"err_msg":"login error","operator":req.body.rtxname};
	res.write(JSON.stringify(resdata));
    res.end();
  } else {
    req.session.sign = true;
    req.session.name = req.body.rtxname;
    var resdata={"ret":0,"err_msg":"ok"};
    res.write(JSON.stringify(resdata));
    res.end();
   
  }
});

var url=require("url");
app.get("/ejs",function(req,res){
	res.render("tmpl/ejs1");
})
app.post("/searchtest",function(req,res){
	var select_info=JSON.stringify(req.body);
	//console.log("select_info=:"+select_info);
    var operator=select_info.operator;
    var count=select_info.count;
    var begin=select_info.begin;
    var selectdata={
    	"operator":operator,
    	"count":count,
    	"begin":begin
    }
	//console.log(testDatas);
	var testDatas;
	selectmytest(select_info,function(err,data){
		if(err){
			console.log("err:"+err);
		}else{
			testDatas=JSON.parse(data);
			
			res.send(testDatas);
			
			
		}
	});

	//res.render("ejs1",{testDatas:testDatas});
});

app.get("/newtest",function(req,res){
	res.render("tmpl/addtest");
})
var savedata=require("./views/cgi-js/savetest");
var savemodifydata=require("./views/cgi-js/savemodifydata");
app.post("/addtest",function(req,res){
	 var test_info=JSON.stringify(req.body);
	 savedata(test_info,function(err,data){
	 	if(err){
			console.log("err:"+err);
			res.writeHead(200,{"Content-Type":"text/json"});
	 		resdata={"ret":-1,"err_msg":"system error"};
	 		res.write(JSON.stringify(resdata));
	 		res.end();
		}else{
			testDatas=JSON.parse(data);
			savemodifydata(data);
			res.writeHead(200,{"Content-Type":"text/json"});
	 		resdata={"ret":0,"err_msg":"ok"};
	 		res.write(JSON.stringify(resdata));
	 		res.end();
			
			
		}
	 });
	 
	


});
var deletedata=require("./views/cgi-js/deletetest");
app.post("/deletetest",function(req,res){
	 var test_info=JSON.stringify(req.body);
	 var ret=deletedata(test_info);
	 //console.log("ret:"+ret);
	 if(ret==0){
	 	res.writeHead(200,{"Content-Type":"text/json"});
	 	resdata={"ret":0,"err_msg":"ok"};
	 	res.write(JSON.stringify(resdata));
	 	res.end();
	 }else{
	 	res.writeHead(200,{"Content-Type":"text/json"});
	 	resdata={"ret":-1,"err_msg":"system error"};
	 	res.write(JSON.stringify(resdata));
	 	res.end();
	 }
	


});
var edittest=require("./views/cgi-js/edittest");

app.get("/edittest",function(req,res){
	var report_id=url.parse(req.url,true).query;
	var reportid=JSON.stringify(report_id);
	//console.log("get_report_id:"+reportid)
	edittest(reportid,function(err,data){
		if(err){
			console.log("err:"+err);
		}else{
			//console.log("data:"+data);
			testDatas=JSON.parse(data);
			
			res.render("tmpl/edittest",{testDatas:testDatas});
			
			
		}
	});
});
app.get("/supplementtest",function(req,res){
	var report_id=url.parse(req.url,true).query;
	var reportid=JSON.stringify(report_id);
	var testDatas={
		"add_for_id":report_id.supplementid};
	//console.log("get_report_id:"+reportid)
	res.render("tmpl/edittest",{testDatas:testDatas});
})
var edittestsave=require("./views/cgi-js/edittestsave");
app.post("/edittestsave",function(req,res){
	//console.log("edittestsave");
	var info=req.body;
	 var test_info=JSON.stringify(req.body);
	 var modifyData={
		"report_id":info.report_id,
		"job_progress":info.job_progress,
		"tester_status":info.tester_status,
		"update_time":info.start_time,
		"remark":info.test_other
	};
	var modifyDatastring=JSON.stringify(modifyData);
	savemodifydata(modifyDatastring);
	 var ret=edittestsave(test_info);
	 //console.log("ret:"+ret);
	 if(ret==0){
	 	res.writeHead(200,{"Content-Type":"text/json"});
	 	resdata={"ret":0,"err_msg":"ok"};
	 	res.write(JSON.stringify(resdata));
	 	res.end();
	 }else{
	 	res.writeHead(200,{"Content-Type":"text/json"});
	 	resdata={"ret":-1,"err_msg":"system error"};
	 	res.write(JSON.stringify(resdata));
	 	res.end();
	 }	
});
var readytest=require("./views/cgi-js/readytest");
app.get("/readytest",function(req,res){		
	res.render("tmpl/readyejs");
});
app.post("/selectreadytest",function(req,res){
	var test_info=JSON.stringify(req.body);
	readytest(test_info,function(err,data){
		if(err){
			console.log("err:"+err);
		}else{
			//console.log("data:"+data);
			 var testDatas=JSON.parse(data);
			
			res.send(testDatas);
			
			
		}
	});

});
var selectbytester=require("./views/cgi-js/selectbytester");
app.get("/alltest",function(req,res){		
	res.render("tmpl/alltestejs");
});
app.post("/selectbytester",function(req,res){
	var test_info=JSON.stringify(req.body);
	selectbytester(test_info,function(err,data){
		if(err){
			console.log("err:"+err);
		}else{
			//console.log("data:"+data);
			 var testDatas=JSON.parse(data);
			
			res.send(testDatas);
			
			
		}
	});

});
var detailstest=require("./views/cgi-js/detailstest");
app.get("/detailstest",function(req,res){
	var report_id=url.parse(req.url,true).query;
	var reportid=JSON.stringify(report_id);
	//console.log("get_report_id:"+reportid);
	detailstest(reportid,function(err,data){
		if(err){
			console.log("err:"+err);
		}else{
			//console.log("data:"+data);
			 var testDatas=JSON.parse(data);
			
			res.render("tmpl/details",{testDatas:testDatas});
			
			
		}

	});
	
	
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
