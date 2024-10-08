import ContactList from "../ContactList/ContactList.jsx";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;
