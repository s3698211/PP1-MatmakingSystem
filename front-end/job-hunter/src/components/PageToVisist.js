import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import useWindowPosition from "../hooks/useWindowPosition";
import ImageCard from "./ImageCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const userDemand = {
  userType: "JOB_SEEKER",
  title: "Looking for a job?",
  body: "Let we help you.",
  imageUrl: process.env.PUBLIC_URL + "/assets/images/LookingForAJob.jpg",
  time: 1500,
};

const employerDemand = {
  userType: "EMPLOYER",
  title: "Or you are an Employer",
  body: "Job Hunter is your choice.",
  imageUrl: process.env.PUBLIC_URL + "/assets/images/Hiring.jpg",
  time: 1500,
};
export default function PageToVisist() {
  const classes = useStyles();
  const checked = useWindowPosition("header");

  return (
    <div className={classes.root} id="page-to-visit">
      <ImageCard demand={userDemand} checked={checked} />
      <ImageCard demand={employerDemand} checked={checked} />
    </div>
  );
}
