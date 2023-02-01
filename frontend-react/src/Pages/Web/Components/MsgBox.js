import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function StackingExample(props) {
  const [position, setPosition] = useState('top-end');
  const [show, setShow] = useState(props.show);

  return (
    <ToastContainer position="bottom-end"  >
      <Toast show={show} onClose={() => setShow(false)}  delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Message</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
     
    </ToastContainer>
  );
}

export default StackingExample;