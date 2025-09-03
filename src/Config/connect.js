
const {MongoClient}= require("mongodb");
const { connection } = require("mongoose");

const url =  "mongodb+srv://asaryansingh2004:io3ywYZw1ho2g2MA@leagcy-metro-project.tvztzdh.mongodb.net";

const client = new MongoClient(url);
const getDBConnection = () => {
    return new Promise(async (resolve, reject) => {

        let result = await client.connect();
        let db = result.db('delhiMetro');
        resolve(db);
        connection.close();
    })
}

exports.getDBConnection = getDBConnection;