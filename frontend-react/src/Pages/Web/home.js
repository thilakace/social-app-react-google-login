import React, { useState, useEffect} from "react";
import {Container, Card} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import ReactQuill from 'react-quill';
import PostsLikeShare from "./Components/PostsLikeShare";
import {Apiservice} from "../Web/Services/Apiservice";
import { useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BASEURL;
const app_module = process.env.REACT_APP_MODULE;
const app_name = process.env.REACT_APP_NAME;

const Home = () => {
    let navigate = useNavigate();
    const [searchField , setSearchField] = useState({
        freetext: ''
    })
    const [questionsData , setQuestionsData] = useState([]);
    const [searchData , setSearchData] = useState([]);

    const modules = {
        toolbar: [
         
        ],
      };

    const inputsHandler = (e) =>{
        setSearchField( {...searchField,[e.target.name]: e.target.value} )
        console.log(searchField)
    }
    useEffect(() => {
        fetch(baseURL+"/api/posts/"+app_module)
        .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(data => {
            setQuestionsData(data.data)
            console.log(data);

        })

        axios.get(baseURL+"/api/posts/"+app_module+"?use=searchbar").then((response) => {
            setSearchData(response.data.data);
            console.log(searchData);
        });

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
       <Container>
        
        
        <Row>
            
        <Card >
       
        &nbsp;
           <Row>
            {
                questionsData.map(question =>
                    <Col lg={12} key={question.id}>
                    <Card >
                    <Card.Header>{question.updated_at} Posted by {question.author_name}</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <a  href="#" className="question-link">{question.question}</a>
                                &nbsp;
                                <p>{question.tags}</p>
                                </Card.Title>
                            <Card.Text>
                            <ReactQuill value={question.answer} modules={modules} />
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                        <PostsLikeShare module_posts_id={question.id}/>
                        </Card.Footer>
                        </Card>
                        &nbsp;
                    </Col>
                )
            }
           
         
           </Row>
           &nbsp;
         </Card>
        </Row>
       
       </Container>
    )
}

export default Home;