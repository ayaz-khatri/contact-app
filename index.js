import express from 'express';       
const app = express();                                        

/* ------------------------------- Middlewares ------------------------------ */

app.set("view engine", "ejs");                  // set the view engine to ejs
app.use(express.json());                        // this allows us to send data to server in JSON format
app.use(express.urlencoded({extended: false})); // this allows us to send form-data
app.use(express.static('public'));              // set the default folder for static files to public


/* --------------------------------- Routes --------------------------------- */

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/show-contact', (req, res) => {
    res.render('show-contact');
});

app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

app.post('/add-contact', (req, res) => {});

app.get('/update-contact', (req, res) => {
    res.render('update-contact');
});

app.post('/update-contact', (req, res) => {});

app.post('/delete-contact', (req, res) => {});


/* ---------------------------- Start the Server ---------------------------- */
app.listen(3000, () => {   
    console.log('App is up and running on port 3000');
});