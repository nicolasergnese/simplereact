import React, { useState } from "react";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';//grafico che voglio
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './Components.css';


import ChartService from '../services/chartServices';
import ChartDateTimeService from '../services/chartDateTimeServices'


ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement
)


export default function CreateChart() {
  let valori = []; //per generare numeri casuali, ma non s come metterli
  let today = new Date();
  let timestap = [];
  /* function arrayNumeriCasuali(numeriCasuali) {
    for (let i = 0; i < 50; i++) { //riempio array
      let tomorrow = new Date(today.setDate(today.getDate() + 1));
      timestap[i] = tomorrow.getFullYear() + '/' + tomorrow.getMonth() + '/' + tomorrow.getDate() + ' ' + tomorrow.getHours() + ':' + tomorrow.getMinutes() + ':' + tomorrow.getSeconds();
      valori[i] = Math.floor(Math.random() * 90);
    }
  } */
  //arrayNumeriCasuali();
  const [values, setValues] = useState({
    labels: timestap, // asse x
    datasets: [
      {
        label: "Power [kW]",
        // y-axis data plotting values
        data: valori, //andamento grafico
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

   const [numbers, setNumbers] = useState([])

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
    ChartDateTimeService.chartDateTimeService(payload)
      .then((response) => {
        console.log(response)
        alert(response.data);
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

  console.log(numbers)




  return (
    <Box textAlign={"center"} sx={{ marginTop: 5 }}>
      <Button variant="contained" onClick={() => { handleSubmitClick() }}> Search</Button>
      <Box className="Chart"> {/*Components.css*/}
        <Line data={values}></Line>
      </Box>
    </Box>
  );
}


/* const handleSubmitClick = (e) => { //ci devo mettere le date?, a quale bottone?, per cambiare evento, cioè grafico
    console.log("send data")
    //e.preventDefault();
    const payload = {
      "labels": values.labels,
      "data": values.datasets.data,
    }
    ChartService.chart(payload)
      .then((response) => {
        console.log(response)
        alert(response.data);
        setNumbers(response.data)
        console.log(response.data)
        /* if (response.status !== 200 || response.status !== 201)
          setValues({
            ...values,
            successMessage: response.data.message,
          }) */
     /* })
      .catch(function (error) {
        console.log(error);
        /*  setValues({
           ...values,
           successMessage: "errors",
         }) */
        //props.showError("Username does not exists");
      /*});
    newChart();
  }

  console.log(numbers) */