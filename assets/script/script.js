// Target the time block that contains the save-button that was clicked.
// Save the text typed in that time-block in it's designated time.
function handleTaskSave(event) {
  var timeClicked = $(event.target);
  var blockTime = timeClicked.parent('.time-block').attr('id');
  var blockText = timeClicked.siblings('textarea').val();
  localStorage.setItem(blockTime, JSON.stringify(blockText));
  
  console.log('Saved on Time: ' + blockTime);
  console.log('Saved Content: ' + JSON.stringify(blockText));
}

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var timeBlocks = $('.time-block');
  timeBlocks.children('button').on('click', handleTaskSave);
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  console.log(dayjs().hour());
  timeBlocks.each( function() {
    var hourId = $(this).attr('id');
    var hourNum = hourId.split('-')[1];
    if (hourNum < dayjs().hour()) {
      $(this).removeClass('present future');
      $(this).addClass('past');
    }
    else if (hourNum == dayjs().hour()) {
      $(this).removeClass('past future');
      $(this).addClass('present');
    }
    else {
      $(this).removeClass('past present');
      $(this).addClass('future');
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  timeBlocks.each( function() {
    var savedText;

    try {
      savedText = JSON.parse(localStorage.getItem($(this).attr('id')));
    } catch (e) {
      // How unfortunate.
    }

    if (savedText !== null) {
      $(this).children('textarea').val(savedText);
    }
  })

  // TODO: Add code to display the current date in the header of the page.
  console.log(dayjs().format('dddd, MMMM D'))
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));
});

