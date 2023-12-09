// YourComponent.js
import  { useEffect } from 'react';
import Auth from '../../utils/auth';

const YourComponent = () => {
  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = Auth.loggedIn();

    if (isLoggedIn) {
      // User is logged in, you can perform actions accordingly
      console.log('User is logged in');
    } else {
      // User is not logged in, you can redirect or show a login form
      console.log('User is not logged in');
    }
  }, []);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default YourComponent;
