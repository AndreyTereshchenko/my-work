import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ImCalendar } from "react-icons/im";
import { TbClockHour4 } from "react-icons/tb";
import { addPatient } from "../../store/patients.slice";

function Modal({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  timeSlots,
  updateTimeSlots,
}) {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const doctorsList = useSelector((state) => state.doctors.list);
  const patientsList = useSelector((state) => state.patients.list);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setInputValue1("");
      setInputValue2("");
      setSelectedDoctor("");
    }
    if (doctorsList.length < 1) {
      setErrorMessage(
        <>
          You have no registered doctors.{" "}
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </>
      );
    }
  }, [patientsList, selectedDate, doctorsList, onClose, isOpen]);

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
    const words = e.target.value.trim().split(/\s+/);
    if (words.length < 2) {
      setErrorMessage("Please enter both first and last name");
    } else {
      setErrorMessage("");
    }
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
    const phonePattern = /^\(\d{3}\) \d{3}-\d{3}-\d{3}$/;
    if (!phonePattern.test(e.target.value)) {
      setErrorMessage("Please enter phone number in format (XXX) XXX-XXX-XXX");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = () => {
    if (!inputValue1 || !inputValue2 || !selectedDoctor) {
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    dispatch(
      addPatient({
        date: selectedDate.toISOString(),
        time: selectedDate.toLocaleTimeString(),
        name: inputValue1,
        phone: inputValue2,
        doctor: selectedDoctor,
      })
    );

    const newTimeSlots = [...timeSlots, selectedDate];
    updateTimeSlots(newTimeSlots);
    setInputValue1("");
    setInputValue2("");
    setSelectedDoctor("");
    onClose();
  };

  function DateTimeComponent({ selectedDate }) {
    const dateComponent = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const formDate = dateComponent.format(selectedDate);

    const timeComponent = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const formTime = timeComponent.format(selectedDate);

    return (
      <div className={styles.modalTimeDate}>
        <p>
          <ImCalendar />
        </p>{" "}
        <h2>{formDate}</h2>
        <p>
          <TbClockHour4 />
        </p>
        <h2>{formTime}</h2>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>RESERVATION INFORMATION</h2>
        <DateTimeComponent selectedDate={selectedDate} />
        <input
          type="text"
          placeholder="Enter patient first and last name"
          value={inputValue1}
          onChange={handleInputChange1}
        />
        <input
          type="text"
          placeholder="Patient's phone number in format (XXX) XXX-XXX-XXX"
          value={inputValue2}
          onChange={handleInputChange2}
        />
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">Select doctor</option>
          {doctorsList.map((doctor, index) => (
            <option key={index} value={`${doctor.name} - ${doctor.spec}`}>
              {`${doctor.name} - ${doctor.spec}`}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit} disabled={!!errorMessage}>
          Submit
        </button>
        {errorMessage && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "16px",
              marginTop: "5px",
            }}
          >
            {errorMessage}{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Modal;
