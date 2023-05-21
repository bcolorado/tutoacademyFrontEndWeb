import React from 'react';
import VerticalNav from '../home/verticalNav';
import HorizontalNav from '../home/horizontalNav';
import { GET_ALLREQUESTS_QUERY } from '../../utilities/graphQl';
import { useQuery } from '@apollo/client';
import { useAuthUser } from 'react-auth-kit';
import Avatar from '@material-ui/core/Avatar';
import { DELETE_REQUEST_MUTATION } from '../../utilities/graphQl';
import { useMutation } from '@apollo/client';
import { NewtonsCradle } from '@uiball/loaders'
import logo from '../../assets/logo.png';
export function Meetings() {
  const authUser = useAuthUser();
  const user = authUser();
  const { data, loading, error } = useQuery(GET_ALLREQUESTS_QUERY);
  const [deleteRequest, { data: data1, loading: loading1, error: error1 }] = useMutation(DELETE_REQUEST_MUTATION);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <NewtonsCradle size={80} speed={0.8} color="black" />
      </div>
    );
  }
  if (error) return <p>Error :</p>;

  const myRequests = data.allRequests.filter(
    item =>
      item.user_req.userID.googleId === user.googleId ||
      item.tutor.userID.googleId === user.googleId
  );

  const handleDeleteRequest = requestId => {
    deleteRequest({ variables: { id: parseInt(requestId) } })
      .then(response => {
        console.log('Solicitud eliminada:', requestId);
        window.location.reload(); // Recargar la página después de eliminar la solicitud
      })
      .catch(error => {
        console.log('Error al eliminar la solicitud:', error);
      });
  };

  if (myRequests.length === 0) {
    return (
      <div>
        <VerticalNav />
        <HorizontalNav />
        <div style={{ overflowY: 'auto', maxHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', fontSize: '50px'}}>
          <p>No tienes reuniones agendadas</p>
          <img src={logo} alt="Logo" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <VerticalNav />
      <HorizontalNav />

      <div style={{ overflowY: 'auto', maxHeight: '85vh' }}>
        {myRequests.map(request => (
          <div
            key={request.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '10px',
              border: '1px solid #e0e0e0',
              padding: '10px',
              marginLeft: '300px',
              position: 'relative', // Agregado para posicionar correctamente el botón de eliminar
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '10px',
                alignItems: 'center',
              }}
            >
              <h2>Tutor</h2>
              <Avatar
                style={{ width: '60px', height: '60px' }}
                src={request.tutor.userID.imageUrl}
                alt={`${request.tutor.fullname}'s profile picture`}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2>Estudiante</h2>
              <Avatar
                style={{ width: '60px', height: '60px' }}
                src={request.user_req.userID.imageUrl}
                alt={`${request.user_req.fullname}'s profile picture`}
              />
            </div>
            <div style={{ marginLeft: '100px' }}>
              <h2>Solicitud de reunión</h2>
              <p>
                <strong>Estudiante:</strong> {request.user_req.fullname}
              </p>
              <p>
                <strong>Tutor:</strong> {request.tutor.fullname}
              </p>
              <p>
                <strong>Descripción:</strong> {request.message}
              </p>
              <p>
                <strong>Horario:</strong> {request.scheduled_time}
              </p>
              <button
                onClick={() => handleDeleteRequest(request.id)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#F09E00',
                  color: 'black',
                  borderRadius: '5px',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meetings;
