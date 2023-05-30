import axios from 'axios';

const configetichetta = {host:"https://emotion-projects.eu/marketplace"}
const API_URL = configetichetta.host+"/request/";


class etichettaService {
    async request(data) {
        const response = await axios.post(API_URL + "request", data).then(response => {
            console.log(response);
            return response;

        }).catch(error => {
            //handle error
            console.log(error);
            //alert(error.response);
            if (error.message==="Network Error")
                {
                    error.response={}
                    error.response.message="ERR_NETWORK"
                    error.response.status=503;
                }
            return error.response;
        });
        return response;
    };
}

export default new etichettaService();