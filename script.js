  /* Work Day Scheduler.*/
  $(document).ready(function(){

    const currentDay = `<header class="p-5 mb-4 border-5 border-bottom border-dark text-center">
    <h1 class="display-3">Work Day Scheduler</h1>
    <p class="lead">A simple calendar app for scheduling your work day</p>
    <p id="current-Day" class="lead"></p>
    </header>`;

    const scheduleContainer = `<div class="container-lg px-5"></div>`

    const timeEventBlock = `<div class="row time-block ">
    <div class="col-2 col-md-1 hour py-3">9 am</div>
    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`

  const ids = ['09', '10', '11', '12', '13', '14', '15', '16', '17'];
  const tabTimes = ['9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm'];


/*Body prepends Date/Time and the Container to hold all timeEventBlocks.*/
  $('.Schedule').prepend(currentDay, scheduleContainer);

/*Append timeEventBlocks to the length of ids array.*/
  ids.forEach(function(){
    $('.container-lg').append(timeEventBlock);
      
  })

/*Giving each row its own id for time comparison.*/
  let id = 0;
  $('.row').each(function(){   
   $(this).attr('id', ids[id]);
    id++;
  })

/*Time tab label on the left side of each row.*/
  let tabTime = 0;
  $('.hour').each(function(){
    $(this).text(tabTimes[tabTime]);
    tabTime++;
  })

/* Each button is tied to its own event to be saved to localstorage.*/
  $('.saveBtn').each(function(){ 
    $(this).on('click', function(){
      let eventTime = $(this).parent().attr('id');  // this button's parents attribute id name = ex:  9AM, 10AM, 11AM;  Used as key name.
      let eventTxt = $(this).prev().val();
      localStorage.setItem(eventTime, eventTxt);
    })
  })

/* Pulls saved events from Localstorage to continually be displayed in text area.*/
  $('.description').each(function(){
    $(this).val(localStorage.getItem($(this).parent().attr('id')));
  })

/* Displays current Day, Date, Time to the second.
   Continuously checks current time to add class past/present/future.*/
   setInterval(function(){

    let reformatDate = dayjs().format('ddd, MMMM D YYYY, h:mm:ss a');
    $('#current-Day').text(reformatDate); //display current time to the second.

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