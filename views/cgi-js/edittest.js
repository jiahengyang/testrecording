function edittest(reportid,callback){
	var ret;
	//console.log("test_info:"+test_info);
	var selectdata=JSON.parse(reportid);
	var report_id=parseInt(selectdata.reportid);
	//console.log("report_id:"+report_id);
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
	
	connection.query("select * from testerData where report_id=?",report_id,function(err,rows,fields){
		if(err) {
			console.error("根据report_id获取数据失败："+err);
					return ;
			
				}else{
				//console.log("根据report_id获取数据成功");
				//console.log("rows:"+JSON.stringify(rows));
			
				var querystring=JSON.stringify(rows[0]);
				};
				callback(err,querystring);
	
				});
	connection.end();
	ret=0;
	return ret;
}
module.exports=edittest;
