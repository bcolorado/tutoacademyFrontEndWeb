import * as React from "react";
import Paper from "@mui/material/Paper";
import 'animate.css';
import {
  Scheduler,
  WeekView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";

export function Calendar(){
  return (
  <Paper sx={{ width: "70vw" , height: "60vh" }}>
    <Scheduler height={"60vh"}>
      <WeekView startDayHour={9} endDayHour={19} />
      <Appointments />
    </Scheduler>
  </Paper>
  );
};

export default Calendar;