import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue({label, setValueDate}) {

  const [value, setValue] = useState(dayjs('2022-04-17T15:30'));

  
  const handleChange = (event, value) => {
    console.log(dayjs(value));
    //setValue(dayjs(newValue));
    console.log(value);
    //setValueDate(dayjs(newValue));
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
