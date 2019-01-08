/* Amanda Grant (Mandi) onid: Granaman */
/* Summer 2018 CS 290 Week 4 */

selectedCell = {x:0, y:0};

/* Button methods */
function buttonPress() {

    currentCell = getSelectedCell();

    if (this.id === "btn-mark-cell") {
        markCell();
    }

    if (this.id === "btn-up") {
        if (currentCell.x > 1) {
            borderSelectedCell(currentCell.x, currentCell.y, false);
            setSelectedCell(currentCell.x - 1, currentCell.y);
        }
    }

    if (this.id === "btn-down") {
        if (currentCell.x < 3) {
            borderSelectedCell(currentCell.x, currentCell.y, false);
            setSelectedCell(currentCell.x + 1, currentCell.y);
        }
    }

    if (this.id === "btn-left") {
        if (currentCell.y > 1) {
            borderSelectedCell(currentCell.x, currentCell.y, false);
            setSelectedCell(currentCell.x, currentCell.y - 1);
        }
    }

    if (this.id === "btn-right") {
        if (currentCell.y < 4) {
            borderSelectedCell(currentCell.x, currentCell.y, false);
            setSelectedCell(currentCell.x, currentCell.y + 1);
        }
    }
}

function setSelectedCell(xVal, yVal) {
    this.selectedCell = {x: xVal, y: yVal};
    borderSelectedCell(xVal, yVal, true);
}

function getSelectedCell() {
    return this.selectedCell;
}

function borderSelectedCell(x, y, thickBorder) {
    var selectedCell = document.getElementById("cell-" + x + "-" + y);
    if (thickBorder) {
        selectedCell.style.border = "2px solid black";
    } else {
        selectedCell.style.border = "1px solid black";
    }
}

function markCell() {
    var selectedCell = getSelectedCell();
    markedCell = document.getElementById("cell-" + selectedCell.x + "-" + selectedCell.y);
    markedCell.style.background = "yellow";
}

/* Build the table */
var newTable = document.createElement("table");
//create each row
for (var i = 0; i <= 3; i++) {
    var newRow;
    if (i === 0) {
        newRow = document.createElement("thead");
    } else {
        newRow = document.createElement("tr");
    }
    //create each cell within the current row
    for (var j = 1; j <= 4; j++) {
        var newCell = document.createElement("td");
        //put the "1,2" style text into that cell
        if (i === 0) {
            newCell.textContent = "Header " + j;
        } else {
            newCell.textContent = i + ", " + j;
        }
        newCell.style.border = "1px solid black";
        newCell.id = "cell-" + i + "-" + j;
        newRow.appendChild(newCell);
    }
    newTable.appendChild(newRow);
}

newTable.style.border = "1px solid black";
document.getElementById("body").appendChild(newTable);
setSelectedCell(1,1); //default cell

/* Create the buttons */
var buttonLabels = ["Up", "Down", "Left", "Right", "Mark Cell"];
for (var i = 0; i < buttonLabels.length; i++) {
    var button = document.createElement("button");
    button.textContent = buttonLabels[i];
    button.id = "btn-" + buttonLabels[i].toLowerCase().replace(/\s+/g, '-');
    button.addEventListener("click", buttonPress);
    document.getElementById("body").appendChild(button);
}



