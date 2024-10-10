import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={css.inputName}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className={css.inputNumber}
        />
      </label>
      <button className={css.addContactBtn} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
