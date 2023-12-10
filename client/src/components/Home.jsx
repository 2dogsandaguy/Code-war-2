import { useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
// import bgImage from '../../../public/images/home_page.jpg';
import bgVideo from '../../../public/video/home_page_video.mp4' 
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';
import YourComponent from './YourComponent'; 
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            console.log('Before login request');
          const { data } = await login({
            variables: { email: email, password },
          });
      
        console.log('Sign-in successful. Data:', data);
          // Store the token in local storage
          Auth.login(data.login.token);
      
          setEmail('');
          setPassword('');
      
           const signInSuccessful = true; // This should be the result of your sign-in operation.
      
          if (signInSuccessful) { 
            console.log('Navigating to /profile...');
            navigate('/profile');
          }
        } catch (e) {
            console.error('Sign-in error:', e);
          setShowAlert(true);
        }
      };
    // Check if the user is logged in
  const isLoggedIn = Auth.loggedIn();
    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <video autoPlay loop muted style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', objectFit: 'cover', zIndex: '-1' }}>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                zIndex: '1',
                position: 'relative'
            }}>
                <h1 style={{ marginBottom: '50px', fontSize: '75px' }}>Endor Fitness</h1>
                <label style={{ marginTop: '20px' }}>
                    Email:
                    <input type="text" value={email} onChange={handleEmailChange} style={{ marginLeft: '10px' }} />
                </label>
                <label style={{ marginTop: '20px' }}>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} style={{ marginLeft: '10px' }} />
                </label>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '20px' }}>
                    <button onClick={handleSignIn}>Sign In</button>
                    <button><Link to="/signup" style={{ color: 'white' }}>Sign Up</Link></button>
                    {/* Conditional rendering of YourComponent */}
            {isLoggedIn && <YourComponent />}
                </div>
            </div>
        </div>
    );
}
export default Login;

