const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path'); 
require('dotenv').config();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
const cors = require('cors');
const UsersControllers = require('./controllers/UsersControllers');
const UsersDataControllers = require('./controllers/UsersDataControllers');


const connectDB = require('./config/db');
connectDB(); 
app.use(cors());

  


app.use('/app', UsersControllers);
app.use('/app', UsersDataControllers);


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
