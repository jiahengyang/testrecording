
function tmpl(str, data){
        /*
        console.log(str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<#").join("\t")
                    .replace(/((^|#>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)#>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("#>").join("p.push('")
                    .split("\r").join("\\'"));
        */
        var fn = new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<#").join("\t")
                    .replace(/((^|#>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)#>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("#>").join("p.push('")
                    .split("\r").join("\\'")
            + "');}return p.join('');");
        return fn(data);
    };
var html=['<div class="add_new_test" id="new_test">',
	'<button class="btn btn-default">新建任务</button>',
'</div>'].join("");

var MyValidator=function(){
	var handleSubmit=function(){
		$('.form-horizontal').validate({
			errorElement:'span',
			errorClass:'help-block',
			focusInvalid:false,
			rules:{
				report_name:{
					required:true
				},
				tester:{
					required:true
				},
				developer:{
					required:true
				},
				test_type:{
					required:true
				},
				plan_end_time:{
					required:true
				}
			},
			messages:{
				report_name:{
					required:"测试单名称必填"
				},
				tester:{
					required:"测试人必填"
				},
				developer:{
					required:"开发必填"
				},
				test_type:{
					required:"类型必填"
				},
				plan_end_time:{
					required:"计划完成时间必填"
				}
			},
			highlight:function(element){
				$(element).closest('form-group').addClass('has-error');
			},
			success:function(label){
				label.closest('.form-group').removeClass('has-error'); 
				label.remove(); 
			},
			errorPlacement : function(error, element) {  
                element.parent('div').append(error);  
            },  
  
            submitHandler : function(form) { 
            	var myDate=new Date();
            	var mytime=myDate.toLocaleString(); 
            	var report_name=$("#report_name").val();
            	var tester=$("#tester").val();
            	var producter=$("#producter").val();
            	var developer=$("#developer").val();
            	var test_type=$("#test_type").val();
            	var is_cgi=$("#is_cgi").val();
            	var job_progress=0;
            	var job_progress_text=$("#job_progress").find("option:selected").val();
            	if(job_progress_text=="not started"){
					job_progress=0;
            	}else if(job_progress_text=="Main flow barrier"){
            		job_progress=1;
            	}else if(job_progress_text=="Main flow pass"){
            		job_progress=2;
            	}else if(job_progress_text=="bug less than 3"){
            		job_progress=3;
            	}else if(job_progress_text=="last check"){
            		job_progress=4;
            	}else if(job_progress_text=="ready"){
            		job_progress=5;
            	}else if(job_progress_text=="case is not add"){
            		job_progress=6;
            	}else {
            		job_progress=7;
            	};
            	var tester_status_text=$("#tester_status").find("option:selected").val();
            	var tester_status=0;
            	if(tester_status_text=="not started"){
            		tester_status=0;
            	}else if(tester_status_text=="testing"){
            		tester_status=1;
            	}else if(tester_status_text=="waiting for half day"){
            		tester_status=2;
            	}else if(tester_status_text=="waiting for one day"){
            		tester_status=3;
            	}else if(tester_status_text=="wwaiting for more than one day"){
            		tester_status=4;
            	}else {
            		tester_status=5;
            	};
            	var test_other=$("#test_other").val();
            	var plan_end_time=$("#plan_end_time").val();
                var report_id=$("#add_test").attr("data-id");
                var add_for_id=parseInt($("#add_test").attr("data-supplement-id"));
                if(!report_id){
                    var testData={
                    "report_name":report_name,
                    "tester":tester,
                    "producter":producter,
                    "developer":developer,
                    "test_type":test_type,
                    "is_cgi":is_cgi,
                    "producter":producter,
                    "job_progress":job_progress,
                    "tester_status":tester_status,
                    "test_other":test_other,
                    "plan_end_time":plan_end_time,
                    "start_time":mytime,
                    "add_for_id":add_for_id

                } ;
                var testDataString=JSON.stringify(testData);
                $.ajax({
                    data:testDataString,
                    type:"post",
                    url:'/addtest',
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
            }else{
                var testData={
                    "report_id":report_id,
                    "report_name":report_name,
                    "tester":tester,
                    "producter":producter,
                    "developer":developer,
                    "test_type":test_type,
                    "is_cgi":is_cgi,
                    "producter":producter,
                    "job_progress":job_progress,
                    "tester_status":tester_status,
                    "test_other":test_other,
                    "plan_end_time":plan_end_time,
                    "start_time":mytime, 
                    "add_for_id":add_for_id

                } ;
                var testDataString=JSON.stringify(testData);
                $.ajax({
                    data:testDataString,
                    type:"post",
                    url:'/edittestsave',
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
            }
            	/*var testData={
            		"report_name":report_name,
            		"tester":tester,
            		"producter":producter,
            		"developer":developer,
            		"test_type":test_type,
            		"is_cgi":is_cgi,
            		"producter":producter,
            		"job_progress":job_progress,
            		"tester_status":tester_status,
            		"test_other":test_other,
            		"plan_end_time":plan_end_time,
            		"start_time":mytime

            	} ;
            	var testDataString=JSON.stringify(testData);
            	$.ajax({
            		data:testDataString,
            		type:"post",
            		url:'/addtest',
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
            	});*/
                  
            }  
		});
		 $('.form-horizontal input').keypress(function(e) {  
            if (e.which == 13) {  
                if ($('.form-horizontal').validate().form()) {  
                    $('.form-horizontal').submit();  
                }  
                return false;  
            }  
        });  
    }  
    return {  
        init : function() {  
            handleSubmit();  
        }  
    };  
	}();




