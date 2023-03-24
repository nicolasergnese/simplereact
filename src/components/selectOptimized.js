import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [line, setLine] = React.useState(''); //menu a tendina meter

  const [power, setPower] = React.useState(''); //menu a tendina power

  const handleChange = (event) => {
    setLine(event.target.value);
    setPower(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 60 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Line</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={line}
          onChange={handleChange}
        >
          <MenuItem value={1}>Line 1</MenuItem>
          <MenuItem value={2}>Line 2</MenuItem>
          <MenuItem value={3}>Line 3</MenuItem>
          <MenuItem value={4}>Line 4</MenuItem>
          <MenuItem value={5}>Line 5</MenuItem>
          <MenuItem value={6}>Line 6</MenuItem>
          <MenuItem value={7}>Line 7</MenuItem>
          <MenuItem value={8}>Line 8</MenuItem>
          <MenuItem value={9}>Line 9</MenuItem>
          <MenuItem value={10}>Line 10</MenuItem>
          <MenuItem value={11}>Line 11</MenuItem>
          <MenuItem value={12}>Line 12</MenuItem>
          <MenuItem value={13}>Line 13</MenuItem>
          <MenuItem value={14}>Line 14</MenuItem>
          <MenuItem value={15}>Line 15</MenuItem>
          <MenuItem value={16}>Line 16</MenuItem>
          <MenuItem value={17}>Line 17</MenuItem>
          <MenuItem value={18}>Line 18</MenuItem>
          <MenuItem value={19}>Line 19</MenuItem>
          <MenuItem value={20}>Line 20</MenuItem>
          <MenuItem value={21}>Line 21</MenuItem>
          <MenuItem value={22}>Line 22</MenuItem>
          <MenuItem value={23}>Line 23</MenuItem>
          <MenuItem value={24}>Line 24</MenuItem>
          <MenuItem value={25}>Line 25</MenuItem>
          <MenuItem value={26}>Line 26</MenuItem>
          <MenuItem value={27}>Line 27</MenuItem>
          <MenuItem value={28}>Line 28</MenuItem>
          <MenuItem value={29}>Line 29</MenuItem>
          <MenuItem value={30}>Line 30</MenuItem>

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
          <MenuItem value={3}>current</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </Box>
    
  );
}