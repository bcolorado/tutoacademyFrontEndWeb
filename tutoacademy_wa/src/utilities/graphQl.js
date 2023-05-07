import {gql} from '@apollo/client';

export const SIGNUP_MUTATION=gql`
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
`;

export const GET_PROFILE_QUERY =gql`
  query GetProfile($id: String!) {
    getProfile(id: $id) {
      userID {
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
      fullname
      gender
      birthdate
      nationality
      degree
      description
      creationdate
      profilestatus
      skills {
        skillname
        score
      }
      schedule {
        day
        hours
      }
    }
  }
`;

export const FIND_PROFILE_QUERY =gql`
  query FindProfiles($value: String!) {
    findProfiles(value: $value) {
      userID {
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
      fullname
      gender
      birthdate
      nationality
      degree
      description
      creationdate
      profilestatus
      skills {
        skillname
        score
      }
      schedule {
        day
        hours
      }
    }
  }
`;


export const TEST="Hola baby ";