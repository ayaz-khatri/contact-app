import Contact from '../models/contacts.model.js';

export const getContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.render('home', {contacts});
}

export const getContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('show-contact', {contact});
}

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
    await Contact.create(req.body); // create is mongoose method
    res.redirect('/');
}

export const updatePage = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('update-contact', {contact});
}

export const updateContact = async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
}

export const deleteContact = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
}