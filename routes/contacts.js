var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactsControllers');
const { body } = require('express-validator');


// GET todos listing
router.get('/list', contactsController.contacts_list);

// GET todos add
router.get('/add', contactsController.contacts_create_get);

// POST todos delete 
router.post('/:id/delete', contactsController.contacts_delete_post);

// 
router.get('/:id', contactsController.contact_detail);

/* POST todos add */
router.post('/', 
body('fName').trim().notEmpty().withMessage('First Name can not be empty!'), 
body('lName').trim().notEmpty().withMessage('Last Name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_create_post);

// 
router.get('/:id/edit', contactsController.contacts_edit_get);

// 
router.post('/:id/edit',
body('fName').trim().notEmpty().withMessage('First Name can not be empty!'), 
body('lName').trim().notEmpty().withMessage('Last Name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_edit_post);

module.exports = router;
