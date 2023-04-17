import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue({label, setValueDate}) {

  const [value, setValue] = useState(dayjs(new Date()));

  console.log(value); //stampo data attuale

  
  const handleChange = (newValue) => {
    //console.log(dayjs().get);
    setValue(newValue);
    //console.log(value);
    //setValueDate(newValue);
    //console.log(dayjs().get);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateTimePicker']} >
        <DateTimePicker
          label={label} 
          value = {value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
