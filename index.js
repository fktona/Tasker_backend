const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/AUTH');
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;


const db = require("./models");
app.use('/api/auth' , auth)
const Role = db.role;
db.mongoose
  .connect('mongodb://localhost:27017/Tasker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
    app.listen(PORT , () => {
        console.log(`Server running on port ${PORT}`);
    })
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });



