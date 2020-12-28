import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  TextField,
  Icon,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import { bake_cookie, read_cookie } from "sfcookies";

const useStyles = makeStyles(styles);

export default function Classes(props) {
  const teacheremail = read_cookie("teacheremail");
  const teacherkey = read_cookie("teacherkey");

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    displayClasses();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const classrooms = useState({
    email: teacheremail,
    key: teacherkey,
    user: "teacher",
  });

  const [classdata, setclassdata] = useState([]);

  const displayClasses = async () => {
    axios
      .post(`https://learnzilla.herokuapp.com/classroom/`, classrooms[0])
      .then((res) => {
        setclassdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [createclassroom, setcreateclassroom] = useState({
    teacher_email: teacheremail,
    standard: "",
    section: "",
    subject: "",
    key: teacherkey,
  });

  const classCreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://learnzilla.herokuapp.com/classroom/create/",
        createclassroom
      )
      .then((response) => {
        handleClose();
        displayClasses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openclass = (classid) => {
    
    props.history.push({
      pathname: `/admin/inclass`,
      state: {
        classroomid: classid,
      },
    });
  };

  return (
    <div>
      <GridContainer>
        <Button
          color="success"
          round
          onClick={handleClickOpen}
        >
          Create Class
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Create Class"}</DialogTitle>
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
                      key="section"
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
                  <GridItem>
                    <TextField
                      required
                      key="subject"
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
                </GridItem>
              </GridContainer>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={classCreate} autoFocus round>
              Create Class
            </Button>
          </DialogActions>
        </Dialog>
      </GridContainer>

      <GridContainer>
        {classdata.map((classsitem) => (
          <GridItem xs={12} sm={6} md={3}>
            <Card
              style={{ cursor: "pointer" }}
              onClick={() => openclass(classsitem.classroom_id)}
            >
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>assignment_ind</Icon>
                </CardIcon>
                <h3 className={classes.cardTitle}>
                  {classsitem.standard} - {classsitem.section}
                </h3>

                <p className={classes.cardTitle}>{classsitem.subject}</p>
              </CardHeader>

              <CardFooter stats>
                <p className={classes.cardTitle}>
                  Total Student: {classsitem.strength}
                </p>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer>

      <Button style={{width:80,height:80,borderRadius:100,float:"right",MarginTop:50}} href="https://chatapplicationtejas.netlify.app" variant="contained" color="primary">
          <Icon style={{size:140}}>message</Icon>
      </Button>
    </div>
  );
}
