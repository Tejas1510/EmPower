import React, { useState } from "react";
import axios from "axios";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, makeStyles } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { bake_cookie, read_cookie } from "sfcookies";


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [teacherinfo, setteacherinfo] = useState({
    email: "",
    password: "",
  });

  const loginteacher = (e) => {
    e.preventDefault();
    axios
      .post("https://learnzilla.herokuapp.com/teacher/login/", teacherinfo)
      .then((response) => {
        const teacheremail = "teacheremail";
        const teacherkey = "teacherkey";
        bake_cookie(teacheremail, response.data.email);
        bake_cookie(teacherkey, response.data.key);
        axios
          .post("https://learnzilla.herokuapp.com/teacher/", {email: read_cookie("teacheremail"), key: read_cookie("teacherkey")})
          .then((res) => {
            const teachername = "teachername";
            const institutionemail = "institutionemail";
            const teachernumber = "teachernumber";
            bake_cookie(teachername, res.data.name);
            bake_cookie(institutionemail, res.data.institution_email);
            bake_cookie(teachernumber, res.data.phone_number);        
          })
          .catch((err) => {
            console.log(err);
          });
          props.history.push("/admin/homepage");
      })
      .catch((error) => {
        alert("Wrong Id or Password")
        console.log(error);
      });
  };

  const openSignUp = () => {
    props.history.push("/signup");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Teacher's Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginteacher}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={teacherinfo.email}
            onChange={(e) =>
              setteacherinfo({ ...teacherinfo, email: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={openSignUp}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
