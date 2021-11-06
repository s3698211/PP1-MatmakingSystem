import { useState, useEffect } from "react";
import { AppBar, Collapse, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SortIcon from "@material-ui/icons/Sort";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React from "react";
import { Link as Scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Nunito",
  },
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  container: {
    textAlign: "center",
  },
  title: { color: "white", fontSize: "4.5rem" },
  colorText: { color: "#5AFF3D" },
  iconGoDown: {
    color: "#5AFF3D",
    fontSize: "4rem",
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            Job <span className={classes.colorText}>Hunter</span>
          </h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Collapse
        in={checked}
        {...(true ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br /> Job{" "}
            <span className={classes.colorText}>Hunter.</span>
          </h1>
          <Scroll to="page-to-visit" smooth={true}>
            <IconButton>
              <KeyboardArrowDownIcon className={classes.iconGoDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
