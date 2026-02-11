import path from 'path';
import { fileURLToPath } from 'url';

/* recreate __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHomePage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'public', 'views', 'index.html');
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};

export const getLoginPage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'public', 'views', 'login.html');
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};

export const getSignupPage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'public', 'views', 'signup.html');
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};
