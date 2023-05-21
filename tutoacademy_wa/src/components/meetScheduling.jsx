
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useAuthUser } from 'react-auth-kit';
import { useParams } from 'react-router-dom';
import "react-datetime/css/react-datetime.css";
import {getDayOfWeek} from '../utilities/getDayOfWeek'
import {CREATE_REQUEST_MUTATION} from '../utilities/graphQl';


export function MeetScheduling() {

    const [createRequest, { loading, error }] = useMutation(CREATE_REQUEST_MUTATION);

    //current date
    var today = new Date();

    
    // Obtener los componentes de la fecha (año, mes, día)
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');

    // Construir la fecha en el formato requerido (AAAA-MM-DD)
    var formattedDate = year + '-' + month + '-' + day;


    // Establecer el valor mínimo y máximo para la semana actual
    var firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    var lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    // Formatear las fechas en el formato requerido (AAAA-MM-DD)
    var minDate = firstDayOfWeek.toISOString().split('T')[0];
    var maxDate = lastDayOfWeek.toISOString().split('T')[0];


    const authUser=useAuthUser();
    const user=authUser();
    const { id } = useParams();

    const [message, setMessage] = useState('');
    const [scheduleDate, setScheduleDate] = useState(formattedDate);
    const [scheduleInitialTime, setscheduleInitialTime] = useState('');
    const [scheduleFinalTime, setscheduleFinalTime] = useState('');

    const handleChangeScheduleDate = (event) => {
        setScheduleDate(event.target.value);
    };

    const handleChangeInitialTime = (event) => {
      setscheduleInitialTime(event.target.value);

    };
    const handleChangeFinalTime = (event) => {
      setscheduleFinalTime(event.target.value);
    };

    const handleChangeIdSstudent = (event) => {
        setIdStudent(event.target.value);
    };

    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    };
  
      const [open, setOpen] = React.useState(false);
  
      const handleClickOpen = () => {
        setOpen(true);
      };
  
      const handleClose = () => {
        setOpen(false);
      };



      const handleCreateMeeting = async () => {
        const dayOfWeek = getDayOfWeek(scheduleDate);
        const meetingDate = dayOfWeek+', '+scheduleInitialTime+" - "+scheduleFinalTime;

        try {
          const result = await createRequest({
            variables: {
              user_req: user.googleId,
              tutor: id,
              message: message,
              scheduled_time: meetingDate,
              accepted: "true"
            },
          });
          setOpen(false);
          window.location.reload();
          return result
        } catch (e) {
          return e
        }
      };





  return (

            <>
                  <Button 
                    variant="contained" 
                    onClick={handleClickOpen} 
                    style={{ 
                      width: '100%', 
                      backgroundColor: 'rgba(240, 158, 0, 0.7)', 
                      color: '#000000', 
                      height: '100%', 
                      fontWeight:'bold', 
                      fontSize:13,
                      alignSelf:'center',
                      marginTop: '2%'
                    }}>
                    Agendar cita
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Agenda una cita para una tutoria</DialogTitle>
                    <DialogContent>

                        <TextField
                            fullWidth
                            margin="dense"
                            id="message"
                            type="text"
                            multiline
                            rows={4}
                            value={message}
                            onChange={handleChangeMessage}
                            label='Descripción cita'
                            required
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth:'150px' }}>
                              <input
                                type="date"
                                value={scheduleDate}
                                onChange={handleChangeScheduleDate}
                                min={minDate}
                                max={maxDate}
                                style={{ marginTop: '10px' }}
                                required
                              />

                              <input
                                type="time"
                                min="09:00"
                                max="19:00"
                                value={scheduleInitialTime}
                                onChange={handleChangeInitialTime}
                                style={{ marginTop: '10px' }}
                                required
                              />

                              <input
                                type="time"
                                min="09:00"
                                max="19:00"
                                value={scheduleFinalTime}
                                onChange={handleChangeFinalTime}
                                style={{ marginTop: '10px' }}
                                required
                              />
                            </div>



                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={(handleCreateMeeting)}>Enviar</Button>
                    </DialogActions>
                  </Dialog>
            </>

  )
 
}
export default MeetScheduling;




