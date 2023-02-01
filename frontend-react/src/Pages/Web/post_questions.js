import React, { useState, useEffect} from "react";
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Title from "./Components/Title";
import { useNavigate, Link } from 'react-router-dom';
import {Apiservice} from "../Web/Services/Apiservice";

const baseURL = process.env.REACT_APP_BASEURL;
const app_module = process.env.REACT_APP_MODULE;
const app_name = process.env.REACT_APP_NAME;

const PostQuestion = () => {
    let navigate = useNavigate();
    const [answervalue, setAnswervalue] = useState('');
   
   
    console.log(answervalue);
     
    const modules = {
      toolbar: [
        ['blockquote', 'code-block'],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean'],
        [{ 'color': [] }, { 'background': [] }], 
        
      ],
    };

    const [respMessage, setRespMessage] = useState(''); 
    
  
    const [inputField , setInputField] = useState({
      question: '',
      author_name: '',
      member_code:''
  })
	

     const handleSubmit = async (e) => {
       
        //window.localStorage.setItem('content',content);
       
        console.log(inputField);
        if(inputField.question ==='' ||  inputField.tags ===''){
          setRespMessage('Validation error!');
          return;
        }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',authorization:'bearer ' +localStorage.getItem('token') },
          body: JSON.stringify(
            {
              'question':inputField.question,
              'answer':answervalue,
              'tags':inputField.tags,
              'link':(inputField.question).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
              'created_by' : localStorage.getItem('userId'),
               'module' : app_module
            })
        };
        fetch(baseURL+"/api/posts/"+app_module, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data.message);
            if(data.status === 'success'){
              setRespMessage(data.message);
            }else{
              setRespMessage(data.message);
              
            }
            
          });

       

     };

     const inputsHandler = (e) =>{
      setInputField( {...inputField,[e.target.name]: e.target.value} )
  } 

  useEffect(() => {
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === ''){
      console.log("invalid");
      navigate("/");
    }
    Apiservice('check-user','GET').then((response) => {
      console.log(response.status);
      if(response.status === 'error'){
        navigate("/");
      }
    });
  },[])
     
      
    return (
        <>
        <Container>
            <Row>
              <Col lg={8}>
              <Card  style={{marginTop:"30px",marginBottom:"30px"}}>
                  <Card.Body>
                  <Title text="Post Your "/> 
                 <Row>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Title.<span style={{color:"red"}}>*</span></Form.Label>
                      <Form.Control type="text" placeholder="Enter title" name="question" value={inputField.question} onChange={inputsHandler}/>
                      
                    </Form.Group>
                  
                    <div className="text-editor">
                        <Form.Label>Description.<span style={{color:"red"}}>*</span></Form.Label>
                        <div className="ReactQuillEditor">
                          <ReactQuill theme="snow" value={answervalue} onChange={setAnswervalue} modules={modules} sticky_toolbar={true}/>
                        </div>
                    &nbsp;
                    </div>
                    
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tags. <span style={{color:"red"}}>*</span></Form.Label>
                        <Form.Control type="text" placeholder="Enter tags" name="tags" value={inputField.tags} onChange={inputsHandler}/>
                      </Form.Group>

                      

                        <Button kind="primary" type="button" label="add" onClick={handleSubmit}>Submit</Button>
                        &nbsp;<span>{respMessage}</span>
                    </Form>
                  </Row>
                  </Card.Body>
              </Card>
                
              </Col>
              <Col lg={4}>
                {/* <Title text="Status" size="20px"/> 
                  <Row>
                    <Card>
                      <Card.Body>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Choose category.<span style={{color:"red"}}>*</span></Form.Label>
                            <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                      </Form.Group>

                    
                     
                      </Card.Body>
                    </Card>
                </Row> */}
              </Col>  

            </Row> 
            
           
        </Container>
      
        </>
    )
}

export default PostQuestion;