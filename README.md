# Python script

This script is used for importing data from Ethereum blockchain client into MongoDB databse.


## Requirements

The following things are necessary in order to run this script successfully.

- [python](https://www.python.org/downloads/) - version 3.8 and up
- [pip](https://pip.pypa.io/en/stable/)
  - [web3](https://web3py.readthedocs.io/en/stable/quickstart.html) library - for interaction with blockchain
  - [pymongo](https://pypi.org/project/pymongo/) library - for interaction with MongoDB database
- Running a Ethereum node client or having access to external provider  
- MongoDB database

## Setup

Having python and pip installed, **web3** and **pymongo** libraries need to be installed. This can be achieved via pip.

For web3:
```bash
pip install web3
```

And for pymongo:

```bash
pip install pymongo
```

## Ethereum node

In our project we used local Ethereum client, specifically [geth](https://geth.ethereum.org/docs/). You should be able to use any client, whether local or external (external client was tested and was able to retrieve data).


## Code modification

If you wish to change the parameters, for example to change the port for the database to save data to, you can do this as shown below.

```python
number_of_blocks_to_import = 6400

database_name = "xyz"                         # Change this to change database name
collection_name = "xyz"                       # Change this to change desired collection name

# Running local geth node
iurl = "http://127.0.0.1:8545"                # Change this to desired destination of blockchain
mongoCluster = "mongodb://localhost:27017"    # Change this for database change
                    
myWeb3 = Web3(Web3.HTTPProvider(iurl))
cluster = MongoClient(mongoCluster)  

mongoDB = cluster[database_name]                
myMongoCollection = mongoDB[collection_name]   
```


## Running the script

Last thing you need to specify is to decide, which direction you want the data to be stored as. The graphical part of the project display either incoming or outgoing transactions, and so the data is also stored this way to the database.

```python
import_direction = "outgoing"                # Either *outgoing* or *incoming* values
```
After running the script, if all requirements are met, it should successfully import the data.
