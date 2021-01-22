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
                    console.log(table.row({selected:true}).data());
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
                    console.log(regstat.row({selected:true}).data());
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
                    console.log(probstat.row({selected:true}).data());
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
    $("#eregname").val(param[0]);
     $("#eregemail").val(param[1]);
     $("#eregcon").val(param[2]);
     $("#eregunit").val(param[3]);
     $("#eregday").val(param[4]);
     $("#eideal").val(param[5]);
     $("#eregstatus").val(param[6]);
     $("#regismodal").modal('show');

}
function EditProblemStat(param) {
    $("#eprobid").val(param[0]);
     $("#eprobunit").val(param[1]);
     $("#eprobtype").val(param[2]);
     $("#eprobdes").val(param[3]);
     $("#eprobstat").val(param[4]);
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
            $.post('admin', newunit, function(data, status){
                if(data.success){
                    console.log(success);
                }
            })
        }
});
$('#editreg').on('click','#edrsub',function(){
   var status =  $("#eregstatus").val();
   console.log($("#eregcon").val())
   console.log(status == "Accepted")
   if (status == "Accepted"){
   var  newtenant = {
    name: $("#eregname").val(),
    email:$("#eregemail").val(),
    contactno: $("#eregcon").val(),
    unit: $("#eregunit").val(),
    daypayment: $("#eideal").val()
}
$.post('./registration-status', newtenant, function(data, status){
    if(data.success){
        console.log(success);
    }
})
    
   }
   else if(status == "Rejected"){
    $("#eregstatus").val();

   }else{
       console.log("nothing")
   }
})
});

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });