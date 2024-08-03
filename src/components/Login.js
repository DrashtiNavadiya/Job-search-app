import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);

      // Save the email to local storage
      localStorage.setItem('email', email); // Ensure the key matches what you use to fetch it
      navigate('/'); // Redirect to profile page after successful login
    } catch (error) {
      setError('Login failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-box p-4 shadow-sm border rounded bg-light">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </Form>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </div>
    </Container>
  );
};

export default Login;
