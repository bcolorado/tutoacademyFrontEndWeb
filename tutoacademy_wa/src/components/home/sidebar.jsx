import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import '../../styles/sidebar.css'

export function Sidebar() {
  return (
    <>
        <div className='home-sidebar'>
            <List>
            <ListItem button key="Home">
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="About">
                <ListItemText primary="About" />
            </ListItem>
            <ListItem button key="Contact">
                <ListItemText primary="Contact" />
            </ListItem>
            </List>
        </div>
    </>
  );
}
export default Sidebar;