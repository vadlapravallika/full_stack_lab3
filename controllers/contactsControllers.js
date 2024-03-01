const contactsRepo = require('../src/contactsRepository.js');
const Contact = require('../models/contacts.js')
const { validationResult } = require('express-validator');

/* GET contacts listing. */
exports.contacts_list = function(req, res, next) {
    const data = contactsRepo.findAll();
    res.render('contacts/list', { title: 'Contacts', contacts: data } );
};

/* GET contacts add */
exports.contacts_create_get = function(req, res, next) {
    res.render('contacts/add', { title: 'Add a Contact'} );
};

/* GET a contact */
exports.contact_detail = function(req, res, next) {
    const contact = contactsRepo.findById(req.params.id);
    if (contact) {
      res.render('contacts/view', { title: 'Contact', contact: contact} );
    } else {
      res.redirect('contacts/list');
    }
};

/* GET contacts edit */
exports.contacts_edit_get = function(req, res, next) {
    const contact = contactsRepo.findById(req.params.id);
    res.render('contacts/edit', { title: 'Edit Contact', contact: contact} );
};

/* POST todos delete */
exports.contacts_delete_post = function(req, res, next) {
    contactsRepo.deleteById(req.params.id);
    res.redirect('/contacts/list');
};

/* POST todos add */
exports.contacts_create_post = function(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.render('contacts/add', {title: 'Add a Contact', msg: result.array()});
    } else {
        const {fName, lName, email, notes} = req.body
        const newContact = new Contact('', fName, lName, email, notes);
        contactsRepo.create(newContact);
        res.redirect('/contacts/list');
    }
};

// Post contact edit
exports.contacts_edit_post = function(req, res, next) {
    //console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const contact = contactsRepo.findById(req.params.id);
      res.render('contacts/add', {title: 'Edit Contact', layout: 'edit', msg: result.array(), contact: contact});
    } else {
        const {fName, lName, email, notes} = req.body
        const updatedContact = new Contact(req.params.id, fName, lName, email, notes);
        contactsRepo.update(updatedContact);
        res.redirect('/contacts/list');
    }
  };