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

  useEffect(() => {

    fetchNumbers()

	}, []);


	const navigate = useNavigate();

	const [values, setValues] = useState({
		labels: timestap, // asse x
  datasets: [
    {
      label: "Power [kW]",
      // y-axis data plotting values
      data: numeriCasuali, //andamento grafico
      fill: false,
      borderWidth: 2, //spessore
      backgroundColor: "red", //colore punti
      borderColor: 'blue', //colore linea
      PointBorderColour: 'red',
      responsive: true
    },
  ],
	});

  async function fetchNumbers() {
    const response = await fetch("/api/chart");
    const newNumbers = await response.json();
    setValues();
}


	const [errors, setErrors] = useState({});


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
		// setState(prevState => ({
		//     ...prevState,
		//     [id]: value
		// }))
		//setState({disabled:false})
	}



  /* const validate = (name, value) => { //ci metto le date o non serve?
		//A function to validate each input values
		switch (name) {
			case 'email':
				if (value.length <= 0) {
					// we will set the error state
					setErrors({
						...errors,
						email: '*required',
						// disabledUsername:true
					})
				} else {
					// set the error state empty or remove the error for username input
					//omit function removes/omits the value from given object and returns a new object
					let newObj = omit(errors, "email");
					//setState({disabledUsername:false})
					setErrors(newObj);

				}
				break;

			case 'password':
				if (value.length <= 0) {
					setErrors({
						...errors,
						password: '*required',
						// disabledPassword:true
					})
				} else {
					let newObj = omit(errors, "password");
					//setState({disabledPassword:false})
					setErrors(newObj);
				}
				break;

			default:
				break;
		}
	} */




	const handleSubmitClick = (e) => { //ci devo mettere le date?
		console.log("send data")
		e.preventDefault();
		if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
			const payload = {
				"email": values.email,
				"password": values.password,
			}

			ChartService.login(payload)
				.then((response) => {
					console.log(response)
					if (response.status !== 200 || response.status !== 201)
						setValues({
							...values,
							successMessage: response.data.message,
						})
					sessionStorage.setItem("ACCESS_TOKEN_NAME", response.data.token);//non serve
					//redirectToHome(); (non serve)

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
		else {

		}


	}



  return (

    <Box className="Chart"> {/*Components.css*/}
      <Line data={values}></Line>
    </Box>

  );
}
