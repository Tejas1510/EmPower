import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Time Table</h4>
            <p className={classes.cardCategoryWhite}>
              Class Wise Time table (format: class-section (subject) | Time)
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Day\\Time",
                "10:00 - 10:45",
                "11:00 - 11:45",
                "11:45 - 12:30",
                "12:30 - 01:15",
                "01:30 - 02:15"
              ]}
              tableData={[
                ["Monday", "Maths", "Science", "Break", "English","Hindi"],
                ["Tuesday", "English", "Maths", "Break", "Science","Hindi"],
                ["Wednesday", "Maths", "English", "Break", "Science","Hindi"],
                ["Thurday", "Science", "English", "Break", "CST353","Maths"],
                ["Friday", "English", "Maths", "Break", "Hindi","Science"],
                ["Saturday", "Hindi", "Science", "Break", "Maths","English"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
