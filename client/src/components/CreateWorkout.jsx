import './CreateWorkout.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

function CreateWorkout () {
    const [showCardioList, setShowCardioList] = useState(false);
    const [showWeightsList, setShowWeightsList] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [distance, setDistance] = useState('');

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
    };

    const handleDistanceChange = (event) => {
        setDistance(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
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
                        <select>
                            <option value="">Select workout</option>
                            <option value="run">Run</option>
                            <option value="walk">Walk</option>
                            <option value="stairMaster">Stair Master</option>
                            <option value="bike">Bike</option>
                        </select>
                        <input type="text" placeholder="Enter distance" onChange={handleDistanceChange} />
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
                    {showWeightsList && showInput &&
                        <div className="weights-list">
                            <select>
                                <option value="">Select workout</option>
                                <option value="overheadPress">Overhead Press</option>
                                <option value="lunge">Lunge</option>
                                <option value="curls">Curls</option>
                                <option value="squats">Squats</option>
                                <option value="hammerCurls">Hammer Curls</option>
                            </select>
                            <input type="text" placeholder="Enter weight" onChange={handleWeightChange} />
                            <button onClick={handleSaveClick}>Save</button>
                        </div>
                    }
                </div>
                </div>
            </div>
        </>
    );
};



export default CreateWorkout