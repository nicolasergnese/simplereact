import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [endUser, setEndUser] = React.useState(''); //menu a tendina meter

  const [power, setPower] = React.useState(''); //menu a tendina power

  const handleChange = (event) => {
    setEndUser(event.target.value);
    setPower(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 60 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">End User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endUser}
          onChange={handleChange}
        >
          <MenuItem value={1}>End User 1</MenuItem>
          <MenuItem value={2}>End User 2</MenuItem>
          <MenuItem value={3}>End User 3</MenuItem>
          <MenuItem value={4}>End User 4</MenuItem>
          <MenuItem value={5}>End User 5</MenuItem>
        </Select>
      </FormControl>
      <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Power</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={power}
          onChange={handleChange}
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