import express from 'express';

import { connectDB } from './config/database.js';
import ContactRoutes from './routes/contacts.routes.js';

const app = express();  

/* --------------------------- Database Connection -------------------------- */
connectDB();

/* ------------------------------- Middlewares ------------------------------ */

app.set("view engine", "ejs");                  // set the view engine to ejs
app.use(express.json());                        // this allows us to send data to server in JSON format
app.use(express.urlencoded({extended: false})); // this allows us to send form-data
app.use(express.static('public'));              // set the default folder for static files to public


/* --------------------------------- Routes --------------------------------- */
app.use('/', ContactRoutes);


/* ---------------------------- Start the Server ---------------------------- */
const PORT = process.env.PORT;

app.listen(PORT, () => {   
    console.log('App is up and running on port 3000');
});