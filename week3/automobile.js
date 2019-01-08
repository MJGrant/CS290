/* Amanda Grant CS290 Summer 2018 onid: granaman date: July 10, 2018 */

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

Automobile.prototype.logMe = function(printAll) { //printAll is a boolean
    //Each line representing a car should be produced via a logMe function.
    //This function should be added to the Automobile class and accept a single boolean argument.
    //If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile.
    //If the argument is 'false' then the type is ommited and just the "year make model" is logged.
    if (printAll) {
        console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
    } else {
        console.log(this.year + " " + this.make + " " + this.model);
    }
};

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects
appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0
and the smallest in the last index*/
function sortArr( comparator, array ){
    //returning a new array to satisfy assignment requirements; we could have run sort on array itself (it's passed by reference)
    var sortedArr = array.sort(comparator);
    return sortedArr;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules
then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2) {
    //put auto2 as arg1 and auto1 as arg2 to sort the cars in "reverse"
    //this produces the desired "newest cars on top" sorting effect
    return exComparator(auto2.year, auto1.year);
}

/*This compares two automobiles based on their make.
It should be case insensitive and makes which are alphabetically earlier in
the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    return exComparator(auto1.make.toLowerCase(), auto2.make.toLowerCase());
}

/*This compares two automobiles based on their type.
The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed).
It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    //let's first assign a value to each known type
    var carTypeValues = {"roadster":1, "pickup":2, "suv":3, "wagon":4};
    var carType1 = carTypeValues[auto1.type.toLowerCase()];
    var carType2 = carTypeValues[auto2.type.toLowerCase()];

    //catch any types not covered in carTypeValues map
    if (carType1 === undefined) carType1 = 5;
    if (carType2 === undefined) carType2 = 5;

    var ret;
    if (carType1 === carType2) {
         //if the types are the same, then we have to use the model year to determine superiority
        //put auto2 first to sort such that a higher year is first
        ret = exComparator(auto2.year, auto1.year);
    } else {
        //otherwise, use those values (1-5) instead of the string literal as the basis for comparison
        ret = exComparator(carType1, carType2);
    }

    return ret;

    //I referenced this stack overflow query for ideas on sorting based on arbitrary values
    //https://stackoverflow.com/questions/42276580/how-to-sort-an-array-based-on-arbitrary-object-values
}

/*Your program should output the following to the console.log, including the opening and closing 5 stars.
All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function.
This function should be added to the Automobile class and accept a single boolean argument.
If the argument is 'true' then it prints "year make model type" with the year, make, model and type being
the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the
"year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

console.log("*****");
console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles).forEach(function(car) {
    car.logMe(false); //when sorting by year, do not show type
});

console.log(""); //space
console.log("The cars sorted by make are:");
sortArr(makeComparator, automobiles).forEach(function(car) {
    car.logMe(false); //when sorting by make, do not show type
});


console.log(""); //space
console.log("The cars sorted by type are:");
automobiles.sort(typeComparator).forEach(function(car) {
    car.logMe(true); //when sorting by type, show type
});

console.log("*****");
