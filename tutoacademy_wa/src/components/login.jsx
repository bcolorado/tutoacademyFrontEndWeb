
import '../styles/login.css'
import logo from '../assets/logo.png'
import background from '../assets/background.png'
import googleIcon from '../assets/googleIcon.png'
import { GoogleLogin} from '@react-oauth/google';
import decodeJwt from '../utilities/decodeJwt';
import {loginController} from '../controllers/loginController'
import {useQuery, gql, useMutation} from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Graphql1(props) {

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


  const { payload } = props;
  const { email, given_name, family_name, picture } = payload;

  const [googleId, setGoogleId] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [authStatus, setAuthStatus] = useState(true);

  useEffect(() => {
    setGoogleId(email);
    setGivenName(given_name);
    setFamilyName(family_name);
    setImageUrl(picture);
    handleLogin();
  }, [email, given_name, family_name, picture]);

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          googleId,
          givenName,
          familyName,
          email: googleId,
          imageUrl,
          authStatus
        },
      });
      
      console.log("Esta es la información")
      console.log(result);
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
  };

  

}




export function Login() {
  
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
  
  const [googleLoginResponse, setGoogleLoginResponse] = useState(null);

  const responseMessage =  (res) => {
    console.log("Login success",res)
    const { payload } = decodeJwt(res.credential);
    console.log("payload credential", payload);
    setGoogleLoginResponse(payload);

  };
  const errorMessage = (error) => {
      console.log(error);
  };
      

  return (

    <div style={styles}>
      
      <div className='lg-upperTitle'>
        <h2>Bienvenido a TUTO <span style={{ color: "#F09E00" }}>ACADEMY</span> </h2>
        <img src={logo} alt='logo' />
      </div>
      
      <div className='lg-title'>
        <h1>Inicio Sesión</h1>
          
          {/* <button className="lg-button" onClick={responseMessage}>
            <img src={googleIcon} alt='googleIcon' />
              Iniciar sesión con &nbsp; <span style={{ color: "#F09E00" }}>Google</span>
          </button> */}
      </div>
      <div className = "signInButton">

        <GoogleLogin type='standard' theme='outline' width='300px' shape='circle' text="Inicia sesión con Google" size='large' onSuccess={responseMessage} onError={errorMessage} />

      </div>

      {googleLoginResponse ? <Graphql1 payload={googleLoginResponse} /> : null}

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




