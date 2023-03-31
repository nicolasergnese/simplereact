import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue({label, setValueDate}) {

  const [value, setValue] = useState(dayjs('2023-05-10T03:24:00'));

  console.log(value);

  
  const handleChange = (event, newValue) => {
    //console.log(dayjs().get);
    setValue(dayjs(newValue));
    //console.log(value);
    setValueDate(dayjs(newValue));
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
