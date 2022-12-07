const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./models');
// const db = require('./routes/student');

app.use(bodyParser.json());

app.use('/users', require('./routes/user'));
// app.use('/students', require('./routes/student'));

db.sequelize
    .sync()
    .then(() => {
        console.log('Connected to DB');
        app.listen(4000, () => console.log('Server listening to PORT 4000'))
    })
    .catch(err => {
        console.error(err);
    })