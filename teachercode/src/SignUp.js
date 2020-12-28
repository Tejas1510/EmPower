import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FileBase from 'react-file-base64';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        LEARNZILLA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function SignUp(props) {
  const classes = useStyles();

  const [teacherinfo, setteacherinfo] = useState({
    institution_email: "patna@gmail.com",
    email: "",
    name: "",
    phone_number: "",
    password: "",
    img:"",
  });

  const openSignIn = () => {
    props.history.push("/signin");
  };

  const registerTeacher = (e) => {
    e.preventDefault();
    axios
      .post("https://learnzilla.herokuapp.com/teacher/register/", teacherinfo)
      .then((response) => {
        openSignIn();
      })
      .catch((error) => {
        console.log(teacherinfo.img)
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Teacher's Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={registerTeacher}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="teachername"
                label="Full Name"
                type="text"
                autoFocus
                value={teacherinfo.name}
                onChange={(e) =>
                  setteacherinfo({ ...teacherinfo, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="teachermail"
                label="Your Email"
                type="email"
                name="email"
                autoComplete="email"
                value={teacherinfo.email}
                onChange={(e) =>
                  setteacherinfo({ ...teacherinfo, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="teachercontact"
                label="Your Mobile Number"
                type="text"
                name="phone_number"
                autoComplete="tel-national"
                value={teacherinfo.phone_number}
                onChange={(e) =>
                  setteacherinfo({
                    ...teacherinfo,
                    phone_number: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={teacherinfo.password}
                onChange={(e) =>
                  setteacherinfo({ ...teacherinfo, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
            <FileBase
                  type="file"
                  multiple={false}
                  onDone={({base64}) =>setteacherinfo({...teacherinfo,img:base64.split(",")[1]})} 
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={openSignIn}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
