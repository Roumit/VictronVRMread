
import {targetUrl, headerWithToken} from './index';

// /v2/installations/{idSite}/system-overview

export function writeInstallationsList(installations_arr){
    document.querySelector('.left-content').innerHTML = '<ul class="link-list" id="installations-list">';
    let idList = [];
    installations_arr.forEach((elem) =>{
        let id = elem.idSite;
        idList.push(id);
        let name = elem.name;
        document.querySelector('.left-content').innerHTML += `<li class="link-list" id="${id}">${id} : ${name}</li>`;
        
    });
    document.querySelector('.left-content').innerHTML += '</ul><dir id="system-information"></dir>';
    return idList;
};


