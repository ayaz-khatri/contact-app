import Contact from '../models/contacts.model.js';
import mongoose from 'mongoose';

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        let message = null;

        if (contacts.length === 0) {
            message = "No record found.";
        }

        res.render('home', { contacts, message });
    } catch (error) {
        res.render('500', { message: error.message });
    }
};


export const getContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.render('404', { message: "Invalid ID." });   
    }
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.render('404', { message: "Contact not found." });
        }
        res.render('show-contact', { contact });
    } catch (error) {
        res.render('500', { message: error });
    }
};

export const contactPage = (req, res) => {
    res.render('add-contact');
}

export const addContact = async (req, res) => {
    // const contact = await Contact.insertOne({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address,
    // });

    // this used when form-fields and database-fields names are same

    try {
        await Contact.create(req.body); // create is mongoose method
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }  
}

export const updatePage = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.render('404', { message: "Invalid ID." });   
    }
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.render('404', { message: "Contact not found." });
        }
        res.render('update-contact', {contact});
    } catch (error) {
        res.render('500', { message: error });
    }  
}

export const updateContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.render('404', { message: "Invalid ID." });   
    }
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
        if (!contact) {
            return res.render('404', { message: "Contact not found." });
        }
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }  
}

export const deleteContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.render('404', { message: "Invalid ID." });   
    }
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.render('404', { message: "Contact not found." });
        }
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }  
}