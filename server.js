require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Complaint Schema and Model
const complaintSchema = new mongoose.Schema({
  name: String,
  location: String,
  issue: String,
  createdAt: { type: Date, default: Date.now }
});
const Complaint = mongoose.model('Complaint', complaintSchema);

// Feedback Schema and Model
const feedbackSchema = new mongoose.Schema({
  name: String,
  rating: String,
  comments: String,
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Event Schema and Model
const eventSchema = new mongoose.Schema({
  eventDate: String,
  eventTitle: String,
  eventDetails: String,
  createdAt: { type: Date, default: Date.now }
});
const Event = mongoose.model('Event', eventSchema);

// Timetable Schema and Model
const timetableSchema = new mongoose.Schema({
  year: String,
  semester: String,
  day: String,
  slot: String,
  subject: String,
  createdAt: { type: Date, default: Date.now }
});
const Timetable = mongoose.model('Timetable', timetableSchema);

// RoomRadar Schema and Model
const roomRadarSchema = new mongoose.Schema({
  roomNumber: String,
  facultyIncharge: String,
  status: String, // "vacant" or "occupied"
  lastUpdated: { type: Date, default: Date.now }
});
const RoomRadar = mongoose.model('RoomRadar', roomRadarSchema);

// AquaPulse Schema and Model
const aquaPulseSchema = new mongoose.Schema({
  location: String,
  issue: String,
  reportedBy: String,
  createdAt: { type: Date, default: Date.now }
});
const AquaPulse = mongoose.model('AquaPulse', aquaPulseSchema);

// NotesCorner Schema and Model
const notesCornerSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  year: String,
  semester: String,

  fileUrl: String, // URL to PDF or video
  uploadedBy: String, // student or faculty name
  subject: String,
  createdAt: { type: Date, default: Date.now }
});
const NotesCorner = mongoose.model('NotesCorner', notesCornerSchema);

// Complaint POST & GET
app.post('/api/complaints', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.json({ message: 'Complaint submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit complaint.' });
  }
});

// Admin-only route to get all complaints
// ✅ KEEP THIS:
app.get('/api/complaints', (req, res) => {
  const adminSecret = req.headers['x-admin-secret'];
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  Complaint.find().then(complaints => res.json(complaints));
});

// Feedback POST & GET
// Feedback POST & GET
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks.' });
  }
});
// Event POST & GET
app.post('/api/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json({ message: 'Event added successfully!' });
});
app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Timetable POST & GET
app.post('/api/timetable', async (req, res) => {
  const timetable = new Timetable(req.body);
  await timetable.save();
  res.json({ message: 'Timetable entry saved!' });
});
app.get('/api/timetable', async (req, res) => {
  const timetables = await Timetable.find();
  res.json(timetables);
});

// RoomRadar POST & GET
//filepath: c:\Users\SAI SRI\smart campus buddy\backend\server.js
app.post('/api/roomradar', async (req, res) => {
  const { roomNumber, facultyIncharge, status } = req.body;
  const room = await RoomRadar.findOneAndUpdate(
    { roomNumber },
    { facultyIncharge, status, lastUpdated: Date.now() },
    { upsert: true, new: true }
  );
  res.json({ message: 'Room status updated!' });
});

// AquaPulse POST & GET// filepath: 

app.post('/api/aquapulse', async (req, res) => {
  const issue = new AquaPulse(req.body);
  await issue.save();
  res.json({ message: 'Water issue reported!' });
});
app.get('/api/aquapulse', async (req, res) => {
  const issues = await AquaPulse.find();
  res.json(issues);
});
// NotesCorner Schema and Model (at the top, only once)
// (Removed duplicate declaration)

// NotesCorner POST & GET
app.post('/api/notescorner', async (req, res) => {
  const note = new NotesCorner(req.body);
  await note.save();
  res.json({ message: 'Note uploaded!' });
});
app.get('/api/notescorner', async (req, res) => {
  const notes = await NotesCorner.find();
  res.json(notes);
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

