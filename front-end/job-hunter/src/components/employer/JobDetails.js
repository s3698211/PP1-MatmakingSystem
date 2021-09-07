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

      <div style={{ marginTop: "1em", height: "5em" }}>
        <Form.Label>Work-type</Form.Label>
        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Full-Time"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Part-time"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>
        </fieldset>
      </div>

      <div
        style={{
          marginTop: "1em",
          height: "3em",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Form.Label style={{}}>Minimum pay:</Form.Label>
        <Form.Control
          name="minPay"
          style={{
            width: "10em",
            marginLeft: "0.5em",
            marginRight: "0.5em",
            height: "2.2em",
          }}
        />
        <Form.Label style={{}}>Maximum pay:</Form.Label>
        <Form.Control
          name="maxPay"
          style={{
            width: "10em",
            marginLeft: "0.5em",
            marginRight: "0.5em",
            height: "2.2em",
          }}
        />
      </div>
    </Form>
  );
};

export default JobDetails;
