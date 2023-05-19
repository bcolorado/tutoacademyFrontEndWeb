
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
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


export function MeetScheduling() {

    const authUser=useAuthUser();
    const user=authUser();

    const [message, setMessage] = useState('');
    const [idStudent, setIdStudent] = useState('');
    const [scheduleDate, setScheduleDate] = useState(null);

    const handleChangeScheduleDate = (event) => {
        setScheduleDate(event._d);
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


      

      const handleCreateChat = async () => {
        console.log(scheduleDate)
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
                            id="id_student"
                            type="text"
                            value={idStudent}
                            onChange={handleChangeIdSstudent}
                            label='ID estudiante'
                        />
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
                        />
                        <Datetime value={scheduleDate} onChange={handleChangeScheduleDate} />


                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={(handleCreateChat)}>Enviar</Button>
                    </DialogActions>
                  </Dialog>
            </>

  )
 
}
export default MeetScheduling;




