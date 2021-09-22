import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Requirement = ({
  post,
  skills,
  addSkill,
  handleChange,
  handleChangeOption,
}) => {
  return (
    <React.Fragment>
      <div className="skillSection">
        <Form.Group controlId="formBasicSelect">
          <Form.Label className="formLabel">Skills</Form.Label>
          <Form.Control
            value={skills}
            onChange={handleChangeOption}
            name="skill"
            as="select"
          >
            <option value="Problem Solving">Problem-Solving</option>
            <option value="Presentation">Presentation</option>
            <option value="Communication">Communication</option>
            <option value="Excel">Excel</option>
            <option value="Programming">Programming</option>
          </Form.Control>
        </Form.Group>
        <Button style={{ marginBottom: "1em" }} onClick={addSkill}>
          Add
        </Button>
        {skills.map((skill, key) => (
          <>
            <br />
            <Button className="skillButton" key={key} variant="light">
              {skill}
            </Button>
          </>
        ))}

        <div className="jobDescriptionSection">
          <Form.Label className="formLabel">Job Description:</Form.Label>
          <Form.Control
            style={{ height: "10EM" }}
            className="descInput"
            name="jobDescription"
            onChange={handleChange}
            value={post.jobDescription}
            as="textarea"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Requirement;
