import React, { useState, useEffect } from "react";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';//grafico che voglio
import Box from '@mui/material/Box';

import './Components.css';


import { useNavigate } from 'react-router-dom'; //per navigare tra le pagine
import ChartService from '../services/chartServices';
import { omit } from 'lodash';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement
)


let numeriCasuali = []; //per generare numeri casuali, ma non s come metterli
let today = new Date();
let timestap = [];

function arrayNumeriCasuali(numeriCasuali) {
  for (let i = 0; i < 100; i++) { //riempio array
    let tomorrow = new Date(today.setDate(today.getDate() + 1));

    timestap[i] = tomorrow.getMonth() + '/' + tomorrow.getDate();
    numeriCasuali[i] = Math.floor(Math.random() * 90);
  }
}


export default function CreateChart() {

  arrayNumeriCasuali(numeriCasuali);

  const [numbers, setNumbers] = useState([])

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});


  useEffect(() => {

  }, []);


  async function fetchNumbers() {
    const response = await fetch("/api/numeriCasuali");
    const newNumbers = await response.json();
    setNumbers(newNumbers);
  }

  const [values, setValues] = useState({
    labels: timestap, // asse x
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
  });


  const handleChange = (e) => { //prende valori dl grafico e id, id serve per gli chart?
    //To stop default events    
    e.persist();
    const { id, value } = e.target
    //validate(id, value); serve?

    setValues({
      ...values,
      [id]: value,
    })
    console.log(values)
  }


  const handleSubmitClick = (e) => { //ci devo mettere le date?, a quale bottone?
    console.log("send data")
    e.preventDefault();
    const payload = {
      "labels": values.labels,
      "data": values.datasets.data,
    }

    ChartService.chart(payload)
      .then((response) => {
        console.log(response)
        if (response.status !== 200 || response.status !== 201)
          setValues({
            ...values,
            successMessage: response.data.message,
          })
      })
      .catch(function (error) {
        console.log(error);
        setValues({
          ...values,
          successMessage: "errors",
        })
        //props.showError("Username does not exists");
      });
  }



  return (

    <Box className="Chart"> {/*Components.css*/}
      <Line data={values}></Line>
    </Box>

  );
}
