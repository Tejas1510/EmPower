import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  TextField,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
  Divider,
} from "@material-ui/core";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core/";

import Assignment from "@material-ui/icons/Assignment";
import Face from "@material-ui/icons/Face";
import Assesment from "@material-ui/icons/Assessment";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Button from "components/CustomButtons/Button.js";
import { read_cookie,bake_cookie } from "sfcookies";

export default function InClass(props) {
  const classid = JSON.stringify(props.history.location.state.classroomid);
  bake_cookie('classid',classid);
  console.log(classid)

  const teacheremail = read_cookie("teacheremail");
  const teacherkey = read_cookie("teacherkey");

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

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

  const teacherdata = useState({
    email: teacheremail,
    key: teacherkey,
  });

  const getStudents = async () => {
    axios
      .post(
        `https://learnzilla.herokuapp.com/classroom/viewstudents/${classid}/`,
        teacherdata[0]
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
        `https://learnzilla.herokuapp.com/classroom/viewmarks/classroomid/${classid}/`
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
        `https://learnzilla.herokuapp.com/classroom/viewattendance/${classid}`
      )
      .then((response) => {
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

  // same for assignment/ material
  const [createassignment, setcreateassignment] = useState({
    title: "",
    teacher_email: teacheremail,
    classroom_id: classid,
    assign_url: "",
    key: teacherkey,
  });

  const assignmentcreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://learnzilla.herokuapp.com/classroom/create-new-assign/",
        createassignment
      )
      .then((response) => {
        setcreateassignment({
          title: "",
          teacher_email: teacheremail,
          classroom_id: classid,
          assign_url: "",
          key: teacherkey,
        });
        handleClose();
        getAssignments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [createstudent, setcreatestudent] = useState({
    teacher_email: teacheremail,
    classroom_id: classid,
    student_email: "",
    key: teacherkey,
  });

  const studentcreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://learnzilla.herokuapp.com/classroom/addstudent/",
        createstudent
      )
      .then((response) => {
        handleClose1();
        getStudents();
        setcreatestudent({
          teacher_email: teacheremail,
          classroom_id: classid,
          student_email: "",
          key: teacherkey,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var attendancelist = [];

  const markpresent = (stuid) => {
    const templist = attendancelist.concat({
      student_id: stuid,
      classroom_id: classid,
      attendance: 1,
    });

    attendancelist = templist;
    studentattendance.list = attendancelist;
    setstudentattendance(studentattendance);
  };

  const markabsent = (stuid) => {
    const templistattendance = attendancelist.concat({
      student_id: stuid,
      classroom_id: classid,
      attendance: 0,
    });

    attendancelist = templistattendance;
    studentattendance.list = attendancelist;
    setstudentattendance(studentattendance);
  };

  const [studentattendance, setstudentattendance] = useState({
    email: teacheremail,
    key: teacherkey,
    list: attendancelist,
  });

  const addattendance = () => {
    axios
      .post(
        "https://learnzilla.herokuapp.com/classroom/markattendance/",
        studentattendance
      )
      .then((res) => {
        getattendances();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var markslist = [];

  const [obmarks, setobmarks] = useState();
  const [totmarks, settotmarks] = useState();
  const [studid, setstudid] = useState();

  const updatemarks = (assignid) => {
    const templistmarks = markslist.concat({
      assignment_id: assignid,
      student_id: studid,
      marksobtain: obmarks,
      totalmarks: totmarks,
    });

    markslist = templistmarks;
    studentmarks.list = markslist;
    setstudentmarks(studentmarks);
  };

  const [studentmarks, setstudentmarks] = useState({
    email: teacheremail,
    key: teacherkey,
    list: markslist,
  });

  const addmarks = () => {
    axios
      .post(
        "https://learnzilla.herokuapp.com/classroom/addmarks/",
        studentmarks
      )
      .then((res) => {
        getmarks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <GridContainer style={{ textAlign: "center" }}>
        <GridItem xs={12} sm={12} md={12}>
          <Button
            color="success"
            round
            onClick={handleClickOpen}
            style={{ marginRight: "10px"}}
          >
            New Assignment/ Material
          </Button>
          <Button
            color="success"
            round
            onClick={handleClickOpen1}
            // style={{ float: "right", marginRight: "10%" }}
          >
            Add Student
          </Button>
        </GridItem>
      </GridContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"New Assignment / Material"}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Teacher Email"
                    type="email"
                    margin="normal"
                    style={{ width: 500 }}
                    value={read_cookie("teacheremail")}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Classroom ID"
                    type="number"
                    margin="normal"
                    value={classid}
                    style={{ width: 500 }}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    multiline
                    required
                    label="Assignment Name"
                    type="text"
                    margin="normal"
                    value={createassignment.title}
                    onChange={(e) =>
                      setcreateassignment({
                        ...createassignment,
                        title: e.target.value,
                      })
                    }
                    style={{ width: 500 }}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    multiline
                    required
                    label="Assignment URL with http://"
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
              </GridItem>
            </GridContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={assignmentcreate} autoFocus round>
            Add Assignment/ Material
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>{"Add Student"}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Teacher Email"
                    type="email"
                    margin="normal"
                    style={{ width: 500 }}
                    value={read_cookie("teacheremail")}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    required
                    disabled="true"
                    label="Classroom ID"
                    type="number"
                    margin="normal"
                    style={{ width: 500 }}
                    value={classid}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    required
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
              </GridItem>
            </GridContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={studentcreate} autoFocus round>
            Add Student
          </Button>
        </DialogActions>
      </Dialog>

      <br />
      <GridContainer style={{ textAlign: "center" }}>
        <GridItem xs={12} sm={12} md={12}>
          <Button color="warning" round onClick={addmarks}>
            Add Marks of the Class
          </Button>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="info"
            tabs={[
              {
                tabName: "Assignments / Materials",
                tabIcon: Assignment,
                tabContent: (
                  <Table
                    aria-label="simple table"
                    style={{ tableLayout: "fixed" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Date Added</TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          Update Marks
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow>
                          <TableCell>
                            {assignment.title}
                            <br />
                            <TextField
                              required
                              label="Student ID"
                              type="number"
                              margin="normal"
                              value={studid}
                              onChange={(e) => setstudid(e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={assignment.assign_url}
                            >
                              {assignment.assign_url}
                            </a>
                            <br />
                            <TextField
                              required
                              label="Marks Obtained"
                              type="number"
                              margin="normal"
                              value={obmarks}
                              onChange={(e) => setobmarks(e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            {assignment.date.substring(0, 10)}
                            <br />
                            <TextField
                              required
                              label="Total Marks"
                              type="number"
                              margin="normal"
                              value={totmarks}
                              onChange={(e) => settotmarks(e.target.value)}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <Button
                              color="success"
                              onClick={() => updatemarks(assignment.id)}
                              round
                              size="sm"
                            >
                              Update
                            </Button>
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
                  <Table
                    aria-label="simple table"
                    style={{ tableLayout: "fixed" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Assignment Name</TableCell>
                        <TableCell>Marks</TableCell>
                        <TableCell>Assignment Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {marks.map((mark) => (
                        <TableRow>
                          <TableCell>{mark.student_name}</TableCell>
                          <TableCell>{mark.assignment_title}</TableCell>
                          <TableCell>
                            {mark.mark_obtain}/{mark.total_marks}
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
            ]}
          />
        </GridItem>
      </GridContainer>

      <GridContainer style={{ textAlign: "center" }}>
        <GridItem xs={12} sm={12} md={12}>
          <Button color="warning" round onClick={addattendance}>
            Mark Attendance for class
          </Button>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            style={{ widht: "20%" }}
            headerColor="info"
            tabs={[
              {
                tabName: "Students",
                tabIcon: Face,
                tabContent: (
                  <Table
                    aria-label="simple table"
                    style={{ tableLayout: "fixed" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          Attendance (only once )
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow>
                          <TableCell>{student.student_id}</TableCell>
                          <TableCell>{student.student_name}</TableCell>
                          <TableCell>{student.student_email}</TableCell>
                          <TableCell>{student.student_phone_no}</TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <Button
                              color="success"
                              round
                              size="sm"
                              onClick={() => markpresent(student.student_id)}
                            >
                              Present
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                              color="danger"
                              round
                              size="sm"
                              onClick={() => markabsent(student.student_id)}
                            >
                              Absent
                            </Button>
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
                  <Table
                    aria-label="simple table"
                    style={{ tableLayout: "fixed" }}
                  >
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
                          <TableCell>{attendance.name}</TableCell>
                          <TableCell>{attendance.date}</TableCell>
                          <TableCell>{attendance.attendance_status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
