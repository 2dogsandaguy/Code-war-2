// main.jsx

import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' instead of 'react-dom'
import App from './App';
import './index.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Error from './components/Error';
import { createBrowserRouter } from 'react-router-dom';
import Profile from './components/Profile';
import CreateWorkout from './components/CreateWorkout';
import ViewHistory from './components/ViewHistory';

createBrowserRouter([
  {
    path: '*',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'SignUp',
        element: <SignUp />,
      },
      {
        path: 'Profile',
        element: <Profile />
      },
      {
        path: 'CreateWorkout',
        element: <CreateWorkout />
      },
      {
        path: 'ViewHistory',
        element: <ViewHistory />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

