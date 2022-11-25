  /* Work Day Scheduler.*/

$(document).ready(function(){

    /* Each button is tied to its own event to be saved to localstorage. */

  $('.saveBtn').each(function(){ 
  $(this).on('click', function(){
    var eventTime = $(this).parent().attr('id');  // this button's parents attribute id name = ex:  9AM, 10AM, 11AM;  Used as key name.
    var eventTxt = $(this).prev().val();
    localStorage.setItem(eventTime, eventTxt);
    })
  })

    /* Checks each areas id to the time to change background to/from past present future. */    

  $('.hour').each(function(){
    var rowTime = $(this).parent().attr('id');    
    var currentEvent = dayjs().format('HH');
    if(rowTime > currentEvent){
      $(this).parent().removeClass('past').addClass('future');
    }else if(rowTime < currentEvent){
      $(this).parent().removeClass('present').addClass('past');
    }else if(rowTime === currentEvent){
      $(this).parent().removeClass('future').addClass('present');
    }
  })

    /* Pulls saved events from Localstorage to continually be displayed in text area */

  $('.description').each(function(){
    $(this).val(localStorage.getItem($(this).parent().attr('id')));
  })

/* Displays current Day, Date, Time. */

  function currentTime(){
    var reformatDate = dayjs().format('ddd, MMMM D YYYY, h:mm:ss a');
    $('#currentDay').text(reformatDate);
  }
  setInterval(currentTime, 1000);
});
