const express = require('express');

//create app express
const app = express();
var cors = require('cors');

const bodyParser = require('body-parser');

//setup server port
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
});


// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

// ******************* IMPORT ROUTE ***********************************
const courseRoute = require('./routes/Course.route');
const roomRoute = require('./routes/Room.route');



// ******************* USE ROUTE ***********************************
app.use('/api/course', courseRoute);
app.use('/api/room', roomRoute);

// ********************************************************************
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});