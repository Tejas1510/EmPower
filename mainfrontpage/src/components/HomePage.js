import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridContainer from "components/Grid/GridContainer";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import MuiAccordion from "@material-ui/core/ExpansionPanel";
import MuiAccordionDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiAccordionSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";

import { TextField } from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import { createBrowserHistory } from "history";

const useStyles = makeStyles(styles);

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    borderRadius: "50px",
    width: "100%",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      width: "100%",
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(255, 255, 255)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    borderRadius: "50px",
    "&$expanded": {
      backgroundColor: "rgba(255, 255, 255)",
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      width: "100%",
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Classes() {
  const classes = useStyles();

  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [createclassroom, setcreateclassroom] = useState({
    teacher_email: "",
    standard: "",
    section: "",
    subject: "",
  });

  const classCreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://learnzilla.herokuapp.com/classroom/create/",
        createclassroom
      )
      .then((response) => {
        console.log(response.data);
        handleChange("panel1");
        displayClasses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [classrooms, setclassrooms] = useState([]);

  const displayClasses = async () => {
    axios
      .get("http://learnzilla.herokuapp.com/classroom/viewclasses/teacher/1/")
      .then((res) => {
        console.log(res);
        setclassrooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    displayClasses();
  }, []);

  // const openClass = (standard, section, subject) => {
  //   axios
  //     .get(
  //       `http://localhost:8000/classroom/class/${standard}/${section}/${subject}`
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       return <Route exact path="http://localhost:3000/admin/InClass" render={<InClass/>} />;
  //     })
  //     .catch((err) => {
  //       return <Route exact strict path="http://localhost:3000/admin/InClass" render={() => <Redirect to="/admin/inclass" />} />;
  //       console.log(err);
  //     });
  // };

  const hist = createBrowserHistory();

  return (
    <div>
      <GridContainer>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>
              <Button color="success" round>
                New Class
              </Button>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CardBody>
                    <GridContainer>
                      <GridItem>
                        <TextField
                          required
                          id="standard-basic"
                          label="Teacher Email"
                          type="email"
                          margin="normal"
                          style={{ width: 500 }}
                          value={createclassroom.teacher_email}
                          onChange={(e) =>
                            setcreateclassroom({
                              ...createclassroom,
                              teacher_email: e.target.value,
                            })
                          }
                        />
                      </GridItem>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <GridItem>
                        <TextField
                          required
                          id="standard-basic"
                          label="Standard"
                          type="number"
                          margin="normal"
                          value={createclassroom.standard}
                          onChange={(e) =>
                            setcreateclassroom({
                              ...createclassroom,
                              standard: e.target.value,
                            })
                          }
                          style={{ width: 500 }}
                        />
                      </GridItem>
                      <GridItem>
                        <TextField
                          required
                          id="standard-required"
                          label="Section"
                          type="text"
                          margin="normal"
                          style={{ width: 500 }}
                          value={createclassroom.section}
                          onChange={(e) =>
                            setcreateclassroom({
                              ...createclassroom,
                              section: e.target.value,
                            })
                          }
                        />
                      </GridItem>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <GridItem>
                        <TextField
                          required
                          id="standard-required"
                          label="Subject"
                          type="text"
                          margin="normal"
                          style={{ width: 500 }}
                          value={createclassroom.subject}
                          onChange={(e) =>
                            setcreateclassroom({
                              ...createclassroom,
                              subject: e.target.value,
                            })
                          }
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>

                  <CardFooter>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button color="primary" onClick={classCreate}>
                        Add Class
                      </Button>
                    </GridItem>
                  </CardFooter>
                </GridItem>
              </GridContainer>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </GridContainer>

      <GridContainer>
        {classrooms.map((classroom) => (
          <GridItem xs={12} sm={6} md={3}>
            <Card
              style={{ cursor: "pointer" }}
              // onClick={() =>
              //   openClass(
              //     classroom.standard,
              //     classroom.section,
              //     classroom.subject
              //   )
              // }
            >
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>assignment_ind</Icon>
                </CardIcon>
                <h3 className={classes.cardTitle}>
                  {classroom.standard} - {classroom.section}
                </h3>

                <p className={classes.cardTitle}>{classroom.subject}</p>
              </CardHeader>

              <CardFooter stats>
                <p className={classes.cardTitle}>
                  Total Student: {classroom.strength}
                </p>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
