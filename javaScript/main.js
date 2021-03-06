let array = [];

// when doc is ready perform these tasks
$(document).ready(function () {
  // calling of functions
  dropDownList();
  createSavedElementsOnReadlistPage();
  checkOnLoad();
  likeButtonAnimation();
  hideOrShowFunctionality();
  submitButtonClickAlert();

  // if no localstorage has been made make a new one
  if (localStorage.getItem("hasRunBefore") === null) {
    localStorage.setItem("saveForLater", JSON.stringify(array));
    localStorage.setItem("hasRunBefore", true);

    // else do this
  } else {
    let storageArray = JSON.parse(localStorage.getItem("saveForLater"));

    // this is the checkbox on the main page that allows you to save to later.
    // adding functionality to it
    $("input:checkbox").click(function (event) {
      if ($(this).is(":checked")) {
        $(".addToSaved").css("opacity", "1");
        addItem(storageArray);
        alert("This item has been added to your readList");
      } else if ($(this).is(":not(:checked)")) {
        removeItem(event, storageArray);
        alert("This item has been removed to your readList");
      }
    });
  }
});

// function to render the page elements of saveForLater
function createSavedElementsOnReadlistPage() {
  // if the restaurant path is this then do the following
  if (document.location.pathname === "/restaurant_project/saveToLater.html") {
    let storageArray = JSON.parse(localStorage.getItem("saveForLater"));

    storageArray.forEach(function (item) {
      // for each item in array do this:
      let container = document.getElementById("savedContainer");
      let newElement = document.createElement("div");
      newElement.innerHTML = item.body;
      container.appendChild(newElement);
      $(".checkbox").prop("checked", true);
      $(".addAndDeleteSpan").html("Remove");
      console.log(newElement);
    });
  }
}

// function to remove an item from the localstorage
function removeItem(event, array) {
  event.target.parentElement.parentElement;
  array.splice(event, 1);

  if (document.location.pathname === "/restaurant_project/saveToLater.html") {
    // only delete item off of the saveToLater page

    event.target.parentElement.parentElement.remove();
  }

  let arrayStringify = JSON.stringify(array);
  localStorage.setItem("saveForLater", arrayStringify); // pushing new values into localstorage
}

// function to add an item to the saveToLater page
function addItem(array) {
  let button = event.target;
  let itemSelector = button.parentElement.parentElement.innerHTML;

  for (let i = 0; i < array.length; i++) {
    if (array[i].body === itemSelector) {
      alert("This is already in your saved items!"); // safety to loop through and see the items are within the array already
      return;
    }
  }

  let saveItem = { body: itemSelector }; // creating object
  array.push(saveItem);
  console.log(array);
  let arrayStringify = JSON.stringify(array);
  localStorage.setItem("saveForLater", arrayStringify); // pushing item into localstorage
}

// nav-bar hover drop-down list with animation of it flowing down
function dropDownList() {
  $("nav li").hover(
    function () {
      $("ul", this).stop().slideDown(200);
    },
    function () {
      $("ul", this).stop().slideUp(200);
    }
  );
}

// checking which element are in the save for later page and what to check on the main page
function checkOnLoad() {
  if (document.location.pathname === "/restaurant_project/index.html") {
    let storageArray = JSON.parse(localStorage.getItem("saveForLater"));

    if (storageArray !== null) {
      storageArray.forEach(function (item) {
        // for each loop to find index of the item
        let itemKey = item.body;
        let content = document.querySelectorAll(".content");
        console.log(itemKey);

        for (let i = 0; i < content.length; i++) {
          if (content[i].innerHTML == itemKey) {
            // switch case to check or uncheck the inputs
            switch (i) {
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
        }
      });
    }
  }
}

function likeButtonAnimation() {
  // hover animation for the like button
  $(".addToSaved").mouseover(function () {
    $(this).fadeTo(500, 0.33).fadeTo(500, 1).fadeTo(500, 0.33).fadeTo(500, 1);
  });
  $(".addToSaved").mouseout(function () {
    $(".addToSaved").finish();
    $(".addToSaved").fadeIn(750);
  });
}

function hideOrShowFunctionality() {
  // function for the hide or show function
  $(".hideOrShow")
    .children("span")
    .click(function () {
      if ($(this).parent().children("span").text() === "Hide") {
        $(this).parent().children("img").hide();
        $(this).parent().children("span").text("Show");
      } else if ($(this).parent().children("span").text() === "Show") {
        $(this).parent().children("img").show();
        $(this).parent().children("span").text("Hide");
      }
    });
}

function submitButtonClickAlert() {
  // notification for submit button to alert when message has been sent
  $("#submitBtn").click(function () {
    alert("Your message has been sent! We will get back to you soon!");
  });
}
