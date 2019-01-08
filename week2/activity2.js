//Activity 2:
//Write a JavaScript program that declares a function but calls it before it is declared.
//Because of function hoisting this will work in JavaScript. Go prove it!

//Also write a function which is assigned to a variable.
//Call it before it is assigned and prove that this does not work.

shouldWork();

function shouldWork() {
    console.log("This oughta work even though I called it before I declared it");
}

shouldntWork();

var shouldntWork = function() {
    console.log("This will fail");
};


