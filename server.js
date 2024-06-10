'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const routes = require('./routes');
app.use('/api', routes);

const admin = require('./routes/admin');
app.use('/api/admin', admin);

const siswa = require('./routes/siswa');
app.use('/api/siswa', siswa);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('running on port', PORT);
});
