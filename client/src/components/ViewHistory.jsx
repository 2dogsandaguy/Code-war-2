// ViewHistory.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { VIEW_HISTORY } from '../../utils/queries'; // Assuming you have a DELETE_WEIGHT mutation
import { DELETE_WEIGHT, DELETE_CARDIO } from '../../utils/mutations';

import bgImage from '../../../public/images/viewHistorytrail.jpg';

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

<
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


  return (
    <>
      <header className="header">
        <Link to="/profile">Back to Profile</Link>
      </header>
      <div className="history-container">
        <h1>Workout History</h1>

        <div className="history-columns">
          <div className="history-column">
            <h2>Cardio Routines</h2>
            {cardio && cardio.map(item => (
              <div key={item._id} className="history-item">
                <p>Cardio Type: {item.cardio_type}</p>
                <p>Created At: {item.createdAt}</p>
                <p>Distance: {item.distance}</p>
                <button onClick={() => handleDeleteCardioRoutine(item._id)}>Delete</button>
              </div>
            ))}
          </div>
          <div className="history-column">
            <h2>Weight Routines</h2>
            {weights && weights.map(item => (
              <div key={item._id} className="history-item">
                <p>Weight Type: {item.weight_type}</p>
                <p>Reps: {item.reps}</p>
                <p>Sets: {item.sets}</p>
                <p>Weight Amount: {item.weight_amount}</p>
                <p>Duration: {item.duration}</p>
                <button onClick={() => handleDeleteWeightRoutine(item._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHistory;
