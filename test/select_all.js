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
      it("Adds class 'select_all' on applied(parent) checkbox.", function() {
        expect($("#parent_checkbox").hasClass('select_all')).to.equal(true);
      });

      it("Adds data 'select_all_uid' on applied(parent) checkbox.", function() {
        expect($("#parent_checkbox").data("select_all_uid")).to.not.be.null;
      });

      it("Adds data 'select_all_class' as 'no_class' on applied(parent) checkbox.", function() {
        expect($("#parent_checkbox").data("select_all_class")).to.equal("no_class");
      });

      it("Adds data 'show_count' to 'false' on applied(parent) checkbox.", function() {
        expect($("#parent_checkbox").data("show_count")).to.equal(false);
      });

      it("Adds data 'attach_count_to' to 'false' on applied(parent) checkbox.", function() {
        $("#parent_checkbox").select_all();
        expect($("#parent_checkbox").data("attach_count_to")).to.equal(false);
      });

    });

    describe("When all children checkboxes are not selected", function(){
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
      it("After clicking on any child checkbox, parent checkboxes should get unselected.", function() {
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
  describe("Multiple Seletions", function() {
    beforeEach(function(){
      var all_fruits = "<input type='checkbox' id='all_fruits'>All Fruits</input>";
      var fruits_checkboxes = "<input type='checkbox' class='selectable fruits'>Item1</input>" + "<input type='checkbox' class='selectable fruits'>Item2</input>" + "<input type='checkbox' class='selectable fruits' checked>Item3</input>" + "<input type='checkbox' class='selectable fruits' checked>Item4</input>";
      var fruits_div = $("<div class='fruits'> " +  all_fruits + fruits_checkboxes + "</div>");
      $(document.body).append(fruits_div);

      var all_animals = "<input type='checkbox' id='all_animals'>All Animals</input>";
      var animals_checkboxes = "<input type='checkbox' class='selectable animals'>Item1</input>" + "<input type='checkbox' class='selectable animals'>Item2</input>" + "<input type='checkbox' class='selectable animals' checked>Item3</input>" + "<input type='checkbox' class='selectable animals' checked>Item4</input>";
      var animals_div = $("<div class='animals'> " +  all_animals + animals_checkboxes + "</div>");
      $(document.body).append(animals_div);

      $("#all_fruits").select_all({class: 'fruits'});
      $("#all_animals").select_all({class: 'animals'});
    });

    afterEach(function(){
      $(document.body).empty();
    });

    describe("On initialization", function(){
      it("Adds data 'select_all_class' as 'fruits' on All Fruits(parent) checkbox.", function() {
        expect($("#all_fruits").data("select_all_class")).to.equal("fruits");
      });

      it("Adds data 'select_all_class' as 'animals' on All Animals(parent) checkbox.", function() {
        expect($("#all_animals").data("select_all_class")).to.equal("animals");
      });
    });

    describe("On selecting All fruits(parent) checkbox", function(){
      it("All children with class 'fruits' should get selected.", function(){
        selected_fruits = $(".selectable.fruits:checked").length
        not_selected_fruits = $(".selectable.fruits:not(:checked)").length
        $('#all_fruits').click(function(err){
          if (err) done(err);
          else{
            expect($(".selectable.fruits:checked").length).to.equal( selected_fruits + not_selected_fruits);
            done();
          }
        });
      });

      describe("Checkboxes which don't have class 'fruits' should remain unaffected.", function(){
        it("Selected checkboxes should remain selected.", function(){
          non_fruits_selected_checkboxes = $(".selectable:not(.fruits):checked").length;
          $("#all_fruits").click(function(err){
            if(err) done(err);
            else{
              $(".selectable:not(.fruits):checked").length.to.equal(non_fruits_selected_checkboxes);
              done();
            }
          });
        });

        it("Not selected checkboxes should remain not selected.", function(){
          non_fruits_not_selected_checkboxes = $(".selectable:not(.fruits):not(checked)").length;
          $("#all_fruits").click(function(err){
            if(err) done(err);
            else{
              $(".selectable:not(.fruits):not(checked)").length.to.equal(non_fruits_not_selected_checkboxes);
              done();
            }
          });
        });
      });
    });
  });
});
