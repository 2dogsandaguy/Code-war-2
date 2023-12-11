import { useQuery } from '@apollo/client';
import { VIEW_HISTORY } from '../../utils/queries'; 
import "./ViewHistory.css";

const ViewHistory = () => {
  const { loading, error, data } = useQuery(VIEW_HISTORY);

  console.log('history', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching history: {error.message}</p>;

  const cardio = data.me.cardioRoutines;
  const weights = data.me.weightRoutines;

  return (
    <div className="history-container">
      <h1>Workout History</h1>
      <h2>Cardio Routines</h2>
      {cardio && cardio.map(item => (
        <div key={item._id}>
          <p>Cardio Type: {item.cardio_type}</p>
          <p>Created At: {item.createdAt}</p>
          <p>Distance: {item.distance}</p>
        </div>
      ))}
      <h2>Weight Routines</h2>
      {weights && weights.map(item => (
        <div key={item._id}>
          <p>Weight Type: {item.weight_type}</p>
          <p>Reps: {item.reps}</p>
          <p>Sets: {item.sets}</p>
          <p>Weight Amount: {item.weight_amount}</p>
          <p>Duration: {item.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewHistory;