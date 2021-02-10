var maxX

let chkJ;
let chkS;
let chkE;

let canvasheight = 500;

function preload() {
    table = loadTable('MADV_U2_Spotify.02 - daily.csv', 'csv', 'header');
}

function setup() {
    var c = createCanvas(innerWidth, canvasheight);

    // Get max hours so we can set the x axis max value
    // QUESTION FOR LL: CAN I FET MAXX OF SEVERAL COLUMNS?
    maxX = max(table.getColumn('J ms played'))

    chkJ = select("#boxJ");
    chkS = select("#boxS");
    chkE = select("#boxE");

}

function draw() {
    background('#f7f7f7')

    var chartParams = {}

    angleMode(DEGREES);
    rectMode(CENTER);

    if (chkJ.checked()) {
        HBarChart(table, "J ms played", "jana", color('#4dff7c'))
    }

    if (chkS.checked()) {
        HBarChart(table, "S ms played", "sam", color('#59fffc'))
    }

    if (chkE.checked()) {
        HBarChart(table, "E ms played", "elena", color('#ff5e66'))
    }

}

function HBarChart(data, columnName, where, barColour) {
    // Get number of rows (i.e. number of data points)
    var rowCount = data.getRowCount();

    let hours = data.getColumn(columnName)
    
    // Define the drawing area L/R
    if (where == "jana") {
        drawingLeft = canvasheight
        drawingRight = 50
    } else if (where == "sam") {
        drawingLeft = canvasheight
        drawingRight = 50
    } else if (where == "elena") {
        drawingLeft = canvasheight
        drawingRight = 50
    }

    // Compute width of the bar (barHeight=width)
    barGap = 0
    barHeight = (drawingLeft - drawingRight) / rowCount
    
    // Define the drawing area T/B
    if (where == "jana") {
        drawingTop = 100
        drawingBottom = width - 100
    } else if (where == "sam") {
        drawingTop = 100 + barHeight
        drawingBottom = width - 100 + barHeight
    } else if (where == "elena") {
        drawingTop = 100 + barHeight*2
        drawingBottom = width - 100 + barHeight*2
    }

    // Go through each row of data, drawing one bar for each row
    for (var r = 0; r < rowCount; r++) {
        //noLoop()

        var xVal = parseInt(hours[r], 10);

        // For this row, compute the y coordinate of the top of the bar, mapping the row index r from data coordinates to screen coordinates
        var y = map(r, 0, rowCount, drawingTop, drawingBottom);

        // For this row, compute the x coordinate of the right of the bar, mapping number of medals to screen coordinates
        // width and height???
        var w = map(xVal, 0, maxX, 0, (canvasheight*2)-drawingRight);

        // Draw the bar
        noStroke()
        fill(barColour)
        rect(y, canvasheight / 2, barHeight, w/2)

        /*
        // Draw the day of the week
        push()
        if (where == "elena") {
            translate(y + 10, canvasheight / 2) // move the drawing origin back to the right hand side of the labels
            noStroke();
            fill('black')
            textFont('Work Sans');
            textSize(10);
            textAlign(CENTER);
            text(table.get(r, "day"), -barGap, 0);
        }
        pop()
        */

        /*
        // Draw the hour count
        push() // save the current drawing styles and transformations
        if (where == "jana") {
            translate(y, (((w + (drawingRight)) / 2) + drawingRight * 2) + 10)
            noStroke();
            fill('#4dff7c')
            textFont('Work Sans');
            textSize(barHeight);
            textAlign(CENTER);
            textStyle(BOLD);
            text(table.get(r, "J hours played"), 0, 0);
        } else if (where == "sam") {
            translate(y, (((w + (drawingRight)) / 2) + drawingRight * 2) + 10)
            noStroke();
            fill('#59fffc')
            textFont('Work Sans');
            textSize(barHeight);
            textAlign(CENTER);
            textStyle(BOLD);
            text(table.get(r, "S hours played"), 0, 0);
        } else if (where == "elena") {
            translate(y, (((w + (drawingRight)) / 2) + drawingRight * 2) + 10)
            noStroke();
            fill('#ff5e66')
            textFont('Work Sans');
            textSize(barHeight);
            textAlign(CENTER);
            textStyle(BOLD);
            text(table.get(r, "E hours played"), 0, 0);
        }
        
        pop() // restore the current drawing styles and transformations
        */
    }

    /* Draw the title
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
    */
}
