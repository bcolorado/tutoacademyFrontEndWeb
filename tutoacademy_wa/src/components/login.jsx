
import '../styles/login.css'
import logo from '../assets/logo.png'
import background from '../assets/background.png'
import { GoogleLogin} from '@react-oauth/google';
import decodeJwt from '../utilities/decodeJwt';
import {useQuery, gql, useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

export function Login() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [loginUser, { data, loading, error }] = useMutation(gql`
  mutation LoginUser(
    $googleId: String!,
    $givenName: String!,
    $familyName: String!,
    $email: String!,
    $imageUrl: String!,
    $authStatus: Boolean!
  ) {
    loginUser(user: {
      googleId: $googleId,
      givenName: $givenName,
      familyName: $familyName,
      email: $email,
      imageUrl: $imageUrl,
      authStatus: $authStatus
    }) {
      _id
      googleId
      givenName
      familyName
      email
      imageUrl
      authStatus
      createdAt
      updatedAt
    }
  }
`);
  
  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    margin:0,
    padding:0,
    height:"100vh",
    width:"100vw"
  };
  

  const responseMessage =  async (res) => {
    const credential = res.credential;
    const { payload } = decodeJwt(credential);
    // console.log(payload) // User login information
    const result = await handleLogin(payload)

    return [result,credential];

  };
  const errorMessage = (error) => {
      console.log(error);
  };
      
  const handleLogin = async (payload) => {
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

    <div style={styles}>
      
      <div className='lg-upperTitle'>
        <h2>Bienvenido a TUTO <span style={{ color: "#F09E00" }}>ACADEMY</span> </h2>
        <img src={logo} alt='logo' />
      </div>
      
      <div className='lg-title'>
        <h1>Inicio Sesión</h1>
      </div>
      <div className = "signInButton">

        

        <GoogleLogin type='standard' theme='outline' width='300px' shape='circle' text="Inicia sesión con Google" size='large' onSuccess={e => {
          responseMessage(e).then(([result, credential]) => {
            const [msResponse,userCredential]=[result, credential];
    
            signIn({
              token:userCredential,
              expiresIn: 3600,
              authState: msResponse.data.loginUser
            });
            
            navigate('/home');
          });
        }} onError={errorMessage} />

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




