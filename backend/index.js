const express = require('express');
const app = express();
const db = require('./models');
const bodyParser= require("body-parser")
const cookieParser = require('cookie-parser')
const servicesRoute = require('./routes/serviceRoutes')
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes');
const dummyRoute = require('./routes/dummyRoutes');
require('dotenv').config();
//body parser
app.use(express.json());
// usebody-parser middleware to parse JSON data
app.use(bodyParser.json());
//cookie parser
app.use(cookieParser());

//Loads homepage when server starts
app.get('/', (req, res) => {
  res.json({ message: 'Homepage' });
});


//Routes
app.use('/users', userRoutes); //landing page
app.use(userRoutes); 
app.use('/services', servicesRoute );
app.use('/policies', policyRoutes);
app.use( dummyRoute);


//Sync DB and start server
db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log('Server running on port 8000');
  });
});


