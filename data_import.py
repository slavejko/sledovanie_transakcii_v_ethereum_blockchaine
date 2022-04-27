from web3 import Web3
from pymongo import MongoClient

import_direction = "from"                           # Either from(outgoing transactions) or to(incoming transactions) values

number_of_blocks_to_import = 6400
starting_block = 14417000                           # Can be specific block or current block
                                                    #       To get current block, use function getCurrentBlock() 
database_name = "ethereum_data"                     # Change this to change database name
collection_name = "data_from"                       # Change this to change desired collection name

# Running local geth node
iurl = "http://127.0.0.1:8545"                      # Change this to desired destination of blockchain
                                                    #       Currently set to local node, but accepts any url that exposes node       
mongoCluster = "mongodb://localhost:27017"          # Change this for database change

cluster = MongoClient(mongoCluster)       
myWeb3 = Web3(Web3.HTTPProvider(iurl))

mongoDB = cluster[database_name]                                    
myMongoCollection = mongoDB[collection_name]             


def getCurrentBlock():
    return myWeb3.eth.get_block_number()


def processData(direction):                                      

    for currBlock in range(0, number_of_blocks_to_import):
        
        print("Currently on block number: ", currBlock)
        blockNumber = myWeb3.eth.get_block(starting_block - currBlock)
        blockTimestamp = blockNumber['timestamp']

        blockTxs = []

        # Creating list of transactions of current block
        for currTx in blockNumber['transactions']:
            blockTxs.append(Web3.toHex(currTx))

        for tx in blockTxs:
            current_tx = myWeb3.eth.get_transaction(tx)

            # Looks if wallet is in database already
            isSavedWallet = myMongoCollection.find({"_id": current_tx[direction]})             
            walletExists = list(isSavedWallet)

            # We are looking only at transactions that have some value
            if(current_tx['value'] > 0):
                tx_object = {
                        "hash_id": Web3.toHex(current_tx['hash']), 
                        "from": current_tx['from'], 
                        "to": current_tx['to'], 
                        "value": str(Web3.fromWei(current_tx['value'], 'ether')),
                        "block_number": current_tx['blockNumber'],
                        "time": blockTimestamp
                        }
                        
                # If this wallet is not yet in the database, then it is inserted, otherwise just updates existing object
                if len(walletExists) == 0:
                    inputPost = {"_id": current_tx[direction], "tx": [tx_object]}             
                    myMongoCollection.insert_one(inputPost)
                else:
                    if len(walletExists) > 0:
                        myMongoCollection.update_one({
                            "_id": current_tx[direction]             
                        },{
                            "$push":{
                                "tx": tx_object
                            }
                        })

processData(import_direction)
