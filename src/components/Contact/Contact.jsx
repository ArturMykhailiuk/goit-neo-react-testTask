import { useSelector, useDispatch } from "react-redux";
import { deleteContact, selectContacts } from "../../redux/contactsSlice";
import css from "./Contact.module.css";
import phonesvg from "../../assets/phone.svg";
import contactsvg from "../../assets/contact.svg";

const Contact = ({ id }) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) =>
    selectContacts(state).find((contact) => contact.id === id)
  );

  if (!contact) {
    return null;
  }

  return (
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
          onClick={() => dispatch(deleteContact(contact.id))}
          className={css.deleteBtn}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Contact;
