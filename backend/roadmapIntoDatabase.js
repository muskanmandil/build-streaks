const mongoose = require("mongoose");
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = "deploy";

// Connection URL for  database
const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.uajhxxn.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0s`;


// Function to add
async function add() {
    try {

        // Connect to the source database
        await mongoose.connect(dbUri);
        console.log("Connected to database");


        const stepsCollection = mongoose.connection.db.collection('steps');
        const substepsCollection = mongoose.connection.db.collection('substeps');
        const questionsCollection = mongoose.connection.db.collection('questions');

        const result1 = await substepsCollection.find().skip(61).limit().toArray();
        const result2 = await questionsCollection.find().skip(455).limit().toArray();

        const substepIds = result1.map(substep => substep._id);
        const questionIds = result2.map(question => question._id);
        await stepsCollection.updateOne({ step_id: 18 }, {
            $set: { all_substeps: substepIds }
        });
        await substepsCollection.updateOne({ flagg: "true" }, {
            $set: { all_questions: questionIds }
        });

        console.log("All data added successfully.");

    } catch (err) {
        console.error("Error:", err);
    } finally {

        // Ensure that the connection is closed in the end
        await mongoose.connection.close();
        console.log("Connection closed.");
    }
}

add();