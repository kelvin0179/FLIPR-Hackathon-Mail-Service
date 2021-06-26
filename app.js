const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');
const { Store } = require("express-session");
const MongoStore = require("connect-mongo"); // for storing session
const database = require("./config/db");
const dotenv = require("dotenv"); // Enviroment Variables Global
const exphbs = require('express-handlebars'); // view Engine
const path = require("path"); // Node 
const methodOverride = require('method-override') // for overriding PUT and DELETE , since forms can only have GET | POST


//config accessing the global variables
dotenv.config({ path: "./config/config.env" });

//passport config
//passing the passport variable in the specified directory
require('./config/passport')(passport);

database();
const app = express();

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//method override init
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}));

const { saveData } = require("./helpers/hbs");
//view engine handlebars
app.engine('.hbs', exphbs({ helpers: { saveData }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');


// Express session
app.use(
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        // store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }) //storing the session in D
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//the static public folder carries img or css or other static files
app.use(express.static(path.join(__dirname, "public")));

//connect flash
app.use(flash());

//For Login page we declare global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});
// app.use(function (req, res, next) {
//     console.log(req.next);
//     next();
// });

app.use("/", require("./routes/index"));
app.use("/user", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));