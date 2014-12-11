$(document).ready(function(){

todayObject = new Date()
todayMonth = todayObject.getMonth()
todayYear = todayObject.getFullYear()

yearsToDate = _.range(1970, todayYear+1) // note: 1970 was the first javascript Date year

yearObjects = _.map(yearsToDate, function(num){
                  return _.object(['name'], [num]); // returns an array of {name: year} hashes
                })

monthsArray = [ {name: "January"}, {name: "February"}, {name: "March"}, {name: "April"}, {name: "May"}, {name: "June"}, {name: "July"}, {name: "August"}, {name: "September"}, {name: "October"}, {name: "November"}, {name: "December"} ]

function YearsViewModel() {
  this.years = yearObjects;
  this.chosenYear = ko.observable();
};

function ViewModel() {

    this.years = yearObjects;
    this.chosenYear = ko.observable();
    this.months = monthsArray;
    this.chosenMonth = ko.observable();

  };

  // Knockout Bindings
  ko.applyBindings(new ViewModel());

}); // end of $(document).ready