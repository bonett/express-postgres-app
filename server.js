const dotenv = require('dotenv');
dotenv.config();

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

const port = process.env.SERVER_PORT;
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./src/routes/user'));
app.use(require('./src/routes/event'));
app.use(require('./src/routes/auth'));


app.listen(port, () => console.log(`server started on port ${port}`));