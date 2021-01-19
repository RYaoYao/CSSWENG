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
  var reglist =  $('#reglist').DataTable({
    select: "single",
    dom: 'Bfrtip',
        buttons: [
            {
                text: 'My button',
                action: function ( ) {
             
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
});
