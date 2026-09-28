import express from 'express';
import Contact from '../models/Contact.js';
import { sendRouteError } from '../utils/routeError.js';

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
    } catch (error) {
      sendRouteError(error, res, 'Failed to fetch contacts.');
  }
});

// GET a single contact by ID 
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    sendRouteError(error, res, 'Failed to fetch contact.');
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    sendRouteError(error, res, 'Failed to create contact.');
  }
});

// PUT update a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
    } catch (error) {   
      sendRouteError(error, res, 'Failed to update contact.');
    }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });  
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    sendRouteError(error, res, 'Failed to delete contact.');
  }
});

export default router;