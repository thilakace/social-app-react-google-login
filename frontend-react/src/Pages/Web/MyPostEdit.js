import React, { useState, useEffect} from "react";
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Title from "./Components/Title";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Apiservice } from "./Services/Apiservice";
import MsgBox from "./Components/MsgBox";

const baseURL = process.env.REACT_APP_BASEURL;
const app_module = process.env.REACT_APP_MODULE;
const app_name = process.env.REACT_APP_NAME;

const MyPostEdit = () => {
    let navigate = useNavigate();
    const [answervalue, setAnswervalue] = useState('');
    const [toasthow, setToasthow] = useState(false);
    let { slug } = useParams();
   
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
        if(inputField.question ==='' || inputField.tags ===''){
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
              'created_by' : localStorage.getItem('userId')
            })
        };
        fetch(baseURL+"/api/posts-update/"+slug+"/"+app_module, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data.message);
            if(data.status === 'success'){
              setRespMessage(data.message);
              setToasthow(true);
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

      Apiservice("posts-edit/"+slug+"/"+app_module,'GET').then((data) => {
          if(data.message === 'Data retrive successfully' ){
            setInputField({
                question: data.data.question,
                author_name:  data.data.author_name,
                member_code: data.data.member_code
            })
            setAnswervalue(data.data.answer);
          }
        });
       

    },[])
     
      
    return (
        <>
         <MsgBox show={toasthow}/>  
        <Container>
            
            <Row>
              <Col lg={8}>

              <Card  style={{marginTop:"30px",marginBottom:"30px"}}>
                  <Card.Body>
                  <Title text="Edit  "/> 
                 <Row>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Describe Title.<span style={{color:"red"}}>*</span></Form.Label>
                      <Form.Control type="text" placeholder="Enter title" name="question" value={inputField.question} onChange={inputsHandler}/>
                      <Form.Text className="text-muted">
                        Title minimum 30 characters. 
                      </Form.Text>
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

                     

                        <Button kind="primary" type="button" label="add" onClick={handleSubmit}>Update</Button>
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

export default MyPostEdit;