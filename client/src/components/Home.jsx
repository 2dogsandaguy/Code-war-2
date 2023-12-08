import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import bgImage from '../../../public/images/home_page.jpg';
import bgVideo from '../../../public/video/home_page_video.mp4';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';
function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignIn = async () => {
        try {
          const { data } = await login({
            variables: { email: username, password },
          });
      
          // Store the token in local storage
          Auth.login(data.login.token);
      
          setUsername('');
          setPassword('');
      
          const signInSuccessful = true; // This should be the result of your sign-in operation.
      
          if (signInSuccessful) {
            navigate('/profile');
          }
        } catch (e) {
          console.error(e);
          setShowAlert(true);
        }
      };

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
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} style={{ marginLeft: '10px' }} />
                </label>
                <label style={{ marginTop: '20px' }}>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} style={{ marginLeft: '10px' }} />
                </label>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '20px' }}>
                    <button onClick={handleSignIn}>Sign In</button>
                    <button><Link to="/signup" style={{ color: 'white' }}>Sign Up</Link></button>

                </div>
            </div>
        </div>
    );
}
export default Login;