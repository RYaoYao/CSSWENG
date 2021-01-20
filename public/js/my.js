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



});

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });