import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./home_vector.jpg";
import bg from "./26365.jpg";
import img from "./bg2.jpg";
import "./home.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { auth, db, provider } from "../../firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Hash chat
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",

    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.secondary.main,
      padding: "5vh",
    },
    [theme.breakpoints.up("md")]: {
      padding: "10vh",
      paddingLeft: "20vh",
      paddingRight: "15vh",
      paddingBottom: "20vh",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "10vh",
      paddingLeft: "20vh",
      paddingRight: "15vh",
      paddingBottom: "20vh",
    },
  },
  image: {
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundPosition: "center",
    backgroundSize: "cover",
    // objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
  },
  paper: {
    margin: theme.spacing(8, 4),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  txt: {
    color: "rgba(255,79,90,0.5)",
    fontWeight: "bold",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // const [{ name, id }, dispatch] = useStateValue();

  const signin = (event) => {
    event.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        db.collection("users")
          .doc(result.user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              // console.log("exists");
            } else {
              db.collection("users").doc(result.user.uid).set({
                name: result.user.displayName,
                about: "hey, I am a new user",
                photoUrl: result.user.photoURL,
                id: result.user.uid,
              });
            }
          });
      })
      .catch((err) => alert(err));
  };

  const signup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth.user.uid);
      })
      .catch((e) => alert(e.message));
  };
  return (
    <div style={{ height: "100%" }}>
      <img src={bg} className="bg_img"></img>

      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={4} md={7} className={classes.image}>
          {/* <img className={classes.image} src={img}></img> */}
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <AccountCircleIcon />
            </Avatar> */}
            <div className="form_head">
              <Typography className={classes.txt} component="h1" variant="h3">
                Sign In
              </Typography>
            </div>
            <div>
              <img
                className="pro_img"
                src="https://cdn1.iconfinder.com/data/icons/instagram-ui-glyph/48/Sed-10-512.png"
              ></img>
            </div>
            <form className={classes.form} noValidate>
              <div className="sign_btn">
                <Button
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#FF4F5A",
                    //padding: "18px 36px",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "Helvetica",
                  }}
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  onClick={signin}
                >
                  Sign In with Google
                </Button>
              </div>

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
