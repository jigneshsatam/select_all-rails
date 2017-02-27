var expect = require("chai").expect

this.jsdom = require('jsdom-global')()
global.$ = global.jQuery = require('jquery');

var select_all = require("../vendor/assets/javascripts/select_all.js");

describe("Select All", function() {
  describe("Basic Usage", function() {
    beforeEach(function(){
      var parent_checkbox = "<input type='checkbox' id='parent_checkbox'>Select All</input>";
      $(document.body).append(parent_checkbox);

      var childern_checkbox = "<input type='checkbox' class='selectable'>Item1</input>" + "<input type='checkbox' class='selectable'>Item2</input>" + "<input type='checkbox' class='selectable' checked>Item3</input>" + "<input type='checkbox' class='selectable' checked>Item4</input>";
      $(document.body).append(childern_checkbox);
      $("#parent_checkbox").select_all();
    });

    afterEach(function(){
      $(document.body).empty();
    });

    describe("On initialization", function(){
      it("Adds class select_all on applied checkbox.", function() {
        $("#parent_checkbox").select_all();
        expect($("#parent_checkbox").hasClass('select_all')).to.equal(true);
      });

      it("After click parent checkbox, all children checkboxes should get selected.", function() {
        selected_checkboxes = $(".selectable:checked").length
        not_selected_checkboxes = $(".selectable:not(:checked)").length
        $('#parent_checkbox').click(function(err){
          if (err) done(err);
          else{
            expect($(".selectable:checked").length).to.equal( selected_checkboxes + not_selected_checkboxes);
            done();
          }
        });
      });
    });

    describe("When all checkboxes are selected", function() {
      it("After click any child checkbox, parent checkboxes should get unselected", function() {
        $('#parent_checkbox').click(function(err){
          if (err) done(err);
          else{
            $('.selectable').first().click(function(err){
              if (err) done(err);
              else{
                expect($("#parent_checkbox").is(":checked")).to.equal(false);
                done();
              }
            });
          done();
          }
        });
      });
    });
  });
});
