import React,{ useState , useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { read_cookie } from "sfcookies";

function Linechart() {
  
  const studentid = read_cookie("studentid");
  const[chartdata,setChartdata]=useState({});

  const charts = () =>{

    let studentMark=[];
    let AssignmentTitle=[];
    axios
    
      .get(
        `https://learnzilla.herokuapp.com/classroom/viewmarks/studentid/${studentid}/`
      )
      .then((response) => {
        console.log(response.data)
        for(const dataobj of response.data){
          studentMark.push(parseInt(dataobj.mark_obtain));
          AssignmentTitle.push(dataobj.assignment_title);
        }
        setChartdata({
          labels :AssignmentTitle,
          datasets:[
            {
              label:"Assignment Marks",
              data:studentMark,
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
            <Line data={chartdata} options={{
              responsive:true,
            }} />
        </div>
    )
}

export default Linechart
