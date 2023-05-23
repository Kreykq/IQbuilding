const express = require('express');
const session = require('express-session');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login'); 
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
  secret: 'bebra', 
  resave: false,
  saveUninitialized: true
}));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use routes from the register route module
app.use('/', registerRoutes);
app.use('/', loginRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
