const express = require('express');
const app = express();
const PORT = 5001;

app.use((req, res) => {
  res.send('Catch-all Active');
});

app.listen(PORT, () => {
  console.log(`Test server running on http://127.0.0.1:${PORT}`);
});
