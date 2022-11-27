/* Work Day Scheduler.*/

/* Allow document to load first.*/
$(document).ready(function(){
  
/* Each button is tied to its own event to be saved to localstorage. */
  $('.saveBtn').each(function(){ 
  $(this).on('click', function(){
    let eventTime = $(this).parent().attr('id');  // Each button's parent's attribute id name = ex:  '09', '10', '11';  Used as key name.
    let eventTxt = $(this).prev().val();    //Grab each child's value that is before the button.
    localStorage.setItem(eventTime, eventTxt);
    })
  })

/* Pulls saved events from Localstorage.
   They are respective to their own parent.*/
  $('.description').each(function(){
    $(this).val(localStorage.getItem($(this).parent().attr('id')));
  })

/* Displays current Day, Date, Time to the second.
   Continuously checks current time to add class past/present/future.*/
  setInterval(function(){

    let reformatDate = dayjs().format('ddd, MMMM D YYYY, h:mm:ss a');
    $('#currentDay').text(reformatDate); //display current time to the second.

    $('.hour').each(function(){   //checks parents id to the current hour.
      let rowTime = $(this).parent().attr('id');    
      let currentEvent = dayjs().format('HH');
      if(rowTime > currentEvent){   //depending on eachother's value from one another change class.
        $(this).parent().removeClass('past').addClass('future');
      }else if(rowTime < currentEvent){
        $(this).parent().removeClass('present').addClass('past');
      }else if(rowTime === currentEvent){
        $(this).parent().removeClass('future').addClass('present');
      }
    })
  }, 1000);

});



/*  zMaG33z  */