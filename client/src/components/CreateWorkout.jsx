import './createworkout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import WorkoutImg from '../../../public/images/strength-training-vs-cardio.png';
import { CREATE_CARDIO } from '../../utils/mutations';
import { CREATE_WEIGHTS } from '../../utils/mutations';
import { VIEW_HISTORY, GET_ME } from '../../utils/queries';

function CreateWorkout() {
  const [showCardioList, setShowCardioList] = useState(false);
  const [showWeightsList, setShowWeightsList] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [distance, setDistance] = useState('');
  const [weightKind, setWeightKind] = useState('');
  const [weightDuration, setWeightDuration] = useState('');
  const [cardioType, setCardioType] = useState('');
  const [duration, setDuration] = useState('');
  const [distanceType, setDistanceType] = useState('');
  const [durationType, setDurationType] = useState('');
  /*  const [weight, setWeight] = useState(''); // Add weight state */
  const [weiDuration, setWeiDuration] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weightAmount, setWeightAmount] = useState('');
  const [weightType, setWeightType] = useState('');

  const [cardioPersonalRecord, setCardioPersonalRecord] = useState(null);
  const [weightsPersonalRecord, setWeightsPersonalRecord] = useState(null);
  // Use the useMutation hook here
  const [createCardio] = useMutation(CREATE_CARDIO, {
    refetchQueries: [
      { query: VIEW_HISTORY },
      { query: GET_ME },
    ]
  });
  const [createWeights] = useMutation(CREATE_WEIGHTS, {
    refetchQueries: [
      { query: VIEW_HISTORY },
      { query: GET_ME },
    ]
  });

  const handleCreateCardio = async () => {
    try {
      const { data } = await createCardio({
        variables: {
          cardio_type: cardioType,
          distanceType: distanceType,
          distance: parseFloat(distance),
          durationType: durationType,
          duration: parseInt(duration),
        },
      });

      console.log('Cardio created successfully:', data.createCardio);
    // Update personal record if applicable
    if (!cardioPersonalRecord || parseFloat(distance) > cardioPersonalRecord.distance) {
      setCardioPersonalRecord({
        cardioType,
        distance: parseFloat(distance),
        duration: parseInt(duration),
      });
    }
  } catch (error) {
    console.error('Error creating cardio:', error);
  }
};

  const handleCreateWeights = async () => {
    try {
      const { data } = await createWeights({
        variables: {
          weiDuration: parseInt(weiDuration), // Convert to integer if necessary
          weightDuration: weightDuration,
          reps: parseInt(reps),
          sets: parseInt(sets),
          weight_amount: parseInt(weightAmount),
          weight_type: weightType,
          weightKind: weightKind,
        },
      });

      console.log('Weights created successfully:', data.createWeights);
    // Update personal record if applicable
    if (!weightsPersonalRecord || parseInt(weightAmount) > weightsPersonalRecord.weightAmount) {
      setWeightsPersonalRecord({
        weightType,
        reps: parseInt(reps),
        sets: parseInt(sets),
        weightAmount: parseInt(weightAmount),
        weightKind,
        weightDuration,
        weiDuration,
      });
    }
  } catch (error) {
    console.error('Error creating cardio/weights:', error.message);
  }
};

  // Define handleRepsChange and similar functions for other weight-related state variables
  const handleRepsChange = (event) => {
    const newReps = event.target.value;
    console.log('Reps changed:', newReps);
    setReps(newReps);
  };



  const handleCardioClick = () => {
    setShowCardioList(true);
    setShowWeightsList(false);
    setShowInput(true);
    setCardioType("Running");
    setDistanceType("Miles");
    setDurationType("minutes");
  };

  const handleWeightsClick = () => {
    setShowWeightsList(true);
    setShowCardioList(false);
    setShowInput(true);
    setWeightType("Overhead Press");
    setWeightDuration("Seconds");
    setWeightKind("Pounds (lb)")
  };

  const navigate = useNavigate();

  const handleSaveClick = async () => {
    setShowInput(false);

    let workoutData = null;

    if (showCardioList) {
      if (!cardioType) {
        console.error('Cardio type is required.');
        return;
      }
      await handleCreateCardio();
      workoutData = {
        cardioType,
        distanceType,
        distance,
        durationType,
        duration,
      };
    } else if (showWeightsList) {
      await handleCreateWeights();
      workoutData = {
        weightType,
        reps,
        sets,
        weightAmount,
        weightKind,
        weightDuration,
        weiDuration, // if we need duration is common for both cardio and weights
      };
    }

    // Navigate to the profile page with the workout data
    navigate('/profile', {
      state: {
        workoutData,
      },
    });
  };


  const handleDistanceChange = (event) => {
    const newDistance = event.target.value;
    console.log('Distance changed:', newDistance);
    setDistance(parseFloat(newDistance)); // Convert the distance to a float
  };

  return (
    <>

      <header className="header">
        <Link to="/profile">Back to Profile</Link>
      </header>
      <div className="create-container" style={{
        backgroundImage: `url(${WorkoutImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative'
      }}>

        <div className="box-container">
          <div>
            {!showInput &&
              <div className="box" onClick={handleCardioClick}>
                <h2>Cardio</h2>
              </div>
            }
            {showCardioList && showInput &&
              <div className="cardio-list">
                <select onChange={(e) => {
                  console.log('Cardio type selected:', e.target.value);
                  setCardioType(e.target.value);
                }}>
                  <option value="Running">Run</option>
                  <option value="Walking">Walk</option>
                  <option value="Stair Master">Stair Master</option>
                  <option value="Biking">Bike</option>
                </select>
                <div>distance</div>
                <input type="text"
                  placeholder="Enter distance"
                  onChange={handleDistanceChange}
                />
                <select onChange={(e) => {
                  console.log('distance type selected:', e.target.value);
                  setDistanceType(e.target.value);
                }}>
                  <option value="Miles">Miles</option>
                  <option value="Km">Km</option>
                  <option value="Steps">Steps</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter duration (in minutes)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                /> <select onChange={(e) => {
                  console.log('duration type selected:', e.target.value);
                  setDurationType(e.target.value);
                }}>
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option>
                  <option value="Seconds">Seconds</option>
                  <option value="Days">Days</option>
                </select>

                <button onClick={handleSaveClick}>Save</button>
              </div>
            }
          </div>
          <div>
            {!showInput &&
              <div className="box" onClick={handleWeightsClick}>
                <h2>Weights</h2>
              </div>
            }
            {showWeightsList && showInput && (
              <div className="weights-list">
                <select onChange={(e) => setWeightType(e.target.value)}>
                  <option value="Overhead Press">Overhead Press</option>
                  <option value="Lunges">Lunge</option>
                  <option value="Curls">Curls</option>
                  <option value="Squats">Squats</option>
                  <option value="Hammer Curls">Hammer Curls</option>
                  <option value="Bench press">Bench Press</option>
                </select>
                {/* Add input fields for each parameter in createWeights mutation */}
                <input
                  type="text"
                  placeholder="Enter duration"
                  value={weiDuration}
                  onChange={(e) => setWeiDuration(e.target.value)}
                />
                <select onChange={(e) => {
                  console.log('weight duration type selected:', e.target.value);
                  setWeightDuration(e.target.value);
                }}>
                  <option value="Seconds">Seconds</option>
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                  <option value="N/A">N/A</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter reps"
                  onChange={handleRepsChange}
                />
                <input
                  type="text"
                  placeholder="Enter sets"
                  onChange={(e) => setSets(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter weight amount"
                  onChange={(e) => setWeightAmount(e.target.value)}
                />
                <select onChange={(e) => {
                  console.log('duration type selected:', e.target.value);
                  setWeightKind(e.target.value);
                }}>
                  <option value="Pounds (lb)">Pounds (lb)</option>
                  <option value="Kilograms (kg)">Kilograms (kg)</option>
                  <option value="Ounces (oz)">Ounces (oz)</option>
                  <option value="Other">Other</option>
                </select>


                <button onClick={handleSaveClick}>Save</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  );
}



export default CreateWorkout