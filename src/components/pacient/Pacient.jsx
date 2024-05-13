import React, { useState, useEffect } from "react";
import { setHours, setMinutes, addMonths } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Modal from "../modal/Modal";
import ReservationList from "../reservationList/reservationList";
import styles from "./Pacient.module.css";

function Pacient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const minDate = new Date();
  const maxDate = addMonths(new Date(), 3);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const patientList = JSON.parse(localStorage.getItem("patientsList"));
    if (patientList) {
      const slots = patientList.map((patient) => new Date(patient.date));
      setTimeSlots(slots);
    }
  }, []);

  const updateTimeSlots = (newTimeSlots) => {
    setTimeSlots(newTimeSlots);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSubmit = (value1, value2, value3) => {
    console.log("Submitted values:", value1, value2, value3);
    console.log(selectedDate);
  };

  const handleTimeChange = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    setSelectedDate(setHours(setMinutes(selectedDate, minutes), hours));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(new Date());
    updateTimeSlots([...timeSlots, selectedDate]);
  };

  const isTimeOccupied = (date) => {
    return timeSlots.some((slot) => slot.getTime() === date.getTime());
  };

  const isDisabledTime = (date) => {
    return isTimeOccupied(date);
  };

  return (
    <>
      <Header />
      <div className="container flex_centr input_data">
        <h2>Select date and time:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          minTime={
            selectedDate.getDate() === currentTime.getDate()
              ? setHours(setMinutes(new Date(), currentMinute), currentHour)
              : setHours(setMinutes(new Date(), 0), 8)
          }
          maxTime={setHours(setMinutes(new Date(), 0), 16)}
          dateFormat="MMMM d, HH:mm"
          timeFormat="HH:mm"
          minDate={minDate}
          maxDate={maxDate}
          withPortal
          portalId="root-portal"
          onChangeTime={handleTimeChange}
          timeClassName={(date) => (isTimeOccupied(date) ? "occupied" : "")}
          filterTime={(date) => !isDisabledTime(date)}
        />
      </div>
      <div className={styles.container}>
        <ReservationList />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        selectedDate={selectedDate}
        timeSlots={timeSlots}
        updateTimeSlots={updateTimeSlots}
      />
      <Footer />
    </>
  );
}

export default Pacient;
