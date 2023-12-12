// ViewHistory.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { VIEW_HISTORY } from '../../utils/queries';
import bgImage from '../../../public/images/viewHistorytrail.jpg';

import "./ViewHistory.css";

const ViewHistory = () => {
  const { loading, error, data } = useQuery(VIEW_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching history: {error.message}</p>;

  const cardio = data.me.cardioRoutines;
  const weights = data.me.weightRoutines;

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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHistory;
