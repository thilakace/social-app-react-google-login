import React, { useState, useEffect } from "react";
import {Container, Row, Col, Card, ListGroup, Form, Button} from 'react-bootstrap';
import { FaBeer,FaThumbsUp,FaThumbsDown, FaShareAlt } from "react-icons/fa";
import axios from "axios";



const baseURL = process.env.REACT_APP_BASEURL;
const app_module = process.env.REACT_APP_MODULE;
const AppURL = process.env.REACT_APP_APPURL;


const PostsLikeShare = (props) => {
    const [modulepostsid, setModulepostsid] = useState(props.module_posts_id);
    const [viewCount, setViewCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    const getAllCount = () => {
        axios.post(baseURL+"/api/posts_like_share",
        {
          "module":app_module,
          'action':'allCOunt',
          'module_posts_id':props.module_posts_id,
          'user_id' : localStorage.getItem('userId')
        }
        ).then((response) => {
            
            if(response.data.status === 'success'){
                //setViewCount(response.data.id.view_count);
                setLikeCount(response.data.id.like_count);
                setDislikeCount(response.data.id.dislike_count);
                setComments(response.data.comments);
                setInputValue("");
            }
            
        });
    }
     
    useEffect(() => {
      getAllCount();
    },[])

    
    const onChangeHandler = event => {
      setInputValue(event.target.value);
      console.log(event.key);
   };

     const getOnClick = (action) => {
        if(action == 'setComments'){
             var payload = {
              "module":app_module,
              'action':action,
              'module_posts_id':props.module_posts_id,
              'user_id' : localStorage.getItem('userId'),
              'comments' : inputValue
            }
        }else{
          var payload = {
            "module":app_module,
            'action':action,
            'module_posts_id':props.module_posts_id,
            'user_id' : localStorage.getItem('userId')
          }
        }
        axios.post(baseURL+"/api/posts_like_share",
        payload
        ).then((response) => {
            getAllCount();
        });
    }
    
    // for social share style
    const style = {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
      
        },
        copyContainer: {
          border: '1px solid blue',
          background: 'rgb(0,0,0,0.7)'
        },
        title: {
          color: 'aquamarine',
          fontStyle: 'italic'
        }
      };

    return (
        <Card>
               <Card.Body>
               <Card.Text> 
               
               <Row>
                
                 
                <Col lg={2} xs={4}>
                     <a onClick={(event) =>getOnClick('setLikeCount')}><FaThumbsUp size={"30px"}/></a>
                     <span >&nbsp; <b>{likeCount}</b></span>
                </Col>
                <Col lg={2} xs={4}>
                    <a onClick={(event) =>getOnClick('setDisLikeCount')}><FaThumbsDown size={"30px"}/></a>
                    <span >&nbsp; <b>{dislikeCount}</b></span>
                </Col>
                <Col lg={2}  xs={4}>
                   
                    
                </Col>
                
            </Row>
            <hr/>
            <Card >
            <Card.Header>Comments</Card.Header>
            <ListGroup variant="flush">
            {
                comments.map(comment =>
                 <ListGroup.Item>{comment.comments} <span style={{color: "red"}}>commented by</span> {comment.name}</ListGroup.Item>
                )
            }
            <ListGroup.Item>
            <Row>
               <Col>
               <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={inputValue}
            />
               </Col>
               <Col>
               <Button kind="primary" type="button" label="add" onClick={(event) =>getOnClick('setComments')}>Submit</Button>
               </Col>
            </Row>
            
               
           
            </ListGroup.Item>
            </ListGroup>
          </Card>
            <Row>
            
            </Row>
               
                
                </Card.Text>
               </Card.Body>
            </Card>
    );
}

export default PostsLikeShare