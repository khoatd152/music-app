const express = require('express')
const app = express();
const apiRoutes = require('./Router/route');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port

// app.use(express.urlencoded())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);


const MongoClient = require('mongodb').MongoClient;
const uri = process.env.CONN_STR;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err)
        console.log(err);
    else {
        app.locals.db = client.db('MusicApp');
        app.listen(port, function () {
            console.log("Running Web API on port " + port);
        });
    }
});