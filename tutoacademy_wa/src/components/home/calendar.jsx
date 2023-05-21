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
import { useQuery } from '@apollo/client';
import {GET_ALLREQUESTS_QUERY} from '../../utilities/graphQl'
import {getDateCalendar} from '../../utilities/getDateToCalendar';
import { useAuthUser } from "react-auth-kit";


export function Calendar(){

  const authUser=useAuthUser();
  const user=authUser();

  const { data, loading, error } = useQuery(GET_ALLREQUESTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;


  var MyRequests=[];
  data.allRequests.map((item) => {
    if (item.user_req.userID.googleId == user.googleId || item.tutor.userID.googleId == user.googleId ) {
      const [start,end]=getDateCalendar(item.scheduled_time)
      MyRequests.push({ startDate: start, endDate: end, title: item.message });
    }
  });

  console.log(MyRequests);


  return (
  <Paper sx={{ width: "70vw" , height: "60vh" }}>
    <Scheduler height={"60vh"} data={MyRequests}>
      <WeekView  startDayHour={9} endDayHour={19} />
      <Appointments/>
      <AppointmentTooltip />
    </Scheduler>
  </Paper>
  );
};

export default Calendar;