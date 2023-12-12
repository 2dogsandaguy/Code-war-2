
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import Auth from '../../utils/auth'; // Import the AuthService
import './Profile.css';

const Profile = () => {

  const location = useLocation();
  const { workoutData } = location.state || {}; // Access workout data from state


  const { loading, error, data } = useQuery(GET_ME)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  console.log('graphql data 2', data)

  const { username, email, streak, personalRecords } = data.me;

  const handleLogout = () => {
    // Call the logout method from AuthService
    Auth.logout();
  };
  return (

    <div className="profile">
      <h1 className="heading">Welcome {username}!</h1>
      <p className="text">Email: {email}</p>
      {/* <p className="text">Your Streak: {streak} days</p> */}
      <p className="text">Personal Records:</p>
      <ul>
        <li>Max Weight Lifted: {workoutData?.weightAmount} Max Weight</li>
        <br />
        <li>Longest Run: {workoutData?.distance} Miles</li>
      </ul>

      {workoutData && (
        <div>
          <br/>
          <p className="text">Recently Added Workout:</p>
          {workoutData.cardioType && (
            <div>
              <p>Cardio Type: {workoutData.cardioType}</p>
              <p>Distance: {workoutData.distance}</p>
              <p>Duration: {workoutData.duration}</p>
            </div>
          )}
          {workoutData.weightType && (
            <div>
              <p>Weight Type: {workoutData.weightType}</p>
              <p>Reps: {workoutData.reps}</p>
              <p>Sets: {workoutData.sets}</p>
              <p>Weight Amount: {workoutData.weightAmount}</p>
              <p>Duration: {workoutData.duration}</p>
            </div>
          )}
        </div>
      )}
      {/* Log out button */}
      <button onClick={handleLogout}>Log Out</button>
      {/* Nav buttons */}
      <Link to="/create-workout" style={{ marginRight: '20px' }}>Create Workout Routine</Link>
      <Link to="/view-history">View Workout History</Link>
    </div>
  );
}
export default Profile;