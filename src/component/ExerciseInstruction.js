// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './exercise.css'

// const ExerciseInstructions = ({ match }) => {
//     const [instructions, setInstructions] = useState([]);
//     const [checkedItems, setCheckedItems] = useState({});
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const fetchInstructions = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/exercises/getinstruction/${match.params.id}`);
//                 setInstructions(response.data);
//             } catch (error) {
//                 console.error('Error fetching instructions:', error);
//             }
//         };

//         fetchInstructions();
//     }, [match.params.id]);

//     const handleCheckboxChange = (id) => {
//         const updatedCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
//         setCheckedItems(updatedCheckedItems);
//         const completed = Object.values(updatedCheckedItems).filter(Boolean).length;
//         setProgress((completed / instructions.length) * 100);
//     };

//     return (
//         <div className="instructions-container">
//             <h2>Exercise Instructions</h2>
//             <ul>
//                 {instructions.map(instruction => (
//                     <li key={instruction.id}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={checkedItems[instruction.id] || false}
//                                 onChange={() => handleCheckboxChange(instruction.id)}
//                             />
//                             {instruction.text}
//                         </label>
//                     </li>
//                 ))}
//             </ul>
//             <div className="progress-chart">
//                 <div style={{ width: `${progress}%` }} className="progress-bar"></div>
//             </div>
//         </div>
//     );
// };

// export default ExerciseInstructions;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ExerciseInstructions = () => {
//     const { exerciseId } = useParams();  // Get exerciseId from the route parameters
//     const [instructions, setInstructions] = useState([]);

//     useEffect(() => {
//         const fetchInstructions = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/exercises/getinstruction/${exerciseId}`);
//                 setInstructions(response.data);
//             } catch (error) {
//                 console.error('Error fetching instructions:', error);
//             }
//         };

//         fetchInstructions();
//     }, [exerciseId]);

//     return (
//         <div>
//             <h2>Exercise Instructions</h2>
//             {instructions.map((instruction, index) => (
//                 <div key={index}>
//                     <input type="checkbox" id={`instruction-${index}`} />
//                     <label htmlFor={`instruction-${index}`}>{instruction.text}</label>
//                 </div>
//             ))}
//             {/* Chart component or any other related content can go here */}
//         </div>
//     );
// };

// export default ExerciseInstructions;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './exercise.css';

const ExerciseInstructions = () => {
    const { id } = useParams(); // Use useParams to get the route parameters
    const [instructions, setInstructions] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchInstructions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/exercises/getinstruction/${id}`);
                setInstructions(response.data);
            } catch (error) {
                console.error('Error fetching instructions:', error);
            }
        };

        fetchInstructions();
    }, [id]);

    const handleCheckboxChange = (instructionId) => {
        const updatedCheckedItems = { ...checkedItems, [instructionId]: !checkedItems[instructionId] };
        setCheckedItems(updatedCheckedItems);
        const completed = Object.values(updatedCheckedItems).filter(Boolean).length;
        setProgress((completed / instructions.length) * 100);
    };

    return (
        <div className="instructions-container">
            <h2>Exercise Instructions</h2>
            <ul>
                {instructions.map(instruction => (
                    <li key={instruction.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checkedItems[instruction.id] || false}
                                onChange={() => handleCheckboxChange(instruction.id)}
                            />
                            {instruction.text}
                        </label>
                    </li>
                ))}
            </ul>
            <div className="progress-chart">
                <div style={{ width: `${progress}%` }} className="progress-bar"></div>
            </div>
        </div>
    );
};

export default ExerciseInstructions;
