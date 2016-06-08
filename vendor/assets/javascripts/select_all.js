(function ( $ ) {
  $.fn.select_all = function() {
    $(this).addClass("select_all");
    $(".select_all").change(function(){
      $(".selectable").prop('checked', $(this).prop("checked"));
    });
    $(".selectable").change(function(){
      if ($(".selectable:checked").length == $(".selectable").length)
        $(".select_all").prop('checked', "checked");
      else
        $(".select_all").attr('checked', false);
    });
  }
}( jQuery ));
