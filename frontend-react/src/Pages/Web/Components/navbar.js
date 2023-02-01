import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ModalPopup from "../../Web/Components/ModalPopup";
import {Apiservice} from "../../Web/Services/Apiservice";
import ReactRouterBootstrap, { LinkContainer } from 'react-router-bootstrap';


const baseURL = process.env.REACT_APP_BASEURL;
const app_module = process.env.REACT_APP_MODULE;
const app_name = process.env.REACT_APP_NAME;


function NavBarHeader() {
  const location = useLocation();
  let navigate = useNavigate();
  const [auth,setAuth] = useState(true);
  
  
  
  const getNavigate = () => {
    console.log(location);
    //navigate('about', { replace: true }); // not working need to check
    localStorage.setItem('token','');
    localStorage.setItem('userId','');
    localStorage.setItem('name','');
    setAuth(false);
    navigate("/");
  }
  
  useEffect(() => {
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === ''){
      setAuth(false);
    }
    Apiservice('check-user','GET').then((response) => {
      console.log(response.status);
      if(response.status === 'error'){
        setAuth(false);
        // navigate("/");
      }
    });
  },[])

  let menus = [
    {
      slug : "/my-profile",
      label: "My Profile",
      enable : false
    },
    {
      slug : "/my-post",
      label: "My Posts",
      enable : true
    },
    {
      slug : "/all-post",
      label: "All Posts",
      enable : (localStorage.getItem('userId') === '1') ? true : false
    },
    {
      slug : "/post_qustion_an_answer",
      label: "Create Post",
      enable : true
    }
  ]

 

  return (
    <>
    <Navbar collapseOnSelect expand="lg"  className="nav-color" sticky="top" >
      <Container >
      <LinkContainer to={"/"}>
         <Navbar.Brand > <h3 style={{color: "#FFF"}}>{app_name}</h3></Navbar.Brand>
      </LinkContainer>
      
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            
          </Nav>
          <Nav >
            
            <Nav.Link eventKey={2} href="#" className={auth? 'hidden' : undefined}>
               <ModalPopup label="Login"/>
            </Nav.Link>
           
           

             <NavDropdown title={localStorage.getItem('name')} id="collasible-nav-dropdown" className={!auth? 'hidden' : undefined}>
                 
                 {
                  menus.map(menu => 
                    (
                      menu.enable ? (
                        <LinkContainer to={menu.slug} key={menu.slug}>
                        <NavDropdown.Item >{menu.label}</NavDropdown.Item>
                      </LinkContainer>
                    ) : ''

                      )
                    )
                  }
                    
                    
                   
                

                {/* <LinkContainer to={"/my-post"}>
                  <NavDropdown.Item >My Posts</NavDropdown.Item>
                </LinkContainer>
             
                <LinkContainer to={"/all-post"} >
                  <NavDropdown.Item >All Posts {superadmin}</NavDropdown.Item>
                </LinkContainer>
                  
                <LinkContainer to={"/post_qustion_an_answer"}>
                  <NavDropdown.Item >Post your {app_module}?</NavDropdown.Item>
                </LinkContainer> */}

                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                  <span onClick={getNavigate} >Logout</span>
                  </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     <br/>
    </>
  );
}



export default NavBarHeader;
 