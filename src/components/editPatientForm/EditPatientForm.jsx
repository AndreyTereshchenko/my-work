import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePatient } from "../../store/patients.slice";
import styles from "./EditPatientForm.module.css";

function EditPatientForm({ patient, appointmentDateTime }) {
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const doctorsList = useSelector((state) => state.doctors.list);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const words = editedPatient.name.trim().split(/\s+/);
    if (words.length < 2) {
      setErrorMessage("Please enter both first and last name");
      return;
    }

    const phonePattern = /^\(\d{3}\) \d{3}-\d{3}-\d{3}$/;
    if (!phonePattern.test(editedPatient.phone)) {
      setErrorMessage("Please enter phone number in format (XXX) XXX-XXX-XXX");
      return;
    }

    if (!editedPatient.doctor) {
      setErrorMessage("Please select a doctor");
      return;
    }

    dispatch(changePatient({ name: patient.name, data: editedPatient }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-1">
        <div className={styles.input_time}>
          <p>{appointmentDateTime.toLocaleDateString()}</p>
          <p>{appointmentDateTime.toLocaleTimeString()}</p>
        </div>

        <input
          name="name"
          value={editedPatient.name}
          onChange={handleInputChange}
        />
        <input
          name="phone"
          placeholder="(XXX) XXX-XXX-XXX"
          value={editedPatient.phone}
          onChange={handleInputChange}
        />
        <select
          name="doctor"
          value={editedPatient.doctor}
          onChange={handleInputChange}
        >
          <option value="">Select doctor</option>
          {doctorsList &&
            doctorsList.map((doctor, index) => (
              <option key={index} value={`${doctor.name} - ${doctor.spec}`}>
                {`${doctor.name} - ${doctor.spec}`}
              </option>
            ))}
        </select>
        <button type="submit" className={styles.form_button}>
          Submit
        </button>
      </form>
      {errorMessage && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontSize: "16px",
            marginTop: "5px",
          }}
        >
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default EditPatientForm;
