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
`