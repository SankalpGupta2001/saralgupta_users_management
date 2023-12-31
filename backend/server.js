const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();
app.use(bodyParser.json());
app.use(express.json());
const cors = require('cors');
const UsersControllers = require('./controllers/UsersControllers');
const UsersDataControllers = require('./controllers/UsersDataControllers');


const connectDB = require('./config/db');
connectDB(); 
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}));


app.get("/",(req,res) => {
    
 res.send("hey");      
})

app.use('/app', UsersControllers);
app.use('/app', UsersDataControllers);


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
