//Make sure jQuery has been loaded before select_all.js
if (typeof jQuery === "undefined") {
  throw new Error("select_all requires jQuery");
}

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
