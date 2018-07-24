var getCurrentMonth = function() {
    console.log("getting month");
    var dateObject = new Date();
    var currentMonth = dateObject.getMonth();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[currentMonth];
};

var getCurrentYear = function() {
    var dateObject = new Date();
    var currentYear = dateObject.getYear();
    return currentYear;
};
