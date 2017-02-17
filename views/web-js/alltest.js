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
		"job_progress":7

	};
	var testDataSearchString=JSON.stringify(testDataSearch);
	$.ajax({
        data:testDataSearchString,
        type:"post",
        url:'/selectbytester',
        contentType:'application/json',
        cache:false,
       	timeout:5000,
        success: function(data){
        //alert("提交成功");
    		var resdata=data;
    		fenye.pagenum=Math.ceil(resdata.num/10);
    		var testDatas=resdata;
    		var gettpl=document.getElementById('alllist').innerHTML;
    		laytpl(gettpl).render(testDatas,function(html){
    			$("#alltbody").html(html);
    		})
    		laypage({
    			cont:"allfootpage",
    			pages:fenye.pagenum,
    			curr:fenye.index,
    			jump:function(obj,first){
    			if(!first){
    			var curr=obj.curr;
    			var testDataSearch={
					"job_progress":7,
					"count":10,
					"begin":curr,
				};
				var testDataSearchString=JSON.stringify(testDataSearch);
    			$.ajax({
    				data:testDataSearchString,
        			type:"post",
        			url:'/selectbytester',
        			contentType:'application/json',
        			cache:false,
       				timeout:5000,
    				success: function(data){
        					//alert("提交成功");
    				var resdata=data;
    				var testDatas=resdata;
    				var gettpl=document.getElementById('alllist').innerHTML;
    				laytpl(gettpl).render(testDatas,function(html){
    					$("#alltbody").html(html);
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
                search_by_tester:{
                    required:true
                }
            },
            messages:{
                search_by_tester:{
                    required:"测试人必填"
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

                var search_by_tester=$("#search_by_tester").val();
                var testData={ 
                    "search_by_tester":search_by_tester,
                    "job_progress":7

                };
                 var testDataString=JSON.stringify(testData);
                $.ajax({
                    data:testDataString,
                    type:"post",
                    url:'/selectbytester',
                    contentType:'application/json',
                    cache:false,
                    timeout:5000,
                    success: function(data){
                        var resdata=data;
                        fenye.pagenum=Math.ceil(resdata.num/10);
                        var testDatas=resdata;
                        var gettpl=document.getElementById('alllist').innerHTML;
                        laytpl(gettpl).render(testDatas,function(html){
                        $("#alltbody").html(html);
                        })
                        laypage({
                            cont:"allfootpage",
                            pages:fenye.pagenum,
                            curr:fenye.index,
                            jump:function(obj,first){
                                if(!first){
                                    var curr=obj.curr;
                                    var testDataSearch={
                                        "search_by_tester":search_by_tester,
                                        "job_progress":7,
                                        "count":10,
                                        "begin":curr,
                                    };
                                    var testDataSearchString=JSON.stringify(testDataSearch);
                                    $.ajax({
                                        data:testDataSearchString,
                                        type:"post",
                                        url:'/selectbytester',
                                        contentType:'application/json',
                                        cache:false,
                                        timeout:5000,
                                        success: function(data){
                                                    var resdata=data;
                                                    var testDatas=resdata;
                                                    var gettpl=document.getElementById('alllist').innerHTML;
                                                    laytpl(gettpl).render(testDatas,function(html){
                                                        $("#alltbody").html(html);
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

