const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes=require('./routers/user')
const passport = require("passport");
const authRoute = require("./routers/authroutes");
const passportStrategy = require("./passport");
const app = express();
const cookieSession = require("cookie-session");
const session = require('express-session')

// app.use(session({
//    secret: 'somethingsecretgoeshere',
//    resave: false,
//    saveUninitialized: true,
//    cookie: { secure: true }
// }));
app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/user',userRoutes);

app.use("/auth", authRoute);
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
