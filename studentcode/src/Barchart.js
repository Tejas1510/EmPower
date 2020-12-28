import React from 'react'
import { Bar } from 'react-chartjs-2';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  App: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:"white",
  },
  chart:{
    width:"300",
    backgroundColor:"white"
  }
}));

function Barchart() {
  const classes = useStyles();
    const data={
        labels :[
          'Jan',
          'Feb',
          'March',
          'April',
          'May'
        ],
        datasets:[
          {
            label:'Sales for 2020 (M)',
            data:[5,2,3,5,10],
            borderColor : ['rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)'],
            backgroundColor : ['rgba(255,204,0)','rgba(255,204,0)','rgba(255,204,0)','rgba(255,204,0)','rgba(255,204,0)'],
          }
        ]
      }
    

    return (
        <div>
            <Bar data={data}/>
        </div>
    )
}

export default Barchart
