import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@mui/icons-material/Send';
import HorizontalNav from "../home/horizontalNav"
import VerticalNav from '../home/verticalNav';
import { useAuthUser } from 'react-auth-kit';
import {GET_PROFILE_QUERY,GET_CHAT_USER} from '../../utilities/graphQl'
import { useQuery } from '@apollo/client';
import { ProfilesChat } from './profiles';
import { MsgProfile } from './messages';
import { useState } from 'react';
import { ADDMESSAGE_CHAT_USER } from '../../utilities/graphQl';
import {useMutation} from '@apollo/client';
import { useEffect } from 'react';
import { NewtonsCradle } from '@uiball/loaders'

const useStyles = makeStyles({

  chatSection: {
    width: '60%',
    height: '72vh',
    marginTop: '10vh',
    marginLeft: '26vw'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto'
  }
});


export function Chat()  {
  const authUser=useAuthUser();
  const user=authUser();
  const [AddMessage, { data1, loading1, error1 }] = useMutation(ADDMESSAGE_CHAT_USER);
  const classes = useStyles();
  const [messageText, setMessageText] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: user.googleId },
  });

let { data:data2, loading:loading2, error:error2, refetch} = useQuery(GET_CHAT_USER, {
    variables: { name: user.googleId },
  });

  useEffect(() => {
    refetch()
  }, [selectedProfile, messageText]);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile)
    // console.log(profile)
  };

  
  const handleSend = async (msg) => {
    if (msg === '') {
      return;
    }
  
    let receiver = '';
    if (selectedProfile.receiver.userID.googleId === user.googleId) {
      receiver = selectedProfile.sender.userID.googleId;
    } else {
      receiver = selectedProfile.receiver.userID.googleId;
    }
  
    let msgF = [
      {
        sender: user.googleId,
        body: msg,
      },
    ];
  
    try {
      const result = await AddMessage({
        variables: {
          sender: user.googleId,
          receiver: receiver,
          messages: msgF,
        },
      });
      console.log(result);
      setMessageText('');
  
      // Actualizar selectedProfile para mostrar los nuevos mensajes
      const updatedProfile = data2.getChatUser.find(
        (data) =>
          (data.receiver.userID.googleId === user.googleId && data.sender.userID.googleId === receiver) ||
          (data.receiver.userID.googleId === receiver && data.sender.userID.googleId === user.googleId)
      );
      setSelectedProfile(updatedProfile);
    } catch (e) {
      console.log(e);
    }
  };
  
  
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) { // 13 is the code for "Enter" key
      handleSend(messageText);
    }
  };

  if (loading || loading2){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <NewtonsCradle size={80} speed={0.8} color="black" />
      </div>
    );
  }
  


  const renderPage = () => {return (
      <div>

        <VerticalNav/>
        <HorizontalNav/>

        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key={data.getProfile.userID.googleId}>
                        <ListItemIcon>
                        <Avatar alt={data.getProfile.fullname} src={user.imageUrl} />
                        </ListItemIcon>
                        <ListItemText primary={data.getProfile.fullname}></ListItemText>
                    </ListItem>
                </List>

                <Divider /><Divider />

                <List>
                  {data2?.getChatUser?.map((data) => {
                      if (data.receiver.userID.googleId == user.googleId){return (<ProfilesChat data={data} key={data.sender.userID.googleId} onClick={handleProfileClick} />)}
                      else {return (<ProfilesChat data={data} key={data.receiver.userID.googleId} onClick={handleProfileClick} />)}
                  }
                  )}
                </List>
                
            </Grid>
            <Grid item xs={9}>
              <MsgProfile data={selectedProfile?.messages || []} /> 
                <Divider />
                {selectedProfile ? (
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
            <TextField
                id="outlined-basic-email"
                label="Escribe Algo"
                fullWidth
                value={messageText}
                onChange={async (e) => await setMessageText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Grid>
            <Grid item xs={1} align="right">
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => handleSend(messageText)}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        ) : null}
            </Grid>
        </Grid>
      </div>
  );}

  return renderPage()
}

export default Chat;