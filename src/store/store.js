
import { configureStore } from '@reduxjs/toolkit'
import doctorsSlice from './doctors.slice'
import patientsSlice from './patients.slice' 

export const store = configureStore({
  reducer: {
    doctors: doctorsSlice,
    patients: patientsSlice, 
  },
})
