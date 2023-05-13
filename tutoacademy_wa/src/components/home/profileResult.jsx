import { Typography, Stack } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";
import { Avatar } from '@mui/material';

export function ProfileResult(props) {

    return (
        <Link to={`/profile/${props.data.userID.googleId}`} style={{ color: "black" }}>
            <Stack direction="row" spacing={1} maxWidth={300}>
                <Avatar sx={{ width: "35px", height: "35px" }} src={props.data.userID.imageUrl} alt={`${props.data.fullname}'s profile picture`}></Avatar>
                <Typography noWrap pl="10px" maxWidth={200}>
                    {props.data?.fullname}
                </Typography>
            </Stack>
        </Link>
    )
}
