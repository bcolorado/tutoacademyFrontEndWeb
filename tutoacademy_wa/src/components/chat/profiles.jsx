import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export function ProfilesChat(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.data);
    }
  };

  return (
    <ListItem button key={props.data.receiver.userID.googleId} onClick={handleClick}>
      <ListItemIcon>
        <Avatar alt={props.data.receiver.fullname} src={props.data.receiver.userID.imageUrl} />
      </ListItemIcon>
      <ListItemText primary={props.data.receiver.fullname}>{props.data.receiver.fullname}</ListItemText>
    </ListItem>
  );
}
