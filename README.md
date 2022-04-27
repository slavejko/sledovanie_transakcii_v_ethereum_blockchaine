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

Having *Node.js* and *npm* installed, **D3** and **express** libraries need to be installed. This can be achieved via npm. Since npm provides [*package.json*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/package.json) file, all that is needed to be done is to run following command from within the cloned repository, which contains the files to the project. More specifically, the [*package.json*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/package.json) file needs to be present in your current directory.

Installing dependencies from [*package.json*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/package.json):

```bash
npm install
```

## Code modification

If you wish to change the parameters, for example to change the port for the webserver, you can do this as shown below in the [**server.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine) file.

```python
const uri = "mongodb://localhost:27017";                    // to change the address and port of the database
const dbName = "ethereum_data";                             // to change the name of the database       
const collection_to = "data_to";                            // to change collection name for direction "TO" (incoming)
const collection_from = "data_from";                        // to change collection name for direction "FROM" (outgoing)
const publicFolder = "public";                              // to change the name of the public folder containing frontend
const appPort = 3000;                                       // to change the port of endpoint
```


## Running the script

After modifying the code (if necessary), the application can be started by running from the directory which contains the file [**server.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/server.js):

```bash
node server.js
```

## Detailed code explanation

Detailed code explanation can be found [**here**]().
