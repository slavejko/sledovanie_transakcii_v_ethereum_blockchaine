# Application
.
This branch contains frontend and backend to the application. It consists of JavaScript file [**server.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine), which acts as a webserver and communicates with MongoDB database. 

Then there is a frontend part of the project, which contains two JavaScript files, [**one**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine) and [**two**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine). 

- One is responsible purely for saving input data from [**index.html**]() file into the browser local storage, and checking for empty or incorrect inputs.

- Two is handling *POST* requests to the **server**, then accepting and parsing of the response. At the end, it is also responsible for graphical representation and interaction. 


## Requirements

The following things are necessary in order to run this script successfully.

- [Node.js](https://nodejs.org/en/) - version 16 and up
- [npm](https://www.npmjs.com/) - comes installed with Node.js
  - [D3](https://www.npmjs.com/package/d3) library - for graphical representation of results and interaction with said results
  - [express](https://expressjs.com/en/starter/installing.html) library - necessary for running the webserver
- Running instance of MongoDB database with data

## Setup

Having *Node.js* and *npm* installed, **D3** and **express** libraries need to be installed. This can be achieved via npm. Since npm provides [*package.json*](https://www.npmjs.com/) file, all that is needed to be done is to run following command from within the cloned repository, which contains the files to the project. More specifically, the [*package.json*](https://www.npmjs.com/) file needs to be present in your current directory.

Installing dependencies from [*package.json*](https://www.npmjs.com/):
```bash
npm install
```

## Code modification

If you wish to change the parameters, for example to change the port for the webserver, you can do this as shown below.

```python
TODO 
```


## Running the script

After modifying the code (if necessary), the application can be started by running from the directory which contains the file [**server.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine):
```bash
node server.js
```

## Detailed code explanation

Detailed code explanation can be found [**here**]().
