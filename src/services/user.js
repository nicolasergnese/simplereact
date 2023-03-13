import axios from 'axios';
import config from "./global"

const API_URL = config.host+"/users/";

class UserService {
    async sing_up(data) {
        const response = await axios.post(API_URL + "create", data).then(response => {
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
  
    // async get_role_client_by_username(data) {
    //     const response = await axios.get(API_URL + "get_role_client_by_username?username="+data).then(response => {
    //         //console.log(response);
    //         return response;

    //     }).catch(error => {
    //         //handle error
    //         //console.log(error);
    //         //alert(error.response);
    //         return error.response;
    //     });
    //     return response;
    // };
}

export default new UserService();