
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '../../utils/queries'; 

const Profile = () => {
  console.log('Rendering ProfilePage...');
  const { loading, error, data } = useQuery(GET_USER_DATA)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  const { user, streak, personalRecords } = data.getUserData;
  console.log(user.name);
  console.log(user.email);
  console.log(streak);
  console.log(personalRecords.maxWeight);
  console.log(personalRecords.longestRun);

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Your Streak: {streak} days</p>
      <p>Personal Records:</p>
      <ul>
        <li>Max Weight Lifted: {personalRecords.maxWeight}</li>
        <li>Longest Run: {personalRecords.longestRun}</li>
      </ul>
      {/* Nav buttons */}
      <Link to="/create-workout">Create Workout Routine</Link>
      <Link to="/view-history">View Workout History</Link>
    </div>
  );
};

export default Profile;
