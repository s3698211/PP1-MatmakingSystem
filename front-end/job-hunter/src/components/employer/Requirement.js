import React from "react";
import { Form } from "react-bootstrap";

const Requirement = () => {
  return (
    <div>
      <Form.Label>Job Description</Form.Label>
      <Form.Control style={{ height: "20em" }} as="textarea" />
    </div>
  );
};

export default Requirement;
