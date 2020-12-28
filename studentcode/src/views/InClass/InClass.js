import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Assignment from "@material-ui/icons/Assignment";
import Assesment from "@material-ui/icons/Assessment";
import Face from "@material-ui/icons/Face";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { bake_cookie, read_cookie } from "sfcookies";
import Linechart from 'Linechart';
import Doughnut from 'Doughnut';


export default function InClass(props) {
  const classid = JSON.stringify(props.history.location.state.classroomid);
  bake_cookie("classid",classid);
  const studentemail = read_cookie("studentemail");
  const studentkey = read_cookie("studentkey");
  const studentid = read_cookie("studentid");
  const [assignments, setassignments] = useState([]);

  const getAssignments = async () => {
    axios
      .get(
        `https://learnzilla.herokuapp.com/classroom/viewassignments/${classid}/`
      )
      .then((response) => {
        setassignments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [students, setstudents] = useState([]);

  const studentdata = useState({
    email: studentemail,
    key: studentkey,
  });

  const getStudents = async () => {
    axios
      .post(
        `https://learnzilla.herokuapp.com/classroom/viewstudents/${classid}/`,
        studentdata[0]
      )
      .then((response) => {
        setstudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [marks, setmarks] = useState([]);

  const getmarks = async () => {
    axios
      .get(
        `https://learnzilla.herokuapp.com/classroom/viewmarks/studentid/${studentid}/`
      )
      .then((response) => {
        setmarks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [attendances, setattendances] = useState([]);

  const getattendances = async () => {
    axios
      .get(
        `https://learnzilla.herokuapp.com/classroom/viewattendance/${classid}/${studentid}`
      )
      .then((response) => {
        console.log(response)
        setattendances(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStudents();
    getAssignments();
    getmarks();
    getattendances();
    // eslint-disable-next-line
  }, [props.history.location.state]);

  return (
    <div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="info"
            tabs={[
              {
                tabName: "Assignments / Materials",
                tabIcon: Assignment,
                tabContent: (
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Date Added</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {assignment.title}
                          </TableCell>
                          <TableCell>
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={assignment.assign_url}
                            >
                              {assignment.assign_url}
                            </a>
                          </TableCell>
                          <TableCell>
                            {assignment.date.substring(0, 10)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ),
              },
              {
                tabName: "Marks",
                tabIcon: Assesment,
                tabContent: (
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Assignment Name</TableCell>
                        <TableCell>Marks Obtained</TableCell>
                        <TableCell>Total Marks</TableCell>
                        <TableCell>Assignment Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {marks.map((mark) => (
                        <TableRow>
                          <TableCell>{mark.assignment_title}</TableCell>
                          <TableCell>{mark.mark_obtain}</TableCell>
                          <TableCell component="th" scope="row">
                            {mark.total_marks}
                          </TableCell>
                          <TableCell>
                            {mark.assignment_date.substring(0, 10)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ),
              },
              {
                tabName: "Attendance",
                tabIcon: CheckCircleOutline,
                tabContent: (
                  

                  <GridContainer
                  justify="center">
                    <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendances.map((attendance) => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {attendance.name}
                          </TableCell>
                          <TableCell>{attendance.date}</TableCell>
                          <TableCell>{attendance.attendance_status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                     <GridItem xs={12} sm={12} md={8} align="center" style={{margin:"30px",padding:"20px"}}>
                        
                        <Doughnut/>
                        
                        
                    </GridItem>
                    </GridContainer>
                  
                ),
              },
              {
                tabName: "Students",
                tabIcon: Face,
                tabContent: (
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {student.student_name}
                          </TableCell>
                          <TableCell>{student.student_email}</TableCell>
                          <TableCell>{student.student_phone_no}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ),
              },
              {
                tabName: "Progress",
                tabIcon: Face,
                tabContent: (
                  <GridContainer
                  justify="center"
                    >
                     <GridItem xs={12} sm={12} md={8} align="center">
                        <Linechart/>
                    </GridItem>
                    </GridContainer>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>

      <GridItem></GridItem>
    </div>
  );
}
