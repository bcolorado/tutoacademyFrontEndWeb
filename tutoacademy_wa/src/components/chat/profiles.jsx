import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useAuthUser } from 'react-auth-kit';

export function ProfilesChat(props) {
  const authUser=useAuthUser();
  const user=authUser();
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.data);
    }
  };
  if (user.googleId == props.data.receiver.userID.googleId){
    return (
        <ListItem button key={props.data.sender.userID.googleId} onClick={handleClick}>
        <ListItemIcon>
            <Avatar alt={props.data.sender.fullname} src={props.data.sender.userID.imageUrl} />
        </ListItemIcon>
        <ListItemText primary={props.data.sender.fullname}>{props.data.sender.fullname}</ListItemText>
        </ListItem>
    );
  }
  else {
    return (
            <ListItem button key={props.data.receiver.userID.googleId} onClick={handleClick}>
            <ListItemIcon>
                <Avatar alt={props.data.receiver.fullname} src={props.data.receiver.userID.imageUrl} />
            </ListItemIcon>
            <ListItemText primary={props.data.receiver.fullname}>{props.data.receiver.fullname}</ListItemText>
            </ListItem>
        );
  }
}
