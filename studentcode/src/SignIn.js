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
import Snackbar from "components/Snackbar/Snackbar.js";
import Done from "@material-ui/icons/Done";
import ReportProblem from "@material-ui/icons/ReportProblem";
import { bake_cookie, read_cookie } from "sfcookies";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [studentinfo, setstudentinfo] = useState({
    email: "",
    password: "",
  });
  const [result, setresult] = useState("");
  const loginstudent = (e) => {
    e.preventDefault();
    axios
      .post("https://learnzilla.herokuapp.com/student/login/", studentinfo)
      .then((response) => {
        const studentemail = "studentemail";
        const studentkey = "studentkey";
        bake_cookie(studentemail, response.data.email);
        bake_cookie(studentkey, response.data.key);
        setresult("Login Successfull");
        showNotification("tr");
        axios
          .post("https://learnzilla.herokuapp.com/student/", {email: read_cookie("studentemail"), key: read_cookie("studentkey")})
          .then((res) => {
            props.history.push("/admin/homepage");
            const studentname = "studentname";
            // const institutionemail = "institutionemail";
            const studentnumber = "studentnumber";
            const studentid = "studentid";
            console.log(res.data[0])
            bake_cookie(studentname, res.data[0].name);
            bake_cookie(studentid, res.data[0].id);
            // bake_cookie(institutionemail, res.data.institution_email);
            bake_cookie(studentnumber, res.data[0].phone_number);
            
          })
          .catch((err) => {
            console.log(err);
          });    
      })
      .catch((error) => {
        console.log(error);
        setresult("Incorrect email or Password");
        showNotification("tc");
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
          }, 4000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function () {
            setTR(false);
          }, 4000);
        }
        break;
      default:
        break;
    }
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
          Student's Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginstudent}>
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
            value={studentinfo.email}
            onChange={(e) =>
              setstudentinfo({ ...studentinfo, email: e.target.value })
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
            value={studentinfo.password}
            onChange={(e) =>
              setstudentinfo({ ...studentinfo, password: e.target.value })
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
