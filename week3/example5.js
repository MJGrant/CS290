function buildList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    var item = 'item' + list[i];
    result.push(function(iLocal, itemLocal) {
      return function() {
        alert(itemLocal + ' ' + list[iLocal]);
      };
    }(i, item));
  }
  return result;
}

function testList() {
  var fnlist = buildList([1,2,3]);
  // using j only to help prevent confusion - could use i
  for (var j = 0; j < fnlist.length; j++) {
    fnlist[j]();
  }
}

testList();

//I followed the lecture example: use () after the function to invoke it immediately, passing it the value of i
//i comes in as "iLocal", named such to make clear its purpose (and the extent of its scope) in the function
//The same thing was done for item (itemLocal)
//jsfiddle: https://jsfiddle.net/35gsbxpr/
