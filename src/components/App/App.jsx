import { useState, useEffect } from "react";
import ContactList from "../ContactList/ContactList.jsx";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";
import { nanoid } from "nanoid";
import css from "./App.module.css";

const App = () => {
  const initialState = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];

  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : initialState;
  });

  const [filter, setFilter] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const onAddContact = (newContact) => {
    newContact = { ...newContact, id: "id-" + nanoid(3) };
    setContacts([...contacts, newContact]);
  };

  const onDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <br />
      <SearchBox
        filter={filter}
        onFilterChange={(value) => setFilter(value)}
        className={css.searchBox}
      />
      <br />
      <ContactList contacts={filteredContacts} setContacts={setContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

export default App;
