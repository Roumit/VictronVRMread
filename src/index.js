

const request = require('request');
const login_pass = require('./login_pass.js');



//APIs:
// https://vrmapi.victronenergy.com/v2/auth/login
// /v2/users/{idUser}/installations

const url = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";


//This will be asked
let username = login_pass.username;
let password = login_pass.password;

let idUser;
let loginStatus = false;
const headerWithToken = {};

//login(username, password);
// function login(login, password, callback) {
//     request(url + authApi, {method: "GET", body: `{"username": "${username}", "password": "${password}"}`}, (err, res, body) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         if (res.statusCode == 200) {
//             let user_token = JSON.parse(body);
//             let token = user_token.token;
//             let userId = user_token.idUser;
//             loginStatus = true;
//             idUser = userId; 
            
//             callback(userId, token);
//         }
//     }); 
// };


// login(username, password, (userId, token) => {
//     console.log(userId, token);
//     headerWithToken['X-Authorization'] = 'Bearer ' + token;
//     getInstallations(idUser);

    //here we do wisible buttons of receiving other information

// });

function login(login, password) {
    return new Promise((resolve, reject) => {
        request(url + authApi, {method: "GET", body: `{"username": "${username}", "password": "${password}"}`}, (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (res.statusCode == 200) {
                let user_token = JSON.parse(body);
                idUser = user_token.idUser;
                loginStatus = true;
                resolve(user_token);
            }
        });
    });
     
};


login(username, password).then((user_token, token) => {
    console.log(user_token);
    headerWithToken['X-Authorization'] = 'Bearer ' + user_token.token;
    getInstallations(idUser);
});


console.log('timing test');

function getInstallations(idUser){
    const installationsApi = `/v2/users/${idUser}/installations`;

    request(url + installationsApi, {method:'GET', headers: headerWithToken}, (err, res, body) => {
        if (err){
            console.log(err);
            return;
        }
        if (res.statusCode == 200){
            let message = JSON.parse(body);
            if (message.success == true){
                message.records.forEach((elem) => console.log(elem.idSite + " : " + elem.name));
                //console.log(message);
            }
        }
    });
};




