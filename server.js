const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//line 6 & 7 from video
const fileUpload = require('express-fileupload');
const mysql = req('mysql');
const routes = require('./controllers/');

const app = express();
const PORT = process.env.PORT || 3001;



//Keep it simple. Default option.
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Connect session
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.static('public'));

//Below is to make it easier to upload images.
app.use(express.static('upload'));

// const e = require('express'); <-------- NOT SURE why it added that
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// Templating engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// connection Pool from video:
const pool = mysql.createPool({
   
});

pool.getConnection((err, connection) => {
    if (err) throw err; //not connection
    console.log('connected');
});


app.get('', (req, res) => {
    res.render('create-petprofile');

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connection
        console.log('connected');

        connection.query('SELECT * FROM user WHERE id = "1"', (err, rows) => {
            //Once done, release connection
            connection.release();
            if (!err) {
                res.render('create-petprofile', { rows });
            }
        });
    });
});

app.post('', (req, res) => {
    let sampleFile; //name from form in Create-petProfile.handlebars
    let uploadPath; //

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;

    //uploading directly from our main//
    uploadPath = __dirname + '/upload/' + sampleFile.name;

    console.log(sampleFile);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        //changing pool to 
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connection
            console.log('connected');

            connection.query('UPDATE user SET profile_image = ? WHERE id = "1"', [sampleFile.name], (err, rows) => {
                //Once done, release connection
                connection.release();
                if (!err) {
                    //don't render aka load again, just use redirect
                    res.redirect('/');
                } else {
                    console.log(err);
                }
            });
        });

        // res.send('Pet File uploaded');
    });


});

app.listen(port, () => console.log(`What's up dog im listening ${port}`));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(require('./controllers/'));
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Whats up dog, im listening'));
})
