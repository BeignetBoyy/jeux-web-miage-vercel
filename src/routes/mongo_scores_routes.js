// src/routes/mongoRoutes.js

import express from 'express';
import mongoose from 'mongoose';
import Scores from '../db/Scores.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const users = await Scores.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/id/:id', async (req, res) => {
  try {
    const users = await Scores.findById(req.params.id);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/insert', async (req, res) => {
  try {
    const newUser = await Scores.create(req.body);
    res.json({ message: 'Nouvel emargement inséré avec succès', data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid document ID' });
  }

  try {
    const updatedDoc = await Scores.findByIdAndUpdate( // ✅ fixed here
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: '✅ Updated successfully', data: updatedDoc });
  } catch (err) {
    res.status(500).json({ error: `❌ Update failed: ${err.message}` });
  }
});

router.delete('/delete/id/:id', async (req, res) => {
  try {
    const result = await Scores.deleteOne({ _id: req.params.id });

    if (!result.deletedCount) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: '✅ Document deleted successfully', deleted: result });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to delete document' });
  }
});

export default router;
