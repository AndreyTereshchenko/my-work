import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImCalendar } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineChangeCircle } from "react-icons/md";
import { deletePatient } from "../../store/patients.slice";
import styles from "./reservationList.module.css";
import EditPatientForm from "../editPatientForm/EditPatientForm";

function ReservationList({ patientData }) {
  const patientsList = useSelector((state) => state.patients.list);
  const groupedPatients = groupPatientsByDate(patientsList);
  const dispatch = useDispatch();
  const [editingPatient, setEditingPatient] = useState(null);
  const [showForm, setshowForm] = useState(false);

  function handleDeletePatient(name) {
    dispatch(deletePatient(name));
  }

  function handleEditPatient(patient) {
    setEditingPatient(patient);
    setshowForm((prev) => !prev);
  }

  function groupPatientsByDate(patients) {
    const grouped = {};
    patients.forEach((patient) => {
      const date = new Date(patient.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      if (!grouped[formattedDate]) {
        grouped[formattedDate] = [];
      }
      grouped[formattedDate].push(patient);
    });

    return grouped;
  }

  const sortedDates = Object.keys(groupedPatients).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div>
      {sortedDates.map((date) => {
        const patients = groupedPatients[date];
        patients.sort((a, b) => {
          const timeA = a.time.split(":").map(Number);
          const timeB = b.time.split(":").map(Number);
          if (timeA[0] !== timeB[0]) {
            return timeA[0] - timeB[0];
          } else {
            return timeA[1] - timeB[1];
          }
        });

        return (
          <div key={date} className={styles.shadow}>
            <h3 className="gap-1 aligCen">
              <ImCalendar /> {new Date(date).toLocaleDateString()}
            </h3>
            <ul className={`${styles.groupUl} gap-1`}>
              {patients.map((patient) => {
                const patientDateTime = new Date(`${date} ${patient.time}`);
                const now = new Date();
                const isLate = patientDateTime < now;
                return (
                  <li key={patient.name} className="flex gap-1 wrap">
                    <div>
                      <p
                        className={`${styles.input_time} flex gap-1 ${
                          isLate ? styles.lateRed : ""
                        }`}
                      >
                        {patient.time}
                      </p>
                    </div>
                    <div>
                      <p className={styles.input_text}>{patient.name}</p>
                    </div>
                    <div>
                      <p className={styles.input_text}>{patient.phone}</p>
                    </div>
                    <div>
                      <p className={styles.input_text}>{patient.doctor}</p>
                    </div>
                    <div>
                      <button
                        className={styles.form_button}
                        onClick={() => handleDeletePatient(patient.name)}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                      <button
                        className={styles.form_button}
                        onClick={() => handleEditPatient(patient)}
                      >
                        <MdOutlineChangeCircle />
                      </button>
                    </div>
                    {editingPatient === patient && showForm && (
                      <EditPatientForm
                        patient={patient}
                        appointmentDateTime={
                          new Date(`${date} ${patient.time}`)
                        }
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default ReservationList;
