import React, { useState } from "react";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';//grafico che voglio
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './Components.css';


import ChartService from '../services/chartServices';


ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement
)


export default function CreateChart() {


  const [numbers, setNumbers] = useState([])


  const [values, setValues] = useState({
    labels: [10, 20, 30], // asse x
    datasets: [
      {
        label: "Power [kW]",
        // y-axis data plotting values
        data: [10, 20, 30], //andamento grafico
        fill: false,
        borderWidth: 2, //spessore
        backgroundColor: "red", //colore punti
        borderColor: 'blue', //colore linea
        PointBorderColour: 'red',
        responsive: true
      },
    ],
  });

  console.log(values.datasets[0].data) //stampo valore data

 /*  function addData(values, label, data) {
    //values.labels.push(label);
    values.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
  } */

  function newChart() {
    setValues({ //funzione bottone per cambiare grafico
      labels: numbers, // asse x
      datasets: [
        {
          label: "Power [kW]",
          // y-axis data plotting values
          data: numbers, //andamento grafico
          fill: false,
          borderWidth: 2, //spessore
          backgroundColor: "red", //colore punti
          borderColor: 'blue', //colore linea
          PointBorderColour: 'red',
          responsive: true
        },
      ],
    })
  }




  const handleSubmitClick = (e) => { //ci devo mettere le date?, a quale bottone?, per cambiare evento, cioè grafico
    console.log("send data")
    //e.preventDefault();
    const payload = {
      "labels": values.labels,
      "data": values.datasets.data,
    }
    ChartService.chart(payload)
      .then((response) => {
        console.log(response)
        //alert(response.data);
        setNumbers(response.data)
        console.log(response.data)
        /* if (response.status !== 200 || response.status !== 201)
          setValues({
            ...values,
            successMessage: response.data.message,
          }) */
      })
      .catch(function (error) {
        console.log(error);
        /*  setValues({
           ...values,
           successMessage: "errors",
         }) */
        //props.showError("Username does not exists");
      });
    newChart();
  }

  //console.log(numbers)


  return (
    <Box textAlign={"center"} sx={{ marginTop: 5 }}>
      <Button variant="contained" onClick={() => { handleSubmitClick() }}> Search</Button>
      <Box className="Chart"> {/*Components.css*/}
        <Line data={values}></Line>
      </Box>
    </Box>
  );
}
