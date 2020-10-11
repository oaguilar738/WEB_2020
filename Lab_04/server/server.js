const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const config = require('./config');

const PORT = config.PORT;

app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));