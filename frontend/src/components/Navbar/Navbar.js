import React, { useState, useEffect } from "react";
import { AppBar,  Typography, Toolbar,  Button,  Avatar} from "@material-ui/core";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import useStyles from "./style";
import logo from "../../resources/memories-Logo.png";
import memoriesText from "../../resources/Logo.png";
import { useDispatch } from "react-redux";
import * as actionType from "../../redux/actionTypes/index";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <AppBar className={classes.appBar} color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="55px" />
        <img className={classes.image} src={logo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} varaint="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            style={{
              backgroundColor: "#FF6D63",
              color: "#FFFFFF",
              alignItems: "center",
              fontSize: "12px",
            }}
            // color="secondary"
            className={classes.buttonSingIn}
            variant="contained"
            // size="medium"
            component={Link}
            to="/auth"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

// <Button
//   color="secondary"
//   className={classes.buttonSubmit}
//   variant="contained"
//   size="large"
//   fullWidth
//   type="submit"
// >
//   Submit
// </Button>;

export default Navbar;
