import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import JobDetails from "../../components/employer/JobDetails";
import Requirement from "../../components/employer/Requirement";
import Review from "../../components/employer/Review";
import { Form } from "react-bootstrap";
import "../../components/employer/JobPost.css";
import axios from "axios";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Job Details", "Requirement", "Review"];

const getStepContent = (
  step,
  state,
  skills,
  handleChange,
  addSkill,
  handleChangeOption,
  setstate
) => {
  switch (step) {
    case 0:
      return (
        <JobDetails
          post={state}
          handleChange={handleChange}
          setState={setstate}
        />
      );
    case 1:
      return (
        <Requirement
          post={state}
          skills={skills}
          addSkill={addSkill}
          handleChange={handleChange}
          handleChangeOption={handleChangeOption}
        />
      );
    case 2:
      return <Review post={state} />;
    default:
      throw new Error("Unknown step");
  }
};
const JobPost = () => {
  const classes = useStyles();
  const security = useSelector((state) => state.security);

  const [state, setstate] = useState({
    category: "Information & Technology",
    employerUsername: security.user.sub,
    location: "",
    locationPincode: "",
    jobTitle: "",
    jobType: "",
    salary: "",
    jobDescription: "",
    skills: "",
  });

  const [option, setOption] = useState("");
  const [skills, setSkills] = useState(["Problem-solving"]);
  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setstate((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeOption = (e) => {
    setOption(e.target.value);
  };
  const addSkill = () => {
    let temp = Array.from(skills);
    temp.push(option);
    setSkills(Array.from(temp));
    console.log(skills);
  };

  const createJob = async (payload) => {
    await axios
      .post(
        `http://localhost:8080/api/job/employer/postjob/${security.user.id}`,
        payload
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err.response.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setstate((state) => ({
      ...state,
      skills: skills.toString(),
    }));

    const payload = {
      category: state.category,
      employerUsername: state.employerUsername,
      location: state.location,
      locationPincode: state.locationPincode,
      jobTitle: state.jobTitle,
      jobType: state.jobType,
      salary: state.salary,
      jobDescription: state.jobDescription,
      skills: state.skills,
    };
    console.log("payload", payload);
    createJob(payload);
    history.push("/employer/dashboard");
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Job Hunter
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create Post
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your contributing.
                </Typography>
                <Typography variant="subtitle1">Review section</Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Form onSubmit={handleSubmit}>
                  {getStepContent(
                    activeStep,
                    state,
                    skills,
                    handleChange,
                    addSkill,
                    handleChangeOption
                  )}
                </Form>
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Finish
                    </Button>
                  ) : (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default JobPost;
