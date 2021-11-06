import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const FIlterForm = () => {
  const [state, setState] = useState({
    category: "",

    postCode: "",
    salary: "",
    jobType: "",
    state: "",
  });
  const [skillset, setSkillset] = useState([]);
  const [option, setOption] = useState("");
  const history = useHistory();
  const handleChangeOption = (e) => {
    setOption(e.target.value);
  };
  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const addSkill = () => {
    if (!skillset.includes(option)) {
      let temp = Array.from(skillset);
      temp.push(option);

      setSkillset(Array.from(temp));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("skillset: ", skillset.toString());
    setState((state) => ({
      ...state,
      skills: skillset.toString(),
    }));
    if (
      state.category === "" ||
      state.postCode === "" ||
      state.salary === "" ||
      state.jobType === ""
    ) {
      console.log(state);
      alert("Please fill all the field.");
      return;
    }

    const payload = {
      category: state.category,
      skills: skillset.toString(),
      postCode: state.postCode,
      salary: state.salary,
      jobType: state.jobType,
    };

    console.log(payload);
    addBackground(payload);
  };

  const addBackground = async (background) => {
    await axios
      .post(
        "https://match-making-jobhunter-api.herokuapp.com/api/background/",
        background
      )
      .then((res) => {
        alert("succecssful");
        history.push("/job_seeker/dashboard");
      })
      .catch((err) => alert(err.response.data));
  };
  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group required as={Col} controlId="formGridCity">
            <Form.Label style={{ fontWeight: "bold" }}>Study field</Form.Label>
            <Form.Control
              name="category"
              onChange={handleChange}
              as="select"
              defaultValue="Choose..."
            >
              <option disabled value="Choose...">
                Choose...
              </option>
              <option value="Information & Technology">
                Information & Technology
              </option>
              <option value="Business">Business</option>
              <option value="Accounting">Accounting</option>
              <option value="Education">Education</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ display: "flex" }}>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label style={{ fontWeight: "bold" }}>Skills</Form.Label>
            <Form.Control
              required
              onChange={handleChangeOption}
              name="option"
              as="select"
              defaultValue="Choose..."
            >
              <option disabled value="Choose...">
                Choose ...
              </option>
              <option value="Problem Solving" onChange={handleChangeOption}>
                Problem-Solving
              </option>
              <option value="Presentation" onChange={handleChangeOption}>
                Presentation
              </option>
              <option value="Communication" onChange={handleChangeOption}>
                Communication
              </option>
              <option value="Excel" onChange={handleChangeOption}>
                Excel
              </option>
              <option value="Programming" onChange={handleChangeOption}>
                Programming
              </option>
            </Form.Control>
          </Form.Group>
          <Button
            onClick={addSkill}
            style={{
              height: "2.5em",
              marginTop: "2.3em",
              fontSize: "small",
            }}
          >
            Add skill
          </Button>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        >
          {skillset.map((skill, key) => (
            <>
              <br />
              <Button
                style={{ fontSize: "small", marginLeft: "1px" }}
                key={skill}
                variant="light"
              >
                {skill}
              </Button>
            </>
          ))}
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label style={{ fontWeight: "bold" }}>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label style={{ fontWeight: "bold" }}>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              onChange={handleChange}
              defaultValue="Choose..."
            >
              <option disabled>Choose...</option>
              <option value="VIC">VIC</option>
              <option value="NSW">NSW</option>
              <option value="QLD">QLD</option>
              <option value="TAS">TAS</option>
              <option value="SA">SA</option>
              <option value="WA">WA</option>
            </Form.Control>
          </Form.Group>

          <Form.Group required as={Col} controlId="formGridZip">
            <Form.Label style={{ fontWeight: "bold" }}>Zip</Form.Label>
            <Form.Control
              placeholder="3000"
              name="postCode"
              onChange={handleChange}
              value={state.postCode}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group required as={Col} controlId="formGridCity">
            <Form.Label style={{ fontWeight: "bold" }}>Salary</Form.Label>
            <Form.Control
              name="salary"
              value={state.salary}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label style={{ fontWeight: "bold" }}>Job type</Form.Label>
            <Form.Control
              name="jobType"
              onChange={handleChange}
              as="select"
              defaultValue="Choose..."
            >
              <option disabled value="Choose...">
                Choose...
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <center>
          <Button type="submit">Submit</Button>
        </center>
      </Form>
    </React.Fragment>
  );
};

export default FIlterForm;
