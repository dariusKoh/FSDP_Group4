const { MongoClient } = require("mongodb");
require("dotenv").config({
    path: "./config.env"
});

async function main({tableName}){
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);

    try{
        await client.connect();

        const collections = await client.db("test").collections(tableName);

        console.log(collections.forEach((collection) => console.log(collection.s)))
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close()
    }
}

main("users");