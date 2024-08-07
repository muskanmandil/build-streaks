const mongoose = require("mongoose");
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
const dbName = "deploy";

// Connection URL for database
const dbUri = `mongodb+srv://muskanmandil:${dbPassword}@cluster0.uajhxxn.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0s`;

// Function to update
async function updateDatabase() {
    try {

        // Connect to the database
        await mongoose.connect(dbUri);
        console.log("Connected to database");

        // Get the 'users' collection
        const usersCollection = mongoose.connection.db.collection('users');

        // Find all documents in the collection
        const users = await usersCollection.find({}).toArray();
        console.log(`Fetched ${users.length} documents from database`);


        // Iterate through each user and update the schema
        await Promise.all(users.map(async (user) => {

            const updatedQuestionsData = {};

            // Convert current questionData structure
            Object.keys(user.questionsData).forEach(key => {
                updatedQuestionsData[key] = {
                    completed: user.questionsData[key].completed,
                    revision: user.questionsData[key].revision,
                    note: {
                        status: false,
                        content: ""
                    }
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

        console.error("Error while updating:", err);
    } finally {

        mongoose.connection.close();
        console.log("Connection closed.");
    }
}

updateDatabase();