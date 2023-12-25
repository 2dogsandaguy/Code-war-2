// ViewHistory.jsx

import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { VIEW_HISTORY } from '../../utils/queries'; // Assuming you have a DELETE_WEIGHT mutation
import { DELETE_WEIGHT, DELETE_CARDIO } from '../../utils/mutations';
import Auth from '../../utils/auth';
 import skyImage from '../../../public/images/viewHistorytrail.jpg'; 

import "./ViewHistory.css";

const ViewHistory = () => {
  const { loading, error, data } = useQuery(VIEW_HISTORY);

  const [deleteWeightRoutine] = useMutation(DELETE_WEIGHT, {
    refetchQueries:[
      VIEW_HISTORY,
      'me'
    ]
  });
  const [deleteCardioRoutine] = useMutation(DELETE_CARDIO, {
    refetchQueries:[
      VIEW_HISTORY,
      'me'
    ]
  });
  console.log('history', data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching history: {error.message}</p>;

  const cardio = data.me.cardioRoutines;
  const weights = data.me.weightRoutines;

  console.log(cardio);
  console.log(weights);
  const handleDeleteCardioRoutine = async (id) => {
    try {
      const { data } = await deleteCardioRoutine({
        variables: {
          cardioRoutineId: id,
        },
      });
      console.log('Cardio routine deleted:', data);
    } catch (deleteError) {
      console.error('Error deleting cardio routine:', deleteError);
    }
  };

  const handleDeleteWeightRoutine = async (id) => {
    try {
      const { data } = await deleteWeightRoutine({
        variables: {
          weightRoutineId: id,
        },
      });
      console.log('Weight routine deleted:', data);
    } catch (deleteError) {
      console.error('Error deleting weight routine:', deleteError);
    }
  };
    
  const handleLogout = () => {
    // Call the logout method from AuthService
    Auth.logout();
  };

  return (
    <>
      <header className="header">
        <Link to="/profile">Back to Profile</Link>
        <button className='logout' onClick={handleLogout}><span>Log Out</span></button>
      </header>
       
      <div className="create-container" style={{
  backgroundImage: `url(${skyImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  position: 'relative',
  overflowY: 'auto',
}}>
      <div className="history-container">
        <h1>Workout History</h1>

        <div className="history-columns">
          <div className="history-column">
            <h2>Cardio Routines</h2>
            {cardio && cardio.map(item => {
              console.log(item);
              return (
              <div key={item._id} className="history-item">
                <p>Created At: {item.createdAt}</p>
                <p>Cardio Type: {item.cardio_type}</p>
                <p>Distance: {item.distance} {item.distanceType} </p>
                <p>Duration: {item.duration} {item.durationType}</p>
                

                <button onClick={() => handleDeleteCardioRoutine(item._id)}>Delete</button>
              </div>
              );
              })}
          </div>
          <div className="history-column">
            <h2>Weight Routines</h2>
            {weights && weights.map(item => (
              <div key={item._id} className="history-item">
                <p>Created At: {item.createdAt}</p>
                <p>Weight Type: {item.weight_type}</p>                
                <p>Reps: {item.reps}</p>
                <p>Sets: {item.sets}</p>
                <p>Weight Amount: {item.weight_amount} {item.weightKind}</p>
                <p>Duration: {item.weiDuration} {item.weightDuration}</p>
                <button onClick={() => handleDeleteWeightRoutine(item._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ViewHistory;
