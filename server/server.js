const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

// configure cors
app.use(cors());

// configure dotEnv
dotEnv.config({path : './config/config.env'});

// configure express to accept form data
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const hostname = process.env.LOCAL_HOST_NAME;
const port = process.env.LOCAL_PORT;

// home page request
app.get('/', (request, response) => {
    response.send(`Welcome to Events Booking App Express Server`);
});

// connect to MongoDB
mongoose.connect(process.env.MONGODB_LOCAL_DB_URL, {
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then((response) => {
    console.log('Connected to Database Successfully..............');
}).catch((err) => {
    console.error(err);
    process.exit(1); // stop the node js process
});

// router configuration
app.use('/users', require('./router/userRouter'));
app.use('/events', require('./router/eventRouter'));

// listen to port
app.listen(port, hostname, () => {
    console.log(`Express Server is started at http://${hostname}:${port}`);
});
