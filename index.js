var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser"); // Import bodyParser middleware
var app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON data

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://vu_database:vucse2026@cluster0.nyrjtse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

run();

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

// Define a route to fetch students data from MongoDB and send it as a response
app.get("/students", async function (req, res) {
  try {
    await client.connect();
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("students");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Define a route to handle attendance data POST request
app.post("/attendance", async function (req, res) {
  // Extract data from the request body
  const { class_name, date, student_id } = req.body;

  try {
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db("Varendra-University"); // Replace 'YourDatabaseName' with your database name
    const attendanceCollection = database.collection("attendance");

    // Insert the attendance data into the database
    const result = await attendanceCollection.insertOne({
      class_name: class_name,
      date: date,
      student_id: student_id,
    });

    console.log("Attendance data inserted:", result);

    // Send a response back to the client
    res
      .status(200)
      .json({ message: "Attendance data received and stored successfully!" });
  } catch (err) {
    console.error("Error inserting attendance data:", err);
    res.status(500).json({ error: "Failed to store attendance data" });
  }
});

// Define a route to handle attendance data GET request
app.get("/attendance", async function (req, res) {
  try {
    await client.connect();
    const database = client.db("Varendra-University");
    const attendanceCollection = database.collection("attendance");
    const attendance = await attendanceCollection.find({}).toArray();
    res.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
});
// Route to handle fetching existing students
app.get("/login", async (req, res) => {
  try {
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db("Varendra-University");
    const loginCollection = database.collection("login");

    // Fetch existing students from the database
    const existingStudents = await loginCollection.find({}).toArray();

    // Send the existing students data as response
    res.status(200).json(existingStudents);
  } catch (err) {
    console.error("Error fetching existing students:", err);
    res.status(500).json({ error: "Failed to fetch existing students" });
  }
});

// Route to handle registering new students
app.post("/login", async (req, res) => {
  // Extract data from the request body
  const { studentID, password } = req.body;

  try {
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db("Varendra-University");
    const loginCollection = database.collection("login");

    // Insert the student data into the database
    const result = await loginCollection.insertOne({
      studentID,
      password,
    });

    console.log("Student registered successfully:", result);

    // Send a response back to the client
    res.status(200).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error("Error registering student:", err);
    res.status(500).json({ error: "Failed to register student" });
  }
});

app.post("/authenticate", async (req, res) => {
  // Extract data from the request body
  const { studentID, password } = req.body;

  try {
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db("Varendra-University");
    const loginCollection = database.collection("login");

    // Check if the provided credentials match any existing user
    const existingUser = await loginCollection.findOne({ studentID, password });

    if (existingUser) {
      // Authentication successful, send success response
      res.status(200).json({ message: "Login successful!" });
    } else {
      // Authentication failed, send error response
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error authenticating user:", err);
    res.status(500).json({ error: "Failed to authenticate user" });
  }
});

app.get("/attendance/:studentID", async function (req, res) {
  const studentID = req.params.studentID;

  try {
    await client.connect();
    const database = client.db("Varendra-University");
    const attendanceCollection = database.collection("attendance");

    // Filter attendance data based on the provided student ID
    const attendance = await attendanceCollection
      .find({ student_id: studentID })
      .toArray();

    res.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
