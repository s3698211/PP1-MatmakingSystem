import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import { Alert, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import ModalContainer from "./ModalContainer";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
export default function JobDashBoard() {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState({});

  const [state, setState] = useState("");
  let alljobs = [];
  const handleClose = () => setShow(false);

  const handleShowAlert = () => setShowAlert(true);

  const handleShow = (e) => {
    setShow(true);
  };

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const search = async (e) => {
    e.preventDefault();
    let filterjobs = [];
    await axios
      .get("https://match-making-jobhunter-api.herokuapp.com/api/job/alljobs")
      .then((res) => {
        alljobs = res.data;
      });

    if (state !== "") {
      filterjobs = alljobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(state.toLowerCase())
      );
    } else {
      filterjobs = alljobs;
    }

    setJobs([...filterjobs]);
  };

  useEffect(() => {
    getJobS();
  }, []);

  useEffect(() => {}, [data]);

  useEffect(() => {}, [jobs]);

  const getJobS = async () => {
    let container = [];
    await axios
      .get(
        "https://match-making-jobhunter-api.herokuapp.com/api/job/user/match"
      )
      .then((res) => {
        setJobs(res.data);
        container = res.data;
      })
      .catch((err) => {
        if (err.response.data.resource) {
          alert(
            "You have not created a background yet. Please create one to enable smart-filter completely."
          );
        }
      });

    if (container.length === 0) {
      await axios
        .get("https://match-making-jobhunter-api.herokuapp.com/api/job/alljobs")
        .then((res) => setJobs(res.data));
    }
  };

  const getAllJobs = async () => {
    await axios
      .get("https://match-making-jobhunter-api.herokuapp.com/api/job/alljobs")
      .then((res) => setJobs(res.data));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            <RouterLink
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/job_seeker/dashboard"
            >
              Job Hunter
            </RouterLink>
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Job Dashboard
            </Typography>

            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Welcome Job Hunters
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <RouterLink to="/job_seeker/createBackground">
                    <Button variant="contained" color="primary">
                      Your Background
                    </Button>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="/signin/EMPLOYER"
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        sessionStorage.removeItem("jwtToken");
                      }}
                    >
                      EMPLOYER-SITE
                    </Button>
                  </RouterLink>
                </Grid>
              </Grid>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    style={{ background: "#F9E79F" }}
                    onClick={() => {
                      getJobS();
                    }}
                  >
                    Smart filter
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{ background: "#48C9B0" }}
                    onClick={() => {
                      getAllJobs();
                    }}
                  >
                    All Jobs
                  </Button>
                </Grid>
              </Grid>
            </div>

            <div style={{ marginTop: "10px" }}>
              <Form onSubmit={search}>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Col md="9">
                    {" "}
                    <Form.Control
                      name="value"
                      value={state.value}
                      onChange={handleChange}
                      placeholder="Enter job title"
                    />
                  </Col>
                  <Col md="3">
                    <Button type="submit">Search</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Container>
        </div>
        <Alert
          show={showAlert}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Error</Alert.Heading>
          <p>
            Each job is only applied once. You already apllied for this job.
          </p>
        </Alert>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {jobs.map((job) => (
              <>
                <Grid item key={job} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        style={{ fontWeight: "bold" }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {job.jobTitle}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h6">
                        {job.location}
                      </Typography>
                      <Typography>{job.jobDescription}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        name={job.id}
                        onClick={() => {
                          setData({ ...job });
                          handleShow();
                        }}
                        color="primary"
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
          <ModalContainer
            post={data}
            show={show}
            handleClose={handleClose}
            handleShowAlert={handleShowAlert}
          />
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
