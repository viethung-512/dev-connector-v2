const express = require('express');
const path = require('path');
const { AwakeHeroku } = require('awake-heroku');

const connectDB = require('./server/utils/db');
const routes = require('./server/routes/index');
const { errorHandle } = require('./server/middleware/core.middleware');

const app = express();

connectDB();

AwakeHeroku.add({
  url: 'https://secret-springs-30917.herokuapp.com/',
});

app.use(express.json({ extended: false }));
app.use(routes);
app.use(errorHandle);

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
