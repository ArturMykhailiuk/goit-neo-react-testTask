import PropTypes from "prop-types";
import Contact from "../Contact/Contact";
import React from "react";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, setContacts }) => {
  const onDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };
  return (
    <ul className={css.contactList}>
      {contacts.map((contact) => (
        <React.Fragment key={contact.id}>
          <Contact contact={contact} onDeleteContact={onDeleteContact} />
        </React.Fragment>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,

  setContacts: PropTypes.func,
};

export default ContactList;
