import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function BasicCard() {


    /* useEffect(() => {//covine usare fecth
  const fetchData = async () => {
    const response = await fetch('http://localhost:3000//api//offer');
    const result = await response.json();
    setName(result);
    setAuthor(result);
    setPrice(result);
  };
  fetchData();
}, []);*/


   /*  const FetchDataExample = () => {
        const [data, setData] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://emotion-projects.eu/marketplace/info', { mode: 'no-cors' }); // Replace with your API endpoint
                    const jsonData = await response.json();
                    console.log(jsonData)
                    setData(jsonData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, []);

    };
    FetchDataExample(); */
   /*  fetch('https://emotion-projects.eu/marketplace/info', { mode: 'no-cors' })
  .then((response) => {
    if (response.ok) {
      // Request was successful (status code 2xx)
      // However, the response data is not accessible in 'no-cors' mode
      console.log('Request successful');
    } else {
      // Request was not successful
      console.error('Request failed');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  }); */




    const [deliveryInterval, setDeliveryInterval] = useState('10/02/2021 18:48 - 10/02/2021 19:48')
    const [price, setPrice] = useState([])
    const [author, setAuthor] = useState([])

    /* const handleSubmitClick = (e) => { //questo metodo o fetch?
      console.log("send data")
      //e.preventDefault();
      const payload = {
        "name": createData[0],
        "author": createData[1],
        "price": createData[2],
      }
      CardService.info(payload)
        .then((response) => {
          console.log(response);
          setName(response.data)
          setAuthor(response.data)
          setPrice(response.data)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }  */

    return (
        <Card className="card">
            <CardContent>
                <Typography variant="h5" component="div" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                    Details
                </Typography>
                <Box className="Inline">
                    <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        Delivery interval:
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#696969", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        {deliveryInterval}
                    </Typography>
                </Box>
                <Box className="Inline">
                    <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        Zone:
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#696969", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        Zone_1
                    </Typography>
                </Box>
                <Box className="Inline">
                    <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        Quantity:
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#696969", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        1000 Wh
                    </Typography>
                </Box>
                <Box className="Inline" >
                    <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        Max Price:
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#696969", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        50
                    </Typography>
                </Box>
                <Box className="Inline">
                    <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        Deadline:
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#696969", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                        10/02/2021 18:48
                    </Typography>
                </Box>
            </CardContent>

        </Card>
    );
}