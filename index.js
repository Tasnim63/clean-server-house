const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
// middleware
app.use(cors({
    origin: "*",
}));
app.use(express.json())
// heroku


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t8vkx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("houseCleaner").collection("services");
        // const userCollection = client.db("houseCleaner").collection("users");


        app.get('/service', async (req, res) => {

            const services = await serviceCollection.find({}).toArray();
            res.send(services)
        })
        console.log('db conected');
    } finally {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('Hello World!')
})
// zzxbb

// / dggfd
// clean server
app.listen(port, () => {
    console.log(`listening from house cleaner  ${port}`)
})