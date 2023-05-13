import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react'
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useAuthUser } from 'react-auth-kit';
import moment from 'moment';

export function MsgProfile(props) {

    const authUser=useAuthUser();
    const user=authUser();
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

    const classes = useStyles();

    return (
        <List className={classes.messageArea}>
            {props.data.map((data) => {
                if(data.sender.userID.googleId == user.googleId){
                    return (
                        <ListItem key={data.messageId}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary={data.body}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary={moment(data.sendTime).format('MMMM Do YYYY, h:mm a')}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )
                }
                else{
                    return (
                    <ListItem key={data.messageId}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary={data.body}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary={moment(data.sendTime).format('MMMM Do YYYY, h:mm a')}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    )
                }
            })}
    </List>
    )
}
