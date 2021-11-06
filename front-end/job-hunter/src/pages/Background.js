import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import FIlterForm from "../components/jobseeker/FIlterForm";
import UploadCV from "./JobSeeker/UploadCV";

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
const Background = () => {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />

          <Typography
            component="h6"
            variant="h6"
            align="center"
            color="textPrimary"
            gutterBottom
          >
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

      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <FIlterForm />
          <UploadCV />
        </Container>
      </div>
    </div>
  );
};

export default Background;
