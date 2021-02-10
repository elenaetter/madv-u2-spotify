var maxX

let chkJ;
let chkS;
let chkE;

function preload() {
    table = loadTable('MADV_U2_Spotify.02 - calculations.csv', 'csv', 'header');
}

function setup() {
    var c = createCanvas(700, 700);

    // Get max hours so we can set the x axis max value
    maxX = max(table.getColumn('S ms played'))
    
    /* Checkboxes attempt 1
    checkbox1 = createCheckbox('Jana', false);
    checkbox1.changed(myCheckedEvent);
    */

    /* Checkboxes attempt 2
    // get the checkboxes by their id
    // .elt means get the html element 
    chkJ = select("#boxJ").elt;
    chkS = select("#boxS").elt;
    chkE = select("#boxE").elt;
    */

    noLoop();
}

function draw() {
    background(255)

    var chartParams = {}

    angleMode(DEGREES)

    HBarChart(table, "J ms played", "jana", color(155, 252, 76))
    HBarChart(table, "S ms played", "sam", color(3, 252, 236))
    HBarChart(table, "E ms played", "elena", color(255, 33, 96))
    
    /* Checkboxes attempt 2
    if (chkS.checked) {
			rect(100,100,100,100)
        print("checked")
		}
    */
    
    noLoop();

}

/* Checkboxes attempt 1
function myCheckedEvent() {
    //HBarChart(table, "J ms played", "jana", color(155, 252, 76))
    //HBarChart(table, "S ms played", "sam", color(3, 252, 236))
    //HBarChart(table, "E ms played", "elena", color(255, 33, 96))
}
*/

function HBarChart(data, columnName, where, barColour) {
    // Get number of rows (i.e. number of data points)
    var rowCount = data.getRowCount();

    let hours = data.getColumn(columnName)

    // Define the drawing area
    if (where == "jana") {
        drawingLeft = width - 100
        drawingRight = 100
        drawingTop = 100
        drawingBottom = height - 40
    } else if (where == "sam") {
        drawingLeft = width - 100
        drawingRight = 100
        drawingTop = 120
        drawingBottom = height - 20
    } else if (where == "elena") {
        drawingLeft = width - 100
        drawingRight = 100
        drawingTop = 140
        drawingBottom = height - 0
    }

    // Compute width of the bar
    barGap = 20
    barHeight = (drawingBottom - drawingTop) / rowCount * 0.5 - barGap

    // Go through each row of data, drawing one bar for each row
    for (var r = 0; r < rowCount; r++) {
        noLoop()

        var xVal = parseInt(hours[r], 10);

        // For this row, compute the y coordinate of the top of the bar, mapping the row index r from data coordinates to screen coordinates
        var y = map(r, 0, rowCount, drawingTop, drawingBottom);

        // For this row, compute the x coordinate of the right of the bar, mapping number of medals to screen coordinates
        var w = map(xVal, 0, maxX, drawingRight, drawingLeft);

        // Draw the bar
        noStroke()
        fill(barColour)
        rect(drawingRight, y, w, barHeight)

        // Draw the day of the week
        push()
        if (where == "sam") {
            translate(drawingRight / 2, y + 13) // move the drawing origin back to the right hand side of the labels
            rotate(-90);
            noStroke();
            fill('black')
            textSize(16);
            textAlign(CENTER);
            text(table.get(r, "weekday"), 0, 0);
        }
        pop()

        // Draw the hour count
        push() // save the current drawing styles and transformations
        if (where == "jana") {
            translate(drawingRight, y + 20)
            noStroke();
            fill('white')
            textSize(14);
            textAlign(LEFT);
            textStyle(BOLD);
            text(table.get(r, "J hours played"), 0, 0);
        } else if (where == "sam") {
            translate(drawingRight, y + 8)
            noStroke();
            fill('white')
            textSize(14);
            textAlign(LEFT);
            textStyle(BOLD);
            text(table.get(r, "S hours played"), 0, 0);
        } else if (where == "elena") {
            translate(drawingRight, y + 9)
            noStroke();
            fill('white')
            textSize(14);
            textAlign(LEFT);
            textStyle(BOLD);
            text(table.get(r, "E hours played"), 0, 0);
        }
        pop() // restore the current drawing styles and transformations
    }

    // Draw the title
    if (where == "jana") {
        posx = drawingRight
        posy = 10
        noStroke();
        fill(barColour)
        textAlign(LEFT, TOP);
        textSize(14);
        textStyle(BOLD);
        text('Jana', posx, posy);
    } else if (where == "sam") {
        posx = drawingRight
        posy = 27
        noStroke();
        fill(barColour)
        textAlign(LEFT, TOP);
        textSize(14);
        textStyle(BOLD);
        text('Sam', posx, posy);
    } else if (where == "elena") {
        posx = drawingRight
        posy = 45
        noStroke();
        fill(barColour)
        textAlign(LEFT, TOP);
        textSize(14);
        textStyle(BOLD);
        text('Elena', posx, posy);
    }
}
