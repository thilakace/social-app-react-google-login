import React, { useState, useEffect } from 'react';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BASEURL;
const app_module = process.env.REACT_APP_MODULE;
const app_name = process.env.REACT_APP_NAME;
const ownURL = process.env.REACT_APP_APPURL;

const ModalPopup = (props) => {
    let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [respmessage, setRespmessage] = useState(false);

  const handleClose = () => setShow(false);
  const registerHandleClose = () =>{
    setRegisterShow(false);
  }
  const handleShow = () => {
   
    setShow(true);
  }
  const [inputField , setInputField] = useState({
    email: '',
    password: ''
  })

  const inputsHandler = (e) =>{
    setInputField( {...inputField,[e.target.name]: e.target.value} )
  }

  const registerHandleShow = () => {
    setShow(false);
    setRegisterShow(true);
  };

  const LoginShow = () => {
    setShow(true);
    setRegisterShow(false);
  };

  const alllHide = () => {
    setShow(false);
    setRegisterShow(false);
  };

  const submitLogin = () => {
    console.log(inputField);
		// POST request using fetch inside useEffect React hook
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(inputField)
		};
		fetch(baseURL+'/api/doLogin', requestOptions)
			.then(response => response.json())
			.then(data => {
				if(data.status === 'success'){
					localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('name', data.name);
          alllHide();
          window.location.href = ownURL+"/home";
          navigate("/home");
				}else{
          setRespmessage(data.message);
				}
				
			});
  }

  const submitRegister = () => {
    console.log(inputField);
		// POST request using fetch inside useEffect React hook
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(inputField)
		};
		fetch(baseURL+'/api/register', requestOptions)
			.then(response => response.json())
			.then(data => {
				if(data.status === 'success'){
					localStorage.setItem('token', data.token);
                   // navigate("/admin/dashboard");
					console.log(localStorage.getItem('token'));
				}else{
          setRespmessage(data.message);
					
				}
				
			});
  }

 

  return (
    <>
    
      <span  onClick={handleShow} className="nav-link">{props.label}</span>
     
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter username"
                autoFocus
                name="email"
                value={inputField.email} 
                onChange={inputsHandler}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={inputField.password} onChange={inputsHandler}
                name="password"
              />
            </Form.Group>
          </Form>
          <p>{respmessage}</p>
        </Modal.Body>
        <Modal.Footer>
         
           <Button variant="danger" onClick={registerHandleShow}>
             Don't have account?
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={submitLogin}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={registerShow} onHide={registerHandleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                autoFocus
                name="name"
                value={inputField.name} 
                onChange={inputsHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                autoFocus
                name="email"
                value={inputField.email} 
                onChange={inputsHandler}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={inputField.password} onChange={inputsHandler}
                name="password"
              />
            </Form.Group>
          </Form>
          <p>{respmessage}</p>
        </Modal.Body>
        <Modal.Footer>
         
           
          <Button variant="secondary" onClick={LoginShow}>
            Login
          </Button>
          <Button variant="success" onClick={submitRegister}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default ModalPopup;