import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import ASMHQ from './ASMHQ'
import DSO from './DSO'
import ENDUSER from './endUser'
import FORECASTED from './forecasted'
import ENERGIOT from './energiot'
import OPTIMIZED from './optimized'


import './Components.css';



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  //console.log(props)
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  //console.log(index);
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [valuesub, setValueSub] = useState(0);


  const handleChange = (event, newValue) => {
    //console.log(event.value);
    //console.log(newValue)
    setValue(newValue);
    setValueSub(0)
  };
  const handleChange1 = (event, newValue) => {
    //console.log(event.value);
    //console.log(newValue)
    setValueSub(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab label="Historical data" {...a11yProps(0)} />
          <Tab label="Forecasted data" {...a11yProps(1)} />
          <Tab label="Optimized data" {...a11yProps(2)} />
          <Tab label="DSO" {...a11yProps(3)} />
          <Tab label="Energiot" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}> {/* historical data */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> {/* sub dashboard historical data */}
          <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example">
            <Tab label="End user" {...a11yProps(0)} />
            <Tab label="ASM HQ" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={valuesub} index={0}>  {/* end user */}
          <ENDUSER />
        </TabPanel>

        <TabPanel value={valuesub} index={1}> {/* asm hq */}
          <ASMHQ /> {/*components*/}
        </TabPanel>
      </TabPanel>

      <TabPanel value={value} index={1}> {/* forecast data*/}
        <FORECASTED />
      </TabPanel>

      <TabPanel value={value} index={2}> {/* optimized data */}
        <OPTIMIZED />
      </TabPanel>
      <TabPanel value={value} index={3}> {/* componenti nuovi */}
        <DSO />
      </TabPanel>
      <TabPanel value={value} index={4}> {/* componenti nuovi */}
        <ENERGIOT />
      </TabPanel>

    </Box>
  );
}
