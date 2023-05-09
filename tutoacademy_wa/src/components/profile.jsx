import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import HorizontalNav from "./home/horizontalNav"
import VerticalNav from './home/verticalNav';

const mdTheme = createTheme();

export function Profile() {

  return (
    <ThemeProvider theme={mdTheme}>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <VerticalNav/>
          <HorizontalNav/>
          
          <Container maxWidth="lg" sx={{ mt: 12, mb: 4, mr:27}}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    HOLA
                </Paper>

                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400, mt:3 }}>
                  HOLA 3
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    height: 663,
                  }}
                >
                  HOLA 2
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default  Profile;