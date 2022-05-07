# Data

This branch contains exported data, which can be used for demonstration of the application. The data was exported using [mongo export](https://www.mongodb.com/docs/database-tools/mongoexport/), and can be imported via [mongo import](https://www.mongodb.com/docs/database-tools/mongoimport/), or using [MongoDBCompass](https://www.mongodb.com/products/compass).

- [data_from](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/data/data_from.json) (**outgoing** transactions) - this data contains transactions for wallets for the entire day of **19.03.2022**. Outgoing means that it only contains transactions that send Ethereum from given wallet. In other words, we are looking at the ***from*** variable from blockchain data, and then associate wallets from the ***to*** variable with given wallet (the ***from*** variable).

- [data_to](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/data/data_to.json) (**incoming** transactions) - this data contains transactions for wallets for the entire day of **19.03.2022**. Incoming means that it only contains transactions that received Ethereum from given wallet. In other words, we are looking at the ***to*** variable from blockchain data, and then associate wallets from the ***from*** variable with given wallet (the ***to*** variable).


# Usage

There is a need to have a database to store data to. We used [MongoDB](https://www.mongodb.com/try/download/community) community server, and if you want to replicate this project, we highly suggest the same database. Once the database is running, you can import the data.


## Import - via [MongoDBCompass](https://www.mongodb.com/products/compass)

To import through [MongoDBCompass](https://www.mongodb.com/products/compass), you will need to create a database, a collection and there is an option to import data either from *.csv* file or from *.json* file. We exported our data as *.json*, so this option would be usable here.

After creating new database with collection, importing data can be done via ***Import data*** button in the middle of the screen, or by clicking on ***ADD DATA*** button on the left side of the screen, and choosing *Import File*.

![import data](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/main/screenshots/empty_collection.png)

After choosing file and selection *.json* option, click on *Import*. If it successful, you will see a screen similar to the one show below. 

![import data](https://github.com/slavejko/sledovanie_transakcii_v_ethereum_blockchaine/blob/main/screenshots/import_success.png)

## Import - via [mongoimport](https://www.mongodb.com/docs/database-tools/mongoimport/)

The second option is to import data via CLI. Installation can be found [**here**](https://www.mongodb.com/docs/database-tools/installation/installation/). After installation, depending on your operating system, you might need to perform few steps, such as adding bin folder to the *PATH*, so that you can call the import from command line. 

It is also possible just to navigate to the folder with installed / downloaded files, and run command line from there. After having access to the program, it is only a matter of running this command, in which you need to specify certain parameters.

```bash
mongoimport --host HOST --port PORT --db DATABASE --collection COLLECTION --type TYPE --out FILE
```

Parameters to specifiy:
- HOST - specific host, for example *localhost*
- PORT - port that is being used by the database
- DATABASE - database name
- COLLECTION - collection name
- TYPE - currently either *json*, *tsv* or *csv* (with the *csv* option you have to specify *fields*)
- FILE - path to the file

Full list of parameters and further usage can be found [**here**](https://www.mongodb.com/docs/database-tools/mongoimport/).


## Troubleshooting

If errors occur, we advise importing via [mongoimport](https://www.mongodb.com/docs/database-tools/mongoimport/), since this has proven to be working every time. 

With some files we came across few issues while importing with the [MongoDBCompass](https://www.mongodb.com/products/compass), which resulted in failure to import and no data present in the database. Importing the same file with [mongoimport](https://www.mongodb.com/docs/database-tools/mongoimport/) was successful and the data was available in the database. 