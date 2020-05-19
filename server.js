require('dotenv').config();

const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./src/routes/user'));
app.use(require('./src/routes/event'));
app.use(require('./src/routes/user_event'));


app.listen(port, () => console.log(`server started on port ${port}`));