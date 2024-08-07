const mongoose = require("mongoose");
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
const dbSource = "deploy";
const dbTarget = "test";

// Connection URLs for both databases
const dbUriSource = `mongodb+srv://muskanmandil:${dbPassword}@cluster0.uajhxxn.mongodb.net/${dbSource}?retryWrites=true&w=majority&appName=Cluster0s`;
const dbUriTarget = `mongodb+srv://muskanmandil:${dbPassword}@cluster0.uajhxxn.mongodb.net/${dbTarget}?retryWrites=true&w=majority&appName=Cluster0s`;

// Function to copy users collection 
async function copyUsers() {
  try {

    // Connect to the source database
    await mongoose.connect(dbUriSource);
    console.log("Connected to source database");

    // Get the 'users' collection from the source database
    const sourceUsersCollection = mongoose.connection.db.collection('users');

    // Fetch all documents from the source database
    const users = await sourceUsersCollection.find({}).toArray();
    console.log(`Fetched ${users.length} documents from source database`);

    // Close the connection to the source database
    await mongoose.connection.close();

    // Connect to the target database 
    await mongoose.connect(dbUriTarget);
    console.log("Connected to Target database");

    // Get the 'users' collection from the target database
    const targetUsersCollection = mongoose.connection.db.collection('users');

    // If ->>>>  Insert users from source to target
    await targetUsersCollection.insertMany(users);
    console.log(`Insert ${users.length} documents into test database`)

    // If ->>>>> Iterate through each user and update the schema
    await Promise.all(users.map(async (user) => {
      const { questionsData, ...rest } = user;

      // Transform the questionsData as per the new schema
      const updatedQuestionsData = {};
      for (const [key, value] of Object.entries(questionsData)) {
        updatedQuestionsData[key] = {
          completed: value === 1, // Convert 1 to true and others to false
          revision: false
        };
      }

      // Update the user document
      const updatedUser = {
        ...rest,
        questionsData: updatedQuestionsData,
      };

      // Insert the transformed data into the target database
      await targetUsersCollection.updateOne(
        { _id: user._id },
        { $set: updatedUser },
        { upsert: true }
      );

    }));

    console.log("All users' data updated successfully.");

  } catch (err) {
    console.error("Error during copying users:", err);
  } finally {
    
    // Ensure that the connection is closed in the end
    await mongoose.connection.close();
    console.log("Connection closed.");
  }
}

// Execute the function to copy users
copyUsers();