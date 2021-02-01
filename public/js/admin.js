$(document).ready( function () {
	// SideNav Initialization
 var table =  $('#tenantlist').DataTable({
    select: "single",
    dom: 'Bfrtip',
        buttons: [
            {
                text: 'My button',
                action: function ( ) {
                    var edata  = table.row({selected:true}).data();
                   
                    myFunction(edata);
                }
            }
        ]
  });
  var regstat =  $('#reglist').DataTable({
    select: "single",
    dom: 'Bfrtip',
        buttons: [
            {
                text: 'Edit',
                action: function ( ) {
                    var edata  = regstat.row({selected:true}).data();
                    EditRegistration(edata);
                }
            }
        ]
  });var probstat =  $('#problist').DataTable({
    select: "single",
    dom: 'Bfrtip',
        buttons: [
            {
                text: 'Edit',
                action: function ( ) {
                    var edata  = probstat.row({selected:true}).data();
                    EditProblemStat(edata);
                }
            }
        ]
  });
function myFunction(param) {
               $("#editunit").val(param[0]);
                    $("#editname").val(param[1]);
                    $("#editemail").val(param[2]);
                    $("#editcontact").val(param[3]);
                    $("#editpay").val(param[4]);
                    $("#editrent").val(param[5]);
                    $("#editmos").val(param[6]);
                    $("#tenantmodal").modal('show');
  
}
function EditRegistration(param) {
    $("#eregno").val(param[0]);
    $("#eregname").val(param[1]);
     $("#eregemail").val(param[2]);
     $("#eregcon").val(param[3]);
     $("#eregunit").val(param[4]);
     $("#eregday").val(param[5]);
     $("#eideal").val(param[6]);
     $("#eregstatus").val(param[7]);
     $("#regismodal").modal('show');

}
function EditProblemStat(param) {
    $("#eprobid").val(param[0]);
     $("#eprobunit").val(param[1]);
     $("#eprobphone").val(param[2]);
     $("#eprobtype").val(param[3]);
     $("#eprobdes").val(param[4]);
     $("#eprobstat").val(param[5]);
     $("#probmodal").modal('show');
}

$('#UnitForm').on('click','#btnunit' ,function(){
        var go = true;
        var unitnum = $('#unitnum').val();
        var unittype = $('#unittype').val();
        var unitpay = $('#unitpay').val();
        var status = "Unoccupied";
        if(unitnum == '' || unitnum < 0 || unitnum >9999){
            go = false;
            $('#unitnum').css("border-color","red");
            $('#error1').text("Unit Number required");
        }
        if(unitpay == '' ){
            go = false;
            $('#unitpay').css("border-color","red");
            $('#error2').text("Rent is required");
        }
        if(go == true){
            var newunit = {
                unitno: unitnum,
                size: unittype,
                payment: unitpay,
                status: status
            }
            $.post('CreateUnit', newunit, function(data){
                if(data.success){
                    Swal.fire({
                        icon: 'success',
                       title:  data.message,
                       animation: false,
                        customClass: "animated fadeInDown"
                    }).then(function(){
                        window.location.reload();
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                       title:  data.message,
                       animation: false,
                        customClass: "animated fadeInDown"
                    }).then(function(){
                        window.location.reload();
                    });
                }
            })
        }
});
$('#editreg').on('click','#edrsub',function(){
   var status =  $("#eregstatus").val();
   console.log(status == "Accepted")
   if (status == "Accepted"){
   var  newtenant = {
    name: $("#eregname").val(),
    email:$("#eregemail").val(),
    contactno: $("#eregcon").val(),
    unit: $("#eregunit").val(),
    daypayment: $("#eideal").val()
}

$.post('./registration-status', newtenant, function(data){
    if(data.success){
        Swal.fire({
            icon: 'success',
           title:  data.message,
           animation: false,
            customClass: "animated fadeInDown"
        }).then(function(){
            window.location.reload();
        });
    }else{
        Swal.fire({
            icon: 'error',
           title:  data.message,
           animation: false,
            customClass: "animated fadeInDown"
        }).then(function(){
            window.location.reload();
        });
    }
})
    
   }
   else if(status == "Rejected"){
       var update = {
           regisno: $('#eregno').val(),
           status: status
       }
    $.post('./Reject', update, function(data){
        if(data.success){
            Swal.fire({
                icon: 'success',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }
        else{
            Swal.fire({
                icon: 'error',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }
    })

   }else{
       console.log("nothing")
   }
})
$('#edittenant').on('click','#edtsub',function(){
    var updateten = {
    email :  $("#editemail").val(),
    contactno : $("#editcontact").val(),
    daypayment : $("#editpay").val(),
    mosmissed : $("#editmos").val()
    }
    $.post('./UpdateTenant', updateten, function(data){
        if(data.success){
            Swal.fire({
                icon: 'success',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }else{
            Swal.fire({
                icon: 'error',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }
    });
});
$('#edittenant').on('click','#btntdelete',function(){
    var deleteten = {
    email :  $("#editemail").val(),
    }
    $.post('./DeleteTenant', deleteten, function(data){
        if(data.success){
            Swal.fire({
                icon: 'success',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }else{
            Swal.fire({
                icon: 'error',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }
    });
});
$('#editPform').on('click','#btnpdelete',function(){
    var updateproblem = {
    problemid :  $("#eprobid").val(),
    }
    $.post('./deleteProblem', updateproblem, function(data){
        if(data.success){
            Swal.fire({
                icon: 'success',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }else{
            Swal.fire({
                icon: 'error',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }
    });
});
$('#editPform').on('click','#probedit',function(){
    var updateproblem = {
    problemid :  $("#eprobid").val(),
    status : $("#eprobstat").val(),
    }
    $.post('./UpdateProblem', updateproblem, function(data){
        if(data.success){
            Swal.fire({
                icon: 'success',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }else{
            Swal.fire({
                icon: 'error',
               title:  data.message,
               animation: false,
                customClass: "animated fadeInDown"
            }).then(function(){
                window.location.reload();
            });
        }
    });
});
});