
var Login=function(){
	var loginSubmit=function(){
		$('.form-horizontal').validate({
			errorElement:'span',
			errorClass:'help-block',
			focusInvalid:false,
			rules:{
				rtxname:{
					required:true
				},
				inputPassword:{
					required:true
				}
			},
			messages:{
				rtxname:{
					required:"rtx名必填"
				},
				inputPassword:{
					required:"密码必填"
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
            	var rtxname=$("#rtxname").val();
            	var inputPassword=$("#inputPassword").val();
            	var logindata={
            		"rtxname":rtxname,
            		"password":inputPassword
            	};
            	var logindataString=JSON.stringify(logindata);
            	$.ajax({
            		data:logindataString,
            		type:"post",
            		url:'/login',
            		contentType:'application/json',
            		cache:false,
            		timeout:5000,
            		success: function(data){
            			var resdata=JSON.parse(data);
                        alert(resdata.ret);
                        if(resdata.ret!=0){
                        	alert("账号密码错误");
                        }else{
                        	location.href="http://localhost:3000/ejs?operator="+rtxname;
                        }
                        //var ret=data.ret;
    				    //location.href="http://localhost:3000/ejs";
    				    
    				},
    				error: function(jqXHR, textStatus, errorThrown){
    				    alert('error ' + textStatus + " " + errorThrown);  
    			 }
            	});
        
}
});
};
return {  
        init : function() {  
            loginSubmit();  
        }  
    };  
}();
