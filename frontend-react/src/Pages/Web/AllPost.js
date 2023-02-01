import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import DataTable from "./Components/DataTable";
import { Apiservice } from "./Services/Apiservice";


const AllPost = (props) => {
    let navigate = useNavigate();
    
   
    useEffect(() => {
        if(localStorage.getItem('token') === null || localStorage.getItem('token') === ''){
          navigate("/");
        }

        Apiservice('check-user','GET').then((response) => {
          if(response.status === 'error'){
            navigate("/");
          }
        });
       

      },[])

    return (
        <>
           <Container>
              <Row>
              <DataTable title={props.title} items={props.items}/>
              </Row> 
           </Container> 
           
           
        </>
    )
}

export default AllPost;