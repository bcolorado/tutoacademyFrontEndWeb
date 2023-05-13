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
  const classes = useStyles();

  const [selectedProfile, setSelectedProfile] = useState(null);
  const handleProfileClick = (profile) => {
    setSelectedProfile(profile)
    console.log(profile)
  };

  const authUser=useAuthUser();
  const user=authUser();
  
  const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
      variables: { id: user.googleId },
    });

  const { data:data2, loading:loading2, error:error2 } = useQuery(GET_CHAT_USER, {
      variables: { name: user.googleId },
    });

  if (loading || loading2) return <p>Loading...</p>;
  


  return (
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
                  {data2?.getChatUser.map((data) => (
                    <ProfilesChat data={data} key={data.receiver.userID.googleId} onClick={handleProfileClick} />
                  ))}
                </List>
                
            </Grid>
            <Grid item xs={9}>
              <MsgProfile data={selectedProfile?.messages || []} />  {/* Aquí se deberia poder editar que chat ver segun donde se haga click*/} 
                <Divider />
                {selectedProfile ? (
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Escribe Algo"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        ) : null}
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;