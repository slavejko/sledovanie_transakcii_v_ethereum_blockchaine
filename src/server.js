const express = require('express');
const app = express();
const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017";                    // to change the address and port of the database
const dbName = "ethereum_data";                             // to change the name of the database       
const collection_to = "data_to";                            // to change collection name for direction "TO" (incoming)
const collection_from = "data_from";                        // to change collection name for direction "FROM" (outgoing)
const publicFolder = "public";                              // to change the name of the public folder containg frontend
const appPort = 3000;                                       // to change the port of endpoint
const apiUrl = '/api';                                      // to change the url of the endpoint


// Prints out logs of objects returned
function printOutLogs(masterArray){
    for(let de = 0; de < masterArray.length; de++){
        console.log(`Depth: ${de}`);
        console.log(masterArray[de]);
        console.log("End of depth");
        console.log("");
    }
}


// Returns whether or not the timestamp is in our range
function checkTimestamp(startDate, transaction, endDate){
    return parseInt(startDate) < parseInt(transaction.time + "000") && parseInt(endDate) > parseInt(transaction.time + "000");
}


// Returns data based on user input
async function getData(inputAddr, depth, width, direction, startDate, endDate) {

    if(direction == "to"){
        var collectionName = collection_to;
    }else if(direction == "from"){
        var collectionName = collection_from;
    }

    const connectionDB = new MongoClient(uri);
    try {
        await connectionDB.connect();
        const ethConnect = connectionDB.db(dbName);
        const txCollection = ethConnect.collection(collectionName);

        // Looks for the input wallet and converts it into an array
        const inputSearch = await txCollection.find({"_id": inputAddr});    
        const firstOutputArray = await inputSearch.toArray();

        // Checks for errors
        if(firstOutputArray.length == 0){
            console.log(`Error - nenašli sa žiadne dáta pre ${inputAddr}`);
            return [];
        }
        
        if(firstOutputArray.length > 1){
            console.error(`Error, výsledok nemá byť vačší ako 1 (chyba spracovania) - je ${firstOutputArray.length}`);
            return -99;
        }

        var masterArray = [];
        var myResultArray = [];
        var countInRange = 0;

        var firstArrLength = firstOutputArray[0].tx.length > width ? width : firstOutputArray[0].tx.length;

        for(let ir = 0; ir < firstArrLength; ir++){
            if(checkTimestamp(startDate, firstOutputArray[0].tx[ir], endDate)){
                myResultArray.push(firstOutputArray[0].tx[ir]);
                countInRange++;
            }
        }

        if(countInRange == 0){
            return -14;
        }

        masterArray.push(myResultArray);

        for(let dpth = 0; dpth < depth -1; dpth++){
            tmp_ar = [];
            for(let dpthTx = 0; dpthTx < myResultArray.length; dpthTx++){
                if(checkTimestamp(startDate, myResultArray[dpthTx], endDate)){

                    if(direction == "to"){
                        var inTempArray = await txCollection.find({"_id": myResultArray[dpthTx].from});  
                    }else if(direction == "from"){
                        var inTempArray = await txCollection.find({"_id": myResultArray[dpthTx].to});  
                    }else{
                        console.log(`Vyskytol sa problém - hodnota SMER nie je ani TO ani FROM. Aktuálna hodnota: ${direction}`);
                        return null;
                    }

                    const inResultArray = await inTempArray.toArray();

                    for(let ia = 0; ia < inResultArray.length; ia++){
                        tmp_ar.push(inResultArray[0].tx[ia]);
                    }
                }
            }
            masterArray.push(tmp_ar);
            myResultArray = [];
            myResultArray = tmp_ar;
        }
        
        // Prints logs to the server console
        printOutLogs(masterArray);

        return masterArray;
        
    } catch (error) {
        console.log(`Error in getDate function: ${error}`);
    }finally{
        connectionDB.close();
    }
}


// Starts the server and listens on port
app.listen(appPort, () => console.log(`Server spustený - počúva na porte 3000`));
// Exposes public folder
app.use(express.static(publicFolder));
app.use(express.json());


// Listens for post request on '/api'
app.post(apiUrl, (request, response) => {
    var inDepth = request.body.depth;
    var inWidth = request.body.width;

    if(request.body.width == ""){
        inWidth = 10;
    }

    if(request.body.depth == ""){
        inDepth = 5;
    }

    if(request.body.width > 30){
        inWidth = 30;
    }
    
    if(request.body.depth > 20){
        inDepth = 20;
    }

    // After post requests and checks, calls getData() and then answers with response
    getData(request.body.wallet, inDepth, inWidth, request.body.direction, request.body.start, request.body.end).then(x => {
        response.json(x);
    })

});