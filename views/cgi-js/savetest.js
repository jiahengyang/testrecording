function savedata(test_info,callback){
	var ret;
	//console.log("test_info:"+test_info);
	var info=JSON.parse(test_info);
	//console.log("info.tester:"+info.tester);
	var mysql=require('mysql');
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
	var testData={
		operator:info.tester,
		tester:info.tester,
		producter:info.producter,
		developer:info.developer,
		report_name:info.report_name,
		type:info.test_type,
		start_time:info.start_time,
		cgi_content:info.is_cgi,
		plan_end_time:info.plan_end_time,
		job_progress:info.job_progress,
		tester_status:info.tester_status,
		remark:info.test_other,
		add_for_id:info.add_for_id
	};

	connection.query("insert into testerData SET ?",testData,function(err,rows,fields){
		if(err) {
			console.error("数据插入错误："+err);
			return ;
			
		}else{
			//console.log("ok");
			//console.log("rows:"+JSON.stringify(rows));
			var report_id=rows.insertId;
			var modifyData={
				"report_id":report_id,
				"job_progress":info.job_progress,
				"tester_status":info.tester_status,
				"update_time":info.start_time,
				"remark":info.test_other,
			};
			
			var querystring=JSON.stringify(modifyData);

			
			
			
		};
		callback(err,querystring);
	
	});
	connection.end();
	ret=0;
	return ret;
}
module.exports=savedata;
