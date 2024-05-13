import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDoctor, changeDoctor } from "../../store/doctors.slice";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineChangeCircle } from "react-icons/md";
import styles from "./DoctorItem.module.css";

export default function DoctorItem({ item }) {
  const [showForm, setshowForm] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData1, setFormData1] = useState({
    name: item.name,
    phone: item.phone,
    spec: item.spec,
  });

  const handlerChange1 = (e) => {
    setFormData1((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
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
    <div>
      <div className="flex gap-1">
        <p className={styles.input_size}>{item.name}</p>
        <p className={styles.input_size}>{item.phone}</p>
        <p className={styles.input_size}>{item.spec}</p>

        <button
          className={styles.form_button}
          onClick={() => dispatch(deleteDoctor(item.name))}
        >
          <RiDeleteBin5Fill />
        </button>

        <button
          className={styles.form_button}
          onClick={() => {
            setshowForm((prev) => !prev);
          }}
        >
          <MdOutlineChangeCircle />
        </button>
      </div>
      {errorMessage && (
        <p style={{ color: "red", margin: "15px" }}>{errorMessage}</p>
      )}
      {showForm && (
       
          <form method="post" className="flex gap-1">
            <input
              name="name"
              placeholder="Name Surname"
              onChange={(e) => handlerChange1(e)}
              value={formData1.name}
            />
            <input
              name="phone"
              placeholder="(XXX) XXX-XXX-XXX"
              onChange={(e) => handlerChange1(e)}
              value={formData1.phone}
            />
            <select
              name="spec"
              onChange={(e) => handlerChange1(e)}
              value={formData1.spec}
            >
              <option value="">Select specialization</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <button
              className={styles.form_button}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const words = formData1.name.trim().split(/\s+/);
                if (words.length < 2) {
                  setErrorMessage("Please enter both first and last name");
                  return;
                } else {
                  setErrorMessage("");
                }

                const phonePattern = /^\(\d{3}\) \d{3}-\d{3}-\d{3}$/;
                if (!phonePattern.test(formData1.phone)) {
                  setErrorMessage(
                    "Please enter phone number in format (XXX) XXX-XXX-XXX"
                  );
                  return;
                } else {
                  setErrorMessage("");
                }

                if (formData1.name && formData1.phone && formData1.spec) {
                  dispatch(
                    changeDoctor({ name: item.name, data: { ...formData1 } })
                  );
                  setErrorMessage("");
                  setshowForm((prev) => !prev);
                } else {
                  setErrorMessage("Please fill in all fields");
                }
              }}
            >
              Submit
            </button>
          </form>
       
      )}
    </div>
  );
}
