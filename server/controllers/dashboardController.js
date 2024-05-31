const Note = require("../models/Notes");
const mongoose = require("mongoose");
exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Free Notes App",
  };
  try {
    const notes = await Note.find({});
    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
    console.log(notes);
  } catch (error) {}
};

exports.dashboardViewNote = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("User not logged in or user ID missing.");
      return res.status(400).send("User not logged in or user ID missing.");
    }

    const noteId = new mongoose.Types.ObjectId(req.params.id);
    const userId = new mongoose.Types.ObjectId(req.user.id);

    console.log(`Fetching note with ID: ${noteId} for user: ${userId}`);

    const note = await Note.findById(noteId).lean();

    if (note) {
      console.log(`Note found: ${JSON.stringify(note)}`);
      if (note.user.toString() == userId.toString()) {
        // Check if the note belongs to the logged-in user
        res.render("dashboard/view-notes", {
          noteID: req.params.id,
          note,
          layout: "../views/layouts/dashboard",
        });
      } else {
        console.log(`Note does not belong to the logged-in user.`);
        res.status(403).send("Access denied.");
      }
    } else {
      console.log(`Note not found. Note ID: ${noteId}`);
      res.status(404).send("Note not found.");
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).send("An error occurred while fetching the note.");
  }
};

exports.dashboardUpdateNote = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("User not logged in or user ID missing.");
      return res.status(400).send("User not logged in or user ID missing.");
    }

    const noteId = new mongoose.Types.ObjectId(req.params.id);
    const userId = new mongoose.Types.ObjectId(req.user.id);

    console.log(`Updating note with ID: ${noteId} for user: ${userId}`);

    const note = await Note.findById(noteId);

    if (!note) {
      console.log(`Note not found.`);
      return res.status(404).send("Note not found.");
    }

    // Check if the note does not belong to the logged-in user
    if (note.user.toString() == userId.toString()) {
      console.log(
        `Updating note since it does not belong to the logged-in user.`
      );

      // If ownership validation passed, proceed with the update
      await Note.findOneAndUpdate(
        { _id: noteId },
        { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
      );

      res.redirect("/dashboard");
    } else {
      console.log(`Note belongs to the logged-in user. Not updating.`);
      res.status(403).send("Access denied.");
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("An error occurred while updating the note.");
  }
};
exports.dashboardDeleteNote = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("User not logged in or user ID missing.");
      return res.status(400).send("User not logged in or user ID missing.");
    }

    const noteId = new mongoose.Types.ObjectId(req.params.id);
    const userId = new mongoose.Types.ObjectId(req.user.id);

    console.log(`Deleting note with ID: ${noteId} for user: ${userId}`);

    const note = await Note.findById(noteId);

    if (!note) {
      console.log(`Note not found.`);
      return res.status(404).send("Note not found.");
    }

    // Check if the note belongs to the logged-in user
    if (note.user.toString() == userId.toString()) {
      console.log(
        `Deleting note since it does not belong to the logged-in user.`
      );

      // If ownership validation passed, proceed with the deletion
      await Note.deleteOne({ _id: noteId });

      res.redirect("/dashboard");
    } else {
      console.log(`Note belongs to the logged-in user. Not deleting.`);
      res.status(403).send("Access denied.");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send("An error occurred while deleting the note.");
  }
};
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("User not logged in or user ID missing.");
      return res.status(400).send("User not logged in or user ID missing.");
    }

    console.log(`Adding new note for user: ${req.user.id}`);

    // Assign the logged-in user's ID to the note's user field
    req.body.user = req.user.id;

    // Create the note with the user ID assigned
    await Note.create(req.body);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).send("An error occurred while adding the note.");
  }
};
