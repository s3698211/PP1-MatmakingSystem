import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const JobDetails = ({ post }) => {
  return (
    <Form>
      <Form.Group controlId="formBasicSelect">
        <Form.Label>Role Field</Form.Label>
        <Form.Control as="select">
          <option value="Information & Technology">
            Information & Technology
          </option>
          <option value="Business">Business</option>
          <option value="Accounting">Accounting</option>
          <option value="Education">Education</option>
        </Form.Control>
      </Form.Group>

      <Form.Label>Localtion</Form.Label>
      <Form.Control value={post.location} name="location" type="text" />

      <Form.Group className="mb-3">
        <Form.Label>Radios</Form.Label>

        <Form.Check
          type="radio"
          label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="second radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="third radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Form.Group>
    </Form>
  );
};

export default JobDetails;
const annualPay = [];
const hourlyRate = [];
