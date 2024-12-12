import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [err, setError] = useState(null);
  axios.defaults.withCredentials = true;

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    axios.post('http://localhost:3005/login', inputs)
    .then(res => {
        if(res.data.Status === 'Success') {
            navigate('/');
            console.log("Success");
        } else {
            setError(res.data.Error);
            console.log("Error");
        }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button name = "buttonn" onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        {/* <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span> */}
      </form>
    </div>
  );
};

export default Login;