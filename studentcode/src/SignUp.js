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
import Snackbar from "components/Snackbar/Snackbar.js";
import Done from "@material-ui/icons/Done";
import ReportProblem from "@material-ui/icons/ReportProblem";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        LearnZilla
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

  const [result, setresult] = useState("");
  const [studentinfo, setstudentinfo] = useState({
    institution_email: "patna@gmail.com",
    email: "",
    name: "",
    phone_number: "",
    password: "",
  });

  const openSignIn = () => {
    props.history.push("/signin");
  };

  const registerstudent = (e) => {
    e.preventDefault();
    axios
      .post("https://learnzilla.herokuapp.com/student/register/", studentinfo)
      .then((response) => {
        showNotification("tr");
        openSignIn();
      })
      .catch((error) => {
        setresult("Email already in use");
        showNotification("tc");
        console.log(studentinfo);
        console.log(error);
      });
  };

  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);

  React.useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  const showNotification = (place) => {
    switch (place) {
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function () {
            setTC(false);
          }, 2000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function () {
            setTR(false);
          }, 2000);
        }
        break;
      default:
        break;
    }
  };



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Student's Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={registerstudent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="studentname"
                label="Full Name"
                type="text"
                autoFocus
                value={studentinfo.name}
                onChange={(e) =>
                  setstudentinfo({ ...studentinfo, name: e.target.value })
                }
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="studentmail"
                label="Your Email"
                type="email"
                name="email"
                autoComplete="email"
                value={studentinfo.email}
                onChange={(e) =>
                  setstudentinfo({ ...studentinfo, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="studentcontact"
                label="Your Mobile Number"
                type="text"
                name="phone_number"
                autoComplete="tel-national"
                value={studentinfo.phone_number}
                onChange={(e) =>
                  setstudentinfo({
                    ...studentinfo,
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
                value={studentinfo.password}
                onChange={(e) =>
                  setstudentinfo({ ...studentinfo, password: e.target.value })
                }
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
      <Snackbar
                  place="tr"
                  color="success"
                  icon={Done}
                  message={result}
                  open={tr}
                  closeNotification={() => setTR(false)}
                  close
                />
                <Snackbar
                  place="tc"
                  color="danger"
                  icon={ReportProblem}
                  message={result}
                  open={tc}
                  closeNotification={() => setTC(false)}
                  close
                />
    </Container>
  );
}
