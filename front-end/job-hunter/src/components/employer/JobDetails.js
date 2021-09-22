import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./JobPost.css";
const JobDetails = ({ post, handleChange }) => {
  return (
    <React.Fragment>
      <Form.Group controlId="formBasicSelect">
        <Form.Label className="formLabel">Role Field</Form.Label>
        <Form.Control name="category" onChange={handleChange} as="select">
          <option disabled value="">
            Select an option
          </option>
          <option value="Information & Technology">
            Information & Technology
          </option>
          <option value="Business">Business</option>
          <option value="Accounting">Accounting</option>
          <option value="Education">Education</option>
        </Form.Control>
      </Form.Group>
      <Form.Label className="formLabel">Job title: </Form.Label>
      <Form.Control
        onChange={handleChange}
        value={post.jobTitle}
        name="jobTitle"
        type="text"
      />
      <div className="locationSection">
        <Form.Label className="formLabel">Address: </Form.Label>
        <Form.Control
          className="locationInput"
          value={post.location}
          name="location"
          onChange={handleChange}
          type="text"
        />

        <Form.Label className="formLabel">Post code:</Form.Label>
        <Form.Control
          value={post.locationPincode}
          name="locationPincode"
          onChange={handleChange}
          placeholder="exp: 3000"
          type="text"
        />
      </div>

      <div className="paySection">
        <Form.Group
          className="mb-3"
          name="jobType"
          onChange={handleChange}
          value={post.jobType}
        >
          <Form.Label className="formLabel">Job type</Form.Label>

          <Form.Check
            type="radio"
            label="Full-time"
            value="Full-time"
            name="jobType"
            id="formHorizontalRadios1"
          />
          <Form.Check
            type="radio"
            label="Part-time"
            value="Part-time"
            name="jobType"
            id="formHorizontalRadios2"
          />
        </Form.Group>
      </div>
      <Form.Label className="formLabel">Salary </Form.Label>
      <Form.Control
        style={{ width: "8em" }}
        onChange={handleChange}
        className="salary"
        value={post.salary}
        name="salary"
        placeholder="exp: 3000AUD"
      />
    </React.Fragment>
  );
};

export default JobDetails;
const annualPay = [];
const hourlyRate = [];
