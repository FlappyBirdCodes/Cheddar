import React from "react";
import { Form } from "react-bootstrap";
import "../styles/Login.css";

function Input(props) {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        id={props.label}
        placeholder={props.placeholder}
        required
      />
    </Form.Group>
  );
}

export default Input;
