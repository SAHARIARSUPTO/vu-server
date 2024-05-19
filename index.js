const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

const uri =
  "mongodb+srv://vu_database:vucse2026@cluster0.nyrjtse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}
run();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/students", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("students");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});
app.get("/ata_glance", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("atAglance");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/vu_history", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("history");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});
app.get("/notice_board", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("noticeBoard");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/why_vu", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("whyVU");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/lab", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("lab");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/departments", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const studentsCollection = database.collection("departments");
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/attendance", async function (req, res) {
  const { class_name, date, student_id } = req.body;

  try {
    const database = client.db("Varendra-University");
    const attendanceCollection = database.collection("attendance");

    const result = await attendanceCollection.insertOne({
      class_name: class_name,
      date: date,
      student_id: student_id,
    });

    console.log("Attendance data inserted:", result);
    res
      .status(200)
      .json({ message: "Attendance data received and stored successfully!" });
  } catch (err) {
    console.error("Error inserting attendance data:", err);
    res.status(500).json({ error: "Failed to store attendance data" });
  }
});

app.get("/attendance", async function (req, res) {
  try {
    const database = client.db("Varendra-University");
    const attendanceCollection = database.collection("attendance");
    const attendance = await attendanceCollection.find({}).toArray();
    res.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
});

app.get("/login", async (req, res) => {
  try {
    const database = client.db("Varendra-University");
    const loginCollection = database.collection("login");
    const existingStudents = await loginCollection.find({}).toArray();
    res.status(200).json(existingStudents);
  } catch (err) {
    console.error("Error fetching existing students:", err);
    res.status(500).json({ error: "Failed to fetch existing students" });
  }
});
app.get("/alumni", async (req, res) => {
  try {
    const database = client.db("Varendra-University");
    const loginCollection = database.collection("alumni");
    const existingStudents = await loginCollection.find({}).toArray();
    res.status(200).json(existingStudents);
  } catch (err) {
    console.error("Error fetching existing students:", err);
    res.status(500).json({ error: "Failed to fetch existing students" });
  }
});
app.get("/feedback", async (req, res) => {
  try {
    const database = client.db("Varendra-University");
    const feedbackCollection = database.collection("feedback");
    const existingFeedback = await feedbackCollection.find({}).toArray();
    res.status(200).json(existingFeedback);
  } catch (err) {
    console.error("Error fetching existing students:", err);
    res.status(500).json({ error: "Failed to fetch existing data" });
  }
});

app.post("/login", async (req, res) => {
  const { studentID, password } = req.body;

  try {
    const database = client.db("Varendra-University");
    const loginCollection = database.collection("login");

    const result = await loginCollection.insertOne({ studentID, password });

    console.log("Student registered successfully:", result);
    res.status(200).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error("Error registering student:", err);
    res.status(500).json({ error: "Failed to register student" });
  }
});
app.post("/feedback", async (req, res) => {
  const { name, id, dept, semester, email, contact, feedbackType, message } =
    req.body;
  try {
    const database = client.db("Varendra-University");
    const feedbackCollection = database.collection("feedback");
    const result = await feedbackCollection.insertOne({
      name,
      id,
      dept,
      semester,
      email,
      contact,
      feedbackType,
      message,
      createdAt: new Date(),
    });
    console.log("Feedback submitted successfully:", result);
    res.status(200).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

app.post("/busspass", async (req, res) => {
  const { studentID, semester, department, route, contactNumber } = req.body;

  try {
    const database = client.db("Varendra-University");
    const passCollection = database.collection("busspass-application");

    const result = await passCollection.insertOne({
      studentID,
      semester,
      department,
      route,
      contactNumber,
    });

    console.log("Bus pass application submitted successfully:", result);
    res
      .status(200)
      .json({ message: "Bus pass application submitted successfully!" });
  } catch (err) {
    console.error("Error submitting bus pass application:", err);
    res.status(500).json({ error: "Failed to submit bus pass application" });
  }
});

app.post("/authenticate", async (req, res) => {
  const { studentID, password } = req.body;

  try {
    const database = client.db("Varendra-University");
    const loginCollection = database.collection("login");

    const existingUser = await loginCollection.findOne({ studentID, password });

    if (existingUser) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error authenticating user:", err);
    res.status(500).json({ error: "Failed to authenticate user" });
  }
});
app.post("/alumni", async (req, res) => {
  try {
    const post = req.body;
    const database = client.db("Varendra-University");
    const alumniCollection = database.collection("alumni");

    const result = await alumniCollection.insertOne(post);
    res
      .status(200)
      .json({ message: "Post added successfully!", postId: result.insertedId });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: "Failed to add post" });
  }
});

app.get("/attendance/:studentID", async function (req, res) {
  const studentID = req.params.studentID;

  try {
    const database = client.db("Varendra-University");
    const attendanceCollection = database.collection("attendance");

    const attendance = await attendanceCollection
      .find({ student_id: studentID })
      .toArray();
    res.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
});

// alumni

// GET method to retrieve all alumni posts

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
