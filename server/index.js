const express = require('express');
const path = require('path');
const { AwakeHeroku } = require('awake-heroku');

const connectDB = require('./utils/db');
const routes = require('./routes/index');

const { errorHandle } = require('./middleware/core.middleware');

const app = express();

connectDB();

AwakeHeroku.add({
  // url: 'https://secure-beyond-57876.herokuapp.com/',
});

app.use(express.json({ extended: false }));
app.use(routes);
app.use(errorHandle);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
