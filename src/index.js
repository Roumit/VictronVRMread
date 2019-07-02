"use strict";

const login_pass = require('./login_pass.js');
const axios = require('axios');
import {writeInstallationsList} from "./domCreate";
import {getAxiosRequest} from "./getRequest";


//APIs:
// https://vrmapi.victronenergy.com/v2/auth/login
// /v2/users/{idUser}/installations

export const targetUrl = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";


let idUser;
let loginStatus = false;
export const headerWithToken = {};
let installations_arr = [];

document.querySelector('.right-content').innerHTML = '<button id="loginButton">Login</button>';
document.getElementById('loginButton').addEventListener('click', toLogin, false);

function toLogin(){

    //It will be changed !!!
    let username = prompt('username: ', login_pass.username);
    let password = prompt('password: ', login_pass.password);
    axios({
        method:'post',
        url: targetUrl + authApi,
        data: `{"username": "${username}", "password": "${password}"}`
    })
    .then(function(response){
        headerWithToken['X-Authorization'] = 'Bearer ' + response.data.token;
        idUser = response.data.idUser;
        getInstallations();
    })
    .catch(function(err){
        console.log(`login error: ${err}`);
    });
};

function getInstallations(){
    document.querySelector('.right-content').innerHTML += '<button id="installationsButton">get Installations</button>';

    document.getElementById('installationsButton').addEventListener('click', () => {
    const installationsApi = `/v2/users/${idUser}/installations`;
    axios({
        method:'post',
        url: targetUrl + installationsApi,
        headers: headerWithToken
    })
    .then((responce) => {
        installations_arr = responce.data.records;
        console.log(installations_arr);
        let idList = writeInstallationsList(installations_arr);
        idList.forEach((id) => {
            document.getElementById(id).addEventListener('click', () => {
                getAxiosRequest(targetUrl, '/v2/installations/',
                id, '/system-overview').then((responce) => {
                    console.log(responce);
                });
                getAxiosRequest(targetUrl, '/v2/installations/',
                id, '/stats?type=kwh').then((responce) => {
                   document.getElementById('system-information').innerHTML = `Last 24h  ${responce.data.totals.kwh} kWh`;
                });
            }, false);
        });
    })
    .catch((err) => {
        console.log(err);
    })
}, false);
};
