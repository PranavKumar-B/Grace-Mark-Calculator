import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Authorization() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3005/fff')
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate('/login'); // Redirect to the login page
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  // Render loading or error message while checking authentication
//   if (message) {
//     return <div>{message}</div>;
//   }

  // Render nothing until authentication is checked
  return null;
}

export default Authorization;
