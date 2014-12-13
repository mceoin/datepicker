$(document).ready(function(){

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

// var d = new Date(year, month, day);

// update date functions BEGIN //
updateDateObject = function(){
  currentDateObject = new Date(currentYear, currentMonth, currentDay);
   console.log("-----------------------------------------------");
  console.log("The current date is: " + currentDateObject);
  console.log("-----------------------------------------------");
  currentYear = currentDateObject.getFullYear()
  currentMonth = currentDateObject.getMonth()
  currentDay = currentDateObject.getDate()

  console.log("The current year is: " + currentYear);
  console.log("The current month is: " + currentMonth);
  console.log("The current day is: " + currentDay);
}


upYear = function(){
  currentYear = currentYear + 1;
  updateDateObject();
  $('.yearValue').text(currentYear)
}

downYear = function(){
  currentYear = currentYear - 1;
  updateDateObject();
  $('.yearValue').text(currentYear)
}

upMonth = function(){
  currentMonth = currentMonth + 1;
  updateDateObject();
  $('.monthValue').text(currentMonth)
}

downMonth = function(){
  currentMonth = currentMonth - 1;
  updateDateObject();
  $('.monthValue').text(currentMonth)
}

upDay = function(){
  currentDay = currentDay + 1;
  updateDateObject();
  $('.dayValue').text(currentDay)
}

downDay = function(){
  currentDay = currentDay - 1;
  updateDateObject();
  $('.dayValue').text(currentDay)
}

// modify dates
$('.upYear').click(upYear)
$('.downYear').click(downYear)
$('.upMonth').click(upMonth)
$('.downMonth').click(downMonth)
$('.upDay').click(upDay)
$('.downDay').click(downDay)

// set initial date values
$('.yearValue').text(currentYear)
$('.monthValue').text(currentMonth)
$('.dayValue').text(currentDay)

// update date functions END //

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
// date selector
selectDate = function(){
  var selector = '.datepicker_day';

  $(selector).on('click', function(){
      $(selector).removeClass('active');
      $(this).addClass('active');
  });
}
// end date selector

logdate = function(d){console.log(d)}

}); // end of $(document).ready