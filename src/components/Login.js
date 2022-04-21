import React from 'react';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      console.log('data', data);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data.message);
    }
  };

  console.log('form', formData);
  console.log('error', errorMessage);

  return (
    <div>
      <h1>Log in</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button">
              Log in
            </button>
          </div>
          <p className="help is-danger">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
