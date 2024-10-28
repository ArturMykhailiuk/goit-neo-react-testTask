import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addBooking } from "../../redux/bookings/slice";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const initialValues = {
    camper: "",
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const camperid = useParams();

  const [date, setBookingDate] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const bookingData = {
      ...values,
      date: date.toLocaleDateString(),
      camper: camperid.id,
    };
    dispatch(addBooking(bookingData));
    setSubmitting(false);
    resetForm();
    setBookingDate(null);
    toast.success("Booking was successfully added!");
  };

  return (
    <div className={css.bookingForm}>
      <div className={css.bookingHeader}>
        <h2>Book a Camper</h2>
        <h3>Stay connected! We are always ready to help you.</h3>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className={css.formGroup}>
            <ToastContainer />
            <div className={css.formGroupInputs}>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name*"
                required
              />

              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                required
              />

              <DatePicker
                selected={date}
                onChange={(date) => setBookingDate(date)}
                placeholderText="Booking Date*"
                required
              />

              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Comment"
                rows="6"
                cols="50"
                className={css.commentField}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={css.bookingBtn}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
