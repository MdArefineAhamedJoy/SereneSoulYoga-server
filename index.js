const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p45io4t.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const instructorCollection = client.db("SereneSoulYogaDB").collection("InstructorClasses");
    const bannerCollection = client.db("SereneSoulYogaDB").collection("Banner");
    const topYogaCollection = client.db("SereneSoulYogaDB").collection("TopYoga");
    const userCollection = client.db("SereneSoulYogaDB").collection("users");

    app.post("/instructor", async (req, res) => {
      const data = req.body;
      const result = await instructorCollection.insertOne(data);
      res.send(result);
    });
    app.get("/instructor", async (req, res) => {
      const result = await instructorCollection.find().toArray();
      res.send(result);
    });

    // app.get('/instructor/:text', async(req , res) =>{
    //     const email = req.params
    //     console.log(email)
    //     const result = await instructorCollection.find().toArray()
    //     res.send(result)
    // })
    // user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = {email : user.email}
      const exitingUser = await userCollection.findOne(query)
      if(!exitingUser){
        const result = await userCollection.insertOne(user);
        res.send(result)
      }
      return res.send({message : 'User Already Exist'})
    });

    // all classes
    app.get("/allClasses", async (req, res) => {
      const result = await instructorCollection.find().toArray();
      res.send(result);
    });

    // banner section
    app.get("/banner", async (req, res) => {
      const result = await bannerCollection.find().toArray();
      res.send(result);
    });

    // Top yoga section
    app.get("/topYoga", async (req, res) => {
      const result = await topYogaCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Yoga Server ");
});

app.listen(port, () => {
  console.log(`server is running port : ${port} `);
});
