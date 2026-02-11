// src/routes/mongoRoutes.js

const express = require('express');
const router = express.Router();
const Users = require('../db/Users');
const mongoose = require('mongoose');

router.get('/all', async (req, res) => {
  try {
    const users = await Users.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

router.get('/id/:id', async (req, res) => {

  const id = req.params.id

  try {
    const users = await Users.findById(id);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

router.get('/username/:username', async (req, res) => {

  const username = req.params.username

  try {
    const users = await Users.find({ 'username' : username });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});



router.post('/insert', async (req, res) => {
  try {

    console.log(req.body);

    const newEmargement = await Users.create(req.body);
    
    res.json({ message: "Nouvel emargement inséré avec succés"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal Server Error : ${err}` }); 
  }
})

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;

  // Optional: validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid document ID' });
  }

  try {
    const updatedDoc = await Emargement.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,            // Return the updated document
        runValidators: true,  // Run schema validations
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: '✅ Updated successfully', data: updatedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `❌ Update failed : ${err.message}` });
  }
});

router.delete('/delete/id/:id', async (req, res) => {
  try {

    const id = req.params.id

    const result = await Users.deleteOne({ _id : id });

    if (!result) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: '✅ Document deleted successfully', deleted: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Failed to delete document' });
  }
});

module.exports = router;