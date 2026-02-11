// src/controllers/game1_controller.js

const path = require('path');

exports.getMainPage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'games', 'karting', 'index.html');
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};