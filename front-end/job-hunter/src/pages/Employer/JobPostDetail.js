import React from "react";
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
import { Col, Row } from "react-bootstrap";
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
const JobPostDetail = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Col>
            <Typography variant="h6" color="inherit" noWrap>
              Job Hunter
            </Typography>
          </Col>
          <Col
            style={{
              display: "flex",

              flexDirection: "row-reverse",
            }}
          >
            <Typography variant="h6" color="inherit" noWrap>
              Job-Seeker
            </Typography>
          </Col>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="sm">
          <div className={classes.heroButtons}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <RouterLink to="/employer/createPost">
                  <Button variant="contained" color="primary">
                    Create a job post
                  </Button>
                </RouterLink>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Back to dashboard
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
        <Container style={{ marginTop: "5em" }} maxWidth="md">
          <Row>
            <Col md="6">this is job detail</Col>
            <Col md="6">This is potential candidate</Col>
          </Row>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default JobPostDetail;
