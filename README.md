# Application

This branch contains Frontend and Backend to the application. 

Backend consists of JavaScript file [**server.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/server.js), which acts as a webserver and communicates with MongoDB database and Frontend as well. 

Then there is a Frontend part of the project, which contains two JavaScript files, [**result.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/result.js) and [**data_saver.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/js/data_saver.js). 

- [**data_saver.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/js/data_saver.js) is responsible purely for saving input data from [**index.html**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/index.html) file into the browser local storage, and checking for empty or incorrect inputs.

- [**result.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/result.js) is handling *POST* requests to the **server**, then accepting and parsing of the response. At the end, it is also responsible for graphical representation and interaction. 


## Requirements

The following things are necessary in order to run this script successfully.

- [Node.js](https://nodejs.org/en/) - version 16 and up
- [npm](https://www.npmjs.com/) - comes installed with Node.js
  - [D3](https://www.npmjs.com/package/d3) library - for graphical representation of results and interaction with said results
  - [express](https://expressjs.com/en/starter/installing.html) library - necessary for running the webserver
  - [mongodb](https://www.npmjs.com/package/mongodb) library - necessary for communicating with MongoDB database
- Running instance of MongoDB database with data

## Setup

Having *Node.js* and *npm* installed, **D3** and **express** libraries need to be installed. This can be achieved via npm. Since npm provides [*package.json*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/package.json) file, all that is needed to be done is to run following command from within the cloned repository, which contains the files to the project. More specifically, the [*package.json*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/package.json) file needs to be present in your current directory.

Installing dependencies from [*package.json*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/package.json):

```bash
npm install
```

## Code modification

If you wish to change the parameters, for example to change the port for the webserver, you can do this as shown below in the [**server.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/server.js) file.

```python
const uri = "mongodb://localhost:27017";                    // to change the address and port of the database
const dbName = "ethereum_data";                             // to change the name of the database       
const collection_to = "data_to";                            // to change collection name for direction "TO" (incoming)
const collection_from = "data_from";                        // to change collection name for direction "FROM" (outgoing)
const publicFolder = "public";                              // to change the name of the public folder containing frontend
const appPort = 3000;                                       // to change the port of endpoint
const apiUrl = '/api';                                      // to change the url of the endpoint
```


## Running the script

After modifying the code (if necessary), the application can be started by navigation into the **/src** directory, and from there running the [**server.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/server.js) file:

```bash
node server.js
```

## Application tips and usage

To use the application, as mentioned previously you will need to have a source of data. That can be done via importing demo data from branch [**data**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/data). 

After the application is running, you should be able to see homepage of the application:

![homepage](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/main/screenshots/homepage.png)

From there, you can navigate to page *About the project* or *Help*, both of which are currently in Slovak language. 

If you wish to create a graph, you will need to input a valid wallet address into the address input field. Depth and width is by default 5 and 10, respectively. Also, you will need to input in which direction you want the graph to be created. Accepted values are **to** and **from**. Default date range is for the entire month of March, since demo data is in this range, more specifically only for the 19th of March.

After submitting input values, if they are correct and are present in the database, the result page will be displayed:

![result page](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/main/screenshots/result_page.png)

Graph is interactive, meaning by clicking on each node additional information can be displayed. 

By **right-clicking** on the node the information from that node will be temporarily saved and if you wish to display only those saved nodes, you can do this by **double-clicking** on any node. **Double-click** will remove all text that is present currently and display saved text to the node that it belongs to. After **double-click** is performed, temporary array which held this information will be wiped. 

![result page](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/main/screenshots/right-click.gif)

Explanation is also available in Slovak language in the application itself.

## Detailed code explanation

Detailed code explanation can be found [**here**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/main/code_explanation.md).
