/*
listen for click event (edit)
update text in local storage (with key)
update display with new text value
*/


//dynamically assigning keys //only problem is, when you refresh. closure variables is lost and count starts at 1
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

//function which displays a refreshed feed with updated values from localMemory by creating html elements
var updateFeed = function(storage) {
  var length = storage.length;
  for (var i = 0; i < length; i++) {
    var $itemDiv = $('<div class="item"></div>')     
    $itemDiv.html(localStorage.getItem(storage.key(i)));
    $(".show-text").append($itemDiv);
  }
}



$(document).ready(function(){
  console.log("before\n", window.localStorage);
  updateFeed(localStorage);
  console.log(window.localeStorage);
  // add event listener
  $(".add-text-btn").on("click", function(){
    $(".show-text").empty();
    var curTextValue = $('#theKey').val(); // reading from <input>
    var curKeyValue = $('#theKey').val(); // change to dynamic key? reads user input also. no dupes only downside is, autosorts
    localStorage.setItem(curKeyValue, curTextValue);
    console.log("after...", window.localStorage);
    // $(".show-text").append(curTextValue);
    updateFeed(localStorage);
  });

  // remove item from app

  // listen for click event (del)
  $(".clear-cache-btn").on("click", function() {
    // clear local storage
    localStorage.clear();
    $(".show-text").empty();
    updateFeed(localStorage);
  });

  //delete button
  $(".del").on("click", function() {
    $(".show-text").empty();
    var $delTarget = $('#theKey').val();
    localStorage.removeItem("" + $delTarget);
    updateFeed(localStorage);
  })

});

/*
create individual items //done
  we need unique key names so that key values will be stored to the local memory without overriding
  iterate through local memory and log updated list on screen.  

delete individual items //done
  remove the text from screen
  can target unique key names and delete using localStorage.removeItem()
  iterate through local memory and log updated list on screen.

edit individual items
  access the localmemory to edit the key holding the item you want to change and set a new value equal to it
  onclick popup box, enter new value;
  iterate through local memory and log updated list on screen.


helper functions //done
  -a helper function which assigns a random number to theKey. Helps to give our local storage unique keys
      use a closure function and append to the curKeyVal.
  -a helper function which loops through local memory and logs the values
      localStorage.key(index) -> gives you the key @ index
      localStorage.length -> gives you the length
      localStorage.getItem(index) -> gives you the value @ index
*/





