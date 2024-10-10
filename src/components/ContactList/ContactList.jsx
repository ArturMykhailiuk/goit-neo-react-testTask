import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactList}>
      {contacts.map(({ id }) => (
        <Contact key={id} id={id} />
      ))}
    </ul>
  );
};

export default ContactList;
