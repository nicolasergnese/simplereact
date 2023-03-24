import React from 'react'
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';
import { Line } from 'react-chartjs-2';//grafico che voglio
import { useState } from 'react';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement
)


let numeriCasuali = []; //per generare numeri casuali, ma non s come metterli
let today = new Date();
let timestap = [];

function arrayNumeriCasuali(numeriCasuali) {
  for (let i = 0; i < 100; i++) { //riempio array
    let tomorrow = new Date( today.setDate(today.getDate() + 1));

    timestap[i] = tomorrow.getMonth()+'/'+tomorrow.getDate() ;
    numeriCasuali[i] = Math.floor(Math.random()*90);
  }
}


const grafico = ({
  labels: timestap, // asse x
    datasets: [
      {
        label: "Power [kW]",
        // y-axis data plotting values
        data: numeriCasuali, //andamento grafico
        fill: false,
        borderWidth:2, //spessore
        backgroundColor: "red", //colore punti
        borderColor:'blue', //colore linea
        PointBorderColour: 'red',
        responsive:true
      },
    ],
})

export default function CreateChart() {

  arrayNumeriCasuali(numeriCasuali);

  const [chart] = useState(grafico) 

 
  return (
    <div className="CreateChart">
      <Line data ={chart}></Line>
    </div>
    
  );
}
