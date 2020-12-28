import React, { useState } from "react";
import axios from "axios";
// @material-ui/core components
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
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const teacheremail = read_cookie("teacheremail");
  const teacherkey = read_cookie("teacherkey");
  const teachername = read_cookie("teachername");
  const teachernumber = read_cookie("teachernumber");
  const institutionemail = read_cookie("institutionemail");
  const classes = useStyles();
  const [result, setresult] = useState("");
  const [data, setdata] = useState({
    name: teachername,
    email: teacheremail,
    password: "",
    newpass: "",
    key: teacherkey
  });

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://learnzilla.herokuapp.com/teacher/${teachername}/change-password`,
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
              <h4 className={classes.cardTitleWhite}>Teacher Profile</h4>
              <p className={classes.cardCategoryWhite}>Institute Name</p>
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
                    value={teachername}
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
                    value={teacheremail}
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
                    value={teachernumber}
                  />
                </GridItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Institution Email"
                    type="text"
                    margin="normal"
                    style={{ width: 500 }}
                    value={institutionemail}
                  />
                </GridItem>
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
