import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb://localhost:27017';
const client = new MongoClient(MONGO_URI);
const dbName = 'usersDB';
const collectionName = 'randomUsers';

let collection;

async function connectDB() {
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db(dbName);
        collection = db.collection(collectionName);

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ MongoDB error:', error.message);
    }
}

// ✅ GET /users?country=India
app.get('/users', async (req, res) => {
    const { country } = req.query;
    const query = country ? { "location.country": country } : {};
    const users = await collection.find(query).toArray();
    res.json(users);
});

// ✅ GET /users/male or /users/female
app.get('/users/:gender', async (req, res) => {
    const { gender } = req.params;
    const users = await collection.find({ gender }).toArray();
    res.json(users);
})
connectDB();
