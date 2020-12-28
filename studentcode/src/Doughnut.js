import React,{ useState , useEffect, useContext} from 'react'
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { read_cookie } from "sfcookies";


function Doughnutchart() {
    const classid = read_cookie("classid");
    const studentid = read_cookie("studentid");
    const[chartdata,setChartdata]=useState({});
  
    const charts = () =>{
  
      let present=[];
      let absent=[];
      let ab=0;
      let pr=0;
      axios
        .get(
            `https://learnzilla.herokuapp.com/classroom/viewattendance/${classid}/${studentid}`
        )
        .then((response) => {
            console.log(response)
          for(const dataobj of response.data){
            if(dataobj.attendance_status==="Absent"){
                ab=ab+1;
            }
            else{
                pr=pr+1
            }
          }
          console.log(ab,pr)
          setChartdata({
            labels :[
                'Present',
                'Absent'
              ],
            datasets:[
              {
                label:"Attendance Summary",
                data:[pr,ab],
                borderColor : ['rgba(255,206,86,0.2)'],
                backgroundColor : ['rgba(255,204,0)'],
                pointBackgroundColor : ['rgba(0,206,86,0.2)'],
                pointBorderColor : ['rgba(255,206,86,0.2)'],
              }
            ]
          });
        })
        .catch((error) => {
          console.log(error);
        });
  
    };
  
    useEffect(() =>{
      charts();
    },[])


    return (
        <div>
            <Doughnut data={chartdata}/>
        </div>
    )
}

export default Doughnutchart
