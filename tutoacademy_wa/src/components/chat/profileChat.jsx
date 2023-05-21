
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
import {ADDMESSAGE_CHAT_USER, CREATE_CHAT_USER} from '../../utilities/graphQl'

export function ProfileChat(props) {

    const authUser=useAuthUser();
    const user=authUser();

    const [message, setMessage] = useState('');

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

      const [CreateChat, { data, loading, error }] = useMutation(CREATE_CHAT_USER);
      

      const handleCreateChat = async () => {
        let msgF = [{
            sender: user.googleId,
            body: message
        }]
        try{
          const result = await CreateChat({
            variables: {
              sender: user.googleId,
              receiver: props.receiver,
              messages: msgF
            }
          });
          setOpen(false);
        } catch (e) {
          console.log(e)
        }
        // console.log(message)
        // console.log(props.receiver)
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
                      height: '5%', 
                      fontWeight:'bold', 
                      fontSize:13,
                      alignSelf:'center',
                      marginTop: '2%'
                    }}>
                    Contactar
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Envía un primer mensaje para crear un chat</DialogTitle>
                    <DialogContent>
                      <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        id="message"
                        type="text"
                        multiline
                        rows={4}
                        value={message}
                        onChange={handleChangeMessage}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={(handleCreateChat)}>Enviar</Button>
                    </DialogActions>
                  </Dialog>
            </>

  )
 
}
export default ProfileChat;




