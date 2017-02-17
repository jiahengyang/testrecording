function savemodifydata(test_info){
	var ret;
	//console.log("test_info:"+test_info);
	var info=JSON.parse(test_info);
	//console.log("info.tester:"+info.tester);
	var modifyData={
				report_id:info.report_id,
				job_progress:info.job_progress,
				tester_status:info.tester_status,
				update_time:info.update_time,
				remark:info.remark
			};
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
	connection.query("insert into modifyDB SET ?",modifyData,function(err,rows,fields){
				if(err) {
					console.error("数据插入错误："+err);
					return ;
			
				}else{
				//console.log("ok");
				//console.log("rows:"+JSON.stringify(rows));
			
				};
	
			});
	connection.end();
	ret=0;
	return ret;
}
module.exports=savemodifydata;