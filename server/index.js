const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));


const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes);


app.get('/', (req, res) => {
  res.send('Notes Marker API is running');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
