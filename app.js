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

var theDate = Date().split(' ').slice(0, 5).join(' '); //shows the date

var updateFeed = function(storage) {
  var length = storage.length;
  for (var i = 0; i < length; i++) {
    var $itemDiv = $('<div class="item"></div>')     
    $itemDiv.html(localStorage.getItem(storage.key(i)));
    $(".show-text").append($itemDiv);
  }
}

var editBox = function() {
  var newVal = prompt("Change your item");
  return newVal;
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
    $("#theKey").val(''); // clears input box
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
    var $delTarget = $("#theKey").val()
    $(".show-text").empty();;
    localStorage.removeItem("" + $delTarget);
    updateFeed(localStorage);
    $("#theKey").val(''); //clears input box

  })

  //edit
  $(".show-text").on("click", ".item", function(e) {
    $(".show-text").empty();
    var clicked = e.target.innerText; //targets divs innerText
    console.log(clicked);
    localStorage.removeItem('' + clicked); //removes
    var newVal = editBox(); //return value of user input
    localStorage.setItem(newVal, newVal);
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


Ideas for a V2
maybe add a constructor function which saves an item as an object with props

*/



// /* start with something simple
// a function which creates an item object 
// first argument = name of task
// date created = Date
// */
// var Item = function(itemName) {
//   var newObj = {}
//   newObj.name = itemName;
//   newObj.dateCreated = Date();
//   newObj.isComplete = false;
//   return newObj;
// }

// /*need a new refresh feed
//   iterate over items(objects) in localstorage
//   append each item to show-text
//   newobj.name + newobj.dateCreated 
// */

// var update = function(storage) {
//   var length = storage.length;
//   for (var i = 0; i < storage.length; i++) {
//     var parse = JSON.parse((localStorage.getItem(storage.key(i))));
//     var $itemDiv = $('<div class="item"></div>');
//     $itemDiv.html(parse.name + ' - ' + parse.dateCreated);   
//     $(".show-text").append($itemDiv);
//   }
// }


// $(document).ready(function(){
//   $(".add-item").on("click", function(){
//     $(".show-text").empty();
//     var $input = $("#theKey").val() //input value
//     var theObj = Item($input);
//     var curText = JSON.stringify(theObj);
//     var curKey = theObj.name;
//     localStorage.setItem(curKey, curText);
//     console.log("after...", window.localStorage);
//     update(localStorage);
//   })
// })





