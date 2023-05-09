
import '../styles/login.css'
import logo from '../assets/logo.png'
import { GoogleLogin, useGoogleLogin} from '@react-oauth/google';
import {useQuery, useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import { SIGNUP_MUTATION } from '../utilities/graphQl';
import googleIcon from '../assets/googleIcon.png'
import axios from 'axios';
import { useState,useEffect } from 'react';

export function Login() {

  const [ user, setUser ] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  //Call navigate and SignIn hook
  const navigate = useNavigate();
  const signIn = useSignIn();

  //Declare the mutation that registers the Google account that is logging into the app
  const [loginUser, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const login = useGoogleLogin({
    //Google response with acces token
    onSuccess: (codeResponse) => {setUser(codeResponse)},
    onError: (error) => console.log('Login Failed:', error)
  });


  useEffect(() => {

    //callin google api to get the user info 
    if (!isFirstRender && user) {
      // console.log(user.access_token);
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        }).then(async (res) => {
          //whether obtain the info, then call the mutation to auth the user in the ms
          const result = await handleLogin(res.data);
          //Signin using the react hook with the user info
          signIn({token:user.access_token, expiresIn: 3600, authState: result.data.loginUser});
          navigate('/home');
          // console.log(result.data.loginUser)
        })
        .catch((err) => console.log(err));
    } else {
      setIsFirstRender(false);
    }
  }, [user]);
  



  //use the mutation    
  const handleLogin = async (payload) => {
    if (!payload.family_name){payload.family_name = " "}
    try {
      const result = await loginUser({
        variables: {
          googleId:payload.email,
          givenName:payload.given_name,
          familyName:payload.family_name,
          email: payload.email,
          imageUrl:payload.picture,
          authStatus: true
        },
      });
      return result
    } catch (e) {
      return e
    }
  };


  return (

    <div className='main'>
      
      <div className='lg-upperTitle'>
        <h2>Bienvenido a TUTO <span style={{ color: "#F09E00" }}>ACADEMY</span> </h2>
        <img src={logo} alt='logo' />
      </div>
      
      <div className='lg-title'>
        <h1>Iniciar Sesión</h1>
      </div>

      <div className = "signInButton">

        <button className="lg-button" onClick={() => login()}>
          <img src={googleIcon} alt='googleIcon' />
            Iniciar sesión con &nbsp; <span style={{ color: "#F09E00" }}>Google</span>
        </button> 
      </div>

      <div className='lg-description'>
        <p>¡Bienvenido! Me alegra que estés interesado en conocer más sobre <br />
          Tuto academy web de tutorías académicas. <br /> <br />
          Nuestro sistema de tutorías académicas en línea es la solución perfecta <br />
          para aquellos que buscan mejorar sus habilidades académicas <br />de manera eficiente y personalizada.</p>
      </div>
    </div>

  )
 
}
export default Login;




