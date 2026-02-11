// src/controllers/controller.js

const path = require('path');

exports.getHomePage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'public', 'views', 'index.html');
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};

exports.getLoginPage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'public', 'views', 'login.html');
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};

exports.getSignupPage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'public', 'views', 'signup.html'); //Pas encore de page login a changer 
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};