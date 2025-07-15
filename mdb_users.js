import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017';

const client = new MongoClient(MONGO_URI);

async function main(){
    try{

    await client.connect();
    console.log('connect to mongodb');

    const db = client.db('usersDB');
    const collection = db.collection('randomUsers');

        const res = await fetch('https://randomuser.me/api/?results=10');
        const data = await res.json();
        const users =data.results;

        const result = await collection.insertMany(users);
        console.log(`${result.insertedCount} user into mongodb`);

    }catch(err){
        console.error(err.message);
    }finally{
        await client.close();
        console.log("mongodb connection closesd");
    }
}

main();