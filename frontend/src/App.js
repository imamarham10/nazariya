import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "./redux/actions/posts";
import logo from "./resources/cee.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} color="inherit">
        <Container maxWidth="xs" className={classes.headingContainer}>
          <Typography className={classes.heading} variant="h3" align="center">
            Vee-Cee
          </Typography>
          <Typography
            className={classes.subHeading}
            variant="subtitle1"
            align="center"
          >
            Nazariya
          </Typography>
        </Container>

        <img
          className={classes.image}
          src={logo}
          alt="icon"
          height="100"
          align="center"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            {/* xs = extra-small sm=small & medium device 7/12 spaces */}
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    // lg = large #FF6D63
  );
};
export default App;
