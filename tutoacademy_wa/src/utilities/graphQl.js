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

export const CREATE_PROFILE_MUTATION = gql`
mutation CreateProfile(
  $userID: String!,
  $fullname: String!,
  $gender: String!,
  $birthdate: String!,
  $nationality: String!,
  $degree: String!,
  $description: String!,
  $creationdate: String!,
  $profilestatus: Boolean!,
  $skills: [skillsSchemaInput],
  $schedule: [scheduleSchemaInput]
) {
  createProfile(profile: {
    userID: $userID,
    fullname: $fullname,
    gender:  $gender,
    birthdate: $birthdate,
    nationality: $nationality,
    degree: $degree,
    description: $description,
    creationdate: $creationdate,
    profilestatus: $profilestatus,
    skills: $skills,
    schedule: $schedule
  })
}
`;


export const GET_ALLSERVICES_QUERY = gql`
  {
    allServices {
      idService
      idProfile {
        userID {
          googleId

        }
    
        fullname
        gender
        birthdate
        nationality
        degree
        description
        creationdate
        profilestatus
      }
      description
      serviceState
    }
  }
`;


export const GET_CHAT_USER = gql`
  query GetChatUser($name: String!) {
    getChatUser(name: $name) {
      chatId
      sender {
        fullname
        userID {
          googleId
          imageUrl
        }
      }
      receiver {
        fullname
        userID {
          googleId
          imageUrl
        }
      }
      messages {
        messageId
        sender {
          fullname
          userID {
            googleId
            imageUrl
          }
        }
        body
        sendTime
      }
      state
      createTime
    }
  }
`;

export const ADDMESSAGE_CHAT_USER = gql`
mutation AddMessage(
  $sender: String!,
  $receiver: String!,
  $messages: [messageSchemaInput]!,
)
{
  addMessage(chat: {
    sender: $sender,
    receiver: $receiver,
    messages:  $messages
  })
}
`;

export const CREATE_CHAT_USER = gql`
mutation CreateChat(
  $sender: String!,
  $receiver: String!,
  $messages: [messageSchemaInput]!,
)
{
  createChat(chat: {
    sender: $sender,
    receiver: $receiver,
    messages:  $messages
  })
}
`;



export const CREATE_SERVICE_MUTATION = gql`
  mutation CreateService(
    $idProfile: String!,
    $description: String!, 
    $serviceState: Boolean!) {

    createService(service: { 

      idProfile: $idProfile, 
      description: $description, 
      serviceState: $serviceState
     }) 
  }
`;


export const CREATE_REQUEST_MUTATION = gql`
  mutation CreateRequest($user_req: String!, $tutor: String!, $message: String!, $scheduled_time: String!, $accepted: String!) {
    createRequest(request: {
      user_req: $user_req
      tutor: $tutor
      message: $message
      scheduled_time: $scheduled_time
      accepted: $accepted
    })
  }
`;

export const GET_ALLREQUESTS_QUERY = gql`
query GetAllRequests {
  allRequests {
    id
    user_req {
      fullname
      userID {
        googleId
        imageUrl
      }
    }
    tutor {
      fullname
        userID {
          googleId
          imageUrl
        }
    }
    message
    scheduled_time
    accepted
  }
}
`;

export const DELETE_REQUEST_MUTATION = gql`
mutation DeleteRequest($id:Int!) {
  deleteRequest(id: $id) 
}
`;

export const TEST="Hola baby ";