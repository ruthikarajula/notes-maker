# Notes Marker (MERN)

**What is included**
- `server/` - Express + Mongoose backend
- `client/` - React frontend (create-react-app structure simplified)

**Quick start**

1. Backend
   - cd server
   - npm install
   - copy `.env.example` to `.env` and set MONGO_URI (MongoDB Atlas connection string)
   - node index.js

2. Frontend
   - cd client
   - npm install
   - npm start

**Notes**
- Replace MongoDB connection string with your Atlas URI.
- This package is prepared for local development. For deployment you will need to host the backend (e.g., Render) and update the frontend API URL.
