import React from 'react'
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';
import { Line } from 'react-chartjs-2';//grafico che voglio
import { useState } from 'react';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement
)


const grafico = ({
  labels: [], // asse x
    datasets: [
      {
        label: "Power [kW]",
        // y-axis data plotting values
        data: [], //andamento grafico
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


  const [chart] = useState(grafico) 

 
  return (
    <div className="CreateChart">
      <Line data ={chart}></Line>
    </div>
    
  );
}
