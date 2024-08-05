const mongoose = require("mongoose");
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;

// Connection URLs for both databases
const dbUriDeploy = `mongodb+srv://muskanmandil:${dbPassword}@cluster0.uajhxxn.mongodb.net/deploy?retryWrites=true&w=majority&appName=Cluster0s`;
const dbUriTest = `mongodb+srv://muskanmandil:${dbPassword}@cluster0.uajhxxn.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0s`;

// Function to copy users collection Deploy to Test database
async function copyUsers() {
  try {

    // Connect to the source database (Deploy)
    await mongoose.connect(dbUriDeploy);
    console.log("Connected to deploy database");

    // Get the 'users' collection from the source database
    const deployUsersCollection = mongoose.connection.db.collection('users');

    // Fetch all documents from the source database
    const users = await deployUsersCollection.find({}).toArray();
    console.log(`Fetched ${users.length} documents from deploy database`);

    // Close the connection to the source database
    await mongoose.connection.close();

    // Connect to the target database (Test)
    await mongoose.connect(dbUriTest);
    console.log("Connected to Test database");

    // Get the 'users' collection from the target database
    const testUsersCollection = mongoose.connection.db.collection('users');

    // Insert all documents into the target database
    await testUsersCollection.insertMany(users);
    console.log(`Inserted ${users.length} documents into test database`);

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
