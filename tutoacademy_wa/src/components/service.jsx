
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import * as React from 'react';
import {CREATE_SERVICE_MUTATION} from '../utilities/graphQl';
import { useMutation } from '@apollo/client';

export function Service(props) {

    const [description, setDescription] = useState('');

    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };
  
      const [open, setOpen] = React.useState(false);
  
      const handleClickOpen = () => {
        setOpen(true);
      };
  
      const handleClose = () => {
        setOpen(false);
      };

      const [createService, { loading:loading3, error: error3, data: data3 }] = useMutation(CREATE_SERVICE_MUTATION);
      
    const handleCreateService = () => {

        try {
          createService({
            variables: {
              idProfile:props.data.getProfile.userID.googleId,
              description:description,
              serviceState:true,
            },
          });
          setOpen(false);
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
                      width: '50%', 
                      backgroundColor: 'rgba(240, 158, 0, 0.7)', 
                      color: '#000000', 
                      height: '15%', 
                      fontWeight:'bold', 
                      fontSize:15,
                      alignSelf:'center',
                      marginTop: '17%'
                    }}>
                    ¿Quieres convertirte en tutor?
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Describe tus servicios de tutorias</DialogTitle>
                    <DialogContent>
                      <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        type="text"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleChangeDescription}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={(handleCreateService)}>Enviar</Button>
                    </DialogActions>
                  </Dialog>
            </>

  )
 
}
export default Service;




