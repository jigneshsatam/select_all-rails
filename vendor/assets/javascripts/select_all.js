//Make sure jQuery has been loaded before select_all.js
if (typeof jQuery === "undefined") {
  throw new Error("select_all requires jQuery");
}

(function ( $ ) {
  $.fn.select_all = function(options) {
    var settings = $.extend({
      class: "no_class"
    }, options );

    var select_all = $(this);
    var find_in = select_all;

    select_all.addClass("select_all "+settings.class);

    while( !find_in.is("body") ){
      var selectables = find_in.find(":checkbox.selectable");
      if (selectables.length > 0){
        selectables.addClass(settings.class);
        find_in = $("body");
      }
      else{
        find_in = find_in.parent();
      }
    }

    $(".select_all."+settings.class).change(function(){
      $(".selectable."+settings.class).prop('checked', $(this).prop("checked"));
    });
    $(".selectable."+settings.class).change(function(){
      if ($(".selectable."+settings.class+":checked").length == $(".selectable."+settings.class).length)
        $(".select_all."+settings.class).prop('checked', "checked");
      else
        $(".select_all."+settings.class).prop('checked', false);
    });
  }
  return $(this);
}( jQuery ));
