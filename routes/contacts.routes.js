import express from 'express';
const router = express.Router();
import {
    getContacts,
    getContact,
    contactPage,
    addContact,
    updatePage,
    updateContact,
    deleteContact
} from '../controllers/contacts.controller.js';

router.get('/', getContacts);
router.get('/show-contact/:id', getContact);
router.get('/add-contact', contactPage);
router.post('/add-contact', addContact);
router.get('/update-contact/:id', updatePage);
router.post('/update-contact/:id', updateContact);
router.get('/delete-contact/:id', deleteContact);

export default router;