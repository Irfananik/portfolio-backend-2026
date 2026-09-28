import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
    } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
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
    res.status(500).json({ message: 'Failed to fetch contact', error: error.message });
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid contact data', error: error.message });
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
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
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
    res.status(500).json({ message: 'Failed to delete contact', error: error.message });
  }
});

export default router;