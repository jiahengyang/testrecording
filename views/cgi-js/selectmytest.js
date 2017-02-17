function selectmytest(info,callback){
	var selectdata=JSON.parse(info);
	var tester=selectdata.operator;
	//console.log("tester:"+tester);
	var count=parseInt(selectdata.count);
	//console.log("count:"+count);
	var begin=(parseInt(selectdata.begin)-1)*count;

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
	var querystring={"tests":[],"num":0};

	if(!tester){
		if(!count&&!begin){
			connection.query("select * from testerData where job_progress!=7",function(err,rows,fields){
		if(err) {
			console.error("名称为空且获取全部数据数据插入错误："+err);
			return ;
			
		}else{
			//console.log("名称为空且获取全部数据");
			//console.log("rows:"+JSON.stringify(rows));
			for (var i=0;i<count&&i<rows.length;i++){
				querystring.tests.push(rows[i]);
			}
			querystring.num=rows.length;
			querystring=JSON.stringify(querystring);
			
			
		};
		callback(err,querystring);
	});

		}else{
			
				connection.query("select * from testerData where job_progress!=7 limit ?,?", [begin,count],function(err,rows,fields){
		if(err) {
			console.error("名称为空且获取分页数据数据插入错误："+err);
			return ;
			
		}else{
			//console.log("名称为空且获取分页数据");
			//console.log("rows:"+JSON.stringify(rows));
			for (var i=0;i<count&&i<rows.length;i++){
				querystring.tests.push(rows[i]);
			}
			querystring.num=rows.length;
			querystring=JSON.stringify(querystring);
			
			
		};
		callback(err,querystring);
	});
			}
		}
			else{
				if(!count&&!begin){
				connection.query("select * from testerData where job_progress!=7&&tester=? ",[tester],function(err,rows,fields){
					if(err) {
					console.error("有名称获取全部数据插入错误："+err);
					return ;
			
					}else{
					//console.log("有名称获取全部数据");
					//console.log("rows:"+JSON.stringify(rows));
					for (var i=0;i<10&&i<rows.length;i++){
					querystring.tests.push(rows[i]);
					}
					querystring.num=rows.length;
					querystring=JSON.stringify(querystring);
			
			
					};
					callback(err,querystring);
					});
			}else{
				connection.query("select * from testerData where job_progress!=7&&tester=? limit ?,?",[tester,begin,count],function(err,rows,fields){
					if(err) {
					console.error("有名称获取分页数据插入错误："+err);
					return ;
			
					}else{
						//console.log("有名称获取分页数据");
				//console.log("rows:"+JSON.stringify(rows));
				for (var i=0;i<count&&i<rows.length;i++){
				querystring.tests.push(rows[i]);
				}
				querystring.num=rows.length;
				querystring=JSON.stringify(querystring);
				};
				callback(err,querystring);
	
				});
			}
		
			
		}
	



	
}
module.exports=selectmytest;