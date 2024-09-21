import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import css from "./ContactForm.module.css";

const ContactForm = ({ onAddContact }) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),
    number: Yup.string()
      .required("Number is required")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),
  });
  const handleSubmit = (values, { resetForm }) => {
    onAddContact(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ id: "0", name: "", number: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.contactForm}>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" className={css.error} />
          <br />
          <label htmlFor="name">Phone Number</label>
          <Field type="text" name="number" />
          <ErrorMessage name="number" component="span" className={css.error} />
          <br />
          <button
            type="submit"
            disabled={isSubmitting}
            className={css.addContactBtn}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
