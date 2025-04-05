import express from 'express';
import os from 'os';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;

// Define the path to the posts.json file
const postsFilePath = path.join(new URL(import.meta.url).pathname, '..', 'posts.json');
app.use('/assets', express.static(path.join(new URL(import.meta.url).pathname, '..', 'assets')));

// Function to get the local IP address
function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    for (const network of networkInterfaces[interfaceName]) {
      if (network.family === 'IPv4' && !network.internal) {
        return network.address;
      }
    }
  }
  return 'localhost';
}

// Function to load posts from the posts.json file
function loadPostsFromFile() {
  try {
    const data = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading posts file:', err);
    return [];
  }
}

// Route to get posts with pagination and category filtering
app.get('/wp-json/wp/v2/posts', (req, res) => {
  const { page = 1, per_page = 21, categories } = req.query;

  const posts = loadPostsFromFile();

  const filteredPosts = posts.filter(post => (categories ? post.categories.includes(parseInt(categories)) : true));

  const startIndex = (page - 1) * per_page;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + parseInt(per_page));

  if (paginatedPosts.length === 0) {
    return res.status(400).json({
      code: 'rest_post_invalid_page_number',
      message: 'The page number requested is larger than the number of pages available.',
      data: {
        status: 400,
      },
    });
  }

  setTimeout(() => {
    res.json(paginatedPosts);
  }, 500);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  const localIP = getLocalIPAddress();
  console.log(`API is running:`);
  console.log(` - Local: http://localhost:${port}/wp-json/wp/v2/posts`);
  console.log(` - Network: http://${localIP}:${port}/wp-json/wp/v2/posts`);
});
