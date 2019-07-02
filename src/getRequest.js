
const axios = require('axios');
import {headerWithToken} from "./index";



export function getAxiosRequest(url, firstPartApi, id, secondPartApi){
    return new Promise((resolve, reject) => {
        axios({
            method:'post',
            url: url + firstPartApi + id + secondPartApi,
            headers: headerWithToken
        })
        .then((responce) => {
            resolve(responce);
        })
        .catch((err) => {
            reject(err);
        })
    });
    
    
};