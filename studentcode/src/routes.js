import Person from "@material-ui/icons/Person";
import Class from "@material-ui/icons/Class";
import ViewList from "@material-ui/icons/ViewList";

import HomePage from "views/HomePage/HomePage"; 
import InClass from "views/InClass/InClass";
import StudentProfile from "views/StudentProfile/StudentProfile.js";
import TimeTable from "views/TimeTable/TimeTable.js";

const dashboardRoutes = [
  {
    path: "/homepage",
    name: "Home",
    icon: Class,
    component: HomePage,
    layout: "/admin",
  },
  {
    path: "/inclass",
    name: "Inside Class",
    icon: ViewList,
    component: InClass,
    layout: "/admin",
    headerShown: false,
  },
  {
    path: "/user",
    name: "Student Profile",
    icon: Person,
    component: StudentProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Time Table",
    icon: "content_paste",
    component: TimeTable,
    layout: "/admin",
  },
];

export default dashboardRoutes;
