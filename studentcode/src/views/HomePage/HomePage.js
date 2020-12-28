import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import { read_cookie } from "sfcookies";

export default function Classes(props) {
  const studentemail = read_cookie("studentemail");
  const studentkey = read_cookie("studentkey");

  useEffect(() => {
    displayClasses();
    // eslint-disable-next-line
  }, []);

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const classrooms = useState({
    email: studentemail,
    key: studentkey,
    user: "student",
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
                  {classsitem.teacher_name} - {classsitem.teacher_email}
                </p>
                
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
