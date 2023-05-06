import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { AuthProvider } from 'react-auth-kit';




const client = new ApolloClient({
    
    uri : import.meta.env.VITE_URI_GRAPHQL,
    cache: new InMemoryCache(),

  })

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider authType={"cookie"} authName={"_auth"} cookieDomain={window.location.hostname} cookieSecure={false}>

        <ApolloProvider client={client}>

            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>  
                <App />
            </GoogleOAuthProvider>

        </ApolloProvider>

    </AuthProvider>

)
