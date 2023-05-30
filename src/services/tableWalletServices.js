import axios from 'axios';
import config from "./global"

const API_URL = config.host+"/?/";

class TableWalletService {
    async offers(data) {//?
        const response = await axios.get(API_URL + "?", data).then(response => {
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

export default new TableWalletService();