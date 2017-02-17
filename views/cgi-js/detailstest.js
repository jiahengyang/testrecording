function detailstest(test_info,callback){
	var ret;
	//console.log("test_info:"+test_info);
	var info=JSON.parse(test_info);
	var reportid=info.reportid;
	//console.log("info.tester:"+info.tester);
	var mysql=require('mysql');
	var async=require('async');
	var connection=mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"1234",
		database:"testdatadb",
	});
	connection.connect(function(err){
		if(err){
			console.error("连接错误: "+err.stack);
			return ;
			
		}
		//console.log("连接id "+connection.threadId);
	});

	var sqls={
		sql_for_details:"select * from testerData where reportid=?"
	}
	var tasks={
		sql_for_details:function(callback){
		connection.query("select * from testerData where report_id=?",reportid,function(err,rows,fields){
		if(err) {
			console.error("查找数据详情错误："+err);
			return ;
			
		}else{
			//console.log("ok");
			callback(err,rows[0]);	
		};
		})
	},
		sql_for_supplement:function(callback){
		connection.query("select * from testerData where add_for_id=?",reportid,function(err,rows,fields){
		if(err) {
			console.error("查找数据补单错误："+err);
			return ;
			
		}else{
			//console.log("ok");
			callback(err,rows);	
		};
		})
	},
		sql_for_modify:function(callback){
		connection.query("select * from modifyDB where report_id=?",reportid,function(err,rows,fields){
		if(err) {
			console.error("查找数据更新流程错误："+err);
			return ;
			
		}else{
			//console.log("ok");
			callback(err,rows);	
		};
		})
	}
	};
	async.series(tasks,function(err,results){
		if(err) {
			console.error("查找数据错误："+err);
			return ;
			
		}else{
			//console.log("results:"+JSON.stringify(results));
			var querystring=JSON.stringify(results);
			callback(err,querystring);
		}
	})



}
module.exports=detailstest;
