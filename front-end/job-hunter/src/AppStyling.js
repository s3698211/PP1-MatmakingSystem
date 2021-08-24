import { makeStyles } from "@material-ui/core/styles";
export const AppStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "linear-gradient(to right bottom, #430089, #82ffa1)",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${
      process.env.PUBLIC_URL + "/assets/images/JobHunting.jpg"
    })`,
    // height: "500px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));
