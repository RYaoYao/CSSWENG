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
                    console.log(table.row({selected:true}).data()[1]);
                    myFunction(edata);
                }
            }
        ]
  });
function myFunction(param) {
               $("#editname").val(param[0]);
                    $("#editpay").val(param[1]);
                    $("#editunit").val(param[2]);
                    $("#editmont").val(param[3]);
                    $("#editmos").val(param[4]);
                    $("#editfam").val(param[5]);
                    $("#tenantmodal").modal('show');
  
}
});
