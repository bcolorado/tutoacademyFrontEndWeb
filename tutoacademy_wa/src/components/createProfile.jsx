import * as React from 'react';
import "../styles/createProfile.css"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import { CREATE_PROFILE_MUTATION ,TEST} from '../utilities/graphQl';
import {useMutation} from '@apollo/client';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();



export function CreateProfile() {

  const authUser=useAuthUser();
  const navigate = useNavigate();
  const user=authUser();

  const [createProfile, { data, loading, error }] = useMutation(CREATE_PROFILE_MUTATION);

  const [country, setCountry] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [degree, setDegree] = React.useState('');
  
  const date = new Date();

  


  const handleSubmit = (event) => {
    console.log(TEST);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = handleCreateProfile(data);
    console.log(result);
    navigate('/home');

  };

  const handleCreateProfile = (formData) => {
    try {
      const isoDateString = date.toISOString();
      const fullname= formData.get('name')+ ' ' +formData.get('lastName');
      const result = createProfile({
        variables: {
          userID: user.email,
          fullname: fullname,
          gender: formData.get('gender'),
          birthdate: formData.get('birthday'),
          nationality: formData.get('country'),
          degree: formData.get('degree'),
          description: formData.get('description'),
          creationdate: isoDateString,
          profilestatus: true,
          skills: null,
          schedule: null
        }
      });
      return result
    } catch (e) {
      return e
    }
  };


  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleChangeDegree = (event) => {
    setDegree(event.target.value);
  };

  return (
    <div className='main'>
    <ThemeProvider  theme={theme}>
      <Container   maxWidth="xs" style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F09E00",width:60, height:60}}>
            <PersonPinIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear perfil
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  type='text'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="description"
                  label="Descripción"
                  name="description"
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="genrer">Genero*</InputLabel>
                <Select
                    required
                    labelId='genrer'
                    id="gender"
                    name='gender'
                    value={gender}
                    onChange={handleChange}
                    sx={{ minWidth: 300 }}
                    >
                    <MenuItem value={"male"}>Masculino</MenuItem>
                    <MenuItem value={"female"}>Femenino</MenuItem>
                    <MenuItem value={"other"}>Otro</MenuItem>
                </Select>
              </Grid>

              
            <Grid item xs={12}>
                <label className='calendarLabel'>Fecha de nacimiento* </label>
                <input name='birthday' required className='calendar' type="date" />
                
            </Grid>

            <Grid sx={{mt:1}} item xs={12}>

              <CountryDropdown
                name='country'
                required
                classes='country-selector'
                defaultOptionLabel='Selecciona un país *'
                value={country}
                onChange={(val) => setCountry(val)} />

            </Grid>


            <Grid sx={{mt:2}} item xs={12}>
                <InputLabel id="degree">Grado*</InputLabel>
                <Select
                    required
                    labelId='degree'
                    name='degree'
                    id="degree"
                    value={degree}
                    onChange={handleChangeDegree}
                    sx={{ minWidth: 300 }}
                    >
                    <MenuItem value={"Primaria"}>Primaria</MenuItem>
                    <MenuItem value={"Secundaria"}>Secundaria</MenuItem>
                    <MenuItem value={"Bachiller"}>Bachiller</MenuItem>
                    <MenuItem value={"Pregrado"}>Pregrado</MenuItem>
                    <MenuItem value={"Posgrado"}>Posgrado</MenuItem>
                    <MenuItem value={"Maestria"}>Maestría o más</MenuItem>
                </Select>
              </Grid>

            </Grid>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2, fontSize: "16px" }}
              style={{ backgroundColor: "#F09E00", color: "white" }}
            >
              Crear perfil
            </Button>

            <div style={{textAlign: "center"}}>
              <Link to="/home"> 
                  <Button
                    variant="contained"
                    sx={{ mb: 2, width:"200px", alignItems:"center",fontSize: "16px" }}
                    style={{ backgroundColor: "#F09E00", color: "white" }}
                  >
                    Atrás
                  </Button>
              </Link>
            </div>

            

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default CreateProfile;