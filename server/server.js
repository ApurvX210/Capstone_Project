const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes=require('./routers/user')
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/user',userRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/GroceryManagement",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        // listen for requests
        app.listen(4000, () => {
            console.log('connected to db & listening on port', 4000)
        })
    });
