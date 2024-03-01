class Contact {
    constructor(id, fName, lName, email, notes) {
      this.id = id
      this.fName = fName;
      this.lName = lName;
      this.email = email || '';
      this.notes = notes || '';
      this.created_at = new Date().toLocaleString();
      this.modified_at = new Date().toLocaleString();
    }
  }
  
  
module.exports = Contact;