$(document).ready(function(){

  todayObject = new Date();
  todayYear = todayObject.getFullYear();
  todayMonth = todayObject.getMonth();
  todayDate = todayObject.getDate();
  todayDay = todayObject.getDay(); // n.b. returns array position of [S,M,T,W,T,F,S]
  daysThisMonth = daysInMonth(todayMonth+1, todayYear)

  currentDateObject = todayObject
  currentYear = todayYear
  currentMonth = todayMonth
  currentDay = todayDate

  function daysInMonth(month,year) { //Month is 1 based
      return new Date(year, month, 0).getDate();
  }

  yearsToDate = _.range(1970, todayYear+1) // note: 1970 was the first javascript Date year

  yearObjects = _.map(yearsToDate, function(num){
                    return _.object(['year'], [num]); // return array of year hashes
                  })

  monthsArray = [ {month: "January"}, {month: "February"}, {month: "March"}, {month: "April"}, {month: "May"}, {month: "June"}, {month: "July"}, {month: "August"}, {month: "September"}, {month: "October"}, {month: "November"}, {month: "December"} ]

  datesArray = _.range(1, daysThisMonth+1)

  dateObjects = _.map(datesArray, function(num){
                    return _.object(['date'], [num]); // return array of date hashes
                  })

  // update date functions BEGIN //
  updateDateObject = function(){ //note: we reset the currentYear/Month/Day to keep calendar current with "real" dates. (otherwise -34 & + 61 become real date)
    currentDateObject = new Date(currentYear, currentMonth, currentDay);
    currentYear = currentDateObject.getFullYear();
    currentMonth = currentDateObject.getMonth();
    currentDay = currentDateObject.getDate();
    updateDates();
    paintDays();
  }

  upYear = function(){
    currentYear = currentYear + 1;
    updateDateObject();
  }

  downYear = function(){
    currentYear = currentYear - 1;
    updateDateObject();
  }

  upMonth = function(){
    currentMonth = currentMonth + 1;
    updateDateObject();
  }

  downMonth = function(){
    currentMonth = currentMonth - 1;
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

  // set initial date values/update date values
  updateDates = function(){
  $('.yearValue').text(currentYear)
  $('.monthValue').text((monthsArray[currentMonth]).month)
  $('.dayValue').text(currentDay)
  }

  updateDates();

  // update date functions END //
  paintDays = function(){
    if (($('.datepicker_day')) != []){
      $('.datepicker_day').remove()
    }

    // calculate starting day
    for (var i=0; i < (currentDateObject.getDay()-1); i++){
      $('.datepicker_days').append("<div class='datepicker_day'></div>");
    }

    // populate days
    for (var i=0; i < daysInMonth(currentMonth+1, currentYear); i++){
      var day = i+1
      $('.datepicker_days').append("<div class='datepicker_day' data-day="+day+">"+day+"</div>");
      } // end populate days loop

      function dateSelector(){
        var divItem = this;
        currentDay = $(divItem).data("day");
        updateDates()
      }

      $('.datepicker_day').on("click", dateSelector)

  }; // end paintDays function
  paintDays();

}); // end of $(document).ready