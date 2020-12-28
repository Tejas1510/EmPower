import React,{useState} from 'react';
import axios from 'axios';
import {Container,AppBar, Typography, Grid, Grow ,Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useStyles from './style';
import { read_cookie,  } from "sfcookies";
export default function EmailSender(props){

    const classid = read_cookie('classid')
    const teacheremail = read_cookie("teacheremail");
    const teacherkey = read_cookie("teacherkey");
    const classes=useStyles();

    const height =64;
    

    const [mail, setmail] = useState({
        email:teacheremail,
        key:teacherkey,
        message:''
      });


    const sendMail = (e) => {
        e.preventDefault();
        console.log(classid)
        axios
          .post(`http://learnzilla.herokuapp.com/classroom/sendmails/${classid}`, mail)
          .then((response) => {
            console.log("Mail Send")
          })
          .catch((error) => {
            console.log(error);
          });
      };


    return(
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h4" align="center">Email Sender</Typography>
            </AppBar>

            <textarea  placeholder="Please Enter a Mail to send...." rows="15" cols="100" className={classes.textArea}
            value={mail.message}
            onChange={(e) =>
              setmail({ ...mail, message: e.target.value })
            }>
                {/* Please Enter a Mail to send */}
            </textarea>

            {/* <TextField
            className={classes.textfeild}
            style={{height}}
            required
            id="outlined-required"
            label="Required"
            defaultValue="Please enter a message"
            variant="outlined"
        /> */}

            <Button onClick={sendMail} className={classes.button} variant="contained" color="primary">
                 Send Email
            </Button>
        </Container>
    );
}

