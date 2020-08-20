let array = [];

// when doc is ready perform these tasks
$(document).ready(function(){

  // calling of functions
  dropDownList()
  createSavedElements()
  checkOnLoad()
  likeButtonAnimation()
  hideOrShow()
  submitButtonClick()

  // if no localstorage has been made make a new one
  if (localStorage.getItem("hasRunBefore") === null) {

    localStorage.setItem("saveForLater" , JSON.stringify(array));
    localStorage.setItem("hasRunBefore", true);
  
  // else do this
  } else {

    let storageArray = JSON.parse(localStorage.getItem("saveForLater"));
  
    $('input:checkbox').click(function(event){
  
      if($(this).is(":checked")) {

        addItem(storageArray);
        alert("This item has been added to your readList")

      } else if ($(this).is(":not(:checked)")) {

        removeItem(event, storageArray)
        alert("This item has been removed to your readList")
      }
    });
  } 
});

// function to render the page elements of saveForLater
function createSavedElements() {

  if (document.location.pathname === "/saveToLater.html") {

  let storageArray = JSON.parse(localStorage.getItem("saveForLater"));

    storageArray.forEach(function(item) { // for each item in array do this:
      let container = document.getElementById('savedContainer');
      let newElement = document.createElement('div');
      newElement.className = 'saved';
      newElement.innerHTML = item.body;
      container.appendChild(newElement);
      $('.checkbox').prop('checked', true);
      $('.addAndDeleteSpan').html('Remove');
      console.log(newElement);
    });
  }
}

// function to remove an item from the localstorage
function removeItem(event, array) {
  event.target.parentElement.parentElement;
  array.splice(event,1)
  
  if (document.location.pathname === "/saveToLater.html") { // only delete item off of the saveToLater page

    event.target.parentElement.parentElement.remove();
  }

  let arrayStringify = JSON.stringify(array);
  localStorage.setItem("saveForLater" , arrayStringify); // pushing new values into localstorage
}

// function to add an item to the saveToLater page
function addItem(array) {
  let button = event.target;
  let itemSelector = button.parentElement.parentElement.innerHTML;
  
  for (let i = 0; i < array.length; i++) {
    if (array[i].body === itemSelector) {
      alert("This is already in your saved items!"); // safety to loop through and see the items are within the array already
      return 
    }
  }

  let saveItem = {body: itemSelector}; // creating object
  array.push(saveItem);
  console.log(array);
  let arrayStringify = JSON.stringify(array);
  localStorage.setItem("saveForLater" , arrayStringify); // pushing item into localstorage
}

// nav-bar hover drop-down list
function dropDownList() {
  $('nav li').hover(
    function() {
      $('ul', this).stop().slideDown(200);
    },
    function() {
      $('ul', this).stop().slideUp(200);
    }
  );
}

// checking which element are in the save for later page and what to check on the main page
function checkOnLoad() {
  let storageArray = JSON.parse(localStorage.getItem("saveForLater"));

  if (storageArray !== null && document.location.pathname === "/index.html") {
    storageArray.forEach(function(item, index) { // for each loop to find index of the item
      let itemKey = item.body;
      let content = document.querySelectorAll('.content');

        if (content[index] = itemKey) {

          // switch case to check or uncheck the inputs
          switch (index) {
            case 0:
              document.getElementById("checkbox0").checked = true;
              break;
            case 1:
              document.getElementById("checkbox1").checked = true;
              break;
            case 2:
              document.getElementById("checkbox2").checked = true;
              break;
          }
        }
    });
  }
}

function likeButtonAnimation() { // hover animation for the like button
  $('.addToSaved').mouseover(function() {
    $(this).fadeTo(500, 0.33).fadeTo(500, 1).fadeTo(500, 0.33).fadeTo(500, 1);
  })
  $('.addToSaved').mouseout(function() {
    $('.addToSaved').finish();
    $('.addToSaved').fadeIn(750);
  })
};

function hideOrShow() { // function for the hide or show function
  $('.hideOrShow').children('span').click(function() {

      if($(this).parent().children('span').text() === 'Hide') {
        $(this).parent().children('img').hide();
        $(this).parent().children('span').text("Show");
      }
      else if($(this).parent().children('span').text() === 'Show') {
        $(this).parent().children('img').show();
        $(this).parent().children('span').text("Hide");
      }
  });
}

function submitButtonClick() { // notification for submit button to alert when message has been sent
  $('#submitBtn').click(function(){
    alert('Your message has been sent! We will get back to you soon!');
  });
}
