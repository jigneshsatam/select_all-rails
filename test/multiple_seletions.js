require("./initializer.js");

describe("select_all-rails: Multiple Seletions", function() {
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

  describe("When all fruits are selected", function() {
    it("On unselecting any children fruit, All-Fruits(parent) checkbox should get unselected.", function(){
      $("#all_fruits").click(function(err){
        if(err) done(err);
        else{
          $(".selectable.fruits").first().click(function(err){
            if(err) done(err);
            else{
              $("#all_fruits:checked").length.to.equal(0)
            }
          });
        }
      });
    });

    describe("On unselecting any children fruit, All the animal checkboxes should remain unchanged.", function(){
      it("Selected animals should remain selected.", function(){
        $("#all_fruits").click(function(err){
          if(err) done(err);
          else{
            selected_animals = $(".animals:checked").length
            $(".selectable.fruits").first().click(function(err){
              if(err) done(err);
              else{
                $(".animals:checked").length.to.equal(selected_animals)
              }
            });
          }
        });
      });

      it("Unselected animals should remain unselected.", function(){
        $("#all_fruits").click(function(err){
          if(err) done(err);
          else{
            selected_animals = $(".animals:not(checked)").length
            $(".selectable.fruits").first().click(function(err){
              if(err) done(err);
              else{
                $(".animals:not(checked)").length.to.equal(selected_animals)
              }
            });
          }
        });
      });
    });
  });
});
