
import VerticalNav from './home/verticalNav'
import HorizontalNav from './home/horizontalNav'
import { useAuthUser } from 'react-auth-kit';
import { GET_PROFILE_QUERY  } from '../utilities/graphql';
import {useQuery, useMutation,gql} from '@apollo/client';

export function Profile() {

  
  return (
  <>   
    <div>HOLAAA</div>
  </>
  );
}

export default Profile;