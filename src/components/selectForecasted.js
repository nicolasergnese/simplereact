import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [meter, setMeter] = React.useState(''); //menu a tendina meter

  const [power, setPower] = React.useState(''); //menu a tendina power

  const handleChange = (event) => { //menu a tendina meter
    setMeter(event.target.value);
  };

  const handleChange1 = (event) => {//menu a tendina power
    setPower(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 60 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Meter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={meter}
          onChange={handleChange}
        >
          <MenuItem value={1}>Meter 1</MenuItem>
          <MenuItem value={2}>Meter 2</MenuItem>
          <MenuItem value={3}>Meter 3</MenuItem>
          <MenuItem value={4}>Meter 4</MenuItem>
          <MenuItem value={5}>Meter 5</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Power</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={power}
            onChange={handleChange1}
          >
            <MenuItem value={1}>Active Power</MenuItem>
            <MenuItem value={2}>Reactive Power</MenuItem>
            <MenuItem value={3}>Voltage</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>

  );
}