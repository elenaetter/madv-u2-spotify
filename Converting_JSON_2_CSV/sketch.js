function preload() {
   


   // dataElena = loadJSON("https://raw.githubusercontent.com/elenaetter/madv-u2-spotify/main/ElenaSpotifyData/StreamingHistoryALL.json")
    
    dataElena = loadJSON("ElenaStreamingHistoryALL.json")
   dataSam = loadJSON("SamStreamingHistoryALL.json")
    dataJana = loadJSON("JanaStreamingHistoryALL.json")

}

function setup() {
    // put setup code here
    //print(data.tracks[0].artist)

    //for (let t=0; t<data.tracks.length; t++) {
    //  print(data.tracks[t].artist)
    //}

  //  print(dataElena.length)
    
    saveTracks()
}

function draw() {
    // put drawing code here
}

function saveTracks() {
    table = new p5.Table();

    table.addColumn('Artist');
    table.addColumn('Track');
    table.addColumn('msPlayed');
    table.addColumn('Name');

    addTracksToTable(table, dataElena, "Elena")
    addTracksToTable(table, dataSam, "Sam")
    addTracksToTable(table, dataSam, "Jana")

    saveTable(table, 'Artist_Track_msPlayed.csv');
}

function addTracksToTable(table, data, name) {
    for (let t = 0; t < Object.keys(data).length; t++) {
        let newRow = table.addRow();
        newRow.setString('Artist', '"' + data[t].artistName + '"');
        newRow.setString('Track', '"' + data[t].trackName + '"');
        newRow.setNum('msPlayed',data[t].msPlayed);
        newRow.setString('Name', '"' + name + '"');
    }
}
