
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "../../store/doctors.slice";
import DoctorItem from "../DoctorItem/DoctorItem";
import styles from "./App.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer"

function App() {
  const [showForm, setshowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const doctorsList = useSelector((state) => state.doctors.list);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    spec: "",
  });

  const handlerChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const words = formData.name.trim().split(/\s+/);
    if (words.length < 2) {
      setErrorMessage("Please enter both first and last name");
      return;
    } else {
      setErrorMessage("");
    }

    const phonePattern = /^\(\d{3}\) \d{3}-\d{3}-\d{3}$/;
    if (!phonePattern.test(formData.phone)) {
      setErrorMessage("Please enter phone number in format (XXX) XXX-XXX-XXX");
      return;
    } else {
      setErrorMessage("");
    }

    if (formData.name && formData.phone && formData.spec) {
      dispatch(addDoctor({ ...formData }));
      setFormData({ name: "", phone: "", spec: "" });
      setErrorMessage("");
      setshowForm(false);
    } else {
      setErrorMessage("Please fill in all fields");
    }
  };

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const specialties = [
    "Orthodontist",
    "Endodontist",
    "Periodontist",
    "Prosthodontist",
    "Pediatric Dentist",
    "Oral Pathologist",
    "Public Dentist",
    "Oral Radiologist",
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className="flex">Doctors</h2>

        {doctorsList.length > 0 && (
          <div className="flex gap-1 ">
            <p className={styles.input_title}>Name</p>
            <p className={styles.input_title}>Phone</p>
            <p className={styles.input_title}>Specialisation</p>
          </div>
        )}

        {errorMessage && (
          <p style={{ color: "red", margin: "15px" }}>{errorMessage}</p>
        )}
        {showForm && (
          <form method="post" className="flex gap-1 ">
            <input
              name="name"
              placeholder="Name Surname"
              onChange={(e) => handlerChange(e)}
            />
            <input
              name="phone"
              placeholder="(XXX) XXX-XXX-XXX"
              onChange={(e) => handlerChange(e)}
            />
            <select
              name="spec"
              onChange={(e) => handlerChange(e)}
              value={formData.spec}
            >
              <option value="">Select specialization</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className={styles.form_button}
              onClick={(e) => handlerSubmit(e)}
            >
              Submit
            </button>
          </form>
        )}

        {doctorsList.map((item, index) => (
          <DoctorItem key={index} item={item} />
        ))}

        <button
          className={styles.form_button}
          onClick={() => {
            setshowForm((prev) => !prev);
            setErrorMessage("");
            setFormData({ name: "", phone: "", spec: "" });
          }}
        >
          Add doctor
        </button>
      </div>
      <Footer />
    </>
   
  );
}

export default App;
