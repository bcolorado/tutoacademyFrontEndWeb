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
import { GET_PROFILE_QUERY, GET_CHAT_USER } from '../utilities/graphQl';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import GradeIcon from '@mui/icons-material/Grade';
import EmailIcon from '@mui/icons-material/Email';
import {GET_ALLSERVICES_QUERY, CREATE_SERVICE_MUTATION} from '../utilities/graphQl';
import {Service} from './service';
import BookIcon from '@mui/icons-material/Book';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {ProfileChat} from './chat/profileChat';
import {MeetScheduling} from './meetScheduling'
import { NewtonsCradle } from '@uiball/loaders'



const mdTheme = createTheme();

export function Profile() {




    //Get the authenticated user info
    const authUser=useAuthUser();
    const user=authUser();
    const { id } = useParams();
    const location = useLocation();

    //Calling the query to verify if the profile is created
    const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
      variables: { id: id },
    });

    
  
    //Calling the query to verify if there is a service
    const { data: data2, loading: loading2, error: error2, refetch } = useQuery(
      GET_ALLSERVICES_QUERY
    );

    const { data:data3, loading:loading3, error:error3 } = useQuery(GET_CHAT_USER, {
      variables: { name: id },
    });





    let found = false;
    let itemDescription="";
    const [idProfileService, setIdProfileService] = useState(true);
    let  chatCoincidence=true;

    useEffect(() => {
      refetch();
      if(id==user.googleId){
        setIdProfileService(true)
          
      }else{
        setIdProfileService(false)

      }
      
    }, [location.pathname ]);

  
    if (loading || loading2 || loading3) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <NewtonsCradle size={80} speed={0.8} color="black" />
        </div>
      );
    }
    if (error || error2) return <p>Error :</p>;
     

    // Check if the current profile have a chat with me

    data3?.getChatUser?.map((item) => {
      if (item.receiver.userID.googleId==user.googleId || item.sender.userID.googleId==user.googleId) {
        chatCoincidence=false
      }
    });


    
    // Check if the current profile have a service

    data2.allServices.map((item) => {
      if (item.serviceState==true) {
        if (item.idProfile.userID.googleId === data.getProfile.userID.googleId) {
          console.log(`Encontrado: ${item.idService}`);
          console.log(item.description);
          found = true;
          itemDescription=item.description;
        }

      }
    });


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
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px', mr:80 }}>Descripción </Typography>
                          
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

                {
                  idProfileService ? (
                    <>
                      {found == false ? (
                        <Service data={data} />
                      ) : (
                        <>
                          <Box display="flex" alignItems="center">
                            <BookIcon fontSize="large" />
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px' }}>Descripción de tutorias </Typography>
                          </Box>
                          <Divider sx={{ mt: 2, mb: 2 }} />
                          <Typography variant="subtitle1" sx={{ marginLeft: '40px' }}>{itemDescription}</Typography>
                        </>
                      )}
                    </>
                  ) : <>
                  {found == false ? (
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px' }}>Este perfil no es tutor. </Typography>
                  ) : (
                    <>
                      <Box display="flex" alignItems="center">
                        <BookIcon fontSize="large" />
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ marginLeft: '12px' }}>Descripción de tutorias </Typography>
                      </Box>
                      <Divider sx={{ mt: 2, mb: 2 }} />
                      <Typography variant="subtitle1" sx={{ marginLeft: '40px' }}>{itemDescription}</Typography>
                    </>
                  )}
                </>
                }
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

                  {
                    
                    !idProfileService && chatCoincidence? <ProfileChat receiver={id}/>:<></>
                    
                  }

                  <Typography variant='subtitle1' sx={{mt:12}}>
                    {!idProfileService && found? <MeetScheduling/>:<></> }
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