
$(function(){

	initpage();



})
var fenye={};
fenye.index=1;
fenye.pagenum=0;
fenye.count=0;
var initpage=function(curr){
	var tester="jiahengyang";
	var testDataSearch={
		"operator":tester,

	};
	var testDataSearchString=JSON.stringify(testDataSearch);
	$.ajax({
        data:testDataSearchString,
        type:"post",
        url:'/searchtest',
        contentType:'application/json',
        cache:false,
       	timeout:5000,
        success: function(data){
        //alert("提交成功");
    		var resdata=data;
    		fenye.pagenum=Math.ceil(resdata.num/2);
    		var testDatas=resdata;
    		var gettpl=document.getElementById('list').innerHTML;
    		laytpl(gettpl).render(testDatas,function(html){
    			$("#tbody").html(html);
    		})
    		laypage({
    			cont:"tfootpage",
    			pages:fenye.pagenum,
    			curr:fenye.index,
    			jump:function(obj,first){
    			if(!first){
    			var curr=obj.curr;
    			var testDataSearch={
					"operator":"jiahengyang",
					"count":2,
					"begin":curr,
				};
				var testDataSearchString=JSON.stringify(testDataSearch);
    			$.ajax({
    				data:testDataSearchString,
        			type:"post",
        			url:'/searchtest',
        			contentType:'application/json',
        			cache:false,
       				timeout:5000,
    				success: function(data){
        					//alert("提交成功");
    				var resdata=data;
    				var testDatas=resdata;
    				var gettpl=document.getElementById('list').innerHTML;
    				laytpl(gettpl).render(testDatas,function(html){
    					$("#tbody").html(html);
    				})
    		
    				    
    				},
    				error: function(jqXHR, textStatus, errorThrown){
    					alert('error ' + textStatus + " " + errorThrown);  
    				}

    				})
    		}
    	}
    });
    		
    				    
    	},
    	error: function(jqXHR, textStatus, errorThrown){
    		alert('error ' + textStatus + " " + errorThrown);  
    	}
    });
}
function deltr(e){
		var reportid=parseInt($(e).parents("td").attr("id"));
		var deleteData={"reportid":reportid}
		var deleteDataString=JSON.stringify(deleteData);
		swal({
                title: "确定删除此任务？",   //弹出框里面的提示文本
                text: "删除后此任务数据不可恢复", 
                type: "warning",        //弹出框类型
                showCancelButton: true, //是否显示取消按钮
                confirmButtonColor: "#44b549",//确定按钮颜色
                cancelButtonText: "取消",//取消按钮文本
                confirmButtonText: "确定",//确定按钮上面的文档
                closeOnConfirm: true
            }, function () {
                   $.ajax({
            		data:deleteDataString,
            		type:"post",
            		url:'/deletetest',
            		contentType:'application/json',
            		cache:false,
            		timeout:5000,
            		success: function(data){
                        //alert("提交成功");
    				    location.href="http://localhost:3000/ejs";
    				    
    				},
    				error: function(jqXHR, textStatus, errorThrown){
    				    alert('error ' + textStatus + " " + errorThrown);  
    			 }
            	});
            });
}
function edittest(e){
	var reportid=parseInt($(e).parents("td").attr("id"));
	location.href="http://localhost:3000/edittest?reportid="+reportid;
}

function supplementtest(e){
    var reportid=parseInt($(e).parents("td").attr("id"));
    location.href="http://localhost:3000/supplementtest?supplementid="+reportid;
}
function detailstest(e){
    var reportid=parseInt($(e).parents("td").attr("id"));
    location.href="http://localhost:3000/detailstest?reportid="+reportid;
}
