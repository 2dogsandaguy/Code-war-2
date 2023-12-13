
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import Auth from '../../utils/auth'; // Import the AuthService
import './Profile.css';
import profileImg from '../../../public/images/profile_image.jpg'
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
    <div className="create-container" style={{
      backgroundImage: `url(${profileImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      position: 'relative'
    }}>
    <div className="content-container">
      <div className="profile">
        <h1 className="heading">Welcome {username}!</h1>
        <p className="text">Email: {email}</p>
        <div className='outline'>
          {/* <p className="text">Your Streak: {streak} days</p> */}
          <p className="text">Personal Records:</p>
          <ul>
            <li>Max Weight Lifted: {workoutData?.weightAmount} Max Weight</li>
            <br />
            <li>Longest Run: {workoutData?.distance} Miles</li>
          </ul>
        </div>
        {workoutData && (
          <div className='outline'>
            <p className="text">Recently Added Workout:</p>
            {workoutData.cardioType && (
              <div>
                <p>Cardio Type: {workoutData.cardioType}</p>
                <p>Distance: {workoutData.distance} {workoutData.distanceType} </p>
                <p>Duration: {workoutData.duration} {workoutData.durationType} </p>
              </div>
            )}
            {workoutData.weightType && (
              <div>
                <p>Weight Type: {workoutData.weightType}</p>
                <p>Reps: {workoutData.reps}</p>
                <p>Sets: {workoutData.sets}</p>
                <p>Weight Amount: {workoutData.weightAmount} {workoutData.weightKind}</p>
                <p>Duration: {workoutData.weiDuration} {workoutData.weightDuration}</p>
              </div>
            )}
          </div>
        )}
        <div className="links">
          {/* Nav buttons */}
          <Link to="/create-workout" style={{ padding: '10px 5px 10px 5px', borderStyle: 'solid', borderRadius: '10px', margin: '5px 0 5px 0' }}>Create Workout Routine</Link>
          <Link to="/view-history" style={{ padding: '10px 5px 10px 5px', borderStyle: 'solid', borderRadius: '10px', marginBottom: '5px' }}>View Workout History</Link>
          {/* Log out button */}
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div></div>
  );
}
export default Profile;