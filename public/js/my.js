$(document).ready( function () {
	// SideNav Initialization
 var table =  $('#tenantlist').DataTable({
    select: "single",
    dom: 'Bfrtip',
        buttons: [
            {
                text: 'My button',
                action: function ( ) {
                    alert(table.row({selected:true}).data());
                }
            }
        ]
  });
});
