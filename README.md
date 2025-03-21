
# **Build Streaks**

### **Deployed Project**

You can view the deployed project at:
[Build Streaks (Deployed)](https://build-streaks.vercel.app/)

---

## **Project Setup**

### **Frontend Setup**

To get started with the frontend, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muskanmandil/build-streaks.git
   cd build-streaks
   ```

2. **Navigate to the `frontend` directory:**

   ```bash
   cd frontend
   ```

3. **Add the `.env` file in the `frontend` folder:**

   Create a `.env` file and set the `REACT_APP_BACKEND_URL` environment variable:

   ```env
   REACT_APP_BACKEND_URL="http://localhost:4000"
   ```

   If you want to use the deployed backend, you can use the following URL:

   ```env
   REACT_APP_BACKEND_URL="https://build-streaks-backend.vercel.app"
   ```

4. **Install the dependencies:**

   ```bash
   npm install
   ```

5. **Start the frontend development server:**

   ```bash
   npm start
   ```

   This will start the frontend at `http://localhost:3000` (by default).

---

If you are using the deployed backend, you don't need to set up the backend.

### **Backend Setup**

To set up the backend:

1. **Navigate to the `backend` directory:**

   ```bash
   cd backend
   ```

2. **Add the `.env` file in the `backend` folder:**

   Create a `.env` file with the following configuration:

   ```env
   GOOGLE_CLIENT_ID = ""
   GOOGLE_CLIENT_SECRET = ""
   REFRESH_TOKEN = ""
   EMAIL_ADDRESS = "buildstreaks@gmail.com"

   MONGO_DB_URI = ""
   
   JWT_KEY=""
   ```

3. **Install the backend dependencies:**

   ```bash
   npm install
   ```

4. **Start the backend server:**

   ```bash
   node index.js
   ```

   This will start the backend at `http://localhost:4000`.

---