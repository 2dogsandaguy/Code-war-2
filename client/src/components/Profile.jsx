
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

const Profile = () => {
  console.log('Rendering ProfilePage...');
  const { loading, error, data } = useQuery(GET_ME)

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  console.log('graphql data 2',data)
  
  const { username, email, streak, personalRecords } = data.me;

  console.log(username);
  console.log(email);
  console.log(streak);
  console.log(personalRecords/* .maxWeight */);
  console.log(personalRecords/* .longestRun */);

  return (

<div style={{ margin: '20px' }}>
  <h1>Welcome {username}!</h1>
  <p>Email: {email}</p>
   <p>Your Streak: {streak} days</p>
  <p>Personal Records:</p>
  <ul>
    <li>Max Weight Lifted: {personalRecords}maxWeight</li>
    <li>Longest Run: {personalRecords}longestRun</li>
  </ul>
  {/* Nav buttons */}
  <Link to="/create-workout" style={{ marginRight: '20px' }}>Create Workout Routine</Link>
  <Link to="/view-history">View Workout History</Link>
</div>

  );
};

export default Profile;