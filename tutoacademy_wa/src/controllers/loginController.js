import {useQuery, gql} from '@apollo/client';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';


export const loginController = {};

const client = new ApolloClient({
    uri : 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  })


  loginController.getUsersQuery= async (req, res) =>  {
    const query = gql`
      query {
        getUsers {
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
    `;

    const {data} = await useQuery(query);

    console.log(JSON.stringify(data));
  }



  

