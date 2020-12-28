/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Class from "@material-ui/icons/Class";
import ViewList from "@material-ui/icons/ViewList";

// core components/views for Admin layout
import HomePage from "views/HomePage/HomePage";
import InClass from "views/InClass/InClass";
import TeacherProfile from "views/TeacherProfile/TeacherProfile.js";
import TimeTable from "views/TimeTable/TimeTable.js";
import EmailSender from 'views/EmailSender/EmailSender.js';
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
    name: "Teacher Profile",
    icon: Person,
    component: TeacherProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Time Table",
    icon: "content_paste",
    component: TimeTable,
    layout: "/admin",
  },
  {
    path: "/email",
    name: "Email Sender",
    icon: "email",
    component: EmailSender,
    layout: "/admin",
  },
];

export default dashboardRoutes;
