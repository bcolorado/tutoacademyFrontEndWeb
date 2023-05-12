import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import HorizontalNav from "./home/horizontalNav"
import VerticalNav from './home/verticalNav';
import { useAuthUser } from 'react-auth-kit';
import { GET_PROFILE_QUERY  } from '../utilities/graphQl';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import GradeIcon from '@mui/icons-material/Grade';
import EmailIcon from '@mui/icons-material/Email';

const mdTheme = createTheme();

export function Profile() {

    //Get the authenticated user info
    const authUser=useAuthUser();
    const user=authUser();
    const { id } = useParams();

    //Calling the query to verify if the profile is created
    const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    
    
    console.log(data.getProfile);

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
                <Paper sx={{ p: 2,display: 'flex', flexDirection: 'row', height: 240, alignItems: 'center' }}>
                  <Grid container spacing={1} alignItems="center"  sx={{mt:6}}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" sx={{mb:2}}>
                        <Grid item>
                          <DescriptionIcon  fontSize="large" />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px', mr:40 }}>Descripción </Typography>
                          
                        </Grid>
                        
                        <Grid item>
              
                          <Typography variant="subtitle1" >{data.getProfile.description}</Typography>
                        </Grid>

                      </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                    
                    <Grid
                      container
                      spacing={2}
                      
                      sx={{
                        display: 'grid',
                        gridTemplateRows: '120px 1fr',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: 2,
                      }}
                    >
                        <Grid item >
                            <Grid item sx={{ display: 'flex', flexDirection:'row' }} >
                              <FlagCircleIcon fontSize="large" />
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px' , mt: "4px" }}>Nacionalidad</Typography>
                            </Grid>
                            <Grid item sx={{ display: 'flex', flexDirection: 'column' }} >
                              <Typography variant="subtitle1">{data.getProfile.nationality}</Typography>
                            </Grid>
                        </Grid>
                        
                        <Grid item >
                            <Grid item sx={{ display: 'flex', flexDirection:'row' }} >
                              <GradeIcon fontSize="large" />
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px' , mt: "4px" }}>Grado</Typography>
                            </Grid>
                            <Grid item sx={{ display: 'flex', flexDirection: 'column' }} >
                              <Typography variant="subtitle1">{data.getProfile.degree}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item >
                            <Grid item sx={{ display: 'flex', flexDirection:'row' }} >
                              <EmailIcon fontSize="large" />
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px' , mt: "4px" }}>Correo</Typography>
                            </Grid>
                            <Grid item sx={{ display: 'flex', flexDirection: 'column' }} >
                              <Typography variant="subtitle1">{data.getProfile.userID.email}</Typography>
                            </Grid>
                        </Grid>

                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400, mt:3 }}>
                <Typography variant='subtitle1'>
                    Aquí van las habilidades
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3} >
                {/* Right side paper */}
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 663,
                    width: 300,
                    alignItems: 'center'
                  }}
                >
                  <Avatar alt="Remy Sharp" src={data.getProfile.userID.imageUrl} sx={{ width: 120, height: 120, mt:4, mb:2}}  />
                  <Typography variant='h6' fontWeight="bold">
                    {data.getProfile.fullname}
                  </Typography>

                  <Typography variant='subtitle1'>
                    {data.getProfile.gender === 'male' ? 'Masculino' : data.getProfile.gender === 'female' ? 'Femenino' : 'Otro'}
                  </Typography>

                  <Typography variant='subtitle1' sx={{mt:12}}>
                    Aquí van los horarios
                  </Typography>

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