import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import axios from 'axios';

export default function DateTimePickerValue({label, setValueDate}) {

  const [value, setValue] = useState(dayjs(new Date()));

  //console.log(Math.floor(new Date().getTime()/1000.0))//valora data in epoch

  console.log(value); //stampo data attuale

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('/api/myEndpoint', { value });
      // Gestisci la risposta del server
      console.log(value)
    } catch (error) {
      // Gestisci l'errore della richiesta
    }
  }; 


  
  const handleChange = (newValue) => {
    //console.log(dayjs().get);
    setValue(newValue);
    console.log(newValue.Date);
    //setValueDate(newValue);
    //console.log(dayjs().get);
    sendDataToBackend(newValue)
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker sx={{ backgroundColor: "white" }}
          label={label} 
          value = {value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}



