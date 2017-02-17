function selectbytester(info,callback){
	var selectdata=JSON.parse(info);
	var search_by_tester=selectdata.search_by_tester;
	var count=parseInt(selectdata.count);
	//console.log("count:"+count);
	var begin=(parseInt(selectdata.begin)-1)*count;

	var job_progress=7;
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
	var usersql;
	var usersql_params;
	if(!search_by_tester){
		if(!count&&!begin){
			usersql="select *  from testerData where job_progress!=?";
			usersql_params=[job_progress];
			//console.log("搜索全部要上线的单：usersql"+usersql+usersql_params)
		}else{
			usersql="select *  from testerData where job_progress!=? limit ?,?";
			usersql_params=[job_progress,begin,count];
			//console.log("搜索分页要上线的单：usersql"+usersql+usersql_params)
		}
	}else{
		if(!count&&!begin){
			usersql="select *  from testerData where job_progress!=? and tester=?";
			usersql_params=[job_progress,search_by_tester];
			//console.log("按类型搜索全部要上线的单：usersql"+usersql+usersql_params)
		}else{
			usersql="select *  from testerData where job_progress!=? and tester=? limit ?,?";
			usersql_params=[job_progress,search_by_tester,begin,count];
			//console.log("按类型搜索分页要上线的单：usersql"+usersql+usersql_params)
		}
	}
	var querystring={"tests":[],"num":0};
	
		connection.query(usersql,usersql_params,function(err,rows,fields){
		if(err) {
			console.error("查找失败："+err);
			return ;
			
		}else{
			//console.log("查找成功");
			//console.log("rows:"+JSON.stringify(rows));
			for (var i=0;i<10&&i<rows.length;i++){
				querystring.tests.push(rows[i]);
				}
				querystring.num=rows.length;
				querystring=JSON.stringify(querystring);
				};
				callback(err,querystring);

			
			
		
	
	});
	
	
		connection.end();

}
module.exports=selectbytester;