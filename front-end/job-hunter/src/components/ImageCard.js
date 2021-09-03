import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 545,
    height: 640,
    background: "rgba(0,0,0,0.5)",
    margin: "20px",
  },
  media: {
    height: 440,
    width: 545,
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "white",
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "1.1rem",
    color: "#ddd",
  },
});

export default function ImageCard({ demand, checked }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Collapse
      in={checked}
      {...(true ? { timeout: 1500 } : {})}
      collapsedHeight={50}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={demand.imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              {demand.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              {demand.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            onClick={() => {
              history.push(`/signup/${demand.userType}`);
            }}
            size="small"
            color="primary"
          >
            Join Us
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  );
}
