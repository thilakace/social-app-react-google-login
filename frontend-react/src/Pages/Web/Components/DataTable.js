import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Apiservice } from "../Services/Apiservice";

const baseURL = process.env.REACT_APP_BASEURL;
const app_module = process.env.REACT_APP_MODULE;
const app_name = process.env.REACT_APP_NAME;

const DataTable = (property) => {
    const [mypostdata, setMypostdata] = useState([]);
    const [ publish, setPublish] = useState('none');
    const [searchValue, setSearchvalue] = React.useState("");

    const onChangeHandler = event => {
      setSearchvalue(event.target.value);
      
   };
    const getPostStatus = (props,status) => {
      
      props.newstatus= status;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id:props.id,status:status})
      };
      fetch(baseURL+'/api/get-publish-posts/'+app_module, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.status === 'success'){
            refreshData();
            console.log(data);
          }else{
            console.log(data);
            
          }
          
        });
    }

    const refreshData = () => {
      Apiservice("get-author-posts/"+localStorage.getItem('userId')+"/"+app_module+"/"+property.items,'GET').then((data) => {
        setMypostdata(data.data);
      });
    }

    useEffect(() => {
      if(localStorage.getItem('token') === null || localStorage.getItem('token') === ''){
        navigate("/");
      }
      refreshData();
      
      if(property.items === 'all'){
        setPublish('inline');
       }
    },[])

    return (
        <Card>
        <Card.Header as="h5">{property.title}</Card.Header>
        <Card.Body>
        <Card.Title>

        <Row>
               <Col>
               <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={searchValue}
              placeholder="Search by title"
            />
               </Col>
               <Col>
               
               </Col>
            </Row>
        </Card.Title>
        <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>updated at</th>
                    <th>Author</th>
                    <th>Status </th>
                    <th>Action </th>
                    </tr>
                </thead>
                <tbody>
                {
                  mypostdata.filter(name => name.question.includes(searchValue)).map(post =>
                    <tr key={post.id}>
                     <td>{post.id}</td>
                    <td>{post.question}</td>
                    <td>{post.updated_at}</td>
                    <td>{post.author_name}</td>
                    <td>{(post.status === 1) ? 'Active' : 'inactive' }</td>
                    <td>
                    <Button style={{display:publish}} variant="primary" size="sm" onClick={() => getPostStatus(post,(post.status === 1) ? 'Disable' : 'Publish')}>
                    {(post.status === 1) ? 'Disable' : 'Publish' }
                    </Button>
                    &nbsp;
                    <Link to={"/my-post-edit/"+post.id} className="question-link">Edit</Link>
                    &nbsp;|&nbsp;
                    <a  className="question-link" onClick={() => getPostStatus(post,'Delete')}>Delete</a>
                    </td>
                    </tr>
                   
                  )
                }
                   
                </tbody>
                </Table>
        </Card.Body>
        </Card>
    )
}

export default DataTable;