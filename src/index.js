// const request = require('request');
// import * as api from "./api";

const request = require('request');
const login_pass = require('./login_pass.js');



//APIs:
// https://vrmapi.victronenergy.com/v2/auth/login
const url = "https://vrmapi.victronenergy.com";
const auth = "/v2/auth/login";

//This will be asked
let username = login_pass.username;
let password = login_pass.password;

//login(username, password);



function login(login, password, callback) {
    request('https://vrmapi.victronenergy.com/v2/auth/login', {method: "GET", body: `{"username": "${username}", "password": "${password}"}`}, (err, res, body) => {
        console.log(res.statusCode);

        if (res.statusCode == 200) {
            let user_token = JSON.parse(body);
            let token = "";
            let userId = null;
            token = user_token.token;
            userId = user_token.idUser;
            // console.log(user_token);
            // return {
            //     userId,
            //     token
            // };
            callback(userId, token);
        }
    });

   
};

login(username, password, (userId, token) => console.log(userId, token));

// async function toLogin(){
//     let user_token = await login(username, password);
//     console.log(user_token);
// };

// toLogin();

// console.log(user_token);


