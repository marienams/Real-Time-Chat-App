# Real-Time Chat Application [Live link](https://real-time-chat-app-d7vu.onrender.com/login)
Please give the live link a few minutes to load, I am hosting on free-tier plan.

This is a real-time chat application built with an **Express server**, **MongoDB** for database storage, **Cloudinary** for storing profile pictures, and **JWT** tokens for user authentication. The frontend is developed using **React**, styled with **Tailwind CSS** and **daisyUI**, and real-time communication is enabled through **Socket.IO**.

---

## Features
- **User Authentication:** Secure login and signup with JWT.
- **Real-Time Chat:** Instant messaging powered by Socket.IO.
- **Profile Pictures:** Users can upload and update profile pictures stored in Cloudinary.
- **Responsive UI:** Designed using Tailwind CSS and daisyUI.
- **Database:** MongoDB for storing user and chat data.

---

## Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **MongoDB** (Local or hosted, e.g., MongoDB Atlas)
- **npm** or **yarn**
- **Cloudinary Account** for profile picture storage (not that important)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/real-time-chat-app.git
cd real-time-chat-app
```

### 2. Set Up the Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder with the following keys:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5001` by default.

---

### 3. Set Up the Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` folder with the following keys:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5001
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:5173`.

---

### 4. Connect Backend and Frontend
- Ensure both the backend (`http://localhost:5001`) and frontend (`http://localhost:5173`) servers are running.
- Access the application by visiting `http://localhost:5173` in your browser.

---

## Folder Structure
```plaintext
real-time-chat-app/
├── backend/
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── controllers/     # Business logic for routes
│   ├── utils/           # Utility functions
│   ├── .env             # Environment variables
│   └── server.js        # Main server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # React pages
│   │   ├── styles/      # Tailwind and CSS
│   │   ├── .env         # Frontend environment variables
│   │   └── App.js       # Main React entry point
└── README.md            # Project documentation
```

---

## Built With
- **Backend:**
  - Express
  - MongoDB
  - Mongoose
  - Cloudinary
  - JWT
  - Socket.IO
- **Frontend:**
  - React
  - Tailwind CSS
  - daisyUI

---

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any changes.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Troubleshooting
- If you encounter CORS issues, ensure the backend allows requests from the frontend origin.
- Check your `.env` files for missing or incorrect variables.
- Verify that MongoDB and Cloudinary credentials are correct.

---

## Contact
If you have any questions or suggestions, feel free to reach out at mahima.ms0007@gmail.com

