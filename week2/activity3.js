function deepEqual(obj1, obj2) {
    if ((typeof obj1 === "object" && obj1 != null) && (typeof obj2 === "object" && obj2 != null)) {
        //they're both objects, so continue by looking at the object properties...
        for (var prop in obj1) {
            //if they're not the same types, we're done (return false)
            if (typeof obj1[prop] != typeof obj2[prop]) {
                return false;
            }

            //console.log("----comparing '" + prop + "' values: " + JSON.stringify(obj1[prop]) + " vs. " + JSON.stringify(obj2[prop]));

            //if the prop itself is an object, run the comparison a level deeper
            if (typeof obj1[prop] == "object" && prop != null) {
                if (!deepEqual(obj1[prop], obj2[prop])) return false;
            }

            //if prop isn't an object, and the two aren't the same, we're done (return false)
            if (typeof obj1[prop] != "object" && obj1[prop] != obj2[prop]) {
                return false;
            }
        }
        return true;
    } else {
        if (obj1 === obj2) {
                return true;
            } else {
                return false;
            }
    }
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
