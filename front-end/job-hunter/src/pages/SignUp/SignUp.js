import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import { BeatLoader } from "react-spinners";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../action/securityActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const { userType } = useParams();
  const [state, setstate] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    password: "",

    user_type: userType,
  });
  const [loading, setLoading] = useState(false);
  const [reRender, setreRender] = useState(false);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  useEffect(() => {}, [reRender]);
  const history = useHistory();

  const handleChange = (e) => {
    setstate((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoading = () => {
    setLoading(false);
  };
  const handleSubmit = (event) => {
    if (errors) {
      event.preventDefault();
      console.log(errors);
    }
    event.preventDefault();
    setLoading(true);
    const newUser = {
      username: state.username,
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      address: state.address,
      phone: state.phone,
      password: state.password,
      user_type: state.user_type,
    };
    dispatch(createNewUser(newUser, history, handleLoading));
    setreRender(!reRender);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                value={state.firstname}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                value={state.lastname}
                onChange={handleChange}
                label="Last Name"
                name="lastname"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                value={state.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={state.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={state.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                value={state.address}
                onChange={handleChange}
                label="Address"
                id="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                value={state.phone}
                required
                fullWidth
                name="phone"
                label="Phone Number"
                id="phone"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <BeatLoader color="white" loading={loading} size={10} />
            ) : (
              "SIGN UP"
            )}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={`/signin/${userType}`} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
