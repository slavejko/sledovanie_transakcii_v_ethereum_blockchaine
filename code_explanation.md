# Code explanation

This documents further explains the code and its parts.

## [data_import.py](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/data_import_python/data_import.py)

The script for importing data into the database is located on the [data_import_python](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/data_import_python) branch.

This branch contains a [**README**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/data_import_python/README.md) file with a description of what is needed to run the code successfully, as well as the code file itself.

The content of the source code is written in the Python programming language. 

The first two lines import the required libraries, and it is possible to change the program parameters from line 4 to line 15. Furthermore, the code contains 2 functions. 

The first is `getCurrentBlock()`, which returns the current blockchain block. 

The second function is `processData(direction)`, which takes the input of the direction parameter. 

This function then traverses the number of specified blocks backwards that need to be parsed. While doing this, it also displays the block it is currently processing onto the output. 

Then it creates a list of transactions for each block and then calls the blockchain to get detail about each of the transaction. 

After receiving the transaction detail, it looks in the database to see if the wallet is already there and saves this information to the variable. 

If the given transaction value is greater than 0, then it creates its own object of this transaction, which it will later store in the database. 

At last, it checks the saved variable containing the result of the database search.

If the wallet exists, then it updates the wallet object with a new transaction, otherwise it will insert the created object with wallet id info into the database.

## [server.js](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/server.js)

The [*server.js*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/server.js) file serves as a web server for receiving the requests from the frontend, communicating with the database, and is also responsible for sending data back to the frontend. The file is located on the [*server*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/server) branch, in the [***/ src***](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/server/src) folder.

The first 10 lines are parameters that can be changed. These are parameters such as application port, database name and such.

Functions that are present in the file:
- `printOutLogs( )` - prints out logs to the server output screen
- `checkTimestamp( )` - return boolean value if the transaction's timestamp is withing our date range
- `getData( )` - async function that return the data from the database

The `getData( )` function gets the parameters from the **POST** request that was sent from the frontend. 

Subsequently, based on the input direction, a collection is selected.

After this the program will try to connect to the database and print an error message if not successful.

If the connection was successful, it will first search for the input wallet. It verifies whether the wallet is actually in the database, and if it is not, it returns a specific value according to which an adequate notification is displayed on the user interface.

After the initial checks, it additionally checks whether the first transaction depth timestamp is within the specified time frame. This is followed by *for cycles*, in which only the transactions from within the specified time range are accepted.

For each wallet in a given depth, additional wallets associated with it are searched based on the direction of entry. This data is then stored in the temporary array, which is copied and pasted into the master array after each of the depth cycle.

At the end of all cycles, the master field is returned, which contains the necessary data based on the filters.

At the end of the file the server is being run, exposing the public folder containing the frontend, and listening for requests. 

Upon getting a request, it processes it, performs the necessary verifications, and calls the *getData()* function, at the end of which it sends back a response with the data.


## [data_saver.js](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/js/data_saver.js)

The JavaScript file [*data_saver.js*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/js/data_saver.js) is an helper JavaScript file that is used to store the entered data from the frontend. 

It is located on the [*server*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/server) branch, specifically in the [*/ src/ public/ js*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/server/src/public/js) folder. 

It is used by the [index.html](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/index.html) file, which saves the data to the local memory of the browser after pressing the `"Zobraz výsledky"` button. It also checks if the entered values are not empty or incorrect and then displays the result window if they are correct.


## [result.js](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/result.js)

This file is located in the [*server*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src) branch, in the [*/ src/ public*](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/server/src/public) folder. 
It is primarily responsible for displaying the graphical result. It contains the following functions:
- `postData( )` - async function responsible for *POST* requests
- `asyncPostData( )` - wrapper for *postData( )* function
- `getOffsetY( )` - returns offset for **Y** coordinate based on input width
- `getOffsetX( )` - returns offset for **X** coordinate based on input depth
- `getGraphSize( )` - returns graph size based on width
- `getModifier( )` - returns canvas size variable value based on width and depth
- `createGraphFrom( )` - creates graph for the **from** direction (outgoing)
- `createGraphTo( )` - creates graph for the **to** direction (incoming)
- `createBaseTrStructure( )` - creates base tree structure for graphical representation
- `createMasterArr( )` - removes duplicates from output of *createBaseTrStructure( )* function
- `reduceArrayFunc( )` - modifies the array so that the ***D3.js*** library can process the data
- `getNodeSumOutgoing( )` - gets the value for each wallet in the graph in direction **from**
- `getNodeSumOIncoming( )` - gets the value for each wallet in the graph in direction **to**


Most of the listed functions are self-explanatory by naming, but we would like to describe some of the more complicated ones briefly.

The **`createGraphFrom( )`** and **`createGraphTo( )`** functions are almost identical, except for certain parameters that are created within the function, as one function creates a graph for the "to" direction and the other creates a "from" direction. 

Offesets and sizes are dynamically adjusted based on parameters.

The adjustment weights were chosen based on the testing so that the result would be in the best possible shape. Furthermore, these functions work with the canvas, on which the individual wallets are drawn as nodes and then connected with the help of links. 

Rendering was achieved with the help of the ***D3.js*** library. At the same time, on-click functionality is implemented here, where additional information is displayed on the screen when a node clicked.

***

The **`createBaseTrStructure( )`** function has a fairly simple task, which is that based on the input direction it is supposed to create an array of pairs that have a relationship with each other. This structure is needed to plot the graph using the ***D3.js*** library.

***

The code in the **`reduceArrayFunc( )`** function is used to convert the structure created by the **`createBaseTrStructure( )`** function to a structure that is acceptable by the ***D3.js*** library for the graphical representation type that was selected. It is necessary to have a `parent-child` relationship, but in a nested form - each *paren*t has to have an `array` of children.

***

The **`getNodesSumOutgoing( )`** and **`getNodesSumIncoming( )`** functions are similar in nature to the graphing functions in that the only difference is in certain details based on the direction provided. 

They accept data as an input parameter, and create an array of objects that contain all available wallets and the sums of their values ​​for a given direction.

The result of this function is used in the displayed graph, where after clicking on the node, the address of the given node is displayed, as well as the already mentioned wallet amount. If the amount is not in the provided data, a notification will appear.

At the end of this file, data is retrieved from local memory, the **asyncPostData( )** function is called, after which the *error* codes are checked, and if everything is OK, the functions described above are called in the required order.


***

As this tool is forensic in nature, more detailed data is also written to the browser logs and the server output line.

***

## Other files

Other files are primarily in a support role, such as a ***`.css`*** file with an ***h1*** title style, or ***`.html`*** files for the user interface. The [***screenshots***](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/tree/server/src/public/screenshots) folder serves as a space for screenshots that are used within the tool for helping purposes.

List of all the other files:
- [result.html](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/result.html) - shows the result page and calls [**result.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/result.js)
- [index.html](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/index.html) - index page for the application, calls [**data_saver.js**](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/js/data_saver.js)
- [o_programe.html](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/html/o_programe.html) - page about the project, which also includes link to the github page
- [pomoc.html](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/html/pomoc.html) - user manual showcasing usage of the site
- [style.css](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/server/src/public/css/style.css) - style file for the ***.html*** files