import PropTypes from "prop-types";
import css from "./Contact.module.css";
import phonesvg from "../../assets/phone.svg";
import contactsvg from "../../assets/contact.svg";
const Contact = ({ id, contact, onDeleteContact }) => {
  return (
    <>
      <li key={id} className={css.contact}>
        <div className={css.contactInfo}>
          <div className={css.flexRow}>
            <img src={contactsvg} alt={contact.name} className={css.icon} />
            <span>{contact.name}</span>
          </div>
          <div className={css.flexRow}>
            <img src={phonesvg} alt={contact.name} className={css.icon} />
            <span>{contact.number}</span>
          </div>
        </div>
        <div className={css.delete}>
          <button
            onClick={() => onDeleteContact(contact.id)}
            className={css.deleteBtn}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,

  onDeleteContact: PropTypes.func,

  id: PropTypes.string,
};

export default Contact;
