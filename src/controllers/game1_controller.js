import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getMainPage = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', '..', 'games', 'karting', 'index.html');
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
};
