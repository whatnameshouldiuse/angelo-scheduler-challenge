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

// Ensure all DOM functions are called after all elements are finished loading.
$(function () {
  // When save button is clicked, save the text written onto the respective time block.
  var timeBlocks = $('.time-block');
  timeBlocks.children('button').on('click', handleTaskSave);
  
  // Check the time assigned to each time block, and apply appropriate styling.
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

  // If a time block has a text saved to it in local storage, use that.
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

  // Display current date.
  console.log(dayjs().format('dddd, MMMM D'))
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));
});

