import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue({label, setValueDate}) {

  const [value, setValue] = useState(Math.floor(new Date().getTime()/1000.0));

  console.log(value); //stampo data attuale
  console.log(Math.floor(new Date().getTime()/1000.0))

  
  const handleChange = (newValue) => {
    //console.log(dayjs().get);
    setValue(newValue);
    console.log(newValue.Date);
    //setValueDate(newValue);
    //console.log(dayjs().get);
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
