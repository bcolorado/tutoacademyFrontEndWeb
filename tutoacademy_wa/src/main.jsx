import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { AuthProvider } from 'react-auth-kit';

const client = new ApolloClient({
    
    uri : 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),

  })

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider authType={"cookie"} authName={"_auth"} cookieDomain={window.location.hostname} cookieSecure={false}>

        <ApolloProvider client={client}>

            <GoogleOAuthProvider clientId="830084715628-r33sl239q6ssf3mqo7emvirn8jfh5sje.apps.googleusercontent.com">  
                <App />
            </GoogleOAuthProvider>

        </ApolloProvider>

    </AuthProvider>
)
