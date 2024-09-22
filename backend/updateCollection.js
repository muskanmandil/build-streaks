const mongoose = require("mongoose");
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = "deploy";
const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.uajhxxn.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0s`;


async function updateDatabase() {
    try {

        await mongoose.connect(dbUri);
        console.log("Connected to database");

        const usersCollection = mongoose.connection.db.collection('users');

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