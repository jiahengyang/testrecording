function edittestsave(test_info){
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
		console.log("连接id "+connection.threadId);
	});
	var testData={
		operator:info.tester,
		tester:info.tester,
		producter:info.producter,
		developer:info.developer,
		report_name:info.report_name,
		type:info.test_type,
		cgi_content:info.is_cgi,
		plan_end_time:info.plan_end_time,
		job_progress:info.job_progress,
		tester_status:info.tester_status,
		remark:info.test_other,
		add_for_id:info.add_for_id
	};
	var report_id=info.report_id
	connection.query("update testerData SET ? where report_id=?",[testData,report_id],function(err,rows,fields){
		if(err) {
			console.error("数据更新错误："+err);
			return ;
			
		}else{
			console.log("数据更新成功");
			return rows;
			
			
			
		};
	
	});
	connection.end();
	ret=0;
	return ret;
}
module.exports=edittestsave;
