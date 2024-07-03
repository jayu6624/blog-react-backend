import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/user.route.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json()); // Use this to parse JSON bodies

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/user'; // Replace 'yourdbname' with your database name

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.use(cors())
// Use routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
