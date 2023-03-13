import axios from 'axios';
import config from "./global"

const API_URL = config.host+"/auth/";

class AuthService {
    async login(data) {
        const response = await axios.post(API_URL + "login", data).then(response => {
            //console.log(response);
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

export default new AuthService();