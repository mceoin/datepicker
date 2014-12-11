$(document).ready(function(){

todayObject = new Date();
todayYear = todayObject.getFullYear();
todayMonth = todayObject.getMonth();
todayDate = todayObject.getDate();
todayDay = todayObject.getDay(); // n.b. returns array position of [S,M,T,W,T,F,S]
daysThisMonth = daysInMonth(todayMonth, todayYear)

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

function ViewModel() {

    this.years = yearObjects;
    this.chosenYear = ko.observable();

    this.months = monthsArray;
    this.chosenMonth = ko.observable();

    this.dates = dateObjects;
    this.chosenDate = ko.observable();
    // this.dates = ko.observableArray(datesArray);

  };

  ko.applyBindings(new ViewModel());
}); // end of $(document).ready