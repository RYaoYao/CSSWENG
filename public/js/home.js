$(document).ready( function () {
    $('#registerForm').on('click','#btnreg' ,function(){
        var go = true;
        var fname = $('#regFirst').val();
        var lname = $('#reglast').val();
        console.log(fname + ' '+ lname);
        var email = $('#regemail').val();
        var password = $('#regpass').val();
        var contactno = $('#regcontact').val();
        var desunit = $('#regunit').val();
        var dayCheck = $('#regcheck').val();
        var daypayment = $('#regpayment').val();
        if(fname == ''){
            go = false;
            $('#regFirst').css("border-color","red");
            $('#regerror').text("First name required");
            document.getElementById("regFirst").classList.add("bounce");
            setTimeout(function(){
            document.getElementById("regFirst").classList.remove("bounce");
            },1000);
        }
        if(lname == ''){
            go = false;
            $('#reglast').css("border-color","red");
            $('#regerror2').text("Last name required");
            document.getElementById("reglast").classList.add("bounce");
            setTimeout(function(){
            document.getElementById("reglast").classList.remove("bounce");
            },1000);
        }
        if(email == '' ){
            $('#regemail').css("border-color","red");
            $('#regerror3').text("Email required");
            document.getElementById("regemail").classList.add("bounce");
            setTimeout(function(){
            document.getElementById("regemail").classList.remove("bounce");
            },1000);
        }
        if(password.length < 8 || !password.match(/\d/)){
            go = false;
            $('#regpass').css("border-color","red");
            document.getElementById("regpass").classList.add("bounce");
            document.getElementById("smalltext").classList.add("bounce");
            setTimeout(function(){
            document.getElementById("regpass").classList.remove("bounce");
            document.getElementById("smalltext").classList.remove("bounce");
            },1000);
        }
        if(contactno.length < 11){
            go = false;
            $('#regcontact').css("border-color","red");
            $('#regerror4').text("Contact number must be 11 numbers long");
            document.getElementById("regcontact").classList.add("bounce");
            setTimeout(function(){
            document.getElementById("regcontact").classList.remove("bounce");
            },1000);
        }
        if(daypayment == '' || !daypayment.match(/^[0-3][0-9]|31/)){
            $('#regpayment').css("border-color","red");
            document.getElementById("regpayment").classList.add("bounce");
            document.getElementById("smalltext2").classList.add("bounce");
            setTimeout(function(){
            document.getElementById("regpayment").classList.remove("bounce");
            document.getElementById("smalltext2").classList.remove("bounce");
            },1000);
        }
        // if(go == true){
        //     var newunit = {
        //         unitno: unitnum,
        //         size: unittype,
        //         payment: unitpay,
        //         status: status
        //     }
        //     $.post('admin', newunit, function(data, status){
        //         if(data.success){
        //             console.log(success);
        //         }
        //     })
        // }
});



});