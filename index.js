const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
app.use(cors());
app.options("*", cors());
app.use(express.json());

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
    const selectedCollection = client.db("SereneSoulYogaDB").collection("selectedClass");

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
      const query = { email: user.email };
      const exitingUser = await userCollection.findOne(query);
      if (!exitingUser) {
        const result = await userCollection.insertOne(user);
        return res.send(result);
      }
      return res.status(400).send({ message: "User Already Exist" });
    });

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    //set user roll
    app.patch("/users/roll/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;

      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: updatedUser.role,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // all classes
    app.get("/allClasses", async (req, res) => {
      const result = await instructorCollection.find().toArray();
      res.send(result);
    });

    app.post("/allClasses/select", async (req, res) => {
      const classes = req.body;
      const result = await selectedCollection.insertOne(classes);
      res.send(result);
    });

    app.get("/allClasses/selected", async (req, res) => {
      const result = await selectedCollection.find().toArray();
      res.send(result);
    });

    app.get("/allClasses/selected/:id", async (req, res) => {
      const classId = req.params.id
      const query = { _id: new ObjectId(classId) };
      const result = await selectedCollection.findOne(query);
      res.send(result);
    });

    app.delete("/classDelete/:id", async (req, res) => {
      const classId = req.params.id
      const query = { _id: new ObjectId(classId) };
      const result = await selectedCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/allClasses/status/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      console.log(id, query);
      const updateDoc = {
        $set: {
          status: updatedUser.status,
        },
      };
      const result = await instructorCollection.updateOne(
        query,
        updateDoc,
        options
      );
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
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Yoga Server ");
});

app.listen(port, () => {
  console.log(`server is running port : ${port} `);
});
