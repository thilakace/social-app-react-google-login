import React from "react";
import axios from "axios";

export const Apiservice = (url, method) => {
   // return axios.get(process.env.REACT_APP_BASEURL+"/api/"+url);
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',authorization:'bearer ' +localStorage.getItem('token') },
       // body: JSON.stringify(inputField)
    };
     
    return fetch(process.env.REACT_APP_BASEURL+"/api/"+url, requestOptions).then(response => response.json());
}
