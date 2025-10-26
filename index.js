const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./models/contacts.model.js');
const app = express();  

mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud')
.then(() => {console.log("Database Connected.")});

/* ------------------------------- Middlewares ------------------------------ */

app.set("view engine", "ejs");                  // set the view engine to ejs
app.use(express.json());                        // this allows us to send data to server in JSON format
app.use(express.urlencoded({extended: false})); // this allows us to send form-data
app.use(express.static('public'));              // set the default folder for static files to public


/* --------------------------------- Routes --------------------------------- */

app.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.render('home', {contacts});
});

app.get('/show-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('show-contact', {contact});
});

app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

app.post('/add-contact', async (req, res) => {
    // const contact = await Contact.insertOne({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address,
    // });

    // this used when form-fields and database-fields names are same
    await Contact.create(req.body); // create is mongoose method
    res.redirect('/');
});

app.get('/update-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('update-contact', {contact});
});

app.post('/update-contact/:id', async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

app.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

/* ---------------------------- Start the Server ---------------------------- */
app.listen(3000, () => {   
    console.log('App is up and running on port 3000');
});