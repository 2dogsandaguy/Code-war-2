import './CreateWorkout.css';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_CARDIO } from '../../utils/mutations';  
import { CREATE_WEIGHTS } from '../../utils/mutations';

function CreateWorkout () {
    const [showCardioList, setShowCardioList] = useState(false);
    const [showWeightsList, setShowWeightsList] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [distance, setDistance] = useState('');
    
    const [cardioType, setCardioType] = useState('');
    const [duration, setDuration] = useState('');
    
    const [weight, setWeight] = useState(''); // Add weight state
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weightAmount, setWeightAmount] = useState('');
    const [weightType, setWeightType] = useState('');
     // Use the useMutation hook here
    const [createCardio] = useMutation(CREATE_CARDIO);
    const [createWeights] = useMutation(CREATE_WEIGHTS);

    const handleCreateCardio = async () => {
        try {
          const { data } = await createCardio({
            variables: {
              cardio_type: cardioType,
              distance: parseFloat(distance),
            },
          });
      
          console.log('Cardio created successfully:', data.createCardio);
        } catch (error) {
          console.error('Error creating cardio:', error);
        }
      };
      
      const handleCreateWeights = async () => {
        try {
            const { data } = await createWeights({
                variables: {
                    duration: parseInt(duration), // Convert to integer if necessary
                    reps: parseInt(reps),
                    sets: parseInt(sets),
                    weight_amount: parseInt(weightAmount),
                    weight_type: weightType,
                },
            });
    
            console.log('Weights created successfully:', data.createWeights);
        } catch (error) {
            console.error('Error creating weights:', error);
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
    };

    const handleWeightsClick = () => {
        setShowWeightsList(true);
        setShowCardioList(false);
        setShowInput(true);
    };

    const handleSaveClick = () => {
        setShowInput(false);
        // Check whether it's cardio or weights and call the appropriate handler
        if (showCardioList) {
          handleCreateCardio();
        } else if (showWeightsList) {
          
          // Call the handler for weights creation
          handleCreateWeights();
        }
      };

    const handleDistanceChange = (event) => {
        const newDistance = event.target.value;
        console.log('Distance changed:', newDistance);
        setDistance(parseFloat(newDistance)); // Convert the distance to a float
      };
      
      const handleWeightChange = (event) => {
        const newWeight = event.target.value;
        console.log('Weight changed:', newWeight);
        setWeight(newWeight);
      };
      


    return (
        <>
            <header className="header">
                <Link to="/profile">Back to Profile</Link>
            </header>
            <div className="container">
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
                            <option value="run">Run</option>
                            <option value="walk">Walk</option>
                            <option value="stairMaster">Stair Master</option>
                            <option value="bike">Bike</option>
                        </select>

                        <input type="text" 
                               placeholder="Enter distance" 
                               onChange={handleDistanceChange} 
                        />
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
                        <option value="">Select workout</option>
                        <option value="overheadPress">Overhead Press</option>
                        <option value="lunge">Lunge</option>
                        <option value="curls">Curls</option>
                        <option value="squats">Squats</option>
                        <option value="hammerCurls">Hammer Curls</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Enter reps"
                        onChange={handleRepsChange}
                            />
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