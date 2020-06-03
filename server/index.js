const express = require('express');
const connectDB = require('./utils/db');
const routes = require('./routes/index');
const { errorHandle } = require('./middleware/core.middleware');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(routes);
app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
