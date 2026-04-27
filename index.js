const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/medmonitor")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// 📌 Schema
const ReminderSchema = new mongoose.Schema({
    name: String,
    time: String,
    duration: Number,
    daysPassed: { type: Number, default: 0 },
    status: { type: String, default: "active" }
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

// ➕ Add Medicine
app.post("/add-med", async (req, res) => {
    const med = new Reminder(req.body);
    await med.save();
    res.json(med);
});

// 📥 Get Medicines
app.get("/get-meds", async (req, res) => {
    const meds = await Reminder.find();
    res.json(meds);
});

// ❌ Delete Medicine
app.delete("/delete-med/:id", async (req, res) => {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// 🔄 Update Medicine
app.put("/update-med/:id", async (req, res) => {
    const updated = await Reminder.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// 🚀 Server
app.listen(5000, () => console.log("Server running on port 5000"));