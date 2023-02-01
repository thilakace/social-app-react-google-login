import React, {  useEffect, useState } from "react";
import '../../css/Common.css';
import { useNavigate   } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalPopup from "../Web/Components/ModalPopup";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';


const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const baseURL = process.env.REACT_APP_BASEURL;
const ownURL = process.env.REACT_APP_APPURL;

const Login = () => {
	const clientId = googleClientId;
	const [ profile, setProfile ] = useState([]);
	let navigate = useNavigate();
	const [respMessage, setRespMessage] = useState(''); 
	const [inputField , setInputField] = useState({
        email: '',
        password: ''
    })

	const inputsHandler = (e) =>{
        setInputField( {...inputField,[e.target.name]: e.target.value} )
    }
	const submitLogin = () => {
		console.log(inputField);
		// POST request using fetch inside useEffect React hook
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(inputField)
		};
		fetch('http://localhost:3005/api/doLogin', requestOptions)
			.then(response => response.json())
			.then(data => {
				if(data.status === 'success'){
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
					localStorage.setItem('name', data.name);
                    navigate("/home");
					
				}else{
                    setRespMessage(data.message);
					
				}
				
			});
	}

	const googleLogin = (gprofile) => {
		
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({email :gprofile.email })
		};
		fetch(baseURL+'/api/googleLogin', requestOptions)
			.then(response => response.json())
			.then(data => {
				if(data.status === 'success'){
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
					localStorage.setItem('name', data.name);
                    window.location.href = ownURL+"/home";
					
				}else{
                    setRespMessage(data.message);
					
				}
				
			});
	}
	const onSuccess = (res) => {
        //setProfile(res.profileObj);
		googleLogin(res.profileObj);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
	const logOut = () => {
        //setProfile(null);
    };

	useEffect(() => {
		const initClient = () => {
			  gapi.client.init({
			  clientId: clientId,
			  scope: ''
			});
		 };
		 gapi.load('client:auth2', initClient);

		 
	 });
      return (
        <main>
		<div id="login-form-wrap">
		
		<form id="login-form" >
		 		  <p><Button><ModalPopup label="Simple Login"/></Button> </p>
		  <p>
		  <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
		  </p>
		</form>
		<div id="create-account-wrap">
		  
		</div>
	  </div>
	  </main>
      )
}

export default Login;