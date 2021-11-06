import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import LargeJobDetailModal from "../../components/employer/LargeJobDetailModal";
import PotentialCandidateModal from "../../components/employer/PotentialCandidateModal";
//websocket import
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ModalFilterSeeker from "../../components/jobseeker/ModalFilterSeeker";
//end websocket import

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

const EmployerDashBoard = () => {
  const classes = useStyles();
  const security = useSelector((state) => state.security);
  const user = { ...security.user };
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [showPotentialCandidate, setShowPotentialCandidate] = useState(false);
  const [showFilterSeeker, setShowFilterSeeker] = useState(false);
  const [data, setData] = useState({});
  const [applicants, setApplicants] = useState([]);
  const [potentialCandidatesList, setpotentialCandidatesList] = useState([]);

  //Websocket

  //End Websocket

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {}, [...jobs]);

  useEffect(() => {}, [...applicants]);

  useEffect(() => {}, [...potentialCandidatesList]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleClosePotential = () => setShowPotentialCandidate(false);

  const handleCloseFilterSeeker = () => setShowFilterSeeker(false);

  const getData = async (postId) => {
    setLoading(true);
    await axios
      .get(
        `https://match-making-jobhunter-api.herokuapp.com/api/application/post/all/${postId}`
      )
      .then((res) => {
        setApplicants([...res.data]);
        setLoading(false);
      })

      .catch((err) => console.log(err.response.data));
  };
  const getJobs = async () => {
    await axios
      .get(
        `https://match-making-jobhunter-api.herokuapp.com/api/job/user/alljobs/${user.id}`
      )
      .then((res) => {
        setJobs([...res.data]);
      })
      .catch((err) => err.response);
  };

  const getPotentialCandidate = async (postId) => {
    setLoading(true);
    await axios
      .get(
        `https://match-making-jobhunter-api.herokuapp.com/api/auth/potential/${postId}`
      )
      .then((res) => {
        setpotentialCandidatesList([...res.data]);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Job Hunter
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
              Thank you for contributing
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <RouterLink to="/employer/createPost">
                    <Button variant="contained" color="primary">
                      Create a job post
                    </Button>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="/signin/JOB_SEEKER"
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        sessionStorage.removeItem("jwtToken");
                      }}
                    >
                      Job-seeker site
                    </Button>
                  </RouterLink>
                </Grid>
              </Grid>
              <center>
                {" "}
                <Button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "grey",
                    color: "white",
                  }}
                  variant="outlined"
                  onClick={() => {
                    setShowFilterSeeker(true);
                  }}
                >
                  Seeker Filter / Search
                </Button>
              </center>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {jobs.map((job, key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {job.jobTitle}
                    </Typography>
                    <Typography>{job.jobDescription}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setData({ ...job });
                        getData(job.id);
                        handleShow();
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        getPotentialCandidate(job.id);
                        setShowPotentialCandidate(true);
                      }}
                    >
                      Potential candidates
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* --------MODAL--------------------- */}
        <LargeJobDetailModal
          post={data}
          show={show}
          handleClose={handleClose}
          candidates={applicants}
          loading={loading}
        />
        <PotentialCandidateModal
          candidates={potentialCandidatesList}
          show={showPotentialCandidate}
          candidates={potentialCandidatesList}
          handleClose={handleClosePotential}
          loading={loading}
        />
        <ModalFilterSeeker
          show={showFilterSeeker}
          handleClose={handleCloseFilterSeeker}
        />
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
};

export default EmployerDashBoard;
