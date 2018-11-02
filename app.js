//uses recursion to edit a todo item
var editBox = function(name) {
  var newVal = prompt("Please enter a new Value");
  var oldVal = name;
  if(newVal === null) {
    return oldVal;
  }
  if(newVal !== '') {
    return newVal;
  }
  return newVal + editBox(oldVal);
}

//can add more features by inserting more properties into this constructor
var Item = function(itemName) {
  var newObj = {}
  newObj.name = itemName;
  newObj.dateCreated = Date().split(' ').slice(0, 5).join(' ');
  return newObj;
}



//function which displays a refreshed feed with updated values 
//from localMemory by creating html elements
var update = function(storage) {
  var length = storage.length;
  for (var i = 0; i < storage.length; i++) {
    var parse = JSON.parse((localStorage.getItem(storage.key(i))));
    var $itemDiv = $('<div class="item"></div>');
    $itemDiv.html(
      '<button class="btn btn-danger btn-sm del-item" number=' + i + '>Delete</button>' + //adds a delete button
      '<span class="text">' + parse.name + '</span>' + ' ' + //make name big css
      '<span class="date">' + parse.dateCreated + '</span>');   //make date small css
    $(".show-text").append($itemDiv);
  }
}


$(document).ready(function(){
  console.log("before\n", window.localStorage);
  update(localStorage);
  $("#add-text-btn").on("click", function(){
    $(".show-text").empty();
    var $input = $("#theKey").val() //input value
    var theObj = Item($input);
    var curText = JSON.stringify(theObj);
    var curKey = theObj.name;
    localStorage.setItem(curKey, curText);
    console.log("after...", window.localStorage);
    update(localStorage);
    $("#theKey").val(''); // clears input box
  });

  // listen for click event (clear storage)
  $("#clear-cache-btn").on("click", function() {
    // clear local storage
    localStorage.clear();
    $(".show-text").empty();
    update(localStorage);
  });

  //delete button
  $(".show-text").on("click", ".del-item", function() {
    var numberClick = $(this).attr("number") //what you click on the number attribute
    $(".show-text").empty();
    localStorage.removeItem(localStorage.key(numberClick));
    update(localStorage);
    $("#theKey").val(''); //clears input box
  });


  //change the item name
  $(".show-text").on("click", ".text", function(e) {
    $(".show-text").empty();
    var clicked = e.target.innerText; //targets divs innerText
    var newVal = editBox(clicked); //return value of user input
    console.log(newVal)
    var editObj = JSON.parse(localStorage[clicked]); //sets value of editObj to object of localStorage(key)
    editObj.name = newVal;
    localStorage.setItem(newVal, JSON.stringify(editObj));
    if(newVal === clicked) {
      update(localStorage);
    } else {
      localStorage.removeItem(clicked);
      update(localStorage);
    }
  });  


});










/* 
  **changelog // planning **

create individual items //done
  we need unique key names so that key values will be stored to the local memory without overriding
  iterate through local memory and log updated list on screen.  

delete individual items //done
  remove the text from screen
  can target unique key names and delete using localStorage.removeItem()
  take value from input box and delete via localStorage.removeItem()
  iterate through local memory and log updated list on screen.


delete by clicking a box?(tentative) //done 
  More user friendly delete buttons 
    delete button now deletes item to the right on press!
    +10 UI/UX points!


edit individual items //done
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

future features to add
  sort list by time added.


*/






