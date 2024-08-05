const mongoose = require("mongoose");
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;

// Connection URL for test database
const dbUriTest = `mongodb+srv://muskanmandil:${dbPassword}@cluster0.uajhxxn.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0s`;

// Function to update
async function updateQuestionData() {
    try {

        // Connect to the database (Test)
        await mongoose.connect(dbUriTest);
        console.log("Connected to test database");

        // Get the 'users' collection
        const usersCollection = mongoose.connection.db.collection('users');

        // Find all documents in the collection
        const users = await usersCollection.find({}).toArray();
        console.log(`Fetched ${users.length} documents from test database`);


        // Iterate through each user and update the questionData
        await Promise.all(users.map(async (user) => {

            const updatedQuestionsData = {};

            // Convert current questionData structure
            Object.keys(user.questionsData).forEach(key => {
                updatedQuestionsData[key] = {
                    completionStatus: user.questionsData[key],
                    revisionStatus: 0,
                };
            });

            // Update the user's document with the new questionData structure
            await usersCollection.updateOne(
                { _id: user._id },
                { $set: { questionsData: updatedQuestionsData } }
            );


        }));

        console.log("All users' questionData updated successfully.");
    } catch (err) {
        console.error("Error updating questionData:", err);
    } finally {
        mongoose.connection.close();
        console.log("Connection closed.");
    }
}

// Execute the function to update questionData
updateQuestionData();


