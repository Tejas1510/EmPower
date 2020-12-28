import React, { useState, useEffect } from "react";
import axios from "axios";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Assignment from "@material-ui/icons/Assignment";
import Face from "@material-ui/icons/Face";
import Assesment from "@material-ui/icons/Assessment";

import MuiAccordion from "@material-ui/core/ExpansionPanel";
import MuiAccordionDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiAccordionSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

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

export default function InClass() {
  const [students, setstudents] = useState([]);
  const [assignments, setassignments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [marks, setmarks] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getStudents = async () => {
    axios
      .get(`http://learnzilla.herokuapp.com/classroom/viewstudents/1/`)
      .then((response) => {
        console.log(response.data);
        setstudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAssignments = async () => {
    axios
      .get(`http://learnzilla.herokuapp.com/classroom/viewassignments/1/`)
      .then((response) => {
        console.log(response.data);
        setassignments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getmarks = async () => {
    axios
      .get(`http://learnzilla.herokuapp.com/classroom/viewmarks/classroomid/1/`)
      .then((response) => {
        console.log(response.data);
        setmarks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [createassignment, setcreateassignment] = useState({
    teacher_email: "",
    classroom_id: "",
    assign_url: "",
  });

  const assignmentcreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://learnzilla.herokuapp.com/classroom/create-new-assign/",
        createassignment
      )
      .then((response) => {
        console.log(response.data);
        handleChange("panel1");
        getAssignments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [createstudent, setcreatestudent] = useState({
    teacher_email: "",
    classroom_id: "",
    student_email: "",
  });

  const studentcreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://learnzilla.herokuapp.com/classroom/addstudent/",
        createstudent
      )
      .then((response) => {
        console.log(response.data);
        handleChange("panel2");
        getStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStudents();
    getAssignments();
    getmarks();
  }, []);

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
                New Assignment
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
                          value={createassignment.teacher_email}
                          onChange={(e) =>
                            setcreateassignment({
                              ...createassignment,
                              teacher_email: e.target.value,
                            })
                          }
                        />
                      </GridItem>
                      <GridItem>
                        <TextField
                          required
                          id="standard-basic"
                          label="Classroom ID"
                          type="number"
                          margin="normal"
                          value={createassignment.classroom_id}
                          onChange={(e) =>
                            setcreateassignment({
                              ...createassignment,
                              classroom_id: e.target.value,
                            })
                          }
                          style={{ width: 500 }}
                        />
                      </GridItem>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/* <GridItem>
                        <TextField
                          required
                          id="standard-basic"
                          label="Assignment Name"
                          type="text"
                          margin="normal"
                          value={createassignment.classroom_name}
                          onChange={(e) =>
                            setcreateassignment({
                              ...createassignment,
                              classroom_name: e.target.value,
                            })
                          }
                          style={{ width: 500 }}
                        />
                      </GridItem> */}
                      <GridItem>
                        <TextField
                          required
                          id="standard-required"
                          label="Assignment URL"
                          type="url"
                          margin="normal"
                          style={{ width: 500 }}
                          value={createassignment.assign_url}
                          onChange={(e) =>
                            setcreateassignment({
                              ...createassignment,
                              assign_url: e.target.value,
                            })
                          }
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>

                  <CardFooter>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button color="primary" onClick={assignmentcreate}>
                        Add Assignment
                      </Button>
                    </GridItem>
                  </CardFooter>
                </GridItem>
              </GridContainer>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </GridContainer>
      <br />

      <GridContainer>
        <Accordion
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>
              <Button color="success" round>
                New Student
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
                          value={createstudent.teacher_email}
                          onChange={(e) =>
                            setcreatestudent({
                              ...createstudent,
                              teacher_email: e.target.value,
                            })
                          }
                        />
                      </GridItem>
                      <GridItem>
                        <TextField
                          required
                          id="standard-basic"
                          label="Student Email"
                          type="email"
                          margin="normal"
                          value={createstudent.student_email}
                          onChange={(e) =>
                            setcreatestudent({
                              ...createstudent,
                              student_email: e.target.value,
                            })
                          }
                          style={{ width: 500 }}
                        />
                      </GridItem>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <GridItem>
                        <TextField
                          required
                          id="standard-basic"
                          label="Classroom ID"
                          type="number"
                          margin="normal"
                          style={{ width: 500 }}
                          value={createstudent.classroom_id}
                          onChange={(e) =>
                            setcreatestudent({
                              ...createstudent,
                              classroom_id: e.target.value,
                            })
                          }
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>

                  <CardFooter>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button color="primary" onClick={studentcreate}>
                        Add Student
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
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Tasks:"
            headerColor="info"
            tabs={[
              {
                tabName: "Assignments / Materials",
                tabIcon: Assignment,
                tabContent: (
                  <span>
                    {assignments.map((assignment) => (
                      <SnackbarContent
                        message={
                          <span>
                            Assignment Name: {assignment.title}
                            <br />
                            <br />
                            Assignment URL:{" "}
                            <a target="_blank" href={assignment.assign_url}>
                              {assignment.assign_url}
                            </a>
                            <br />
                            <br />
                            Date added: {assignment.date.substring(0, 10)}
                          </span>
                        }
                      />
                    ))}
                  </span>
                ),
              },
              {
                tabName: "Students",
                tabIcon: Face,
                tabContent: (
                  <span>
                    {students.map((student) => (
                      <SnackbarContent
                        message={
                          <span>
                            Student Name: {student.student_name}
                            <br />
                            <br />
                            Student Email: {student.student_email}
                            <br />
                            <br />
                            Student Phone: {student.student_phone_no}
                          </span>
                        }
                      />
                    ))}
                  </span>
                ),
              },
              {
                tabName: "Marks",
                tabIcon: Assesment,
                tabContent: (
                  <span>
                    {marks.map((mark) => (
                      <SnackbarContent
                        message={
                          <span>
                            Total Marks: {mark.total_marks}
                            <br />
                            <br />
                            Obtained Marks: {mark.mark_obtain}
                            <br />
                            <br />
                            Date added: {mark.assignment_date.substring(0, 10)}
                          </span>
                        }
                      />
                    ))}
                  </span>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
