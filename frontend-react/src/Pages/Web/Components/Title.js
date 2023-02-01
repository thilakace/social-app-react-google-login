import React from "react";
import { Row } from "react-bootstrap";

const app_module = process.env.REACT_APP_MODULE;

const Title = (props) => {
    return (
       <div className="titleTop">
           <h2 style={{fontSize:props.size}}>{props.text} {app_module}</h2>
       </div>
    )
} 

export default Title;