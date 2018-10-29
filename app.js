/*
listen for click event (edit)
update text in local storage (with key)
update display with new text value
*/


//dynamically assigning keys
var keyGen = function() {
  var key = 0;

  return function() {
    key++;
    return key;
  };
}

var localeKeyGen = keyGen(); //have localStorage.setItem call this

//or we can just name the key the value of user input
//curKeyValue = $('#theKey').val();
//only problem with that is, if the user inputs the same thing? that would not duplicate
//



$(document).ready(function(){
  console.log("before\n", window.localStorage);

  // add event listener
  $(".add-text-btn").on("click", function(){
    $(".show-text").empty();
    var curTextValue = $('#theKey').val(); // reading from <input>
    var curKeyValue = "theKey"; // change to dynamic key?
    localStorage.setItem(curKeyValue + localeKeyGen(), curTextValue);
    $(".show-text").append(curTextValue);
  });

  // remove item from app

  // listen for click event (del)
  $(".clear-cache-btn").on("click", function(){
    // clear local storage
    localStorage.clear();
    $(".show-text").empty();
  });

});

/*
create individual items
  we need unique key names so that key values will be stored to the local memory without overriding
  iterate through local memory and log updated list on screen.
delete individual items
  remove the text from screen
  can target unique key names and delete using localStorage.removeItem()
  iterate through local memory and log updated list on screen.
edit individual items
  access the localmemory to edit the key holding the item you want to change and set a new value equal to it
  iterate through local memory and log updated list on screen.
helper functions
  -a helper function which assigns a random number to theKey. Helps to give our local storage unique keys
  -a helper function which loops through local memory and logs the values
*/





