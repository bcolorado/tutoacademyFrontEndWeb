import * as React from "react";
import Paper from "@mui/material/Paper";
import 'animate.css';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";

export function Calendar(){

  const date = new Date();
  const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
  const start = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 30, 0);
  const end = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 11, 0, 0);

  const prueba = new Date ()
  
  const schedulerData = [
    { startDate: start, endDate: end, title: 'Meeting' },
  ];

  console.log(schedulerData)

  return (
  <Paper sx={{ width: "70vw" , height: "60vh" }}>
    <Scheduler height={"60vh"} data={schedulerData}>
      {/* <ViewState defaultCurrentDate={fechaFormateada}/> */}
      <WeekView  startDayHour={9} endDayHour={19} />
      <Appointments/>
      <AppointmentTooltip />
    </Scheduler>
  </Paper>
  );
};

export default Calendar;