import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue({label, setValueDate}) {

  const [value, setValue] = useState();

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
    setValueDate(newValue);
    console.log(value);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateTimePicker']} >
        <DateTimePicker
          label={label} 
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
