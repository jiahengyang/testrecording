$(function(){

	initpage();
    MyValidator.init();  
    var urlstr = location.href;  
  //alert(urlstr);  
    var urlstatus=false;  
    $("#menu a").each(function () {  
    if ((urlstr + '/').indexOf($(this).attr('href')) > -1&&$(this).attr('href')!='') {  
      $(this).parents("li").addClass('active');  
    } else {  
      $(this).parents("li").removeClass('active');  
    }  
  });  
})
var fenye={};
fenye.index=1;
fenye.pagenum=0;
fenye.count=0;
var initpage=function(curr){

	var testDataSearch={
		"job_progress":5

	};
	var testDataSearchString=JSON.stringify(testDataSearch);
	$.ajax({
        data:testDataSearchString,
        type:"post",
        url:'/selectreadytest',
        contentType:'application/json',
        cache:false,
       	timeout:5000,
        success: function(data){
        //alert("提交成功");
    		var resdata=data;
    		fenye.pagenum=Math.ceil(resdata.num/2);
    		var testDatas=resdata;
    		var gettpl=document.getElementById('readylist').innerHTML;
    		laytpl(gettpl).render(testDatas,function(html){
    			$("#readytbody").html(html);
    		})
    		laypage({
    			cont:"readyfootpage",
    			pages:fenye.pagenum,
    			curr:fenye.index,
    			jump:function(obj,first){
    			if(!first){
    			var curr=obj.curr;
    			var testDataSearch={
					"job_progress":5,
					"count":2,
					"begin":curr,
				};
				var testDataSearchString=JSON.stringify(testDataSearch);
    			$.ajax({
    				data:testDataSearchString,
        			type:"post",
        			url:'/selectreadytest',
        			contentType:'application/json',
        			cache:false,
       				timeout:5000,
    				success: function(data){
        					//alert("提交成功");
    				var resdata=data;
    				var testDatas=resdata;
    				var gettpl=document.getElementById('readylist').innerHTML;
    				laytpl(gettpl).render(testDatas,function(html){
    					$("#readytbody").html(html);
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
};

var MyValidator=function(){
    var fenye={};
    fenye.index=1;
    fenye.pagenum=0;
    fenye.count=0;
    var handleSubmit=function(){
        $('.form-inline').validate({
            errorElement:'span',
            errorClass:'help-block',
            focusInvalid:false,
            /*rules:{
                search_test_type:{
                    required:true
                }
            },
            messages:{
                search_test_type:{
                    required:"测试单类型必填"
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
            },  */
  
            submitHandler : function(form) { 

                var search_test_type=$("#search_test_type").val();
                var testData={ 
                    "search_test_type":search_test_type,
                    "job_progress":5

                };
                 var testDataString=JSON.stringify(testData);
                $.ajax({
                    data:testDataString,
                    type:"post",
                    url:'/selectreadytest',
                    contentType:'application/json',
                    cache:false,
                    timeout:5000,
                    success: function(data){
                        var resdata=data;
                        fenye.pagenum=Math.ceil(resdata.num/2);
                        var testDatas=resdata;
                        var gettpl=document.getElementById('readylist').innerHTML;
                        laytpl(gettpl).render(testDatas,function(html){
                        $("#readytbody").html(html);
                        })
                        laypage({
                            cont:"readyfootpage",
                            pages:fenye.pagenum,
                            curr:fenye.index,
                            jump:function(obj,first){
                                if(!first){
                                    var curr=obj.curr;
                                    var testDataSearch={
                                        "search_test_type":search_test_type,
                                        "job_progress":5,
                                        "count":2,
                                        "begin":curr,
                                    };
                                    var testDataSearchString=JSON.stringify(testDataSearch);
                                    $.ajax({
                                        data:testDataSearchString,
                                        type:"post",
                                        url:'/selectreadytest',
                                        contentType:'application/json',
                                        cache:false,
                                        timeout:5000,
                                        success: function(data){
                                                    var resdata=data;
                                                    var testDatas=resdata;
                                                    var gettpl=document.getElementById('readylist').innerHTML;
                                                    laytpl(gettpl).render(testDatas,function(html){
                                                        $("#readytbody").html(html);
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
            },
        
                        
               
                   
              
            
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

