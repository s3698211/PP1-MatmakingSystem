import React, { useEffect, useState } from "react";
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
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  useEffect(() => {
    getJobS();
  }, []);

  const getJobS = async () => {
    let container = [];
    await axios
      .get("http://localhost:8080/api/job/user/match")
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
        container = res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    if (container.length === 0) {
      await axios
        .get("http://localhost:8080/api/job/alljobs")
        .then((res) => setJobs(res.data));
    }
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
              to="/jobseeker/dashboard"
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
                  <RouterLink to="/jobseeker/createBackground">
                    <Button variant="contained" color="primary">
                      Your Background
                    </Button>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Job-seeker site
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {jobs.map((job) => (
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
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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
