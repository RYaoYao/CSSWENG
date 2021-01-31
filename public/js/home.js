$(document).ready( function () {
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    $('#registerForm').on('click','#btnreg' ,function(){
        var go = true;
        var fname = $('#regFirst').val();
        var lname = $('#reglast').val();
    
        var email = $('#regemail').val();
        var password = $('#regpass').val();
        var contactno = $('#regcontact').val();
        var desunit = $('#regunit').val();
        var dayCheck = $('#regcheck').val();
        var status = "Pending";
        var daypayment = $('#regpayment').val();
        if(fname == ''){
            go = false;
            $('#regFirst').css("border-color","red");
            $('#regerror').text("First name required");
            $("#regFirst").addClass("animated shake");
            $("#regerror").addClass("animated fadeInDown");
            setTimeout(function(){
                $("#regFirst").removeClass("animated shake");
            },1000);
        }
        else
        {
      
            $('#regFirst').css("border-color","");
            $('#regerror').empty();
        }
        if(lname == ''){
            go = false;
            $('#reglast').css("border-color","red");
            $('#regerror2').text("Last name required");
            $("#reglast").addClass("animated shake");
            $("#regerror2").addClass("animated fadeInDown");
            setTimeout(function(){
                $("#reglast").removeClass("animated shake");
            },1000);
        }
        else
        {
     
            $('#reglast').css("border-color","");
            $('#regerror2').empty();
        }
        if(email == '' ){
            go = false;
            $('#regemail').css("border-color","red");
            $('#regerror3').text("Email required");
            $("#regemail").addClass("animated shake");
            $("#regerror3").addClass("animated fadeInDown");
            setTimeout(function(){
                $("#regemail").removeClass("animated shake");
            },1000);
        }else
        {
       
            $('#regemail').css("border-color","");
            $('#regerror3').empty();
        }
  
        if(password.length < 8 || !password.match(/\d/)){
            go = false;
            $('#regpass').css("border-color","red");
            $("#regpass").addClass("animated shake");
            $("#smalltext").addClass("animated shake");
            setTimeout(function(){
                $("#regpass").removeClass("animated shake");
                $("#smalltext").removeClass("animated shake");
            },1000);
        }else
        {
 
            $('#regpass').css("border-color","");
        }
        if(contactno.length < 11){
            go = false;
            $('#regcontact').css("border-color","red");
            $('#regerror4').text("Contact number must be 11 numbers long");
            $("#regcontact").addClass("animated shake");
            $("#regerror4").addClass("animated fadeInDown");
            setTimeout(function(){
                $("#regcontact").removeClass("animated shake");
            },1000);
        }
        else
        {
     
            $('#regcontact').css("border-color","");
            $('#regerror4').empty();
        }
        if(daypayment == '' || !daypayment.match(/^[0-3][0-9]|31/)){
            go = false;
            $('#regpayment').css("border-color","red");
            $("#regpayment").addClass("animated shake");
            $("#smalltext2").addClass("animated shake");
            setTimeout(function(){
                $("#regpayment").removeClass("animated shake");
                $("#smalltext2").removeClass("animated shake");
            },1000);
        }
        else
        {
        
            $('#regpayment').css("border-color","");
        }
        if(dayCheck == ''){
            go = false;
            $('#regcheck').css("border-color","red");
            $('#regerror5').text("Please pick a date");
            $("#regcheck").addClass("animated shake");
            $("#regerror5").addClass("animated fadeInDown");
            setTimeout(function(){
                $("#regcheck").removeClass("animated shake");
                $("#regerror5").removeClass("animated fadeInDown");
            },1000);
        }
        
        else if(dayCheck < formatDate(new Date())){
            go = false;
            $('#regcheck').css("border-color","red");
            $('#regerror5').text("Please pick a date later than today");
            $("#regcheck").addClass("animated shake");
            $("#regerror5").addClass("animated fadeInDown");
            setTimeout(function(){
                $("#regcheck").removeClass("animated shake");
                $("#regerror5").removeClass("animated fadeInDown");
            },1000);
        }
        else{
 
            $('#regcheck').css("border-color","");
            $('#regerror5').empty();
        }

        if(go == true){
            var registrant = {
                fullname: fname + ' ' + lname,
                email: email,
                password: password,
                contactno: contactno,
                dayCheck: dayCheck,
                daypayment: daypayment,
                status: status,
                desunit: desunit,

            }
            $.post('register', registrant, function(data, status){
                if(data.success){
                    console.log(success);
                }
            })
        }
      
});
$('#clientproblist').DataTable();


});