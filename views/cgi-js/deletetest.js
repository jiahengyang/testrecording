function deletetest(info,callback){
	var deletedata=JSON.parse(info);
	var reportid=deletedata.reportid;
	//console.log("reportid:"+reportid);
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
	connection.query("delete  from testerData where report_id=?",reportid,function(err,rows,fields){
		if(err) {
			console.error("数据删除错误："+err);
			return ;
			
		}else{
			console.log("删除成功");

			
			
		};
	
	});
		connection.end();
	ret=0;
	return ret;
}
module.exports=deletetest;