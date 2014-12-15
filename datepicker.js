$(document).ready(function(){

  createDatePicker = function() {
    $('.datepicker').append("<div class='datepicker_title'>Datepicker 4.0</div>")

    $('.datepicker').append("<div class='datepicker_container'></div>")

    //append years
    $('.datepicker_container').append("<div class='datepicker_year'><button class='downYear'><</button><text class='yearValue'></text><button class='upYear'>></button></div>")

    //append months
    $('.datepicker_container').append("<div class='datepicker_month'><button class='downMonth'><</button><text class='monthValue'></text><button class='upMonth'>></button></div>")

    // append days
    $('.datepicker_container').append("<div class='days_of_week'></div><div class='datepicker_days'></div>")
  } // end createDatePicker

  createDatePicker();

  $('.datepicker_title').on("click", function(){
      $('.datepicker_container').toggle()
    }
  )

  todayObject = new Date();
  todayYear = todayObject.getFullYear();
  todayMonth = todayObject.getMonth();
  todayDate = todayObject.getDate();
  todayDay = todayObject.getDay(); // n.b. returns array position of [S,M,T,W,T,F,S]
  daysThisMonth = daysInMonth(todayMonth, todayYear)

  currentDateObject = todayObject
  currentYear = todayYear
  currentMonth = todayMonth
  currentDay = todayDate

  function daysInMonth(month,year) { //Month is 1 based
      return new Date(year, month+1, 0).getDate();
  }


  yearsToDate = _.range(1970, todayYear+1) // note: 1970 was the first javascript Date year

  yearObjects = _.map(yearsToDate, function(num){
                    return _.object(['year'], [num]); // return array of year hashes
                  })

  monthsArray = [ {month: "January"}, {month: "February"}, {month: "March"}, {month: "April"}, {month: "May"}, {month: "June"}, {month: "July"}, {month: "August"}, {month: "September"}, {month: "October"}, {month: "November"}, {month: "December"} ]

  daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  populateDaysOfWeek = function(day){
    $('.days_of_week').append("<div class='day_of_week'>"+day+"</div>")
  }

  _.each(daysOfWeek, populateDaysOfWeek)


  datesArray = _.range(1, daysThisMonth+1)

  dateObjects = _.map(datesArray, function(num){
                    return _.object(['date'], [num]); // return array of date hashes
                  })

  checkDaysLegal = function() { //checks days in month is legal to stop skipping extra months when e.g. moving from August 31 to September.
  if ( currentDay > daysInMonth(currentMonth, currentYear) ) {
      currentDay = daysInMonth(currentMonth, currentYear);
    };
  };

  // update date functions BEGIN //
  updateDateObject = function(){
    currentDateObject = new Date(currentYear, currentMonth, currentDay);
    currentYear = currentDateObject.getFullYear();
    currentMonth = currentDateObject.getMonth();
    currentDay = currentDateObject.getDate();
    daysInCurrentMonth = daysInMonth(currentMonth, currentYear)
    updateDates();
    paintDays();
  }

  upYear = function(){
    currentYear = currentYear + 1;
    checkDaysLegal();
    updateDateObject();
  }

  downYear = function(){
    currentYear = currentYear - 1;
    checkDaysLegal();
    updateDateObject();
  }

  upMonth = function(){
    currentMonth = currentMonth + 1;
    checkDaysLegal();
    updateDateObject();
  }

  downMonth = function(){
    currentMonth = currentMonth - 1;
    checkDaysLegal();
    updateDateObject();
  }

  upDay = function(){
    currentDay = currentDay + 1;
    updateDateObject();
  }

  downDay = function(){
    currentDay = currentDay - 1;
    updateDateObject();
  }

  // modify dates
  $('.upYear').click(upYear)
  $('.downYear').click(downYear)
  $('.upMonth').click(upMonth)
  $('.downMonth').click(downMonth)
  $('.upDay').click(upDay)
  $('.downDay').click(downDay)

  // set initial selected date
  selectFirstDay = function() {
    $('[data-day='+currentDay+']').addClass('selected_day');
  }

  updateDates = function(){ //set & update date values
  $('.yearValue').text(currentYear)
  $('.monthValue').text((monthsArray[currentMonth]).month)
  $('.dayValue').text(currentDay)
  currentDateObject = new Date(currentYear, currentMonth, currentDay)
  }

  updateDates();

  // update date functions END //
  paintDays = function(){
  $('.datepicker_day').remove()
  $('.blank_day').remove()

    // get day position of first day of month
    function firstDayOfMonth(){
      var firstDay = new Date(currentYear, currentMonth, 1);
      return firstDay.getDay();
    }

    for (var i=0; i < firstDayOfMonth(); i++){
      $('.datepicker_days').append("<div class='blank_day'></div>");
    }

    // populate days
    for (var i=0; i < daysInMonth(currentMonth, currentYear); i++){
      var day = i+1
      $('.datepicker_days').append("<div class='datepicker_day' data-day="+day+">"+day+"</div>");
      } // end populate days loop

      function dateSelector(){
        var divItem = this;
        $('.selected_day').removeClass("selected_day")
        $(divItem).addClass("selected_day") // highlight selected day
        currentDay = $(divItem).data("day");
        updateDates()
        currentDateObject = new Date(currentYear, currentMonth, currentDay)
      }

      $('.datepicker_day').on("click", dateSelector)

  }; // end paintDays function

  paintDays();
  selectFirstDay();
}); // end of $(document).ready