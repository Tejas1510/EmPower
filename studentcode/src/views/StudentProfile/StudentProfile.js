import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Done from "@material-ui/icons/Done";
import ReportProblem from "@material-ui/icons/ReportProblem";
import { TextField } from "@material-ui/core";
import { read_cookie } from "sfcookies";
import Linechart from 'Linechart';
import Barchart from 'Barchart';
import Doughnut from 'Doughnut';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  App: {
    display:"flex",
    flexDirection:"coulomn",
    alignItem:"center"

  },
  chart:{
    width:"80%"
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const studentemail = read_cookie("studentemail");
  const studentkey = read_cookie("studentkey");
  const studentname = read_cookie("studentname");
  const studentnumber = read_cookie("studentnumber");
  // const institutionemail = read_cookie("institutionemail");
  const classes = useStyles();
  const [result, setresult] = useState("");
  const [data, setdata] = useState({
    name: studentname,
    email: studentemail,
    password: "",
    newpass: "",
    key: studentkey
  });

  
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://learnzilla.herokuapp.com/student/${studentname}/change-password`,
        data
      )
      .then((response) => {
        setresult(response.data);
        showNotification("tr");
      })
      .catch((error) => {
        console.log(error);
        setresult("Please Check Password again");
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Student Profile</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Name"
                    type="text"
                    margin="normal"
                    style={{ width: 500 }}
                    value={studentname}
                  />
                </GridItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Email"
                    type="email"
                    margin="normal"
                    style={{ width: 500 }}
                    value={studentemail}
                  />
                </GridItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Mobile Number"
                    type="text"
                    margin="normal"
                    style={{ width: 500 }}
                    value={studentnumber}
                  />
                </GridItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <GridItem>
                  <TextField
                    required
                    label="Old Password"
                    type="password"
                    margin="normal"
                    style={{ width: 500 }}
                    value={data.password}
                    onChange={(e) =>
                      setdata({ ...data, password: e.target.value })
                    }
                  />
                </GridItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <GridItem>
                  <TextField
                    required
                    label="New Password"
                    type="password"
                    margin="normal"
                    style={{ width: 500 }}
                    value={data.newpass}
                    onChange={(e) =>
                      setdata({ ...data, newpass: e.target.value })
                    }
                  />
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter>
              <GridItem xs={12} sm={12} md={4}>
                <Button fullWidth color="primary" onClick={submitHandler}>
                  Change Password
                </Button>
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
              </GridItem>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
