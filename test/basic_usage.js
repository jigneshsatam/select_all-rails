require("./initializer.js");

describe("select_all-rails: Basic Usage", function() {
  beforeEach(function(){
    // Create Parent checkbox and append it to body
    var parent_checkbox = "<input type='checkbox' id='parent_checkbox'>Select All</input>";
    $(document.body).append(parent_checkbox);

    // Create Children checkboxes and append it to body
    var childern_checkbox = "<input type='checkbox' class='selectable'>Item1</input>" + "<input type='checkbox' class='selectable'>Item2</input>" + "<input type='checkbox' class='selectable' checked>Item3</input>" + "<input type='checkbox' class='selectable' checked>Item4</input>";
    $(document.body).append(childern_checkbox);

    // Initialize Parent checkbox with select_all();
    $("#parent_checkbox").select_all();
  });

  afterEach(function(){
    // Clear the document after every test
    $(document.body).empty();
  });

  describe("On initialization ==> ", function(){
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
      expect($("#parent_checkbox").data("attach_count_to")).to.equal(false);
    });

    it.skip("should select parent checkbox, if all children checkboxes are already selected.", function() {
      $(document.body).empty();
      // Create Parent checkbox and append it to body
      var parent_checkbox = "<input type='checkbox' id='parent_checkbox'>Select All</input>";
      $(document.body).append(parent_checkbox);

      // Create Children checkboxes and append it to body
      var childern_checkbox = "<input type='checkbox' class='selectable' checked>Item1</input>" + "<input type='checkbox' class='selectable' checked>Item2</input>" + "<input type='checkbox' class='selectable' checked>Item3</input>" + "<input type='checkbox' class='selectable' checked>Item4</input>";
      $(document.body).append(childern_checkbox);

      // Initialize Parent checkbox with select_all();
      $("#parent_checkbox").select_all();
      expect($("#parent_checkbox").is(":checked")).to.equal(true);
    });


    it("should do nothing, if element is undefined", function() {
      expect($("#undefined_element").select_all()).to.equal(null);
    });
  });

  describe("Parent checkbox clicked ==> ", function(){
    describe("Parent checkbox is checked", function(){
      it("should select all children checkboxes.", function(){
        selected_checkboxes = $(".selectable:checked").length
        not_selected_checkboxes = $(".selectable:not(:checked)").length
        if(not_selected_checkboxes > 0){
          $('#parent_checkbox').click(function(err){
            if (err) done(err);
            else{
              expect($(".selectable:checked").length).to.equal( selected_checkboxes + not_selected_checkboxes);
              done();
            }
          });
        }
        else {
          expect.fail("Not selected: ", 0, 'All children checkboxes are already selected.');
        }
      });
    });
    describe("Parent checkbox is unchecked", function(){
      it("should unselect all children checkboxes.", function(){
        $('#parent_checkbox').click(function(err){
          if (err) done(err);
          else{
            selected_checkboxes = $(".selectable:checked").length
            not_selected_checkboxes = $(".selectable:not(:checked)").length
            if(not_selected_checkboxes == 0){
              $('#parent_checkbox').click(function(err){
                if (err) done(err);
                else{
                  expect($(".selectable:not(:checked)").length).to.equal( selected_checkboxes + not_selected_checkboxes);
                  done();
                }
              });
            }
            else{
              expect.fail("Selected: ", 0, 'All children checkboxes are not checked.');
            }
            done();
          }
        });
      });
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
