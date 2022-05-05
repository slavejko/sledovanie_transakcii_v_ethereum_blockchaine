async function postData(wallet, width, depth, direction, start, end){

    // Meno premennej musi byt zhodne s server.js app.post filtrovanim 
    // Name of variable should be the same as in the server.js file app.post section for the search purposes
    
    const data = {wallet, width, depth, direction, start, end};
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    let mResponse = await fetch('api', options);
    let response_json = await mResponse.json();

    return response_json;
}


async function asyncPostData(iWallet, iWidth, iDepth, iDirection, iStartDate, iEndDate){
    return await postData(iWallet, iWidth, iDepth, iDirection, iStartDate, iEndDate);
}


// Function to get different width based on user input
function getOffsetY(width, direction){     
    if(direction == "from"){
        if(width <= 5){
            return 50;
        }else if(width > 5 && width <= 10){
            return 80;
        }else if(width > 10 && width <= 15){
            return 110;
        }else{
            return 150;
        }
    }else if(direction == "to"){
        if(width <= 5){
            return 500;
        }else if(width > 5 && width <= 10){
            return 600;
        }else if(width > 10 && width <= 15){
            return 670;
        }else{
            return 1000;
        }
    }
}


// Function to get different depth based on user input
function getOffsetX(depth, direction){
    if(direction == "from"){
        if(depth <= 5){
            return 600;
        }else if(depth > 5 && depth <= 10){
            return 350;
        }else if(depth > 10 && depth <= 15){
            return 200;
        }else if(depth > 15){
            return 100;
        }
    }else if(direction == "to"){
        if(depth <= 5){
            return 1000;
        }else if(depth > 5 && depth <= 10){
            return 1200;
        }else if(depth > 10 && depth <= 15){
            return 1250;
        }else{
            return 1400;
        }
    }
}


// Function to get different size based on user input
function getGraphSize(width){   
    if(width <= 5){
        return 400;
    }else if(width > 5 && width <= 10){
        return 500;
    }else if(width > 10 && width <= 15){
        return 600;
    }else if(width > 15){
        return 850;
    } 
}


// Function to get different canvas modifier  based on user input
function getModifier(depth, width, direction){
    if(direction == "to"){
        if(width > 15 && depth > 15){
            return 2.2;
        }
        return 3.8;
    }else {
        if(width > 15 && depth > 15){
            return 4.2;
        }
        return 6;
    }
}


// Function to create graph for "FROM" direction (outgoing transactions)
function createGraphFrom(myData, sirka, hlbka, poleSum){

    const offsetX = getOffsetX(hlbka, "from");
    const offsetY = getOffsetY(sirka, "from");
    const offsetTextX = 30;
    const offsetTextY = 120;
    const size = getGraphSize(hlbka);
    const cSize = 13;
    var cHeight = (getModifier(hlbka, sirka, "from") * size);
    var clickNum = 0;

    console.log("Stromová štruktúra / Tree structure");
    console.log(myData);

    var canvas = d3.select("body").append("svg")
        .attr("width", (cHeight * .7))
        .attr("height", (cHeight * .6))
        .append("g")
        .attr("transform", `translate(${offsetX},${offsetY})`);

    var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

    var tree = d3.layout.tree()
        .size([size, size]);

    var nodes = tree.nodes(myData);
    var links = tree.links(nodes);

    var node = canvas.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
            .attr("class", "node")
            .attr("transform", function(d){
                return `translate(${d.y},${d.x})`;
            })
        .on('mouseover',function(d, i){
            d3.select(this).transition()
                .duration(50)
                .attr('fill', 'blue')
                .attr('opacity', '.25')
        })
        .on('click', function(d, i){
            var myDOffsetY = offsetTextY;
            clickNum++;
            console.log(`Clicked on ${d.id} on coordinates x:${d3.event.pageX}, y:${d3.event.pageY}`);
            d3.select(this).transition()
                .duration(50)
                .attr('opacity', '.55')
                .attr('fill', 'blue');
            div.transition()
                .duration('50')
                .style('opracity', '1');

            if(clickNum % 2 == 0){
                myDOffsetY += 70;
            }

            canvas.append("text")
                .attr('x', d3.event.pageX - (offsetX + offsetTextX))
                .attr('y', d3.event.pageY - (offsetY + myDOffsetY))
                .text(function(){
                    for(let pls = 0; pls < poleSum.length; pls++){
                        if(poleSum[pls].id == d.id){
                            return `Prijatá suma: ${poleSum[pls].value.toFixed(20)} ETH`;
                        }
                    }
                    return "Žiadna suma nebola prijatá";
                });

            canvas.append("text")
                .attr('x', d3.event.pageX - (offsetX + offsetTextX))
                .attr('y', d3.event.pageY - (offsetY + myDOffsetY + 20))
                .text(function() {
                    return d.id;  
                })
                .on('mouseover', function(d){
                    d3.select(this).style("fill", "blue");
                })
                .on('mouseout', function(d){
                    d3.select(this).style("fill", "black");
                })
        })
        .on('mouseout', function(d,i){
            d3.select(this).transition()
                .duration(50)
                .attr('opacity', '1')
                .attr('fill', "black");
            div.transition()
                .duration('50')
                .style('opracity', '0');
        })
        .on('contextmenu', function(d, i){
            d3.event.preventDefault();
            canvas.select("text").text(function(){
                for(let pls = 0; pls < nodeSumEth.length; pls++){
                    if(nodeSumEth[pls].id == d.id){
                        return `Prijatá suma: ${nodeSumEth[pls].value.toFixed(20)} ETH`;
                    }
                }
                return "Žiadna suma nebola prijatá";
            }).remove()
            canvas.select("text").text(function(){
                return d.id;
            }).remove()
        })

    node.append("circle")
        .attr("r", cSize)
        .attr("fill", "black")

    var diagonal = d3.svg.diagonal()
            .projection(function(d){
                return [d.y, d.x];
            })
    
    canvas.selectAll("links")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("d", diagonal)
}


// Function to create graph for "TO" direction (incoming transactions)
function createGraphTo(myData, width, depth, nodeSumEth){

    const offsetX = getOffsetX(depth, "to");
    const offsetY = getOffsetY(width, "to");
    const offsetTextX = 30;
    const offsetTextY = 130;
    const size = getGraphSize(width);
    const cSize = 13;
    var clickNum = 0;
    const cHeight = (getModifier(depth, width, "to") * size);

    console.log("Stromová štruktúra / Tree structure");
    console.log(myData);
    console.log("");

    var canvas = d3.select("body").append("svg")
        .attr("width", cHeight)
        .attr("height", cHeight)
        .append("g")
        .attr("transform", `translate(${offsetX},${offsetY})`);

    var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

    var tree = d3.layout.tree()
        .size([size, size]);

    var nodes = tree.nodes(myData);
    var links = tree.links(nodes);

    var node = canvas.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
            .attr("class", "node")
            .attr("transform", function(d){
                return `translate(${-d.y},${-d.x})`;
            })
        .on('mouseover',function(d, i){
            d3.select(this).transition()
                .duration(50)
                .attr('fill', 'blue')
                .attr('opacity', '.25')
        })
        .on('click', function(d, i){
            var myDOffsetY = offsetTextY;
            clickNum++;
            console.log(`Clicked on ${d.id} on coordinates x:${d3.event.pageX}, y:${d3.event.pageY}`);
           
            d3.select(this).transition()
                .duration(50)
                .attr('opacity', '.55')
                .attr('fill', 'blue');
            div.transition()
                .duration('50')
                .style('opracity', '1');

            if(clickNum % 2 == 0){
                myDOffsetY += 70;
            }
        
            canvas.append("text")
                .attr('x', d3.event.pageX - (offsetX + offsetTextX))
                .attr('y', d3.event.pageY - (offsetY + myDOffsetY))
                .text(function(){
                    for(let pls = 0; pls < nodeSumEth.length; pls++){
                        if(nodeSumEth[pls].id == d.id){
                            return `Odoslaná suma: ${nodeSumEth[pls].value.toFixed(20)} ETH`;
                        }
                    }
                    return "Žiadna suma nebola odoslaná";
                })

            canvas.append("text")
                .attr('x', d3.event.pageX - (offsetX + offsetTextX))
                .attr('y', d3.event.pageY - (offsetY + myDOffsetY + 20))
                .text(function() {
                    return d.id;
                })
                .on('mouseover', function(d){
                    d3.select(this).style("fill", "blue");
                })
                .on('mouseout', function(d){
                    d3.select(this).style("fill", "black");
                })
        })
        .on('mouseout', function(d, i){
            d3.select(this).transition()
                .duration(50)
                .attr('opacity', '1')
                .attr('fill', "black");
            div.transition()
                .duration('50')
                .style('opracity', '0');
        })
        .on('contextmenu', function(d, i){
            d3.event.preventDefault();
            canvas.select("text").text(function(){
                for(let pls = 0; pls < nodeSumEth.length; pls++){
                    if(nodeSumEth[pls].id == d.id){
                        return `Odoslaná suma: ${nodeSumEth[pls].value.toFixed(20)} ETH`;
                    }
                }
                return "Žiadna suma nebola odoslaná";
            }).remove()
            canvas.select("text").text(function(){
                return d.id;
            }).remove()
        })

    node.append("circle")
        .attr("r", cSize)
        .attr("fill", "black")

    var diagonal = d3.svg.diagonal()
            .projection(function(d){
                return [-d.y, -d.x];
            })
    
    canvas.selectAll("links")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("d", diagonal)
}


// Function to create transactions pairs (parent - child)
function createBaseTrStructure(p, inputWallet, inputDirection){

    var masterOur = [];
    masterOur.push({
        "child": inputWallet, "parent": ""
    });

    if(inputDirection == "to"){
        for(let i =0; i < p.length; i++){
            var currTrx = p[i];

            for(let j = 0; j < currTrx.length; j++){
                if(i == 0){
                    masterOur.push({
                        "child": currTrx[j].from, "parent": inputWallet
                    });
                }else{
                    masterOur.push({
                        "child": currTrx[j].from, "parent": currTrx[j].to
                    });
                }
            }
        }
    }else if(inputDirection == "from"){
        for(let i =0; i < p.length; i++){
            var currTrx = p[i];

            for(let j = 0; j < currTrx.length; j++){
                if(i == 0){
                    masterOur.push({
                        "child": currTrx[j].to, "parent": inputWallet
                    });
                }else{
                    masterOur.push({
                        "child": currTrx[j].to, "parent": currTrx[j].from
                    });
                }
            }
        }
    }

    return masterOur;
}


// Function to determine duplicates
function createMasterArr(masterIn){

    var mArrCount = {};
    var masterOut = [];

    for(let mi = 0; mi < masterIn.length; mi++){
        if (!mArrCount[masterIn[mi].child]){
            mArrCount[masterIn[mi].child] = 1;
            masterOut.push(masterIn[mi]);
        }else {
            mArrCount[masterIn[mi].child] += 1;
        }
    }

    return masterOut
}

// Source: 
//      https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
//
// Function to reduce array into the shape that is needed for graphical representation
function reduceArrayFunc(masterArray){
    const reducedMasterArray = [];
    let reduOut;

    for(let mi = 0; mi < masterArray.length; mi++){
        reducedMasterArray[mi] = {
            id: masterArray[mi].child, parentId: masterArray[mi].parent == '' ? null :  masterArray[mi].parent
        };
    }
    
    const idMapping = reducedMasterArray.reduce((mArr, element, i) => {
        mArr[element.id] = i;
        return mArr;
    }, {});

    reducedMasterArray.forEach((element) => {
        if (element.parentId === null) {
            reduOut = element;
            return;
        }
        const parentEl = reducedMasterArray[idMapping[element.parentId]];
        parentEl.children = [...(parentEl.children || []), element];
    });

    return reduOut;
}


// Function to create array of sums of ETH for "FROM" direction (outgoing)
function getNodesSumOutgoing(data){

    var uniqueAddrs = [];

    for(let dtBlock = 0; dtBlock < data.length; dtBlock++ ){
        for(let dtTx = 0; dtTx < data[dtBlock].length; dtTx++){
            uniqueAddrs.push(data[dtBlock][dtTx].to);
        }
    }

    function retUniq(value, index, self) {
        return self.indexOf(value) === index;
    }

    var uAddr = uniqueAddrs.filter(retUniq);
    var output_sums = [];

    for(let cad = 0; cad < uAddr.length; cad++){
        var curr_addr = uAddr[cad];
        var curr_sum = 0;

        for(let cDep = 0; cDep < data.length; cDep++ ){
            for(let cTx = 0; cTx < data[cDep].length; cTx++){
                if(data[cDep][cTx].to == curr_addr){
                    var cNum = parseFloat(data[cDep][cTx].value);
                    curr_sum += cNum;
                }
            }
        }
        output_sums.push({id: curr_addr, value:  curr_sum});
    }

    return output_sums;
}


// Function to create array of sums of ETH for "TO" direction (incoming)
function getNodesSumIncoming(data){

    var uniqueAddrs = [];

    for(let dtBlock = 0; dtBlock < data.length; dtBlock++ ){
        for(let dtTx = 0; dtTx < data[dtBlock].length; dtTx++){
            uniqueAddrs.push(data[dtBlock][dtTx].from);
        }
    }

    function retUniq(val, i, self) {
        return self.indexOf(val) === i;
    }

    var uAddr = uniqueAddrs.filter(retUniq);
    var output_sums = [];

    for(let cad = 0; cad < uAddr.length; cad++){
        var curr_addr = uAddr[cad];
        var curr_sum = 0;

        for(let cDep = 0; cDep < data.length; cDep++ ){
            for(let cTx = 0; cTx < data[cDep].length; cTx++){
                if(data[cDep][cTx].from == curr_addr){
                    var cNum = parseFloat(data[cDep][cTx].value);
                    curr_sum += cNum;
                }           
            }
        }
        output_sums.push({id: curr_addr, value:  curr_sum});
    }

    return output_sums;
}


var inputWallet = localStorage.getItem("wallet");
var inputDirection = localStorage.getItem("direction");
var inputDepth = localStorage.getItem("depth");
var inputWidth = localStorage.getItem("width");
var inputStart = localStorage.getItem("inputStartDate");
var inputEnd = localStorage.getItem("inputEndDate");


// Calls async function, which return data (or error code on unsuccessful retrieval), and then calls additional functions to display graphical output
asyncPostData(inputWallet, inputWidth, inputDepth, inputDirection, inputStart, inputEnd).then(p => {

    // Checks for error code
    if(p == -14){
        alert(`Peňaženka ${inputWallet} nemá žiadne dostupné dáta v zadanom dátumovom rozsahu.`);
        window.close();
        return null;
    }

    if(p == -99){
        alert(`Chyba spracovania - nastala chyba pri spracovaní dát. Skúste inú akciu alebo opakujte neskôr.`)
        window.close();
        return null;
    }
    
    if(p.length == 0){
        alert(`Peňaženka ${inputWallet} nemá žiadne dostupné dáta. Skúste znovu s inou vstupnou adresou.`);
        window.close();
        return null;
    }

    console.log("Prijaté data / Received data");
    console.log(p);
    console.log("");

    // Gets the amount of ETH send / received for each node
    if(inputDirection == "to"){
        var poleSum = getNodesSumIncoming(p);
    }else{
        var poleSum = getNodesSumOutgoing(p); 
    }
    
    // Creates data structures in order to correctly create the graph
    var baseTreeStructure = createBaseTrStructure(p, inputWallet, inputDirection);
    var masterArr = createMasterArr(baseTreeStructure);
    var treeRootStruct = reduceArrayFunc(masterArr);

    // Creates the graph based on the direction
    if(inputDirection == "to"){
        createGraphTo(treeRootStruct, inputWidth, inputDepth, poleSum);
    }else if(inputDirection == "from"){
        createGraphFrom(treeRootStruct, inputWidth, inputDepth, poleSum);
    }

});