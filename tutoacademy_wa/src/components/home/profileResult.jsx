import { Typography, Stack } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Avatar } from '@mui/material';

export function ProfileResult(props) {
  return (
    <RouterLink to={`/profile/${props.data.userID.googleId}`} style={{ textDecoration: "none", color: "black" }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ width: "35px", height: "35px" }} src={props.data.userID.imageUrl} alt={`${props.data.fullname}'s profile picture`} />
        <Typography noWrap pl="10px" maxWidth={300}>
          {props.data?.fullname}
        </Typography>
      </Stack>
    </RouterLink>
  );
}
