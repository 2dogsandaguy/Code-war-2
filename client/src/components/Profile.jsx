import { useState } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import { useQuery , useMutation  } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { SET_GOALS } from '../../utils/mutations'; 
import Auth from '../../utils/auth'; // Import the AuthService
import './Profile.css';
import profileImg from '../../../public/images/one-punch.webp'

// ... (your existing imports)

const Profile = () => {
  const location = useLocation();
  const { workoutData } = location.state || {};
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  
  
  const { loading, error, data } = useQuery(GET_ME);
  const [setGoalsMutation] = useMutation(SET_GOALS);
  const [goalForm, setGoalForm] = useState({
    weightLossGoal: '',
    bodyFatGoal: '',
    fastestMileGoal: '',
    personalRecordGoal: '',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalForm({
      ...goalForm,
      [name]: value,
    });
  };

  const handleGoalSubmission = async (e) => {
    e.preventDefault();
    console.log("Submitting goals...");
    try {
      const { data } = await setGoalsMutation({
        variables: goalForm,
        refetchQueries: [{ query: GET_ME }],
      });
      console.log("Goals set successfully:", data);
    } catch (mutationError) {
      console.error('Error setting goals:', mutationError);

      if (mutationError.graphQLErrors) {
        mutationError.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(`GraphQL Error: ${message}`, { locations, path });
        });
      }

      if (mutationError.networkError) {
        console.error('Network Error:', mutationError.networkError);
      }
    }

    setGoalForm({
      weightLossGoal: '',
      bodyFatGoal: '',
      fastestMileGoal: '',
      personalRecordGoal: '',
    });
    setShowUpdateForm(false);
  };

  const { username, email, setGoals } = data.me;
  const userGoals = setGoals && setGoals[0];

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <div
      className="create-container"
      style={{
        backgroundImage: `url(${profileImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        /* overflow: 'hidden', */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        Height: '100vh',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      <div className="content-container">
        <div className="profile">
          <h1 className="heading">Welcome {username}!</h1>
          <p className="text">Email: {email}</p>
          <div className="goal-form">
            <div className='outline'>
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
              <Link
                to="/create-workout"
                style={{
                  backgroundColor: '#fff',
                  padding: '10px 5px 10px 5px',
                  borderStyle: 'solid',
                  borderRadius: '10px',
                  margin: '5px 0 5px 0',
                }}
              >
                Create Workout Routine
              </Link>
              <Link
                to="/view-history"
                style={{
                  backgroundColor: '#fff',
                  padding: '10px 5px 10px 5px',
                  borderStyle: 'solid',
                  borderRadius: '10px',
                  marginBottom: '5px',
                }}
              >
                View Workout History
              </Link>
              <button className="logout" onClick={handleLogout}>
                <span>Log Out</span>
              </button>
              {userGoals ? (
                <div className='outline'>
                  <p className="text">Your Goals:</p>
                  <ul>
                    <li>Weight Loss Goal: {userGoals.weightLossGoal}</li>
                    <li>Body Fat Goal: {userGoals.bodyFatGoal}</li>
                    <li>Fastest Mile Goal: {userGoals.fastestMileGoal}</li>
                    <li>Personal Record Goal: {userGoals.personalRecordGoal}</li>
                  </ul>
                  <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
                    {showUpdateForm ? 'Cancel Update' : 'Update Goals'}
                  </button>
                  {showUpdateForm && (
                    <form onSubmit={handleGoalSubmission}>
                      {/* Your form input fields and submit button go here */}
                      <label>
                        Updated Weight Loss Goal:
                        <input
                          type="text"
                          name="weightLossGoal"
                          value={goalForm.weightLossGoal}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                      Body Fat Goal:
                      <input
                        type="text"
                        name="bodyFatGoal"
                        value={goalForm.bodyFatGoal}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Fastest Mile Goal:
                      <input
                        type="text"
                        name="fastestMileGoal"
                        value={goalForm.fastestMileGoal}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Personal Record Goal:
                      <input
                        type="text"
                        name="personalRecordGoal"
                        value={goalForm.personalRecordGoal}
                        onChange={handleInputChange}
                      />
                    </label>
                      {/* Add similar fields for other goals */}
                      <button type="submit">Update Goals</button>
                    </form>
                  )}
                </div>
              ) : (
                <div className='outline set-goals'>
                  <h2>Set Your Goals In development coming soon... </h2>
                  <form onSubmit={handleGoalSubmission}>
                    <label>
                      Weight Loss Goal:
                      <input
                        type="text"
                        name="weightLossGoal"
                        value={goalForm.weightLossGoal}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Body Fat Goal:
                      <input
                        type="text"
                        name="bodyFatGoal"
                        value={goalForm.bodyFatGoal}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Fastest Mile Goal:
                      <input
                        type="text"
                        name="fastestMileGoal"
                        value={goalForm.fastestMileGoal}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Personal Record Goal:
                      <input
                        type="text"
                        name="personalRecordGoal"
                        value={goalForm.personalRecordGoal}
                        onChange={handleInputChange}
                      />
                    </label>
                    <button type="submit">Set Goals</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
