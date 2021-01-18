$(document).ready( function () {
	// SideNav Initialization
  $('#tenantlist').DataTable({
    select: true,
    dom: 'Bfrtip',
    buttons: [
      {
          text: 'My button',
          action: function ( e, dt, node, config ) {
              alert( 'Button activated' );
          }
      }
  ]
  });
});
