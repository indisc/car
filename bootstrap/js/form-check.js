
function validateEmail(email) { 
     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
 }


$('#frmContact').submit(function(){
	var formControl = true;
	
	$('#frmEmail').removeClass( 'has-errror' );
	$('#fDate').removeClass( 'has-errror' );
	$('#eDate').removeClass( 'has-errror' );

	var email 	= $('#email');
	var stDate 	= $('#str_date');
	var enDate 	= $('#end_date') 
	
	if(stDate.val() == ''){
		formControl = false;
		$( '#str_date' ).addClass( 'has-error' );
	}

	if(enDate.val() == ''){
		formControl = false;
		$( '#end_date' ).addClass('has-error');
	}

	if(validateEmail(email.val()) == false){
		formControl = false;
		$( '#frmEmail').addClass('has-error');
	}

});	

